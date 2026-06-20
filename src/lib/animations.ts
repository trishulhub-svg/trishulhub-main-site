/**
 * Animation variants, easings, and durations used across the site.
 *
 * Centralised here so every section uses the SAME feel — the user
 * explicitly asked for cubic-bezier(0.16, 1, 0.3, 1) easing throughout
 * for that smooth "Gcore-like" feel.
 *
 * Reusable by:
 *  - FadeIn component
 *  - StaggerContainer component
 *  - AnimatedText component
 *  - HoverCard component
 *  - Individual section files (hero, services, team, etc.)
 */

import type { Variants, Transition } from 'framer-motion'

/* ------------------------------------------------------------------ */
/* EASING                                                              */
/* ------------------------------------------------------------------ */

/** The main easing curve used everywhere — "expo-out" feel. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

/** Slightly snappier for buttons / micro-interactions. */
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const

/** Smooth in-out for page transitions. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

/* ------------------------------------------------------------------ */
/* DURATIONS                                                           */
/* ------------------------------------------------------------------ */

export const DURATION = {
  fast: 0.3, // buttons / hover
  normal: 0.5, // card reveals
  slow: 0.8, // hero headline
  page: 0.6, // page transitions
} as const

/* ------------------------------------------------------------------ */
/* STAGGER                                                             */
/* ------------------------------------------------------------------ */

export const STAGGER = {
  fast: 0.05, // tech stack pills
  normal: 0.1, // service / portfolio / team cards
  slow: 0.15, // hero headline words
} as const

/* ------------------------------------------------------------------ */
/* VIEWPORT                                                            */
/* ------------------------------------------------------------------ */

/** 10% visible — the threshold the user asked for. */
export const VIEWPORT = { once: true, amount: 0.1 } as const

/** Slightly more aggressive (40px before triggering). */
export const VIEWPORT_MARGIN = { once: true, margin: '-40px' } as const

/* ------------------------------------------------------------------ */
/* MOTION VARIANTS                                                     */
/* ------------------------------------------------------------------ */

/** Fade-in + slide-up — the workhorse scroll animation. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
}

/** Fade-in only — for elements that shouldn't move (e.g. backgrounds). */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
}

/** Fade-in + slide from left — for horizontal reveals. */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
}

/** Fade-in + slide from right. */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
}

/** Scale-in — used for hero CTA buttons. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 18 },
  },
}

/** 3D rotateY entrance — for tech stack cards. */
export const rotateYIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
}

/** Stagger container — applies a staggered delay to all children. */
export const staggerContainer = (stagger: number = STAGGER.normal, delayChildren: number = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

/* ------------------------------------------------------------------ */
/* TRANSITIONS                                                         */
/* ------------------------------------------------------------------ */

/** Standard hover transition for cards. */
export const hoverTransition: Transition = {
  duration: DURATION.fast,
  ease: EASE_OUT_QUART,
}

/** Slow lift transition for service cards (400ms cubic-bezier). */
export const liftTransition: Transition = {
  duration: 0.4,
  ease: EASE_OUT_EXPO,
}

/* ------------------------------------------------------------------ */
/* REDUCED MOTION                                                      */
/* ------------------------------------------------------------------ */

/**
 * Returns true if the user prefers reduced motion.
 * SSR-safe: returns false on the server.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
