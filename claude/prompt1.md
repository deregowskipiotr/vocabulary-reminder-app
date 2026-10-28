Hi Claude, I need your help fixing a micro-jank / layout paint ordering issue on mobile viewports for my application.

### Problem Description:
When tapping navigation buttons (`Next`, `Prev`, `Random`, `First Word`) on mobile viewports, there is a visual delay between state update and page scroll. The word data inside the `<WordCard />` component replaces its text content *first*, and only a fraction of a millisecond later does the custom `requestAnimationFrame` scroll to top execute (`smoothScrollToTop`). 

This creates a subtle, unpolished jump/stutter where the content updates before the viewport moves up, rather than the page smoothly gliding upward synchronously with the click. On desktop performance hardware, this isn't noticeable, but on mobile browsers, the paint sequence renders the DOM change before the RAF scroll loop begins.

### Current Implementation Details:
1. `src/utils/scrollUtils.ts`: Uses a custom 480ms `requestAnimationFrame` with `easeOutQuart` for mobile viewports (< 768px).
2. `src/components/dashboard/WordNavigation.tsx`: Buttons trigger `action()` and `smoothScrollToTop()` inside `handleAction`.
3. `src/App.tsx`: Manages `currentIndex` and active word state.

### Goal:
I want the mobile scroll motion to initiate instantly upon touch/click, seamlessly decoupled from or synchronized with the React content re-render, so the page glides smoothly without the visible "content-swaps-first, then-page-scrolls" delay.

### Technical Options to Consider/Implement:
Please analyze our setup and provide the optimal fix. Potential architectural approaches:
1. **Layout Effect / Frame Scheduling (`useLayoutEffect` / `flushSync`):** Forcing/scheduling the scroll calculation or state transition before the browser paints the new DOM frame.
2. **CSS Transition View Transitions API (`document.startViewTransition`):** Smoothly bridging content height shifts and scroll motion.
3. **Framer Motion / Viewport Lock during Scroll:** Temporarily locking card height or animating the transition so content replacement doesn't cause layout reflow during scroll initiation.

Could you inspect `scrollUtils.ts`, `WordNavigation.tsx`, and `App.tsx` (or any other specific files if needed) and provide a clean, robust refactor to eliminate this paint timing gap on mobile?