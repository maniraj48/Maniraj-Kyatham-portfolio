/**
 * Centralized smooth scroll utility that harmonizes with Lenis
 * on desktop and provides reliable, offset-aware smooth scrolling
 * on mobile, tablet, and touch devices across all aspect ratios.
 */

export function smoothScrollTo(target: string | HTMLElement | number, offset: number = -75) {
  if (typeof window === 'undefined') return;

  // 1. Force unfreeze any residual body scroll lock before navigating
  if (document.body.style.overflow === 'hidden') {
    document.body.style.overflow = '';
  }
  document.documentElement.classList.remove('lenis-stopped');

  // 2. Desktop with active Lenis smooth scrolling instance
  const lenis = (window as any).__lenis;
  if (lenis && typeof lenis.scrollTo === 'function') {
    if (lenis.isStopped) {
      lenis.start();
    }
    lenis.scrollTo(target, {
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      offset: offset,
    });
    return;
  }

  // 3. Number target (e.g. scrollToTop)
  if (typeof target === 'number') {
    window.scrollTo({
      top: Math.max(0, target === 0 ? 0 : target + offset),
      behavior: 'smooth',
    });
    return;
  }

  // 4. Element target or selector string (Mobile, Tablet, Touch, and Fallback)
  const el = typeof target === 'string' ? (document.querySelector(target) as HTMLElement | null) : target;
  if (el) {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const targetY = rect.top + scrollTop + offset;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth',
    });
  }
}
