/**
 * Global helper to cleanly manage body scroll lock and Lenis smooth scroll
 * whenever any modal, drawer, or dialog is opened or closed.
 * Uses a Set of active lock keys so locks never drift or desynchronize.
 */

const activeLocks = new Set<string>();

export function lockScroll(id: string = 'default') {
  if (typeof document === 'undefined') return;

  activeLocks.add(id);
  document.body.style.overflow = 'hidden';
  document.documentElement.classList.add('lenis-stopped');

  if (typeof window !== 'undefined' && (window as any).__lenis) {
    (window as any).__lenis.stop();
  }
}

export function unlockScroll(id: string = 'default') {
  if (typeof document === 'undefined') return;

  activeLocks.delete(id);

  if (activeLocks.size === 0) {
    document.body.style.overflow = '';
    document.documentElement.classList.remove('lenis-stopped');

    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.start();
    }
  }
}

export function forceUnlockAll() {
  if (typeof document === 'undefined') return;

  activeLocks.clear();
  document.body.style.overflow = '';
  document.documentElement.classList.remove('lenis-stopped');

  if (typeof window !== 'undefined' && (window as any).__lenis) {
    (window as any).__lenis.start();
  }
}
