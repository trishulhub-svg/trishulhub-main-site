'use client'

import { useEffect, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.25,
      touchMultiplier: 1.8,
      lerp: 0.18,
      prevent: (node) => {
        return node.tagName === 'SELECT' || !!node.closest('[data-lenis-prevent]')
      },
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

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

  return <>{children}</>
}
