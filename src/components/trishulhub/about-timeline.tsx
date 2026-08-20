'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CalendarRange, Globe2, Rocket, Layers3, TrendingUp } from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

const milestones = [
  {
    year: '2023',
    status: 'Origin',
    title: 'Website studio',
    text: 'We started by building websites for businesses.',
    icon: Globe2,
  },
  {
    year: '2024',
    status: 'Growth',
    title: 'Custom software',
    text: 'We began building custom software for teams.',
    icon: Layers3,
  },
  {
    year: '2025',
    status: 'Scale',
    title: 'Mobile apps',
    text: 'We started building mobile apps for phones.',
    icon: TrendingUp,
  },
  {
    year: 'Present',
    status: 'Active',
    title: 'Full studio',
    text: 'Websites, software, and apps — under one roof.',
    icon: Rocket,
  },
]

export function AboutTimeline() {
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 70%', 'end 40%'],
  })
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['8%', '100%'])

  return (
    <section className="relative mt-4 sm:mt-8">
      <div className="mb-14 max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#75B4B1]/25 bg-[#e8f4f3] font-display text-[11px] font-medium text-[#75B4B1]">
            01
          </span>
          <span className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <CalendarRange className="h-3.5 w-3.5 text-[#75B4B1]" />
            Our story
          </span>
        </div>
        <AnimatedHeading
          as="h2"
          variant="rise"
          className="font-display text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl"
        >
          Our journey
        </AnimatedHeading>
        <p className="mt-4 max-w-xl font-sans text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
          A short look at how TrishulHub grew.
        </p>
      </div>

      <div
        ref={railRef}
        className="surface-card relative mx-auto max-w-3xl rounded-[1.5rem] p-6 sm:p-10"
      >
        <div className="pointer-events-none absolute bottom-10 left-8 top-10 w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />
        <motion.div
          style={{ height: fillHeight }}
          className="pointer-events-none absolute left-8 top-10 w-px bg-gradient-to-b from-[#75B4B1] via-[#75B4B1]/70 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />
        <div className="about-timeline-scan pointer-events-none absolute left-8 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#75B4B1] to-transparent sm:left-1/2" />

        <div className="relative space-y-8 sm:space-y-10">
          {milestones.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
                className="relative pl-14 sm:pl-0"
              >
                <div className="absolute left-8 top-8 z-10 flex -translate-x-1/2 items-center justify-center sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#75B4B1]/30 bg-white text-[#75B4B1] shadow-sm">
                    <Icon size={18} />
                  </span>
                </div>

                <div
                  className={`sm:w-[calc(50%-2.25rem)] ${
                    i % 2 === 0
                      ? 'sm:mr-auto sm:pr-2'
                      : 'sm:ml-auto sm:pl-2'
                  }`}
                >
                  <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5 shadow-sm transition-colors hover:border-[#75B4B1]/25">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-1 -top-2 select-none font-display text-6xl font-bold leading-none tracking-tight text-[#75B4B1]/15 sm:text-7xl"
                    >
                      {m.year}
                    </span>

                    <div className="relative z-10">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-lg border border-[#75B4B1]/25 bg-[#e8f4f3] px-2.5 py-1 font-display text-sm font-bold tracking-tight text-[#75B4B1]">
                          {m.year}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#111111]" />
                          {m.status}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                        {m.title}
                      </h3>
                      <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-muted-foreground">
                        {m.text}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
