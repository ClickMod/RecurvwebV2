// Shared motion tokens — single source of truth for all animations on the site.
// One easing curve for everything; short durations; tiny travel distance.
// Enterprise-fintech palette: reliability over playfulness.

export const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Scroll-reveal transition duration (ms) */
export const DURATION_REVEAL = 280;

/** Hover / press micro-interaction duration (ms) */
export const DURATION_MICRO = 140;

/** Maximum translateY travel for reveal animations (px) */
export const TRAVEL = 8;

/** Stagger increment between sibling reveals (ms) */
export const STAGGER = 60;
