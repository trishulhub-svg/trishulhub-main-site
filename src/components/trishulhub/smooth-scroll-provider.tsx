'use client'

/**
 * SmoothScrollProvider — wraps the entire homepage with Lenis-powered
 * smooth scrolling + a page-load fade-in.
 *
 * Lenis is initialised once on mount, configured to feel buttery-smooth
 * without being laggy. It respects prefers-reduced-motion (instant scroll
 * for users who prefer reduced motion).
 *
 * The page-load fade-in is a single motion.div that wraps children and
 * fades in from 0 → 1 opacity over 0.8s with easeOut easing, exactly as
 * the user specified.
 *
 * Also re-renders the page on route changes so exit/enter transitions
 * can fire (used by template.tsx if we add one — currently only the
 * fade-in on initial load is wired).
 */

import { useEffect, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return // skip Lenis for reduced-motion users (native scroll is fine)

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    })

    // Hook Lenis into the requestAnimationFrame loop
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Handle anchor link clicks (#home, #services, etc.) via Lenis
    // so they get the same smooth feel as wheel scrolling
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 })
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
    }
  }, [reduce])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
