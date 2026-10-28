/**
 * Utility for smooth scrolling to top.
 * On mobile (< 768px): Uses a dedicated requestAnimationFrame quartic ease-out
 * animation curve that glides smoothly to top without browser stutter, layout-shift hiccups,
 * or native smooth-scroll cancellations.
 * On desktop (>= 768px): Uses native window.scrollTo({ behavior: 'smooth' })
 * to keep desktop behavior completely unchanged.
 */

import { flushSync } from 'react-dom';

let activeScrollRafId: number | null = null;

// Quartic ease-out: ultra-smooth deceleration without abrupt stop
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Starts the mobile RAF scroll animation loop.
 * Extracted so it can be invoked independently of state updates.
 */
const startMobileScrollAnimation = (startY: number): void => {
  const duration = 480; // ms - silky luxury duration
  const startTime = performance.now();

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
};

/** Cancel any in-flight scroll animation */
const cancelActiveScroll = (): void => {
  if (activeScrollRafId !== null) {
    cancelAnimationFrame(activeScrollRafId);
    activeScrollRafId = null;
  }
};

export const smoothScrollToTop = (overrideIsMobile?: boolean): void => {
  if (typeof window === 'undefined') return;

  const isMobile =
    typeof overrideIsMobile === 'boolean'
      ? overrideIsMobile
      : window.innerWidth < 768;

  // Always cancel any active scroll animation immediately to prevent fights
  cancelActiveScroll();

  if (isMobile) {
    const startY = window.scrollY || document.documentElement.scrollTop;
    if (startY <= 4) {
      window.scrollTo(0, 0);
      return;
    }

    startMobileScrollAnimation(startY);
  } else {
    // Preserve desktop behavior 100% untouched
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

/**
 * Coordinated scroll + state action for mobile.
 *
 * On mobile (< 768px), this solves the paint ordering issue where React's
 * batched state update causes word content to visually swap before the
 * scroll animation begins. The fix:
 *
 *   1. Capture scroll position & cancel any active animation
 *   2. Immediately kick the first scroll frame (moves viewport on the SAME frame)
 *   3. Use `flushSync` to commit the React state update synchronously
 *      within the same animation frame, so new content and scroll position
 *      are painted together — zero visual gap.
 *
 * On desktop (>= 768px), simply runs the action then native smooth-scroll.
 */
export const scrollThenAct = (action: () => void): void => {
  if (typeof window === 'undefined') {
    action();
    return;
  }

  const isMobile = window.innerWidth < 768;
  cancelActiveScroll();

  if (isMobile) {
    const startY = window.scrollY || document.documentElement.scrollTop;

    if (startY <= 4) {
      // Already at top — just update state normally, no scroll needed
      window.scrollTo(0, 0);
      action();
      return;
    }

    // Kick the scroll animation FIRST so the viewport begins moving
    // on the same frame as the state change paint
    startMobileScrollAnimation(startY);

    // Flush the React state update synchronously — forces React to
    // commit the DOM mutation within this same JS task, so the browser
    // composites both the scroll position change and the DOM update
    // in a single paint frame. No "content swaps, then scrolls" gap.
    flushSync(() => {
      action();
    });
  } else {
    // Desktop: action first, then native smooth scroll (unchanged)
    action();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
