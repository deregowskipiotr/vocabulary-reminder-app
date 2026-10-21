/**
 * Utility for smooth scrolling to top.
 * On mobile (< 768px): Uses a dedicated requestAnimationFrame quartic ease-out
 * animation curve that glides smoothly to top without browser stutter, layout-shift hiccups,
 * or native smooth-scroll cancellations.
 * On desktop (>= 768px): Uses native window.scrollTo({ behavior: 'smooth' })
 * to keep desktop behavior completely unchanged.
 */

let activeScrollRafId: number | null = null;

export const smoothScrollToTop = (overrideIsMobile?: boolean): void => {
  if (typeof window === 'undefined') return;

  const isMobile =
    typeof overrideIsMobile === 'boolean'
      ? overrideIsMobile
      : window.innerWidth < 768;

  // Always cancel any active scroll animation immediately to prevent fights
  if (activeScrollRafId !== null) {
    cancelAnimationFrame(activeScrollRafId);
    activeScrollRafId = null;
  }

  if (isMobile) {
    const startY = window.scrollY || document.documentElement.scrollTop;
  if (startY <= 4) {
    window.scrollTo(0, 0);
    return;
  }

    const duration = 480; // ms - silky luxury duration
    const startTime = performance.now();

    // Quartic ease-out: ultra-smooth deceleration without abrupt stop
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutQuart(progress);

      window.scrollTo(0, Math.round(startY * (1 - ease)));

      if (progress < 1) {
        activeScrollRafId = requestAnimationFrame(step);
      } else {
        activeScrollRafId = null;
        window.scrollTo(0, 0);
      }
    };

    activeScrollRafId = requestAnimationFrame(step);
  } else {
    // Preserve desktop behavior 100% untouched
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
