import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'open' | 'pointer'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafIdRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const cursorTypeRef = useRef(cursorType);

  useEffect(() => {
    cursorTypeRef.current = cursorType;
  }, [cursorType]);

  useEffect(() => {
    // Check if device is touch or prefers reduced motion
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const startLoop = () => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;

      const loop = () => {
        const dx = targetRef.current.x - posRef.current.x;
        const dy = targetRef.current.y - posRef.current.y;

        posRef.current.x += dx * 0.22;
        posRef.current.y += dy * 0.22;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
        }

        // If distance is sub-pixel, stop loop until next mouse move to save CPU
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          rafIdRef.current = requestAnimationFrame(loop);
        } else {
          isRunningRef.current = false;
        }
      };

      rafIdRef.current = requestAnimationFrame(loop);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      startLoop();
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      let nextType: 'default' | 'view' | 'open' | 'pointer' = 'default';
      if (target.closest('[data-cursor="view"]') || target.closest('.project-card')) {
        nextType = 'view';
      } else if (target.closest('[data-cursor="open"]') || target.closest('.image-interactive')) {
        nextType = 'open';
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        nextType = 'pointer';
      }

      if (nextType !== cursorTypeRef.current) {
        setCursorType(nextType);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      isRunningRef.current = false;
    };
  }, []);

  if (isTouch) return null;

  const isTextCursor = cursorType === 'view' || cursorType === 'open';

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,opacity] duration-200 ease-out flex items-center justify-center font-mono text-[10px] font-bold tracking-widest uppercase select-none will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`,
        width: isTextCursor ? '70px' : cursorType === 'pointer' ? '32px' : '10px',
        height: isTextCursor ? '70px' : cursorType === 'pointer' ? '32px' : '10px',
        borderRadius: '50%',
        backgroundColor: isTextCursor
          ? 'rgba(196, 93, 62, 0.92)'
          : cursorType === 'pointer'
          ? 'rgba(232, 228, 222, 0.12)'
          : '#C45D3E',
        backdropFilter: isTextCursor ? 'blur(4px)' : 'none',
        border: cursorType === 'pointer' ? '1px solid rgba(196, 93, 62, 0.7)' : 'none',
        color: '#FFFFFF'
      }}
      aria-hidden="true"
    >
      {isTextCursor && (
        <span className="scale-100 transition-transform duration-150">
          {cursorType === 'view' ? 'VIEW' : 'OPEN'}
        </span>
      )}
    </div>
  );
};
