'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { FadeIn } from './motion-primitives'
import { NexusButton } from './nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
}

export function Hero() {
  const reduce = useReducedMotion()
  const { links } = useSiteContact()

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-20 sm:px-6"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="atelier-mesh absolute inset-0" />
        <div className="atelier-grain absolute inset-0" />
        <div
          aria-hidden
          className="atelier-float absolute -left-24 top-24 h-72 w-72 rounded-full bg-teal-300/25 blur-[90px]"
        />
        <div
          aria-hidden
          className="atelier-float-delayed absolute -right-16 bottom-32 h-80 w-80 rounded-full bg-teal-500/15 blur-[100px]"
        />
      </div>

      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.p
          variants={heroItem}
          className="font-display text-[clamp(2.75rem,12vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.03em] text-foreground"
        >
          Trishul<span className="gradient-text">Hub</span>
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="mx-auto mt-6 max-w-3xl font-sans text-xl font-medium leading-snug tracking-tight text-foreground/90 sm:text-2xl md:text-3xl"
        >
          Digital products that work for you.
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Websites, software, and mobile apps — clear, reliable, and built around
          your business goals.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <NexusButton href={links.whatsapp}>Let&apos;s build yours</NexusButton>
          <Link
            href="/services"
            className="btn-ghost group inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/10 bg-white/70 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:text-primary sm:w-auto"
          >
            <span className="relative z-10">See our services</span>
          </Link>
        </motion.div>
      </motion.div>

      <FadeIn delay={1} whenInView={false}>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex h-11 w-6 items-start justify-center rounded-full border border-foreground/15 bg-white/50 p-1.5 backdrop-blur-sm">
            <motion.div
              animate={reduce ? undefined : { y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full bg-primary"
            />
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
