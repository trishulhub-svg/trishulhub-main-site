'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

const steps = [
  {
    n: '01',
    title: 'Tell us the need',
    text: 'Website, admin panel, or CRM — we map what your customers and team actually do each day.',
  },
  {
    n: '02',
    title: 'Shape the system',
    text: 'We design flows, screens, and data around your business — inventory, healthcare, sales, or support.',
  },
  {
    n: '03',
    title: 'Ship & refine',
    text: 'You get a working product, then we iterate with you so it stays useful as the business grows.',
  },
]

export function HomeProcess() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yOrbA = useTransform(scrollYProgress, [0, 1], [60, -60])
  const yOrbB = useTransform(scrollYProgress, [0, 1], [-40, 80])

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div
        style={{ y: yOrbA }}
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#00DEFF]/10 blur-[100px]"
      />
      <motion.div
        style={{ y: yOrbB }}
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#0088CC]/15 blur-[90px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]">
            How we work
          </span>
          <AnimatedHeading
            as="h2"
            variant="rise"
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            From idea to working product
          </AnimatedHeading>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE_OUT_EXPO }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md"
            >
              <div
                className="mb-6 text-4xl font-bold tracking-tight text-[#00DEFF]/35"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {step.n}
              </div>
              <h3
                className="mb-3 text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/55">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
