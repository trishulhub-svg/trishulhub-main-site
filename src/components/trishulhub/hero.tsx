'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { FadeIn } from './motion-primitives'
import { EASE_OUT_EXPO } from '@/lib/animations'

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0A0A0A 0%, #0A0A0A 40%, #061218 100%)',
        }}
      />

      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.div variants={heroItem}>
          <div
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#00DEFF]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00DEFF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00DEFF]" />
            </span>
            Digital Solutions Company
          </div>
        </motion.div>

        <motion.div variants={heroItem}>
          <h1
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
          >
            DIGITAL SOLUTIONS.{' '}
            <span className="gradient-text-animated">REAL GROWTH.</span>
          </h1>
        </motion.div>

        <motion.div variants={heroItem}>
          <p
            className="mx-auto mt-8 max-w-2xl text-base text-white/70 sm:text-lg md:text-xl"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
          >
            TrishulHub delivers premium software development, web development,
            digital marketing, CRM solutions, UI/UX design, and e-commerce
            solutions that transform ideas into powerful digital experiences.
          </p>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#contact"
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
      </motion.div>

      <FadeIn delay={1.2} whenInView={false}>
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
