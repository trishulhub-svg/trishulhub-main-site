'use client'

/**
 * SmoothScrollProvider — wraps the entire homepage with Lenis-powered
 * smooth scrolling + a page-load fade-in.
 *
 * Lenis is initialised once on mount, configured to feel buttery-smooth
 * without being laggy. It respects prefers-reduced-motion (instant scroll
 * for users who prefer reduced motion).
 *
 * Performance notes:
 *  - Lenis is imported dynamically *after* hydration so its ~10KB payload
 *    never blocks first paint (desktop + wheel pointers only).
 *  - There is no wrapper opacity fade anymore: fading the whole app delayed
 *    LCP and made the first paint feel slower than it was.
 */

import { useEffect, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return // skip Lenis for reduced-motion users (native scroll is fine)

    // Native scroll on touch/coarse pointers so pull-to-refresh (wipe) works.
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window)
    if (isTouch) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    // Defer the library download until the browser is idle.
    const start = async () => {
      const { default: Lenis } = await import('lenis')
      if (cancelled) return

      const lenis = new Lenis({
        // Snappy smooth scroll — lighter feel, less "heavy" trailing.
        duration: 0.55,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.4,
        lerp: 0.14,
        prevent: (node) =>
          node.tagName === 'SELECT' ||
          !!node.closest('[data-lenis-prevent]'),
      })

      let rafId = 0
      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      // Anchor links (#home, #services…) get the same smooth feel.
      const onAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest('a[href^="#"]')
        if (!target) return
        const href = target.getAttribute('href')
        if (!href || href === '#') return
        const el = document.querySelector(href)
        if (!el) return
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -90, duration: 1.1 })
      }
      document.addEventListener('click', onAnchorClick)

      cleanup = () => {
        cancelAnimationFrame(rafId)
        document.removeEventListener('click', onAnchorClick)
        lenis.destroy()
      }
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
    }
    const idleId = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(() => void start())
      : window.setTimeout(() => void start(), 900)

    return () => {
      cancelled = true
      if (typeof idleId === 'number') window.clearTimeout(idleId)
      cleanup?.()
    }
  }, [reduce])

  return <>{children}</>
}
