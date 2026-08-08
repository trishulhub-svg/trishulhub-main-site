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
    text: 'TrishulHub launches — brand sites and ecommerce for founders.',
    icon: Globe2,
  },
  {
    year: '2024',
    status: 'Growth',
    title: 'Custom software',
    text: 'Expanded into admin panels and ops tools for real teams.',
    icon: Layers3,
  },
  {
    year: '2025',
    status: 'Scale',
    title: 'CRM + systems',
    text: 'Pipelines, staff, and customers joined the craft stack.',
    icon: TrendingUp,
  },
  {
    year: 'Present',
    status: 'Active',
    title: 'Full studio',
    text: 'Web, software, and CRM — one connected practice.',
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
    <section className="relative mt-28 sm:mt-36">
      <div className="mb-14 max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#00DEFF]/25 bg-[#00DEFF]/10 font-display text-[11px] font-medium text-[#00DEFF] shadow-[0_0_12px_rgba(0,222,255,0.2)]">
            01
          </span>
          <span className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            <CalendarRange className="h-3.5 w-3.5 text-[#00DEFF]" />
            Chronometric assembly
          </span>
        </div>
        <AnimatedHeading
          as="h2"
          variant="rise"
          className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Our timeline, assembled
        </AnimatedHeading>
        <p className="mt-4 max-w-xl font-sans text-base font-light leading-relaxed text-neutral-400 sm:text-lg">
          2023 to today — the short path that shaped TrishulHub.
        </p>
      </div>

      <div
        ref={railRef}
        className="relative mx-auto max-w-3xl rounded-[1.5rem] border border-white/[0.06] bg-[#0a0a0a]/80 p-6 backdrop-blur-[18px] sm:p-10"
      >
        <div className="pointer-events-none absolute bottom-10 left-8 top-10 w-px bg-white/[0.06] sm:left-1/2 sm:-translate-x-1/2" />
        <motion.div
          style={{ height: fillHeight }}
          className="pointer-events-none absolute left-8 top-10 w-px bg-gradient-to-b from-[#00DEFF] via-[#00DEFF]/70 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />
        <div className="about-timeline-scan pointer-events-none absolute left-8 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00DEFF] to-transparent shadow-[0_0_18px_rgba(0,222,255,0.65)] sm:left-1/2" />

        <div className="relative space-y-10 sm:space-y-12">
          {milestones.map((m, i) => {
            const Icon = m.icon
            const left = i % 2 === 0
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
                className={`relative flex flex-col gap-3 sm:flex-row sm:items-center ${
                  left ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div
                  className={`w-full sm:w-[calc(50%-2rem)] ${
                    left ? 'sm:pr-4 sm:text-right' : 'sm:pl-4 sm:text-left'
                  }`}
                >
                  <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-colors hover:border-[#00DEFF]/30">
                    <div
                      className={`mb-2 flex items-center gap-2 ${
                        left ? 'sm:justify-end' : 'sm:justify-start'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00DEFF]/25 bg-[#00DEFF]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00DEFF]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00DEFF]" />
                        {m.status}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                      {m.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-sm font-light leading-relaxed text-neutral-400">
                      {m.text}
                    </p>
                  </div>
                </div>

                <div className="absolute left-8 top-6 z-10 flex -translate-x-1/2 items-center justify-center sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#00DEFF]/40 bg-[#050505] text-[#00DEFF] shadow-[0_0_24px_rgba(0,222,255,0.35)]">
                    <Icon size={18} />
                  </span>
                </div>

                <div
                  className={`ml-14 flex w-full items-center sm:ml-0 sm:w-[calc(50%-2rem)] ${
                    left ? 'sm:justify-start sm:pl-4' : 'sm:justify-end sm:pr-4'
                  }`}
                >
                  <span className="font-display text-4xl font-bold tracking-tight text-[#00DEFF] sm:text-5xl">
                    {m.year}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
