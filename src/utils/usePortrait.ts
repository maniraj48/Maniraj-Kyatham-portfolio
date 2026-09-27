import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'maniraj_authentic_portrait';
const DEFAULT_PORTRAIT = '/maniraj-portrait.png';
const EVENT_NAME = 'portrait-changed';

export function usePortrait() {
  const [portraitSrc, setPortraitSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    }
    return DEFAULT_PORTRAIT;
  });

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPortraitSrc(stored);
      } else {
        setPortraitSrc(`${DEFAULT_PORTRAIT}?t=${Date.now()}`);
      }
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updatePortrait = useCallback(async (fileOrDataUrl: File | string): Promise<boolean> => {
    setIsUpdating(true);
    try {
      let dataUrl: string;

      if (typeof fileOrDataUrl === 'string') {
        dataUrl = fileOrDataUrl;
      } else {
        dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(fileOrDataUrl);
        });
      }

      // 1. Immediately store in localStorage for instantaneous zero-latency updates
      localStorage.setItem(STORAGE_KEY, dataUrl);
      setPortraitSrc(dataUrl);

      // Broadcast to all mounted components
      window.dispatchEvent(new CustomEvent(EVENT_NAME));

      // 2. Persist to server disk via backend API
      try {
        await fetch('/api/upload-portrait', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: dataUrl }),
        });
      } catch (err) {
        console.warn('Backend disk persist notice:', err);
      }

      return true;
    } catch (err) {
      console.error('Error updating portrait:', err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    portraitSrc,
    updatePortrait,
    isUpdating,
  };
}
