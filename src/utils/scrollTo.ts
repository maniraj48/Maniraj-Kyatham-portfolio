/**
 * Centralized smooth scroll utility that harmonizes with Lenis
 * smooth scrolling when available, avoiding conflicts between
 * native scrollIntoView and Lenis virtual-scroll loop.
 */

export function smoothScrollTo(target: string | HTMLElement | number) {
  if (typeof window === 'undefined') return;

  const lenis = (window as any).__lenis;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(target, {
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      offset: -20,
    });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
