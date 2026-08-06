'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from './motion-primitives'
import { EASE_OUT_EXPO } from '@/lib/animations'

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

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, transparent 0%, rgba(10,10,10,0.25) 70%, rgba(10,10,10,0.55) 100%)',
        }}
      />

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
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              textShadow: '0 4px 30px rgba(0,0,0,0.6)',
            }}
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
          <Link
            href="/contact"
            className="btn-cyan btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#00DEFF]/40 bg-[#00DEFF]/10 px-7 py-3.5 text-sm font-semibold text-[#00DEFF] backdrop-blur-md transition-all hover:bg-[#00DEFF]/20 sm:w-auto"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Let&apos;s build yours
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
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
