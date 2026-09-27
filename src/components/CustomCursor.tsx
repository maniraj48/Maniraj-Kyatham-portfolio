import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'open' | 'pointer'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafIdRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const cursorTypeRef = useRef(cursorType);
  const isInitializedRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    cursorTypeRef.current = cursorType;
  }, [cursorType]);

  useEffect(() => {
    // Check if device is pure touch without fine pointer
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const touchOnly = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && !hasFinePointer;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchOnly || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);
    document.documentElement.classList.add('custom-cursor-enabled');

    const updatePositionStyle = (x: number, y: number) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const startLoop = () => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;

      const loop = () => {
        const dx = targetRef.current.x - posRef.current.x;
        const dy = targetRef.current.y - posRef.current.y;
        const dist = Math.hypot(dx, dy);

        // If mouse jumped across screen or re-entered, snap instantly to prevent drifting
        if (dist > 350) {
          posRef.current.x = targetRef.current.x;
          posRef.current.y = targetRef.current.y;
          updatePositionStyle(posRef.current.x, posRef.current.y);
          isRunningRef.current = false;
          return;
        }

        posRef.current.x += dx * 0.35;
        posRef.current.y += dy * 0.35;
        updatePositionStyle(posRef.current.x, posRef.current.y);

        if (dist > 0.2) {
          rafIdRef.current = requestAnimationFrame(loop);
        } else {
          posRef.current.x = targetRef.current.x;
          posRef.current.y = targetRef.current.y;
          updatePositionStyle(posRef.current.x, posRef.current.y);
          isRunningRef.current = false;
        }
      };

      rafIdRef.current = requestAnimationFrame(loop);
    };

    const updateCursorTypeFromElement = (target: Element | null) => {
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
        target.closest('.cursor-pointer') ||
        target.closest('label') ||
        target.closest('summary') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        nextType = 'pointer';
      }

      if (nextType !== cursorTypeRef.current) {
        cursorTypeRef.current = nextType;
        setCursorType(nextType);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      // Discard invalid/offscreen coordinates
      if (e.clientX < 0 || e.clientY < 0 || e.clientX > window.innerWidth || e.clientY > window.innerHeight) {
        return;
      }

      // If re-entering or initial load, snap directly to avoid flying from old coordinates
      if (!isInitializedRef.current || !isVisibleRef.current) {
        posRef.current = { x: e.clientX, y: e.clientY };
        targetRef.current = { x: e.clientX, y: e.clientY };
        updatePositionStyle(e.clientX, e.clientY);
        isInitializedRef.current = true;
        isVisibleRef.current = true;
        setIsVisible(true);
        document.documentElement.classList.add('custom-cursor-enabled');
        return;
      }

      targetRef.current = { x: e.clientX, y: e.clientY };
      startLoop();
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (
        !e.relatedTarget ||
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        isVisibleRef.current = false;
        setIsVisible(false);
      }
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onWindowBlur = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateCursorTypeFromElement(e.target as Element | null);
    };

    const handleScroll = () => {
      if (isVisibleRef.current && posRef.current.x >= 0 && posRef.current.y >= 0) {
        const el = document.elementFromPoint(posRef.current.x, posRef.current.y);
        if (el) {
          updateCursorTypeFromElement(el);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('blur', onWindowBlur);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('blur', onWindowBlur);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 pointer-events-none z-[999999] select-none will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`,
        transition: 'opacity 0.15s ease-out'
      }}
      aria-hidden="true"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono select-none will-change-transform transition-[width,height,background-color,border-color,box-shadow,transform] duration-200 ease-out ${
          isClicked ? 'scale-85' : 'scale-100'
        }`}
        style={{
          width: isTextCursor ? '54px' : cursorType === 'pointer' ? '38px' : '12px',
          height: isTextCursor ? '54px' : cursorType === 'pointer' ? '38px' : '12px',
          background: isTextCursor
            ? 'linear-gradient(135deg, #FF6F43 0%, #FF3D00 100%)'
            : cursorType === 'pointer'
            ? 'rgba(255, 112, 67, 0.22)'
            : 'radial-gradient(circle, #FFFFFF 16%, #FF7849 55%, #FF451A 100%)',
          backdropFilter: isTextCursor ? 'blur(8px)' : cursorType === 'pointer' ? 'blur(3px)' : 'none',
          border: cursorType === 'pointer'
            ? '2px solid #FF7A45'
            : cursorType === 'default'
            ? '1.5px solid rgba(255, 255, 255, 0.9)'
            : '1.5px solid rgba(255, 255, 255, 0.6)',
          boxShadow: cursorType === 'default'
            ? '0 0 14px rgba(255, 115, 65, 0.95), 0 0 28px rgba(255, 80, 20, 0.65), 0 0 4px rgba(255, 255, 255, 0.9)'
            : cursorType === 'pointer'
            ? '0 0 22px rgba(255, 115, 65, 0.75), inset 0 0 12px rgba(255, 115, 65, 0.3)'
            : '0 0 24px rgba(255, 87, 34, 0.75), 0 0 12px rgba(255, 120, 70, 0.5)',
          color: '#FFFFFF'
        }}
      >
        {isTextCursor && (
          <span className="text-[10px] font-extrabold tracking-widest uppercase transition-transform duration-150 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            {cursorType === 'view' ? 'VIEW' : 'OPEN'}
          </span>
        )}
        {cursorType === 'pointer' && (
          <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF,0_0_14px_#FF6F43] transition-transform duration-150" />
        )}
      </div>
    </div>
  );
};
