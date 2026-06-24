'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/lib/animations'

/* Hero section — no background video / GIF.
 * The previous MP4 and GIF backgrounds were removed per user feedback
 * (load overhead, jank). The hero now uses only CSS-driven background
 * layers: a base color, a subtle grid, gradient orbs, and radial glows.
 */

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6"
    >
      {/* Base background — solid dark with a subtle teal tint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0A0A0A 0%, #0A0A0A 40%, #061218 100%)',
        }}
      />

      {/* Subtle background grid for depth */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid"
        style={{ opacity: 0.2 }}
      />

      {/* HERO-ONLY floating gradient orbs (replaces site-wide spacy bg) */}
      <div className="hero-orbs" aria-hidden="true" />

      {/* Radial glows (sit above video, below overlays) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 z-[4] h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-[4] h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #0088CC 0%, transparent 70%)' }}
      />

      {/* DARK + THEMED OVERLAY for readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0.25) 65%, rgba(10,10,10,0.75) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[5] mix-blend-color"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,136,204,0.25) 0%, rgba(0,222,255,0.12) 50%, rgba(10,10,10,0.2) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 0%, rgba(10,10,10,0.2) 60%, rgba(10,10,10,0.55) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[420px] w-[900px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,222,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE_OUT_EXPO }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#00DEFF]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00DEFF] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00DEFF]" />
          </span>
          Digital Solutions Company
        </motion.div>

        {/* Headline — plain static text. No motion, no per-word stagger,
         * no fade-in. Just renders immediately on page load. */}
        <h1
          className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
        >
          DIGITAL SOLUTIONS.{' '}
          <span className="gradient-text-animated">REAL GROWTH.</span>
        </h1>

        {/* Subtitle — fade-in with blur effect, fires shortly after heading starts. */}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)' }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            ease: EASE_OUT_EXPO,
          }}
          className="mx-auto mt-8 max-w-2xl text-base text-white/70 sm:text-lg md:text-xl"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
        >
          TrishulHub delivers premium software development, web development,
          digital marketing, CRM solutions, UI/UX design, and e-commerce
          solutions that transform ideas into powerful digital experiences.
        </motion.p>

        {/* CTAs — spring scale-in with 0.08s stagger + hover scale 1.05 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
          }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#contact"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { type: 'spring', stiffness: 200, damping: 18 },
              },
            }}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="btn-cyan btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00DEFF] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all sm:w-auto"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Let&apos;s Get Started
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </motion.a>
          <motion.a
            href="#portfolio"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { type: 'spring', stiffness: 200, damping: 18 },
              },
            }}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="btn-ghost btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:text-[#00DEFF] sm:w-auto"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              <Play size={14} className="fill-current" />
              View Our Work
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-[#00DEFF]"
          />
        </div>
      </motion.div>
    </section>
  )
}
