import React, { useEffect, useRef } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (barRef.current) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
              const scrolled = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
              barRef.current.style.transform = `scaleX(${scrolled})`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 z-[10005] h-[2.5px] w-full bg-black/5 dark:bg-white/5 pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        id="scroll-progress-bar"
        className="h-full w-full bg-gradient-to-r from-accent via-accent-light to-accent shadow-[0_0_8px_rgba(196,93,62,0.5)] origin-left will-change-transform rounded-r-full"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
