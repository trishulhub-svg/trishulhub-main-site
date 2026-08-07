'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FadeIn } from './motion-primitives'
import { NexusButton } from './nexus-button'
import { EASE_OUT_EXPO } from '@/lib/animations'

const HERO_SPLINE =
  'https://my.spline.design/3dgradient-AcpgG6LxFkpnJSoowRHPfcbO'

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

/**
 * Hero with deferred, opacity-softened Spline. Unloads when off-screen
 * to keep scroll light.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(true)
  const [splineReady, setSplineReady] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || reduce) return
    let cancelled = false
    const enable = () => {
      if (!cancelled) setSplineReady(true)
    }
    // Longer defer — keep first paint light
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(enable, { timeout: 2800 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }
    const t = window.setTimeout(enable, 1400)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [inView, reduce])

  // Unload iframe when scrolled away to free GPU
  const showSpline = splineReady && inView && !reduce

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6"
    >
      <div className="spline-container pointer-events-none absolute inset-0 -z-10 overflow-hidden [contain:strict]">
        {showSpline ? (
          <iframe
            src={HERO_SPLINE}
            title="TrishulHub hero background"
            frameBorder={0}
            width="100%"
            height="100%"
            id="aura-spline"
            className="absolute inset-0 h-full w-full scale-105 border-0 opacity-[0.22] will-change-transform"
            loading="lazy"
            allow="autoplay"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,222,255,0.08),transparent_55%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/78 to-[#050505]" />
      </div>

      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.div variants={heroItem}>
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#00DEFF]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00DEFF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00DEFF]" />
            </span>
            Custom digital solutions
          </div>
        </motion.div>

        <motion.div variants={heroItem}>
          <h1
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
          >
            WEBSITES. SOFTWARE.{' '}
            <span className="gradient-text-animated">CRM THAT FITS.</span>
          </h1>
        </motion.div>

        <motion.div variants={heroItem}>
          <p
            className="mx-auto mt-8 max-w-2xl text-base text-white/70 sm:text-lg md:text-xl"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
          >
            TrishulHub builds custom websites, business admin panels, and CRM
            systems shaped around how you sell, operate, and support customers —
            not generic templates forced to fit.
          </p>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <NexusButton href="/contact">Let&apos;s build yours</NexusButton>
          <Link
            href="/services"
            className="btn-ghost btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:text-[#00DEFF] sm:w-auto"
          >
            <span className="relative z-10">Explore services</span>
          </Link>
        </motion.div>
      </motion.div>

      <FadeIn delay={1.1} whenInView={false}>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <motion.div
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full bg-[#00DEFF]"
            />
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
