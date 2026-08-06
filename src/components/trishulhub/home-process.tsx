'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  FileScan,
  BrainCircuit,
  Cpu,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

type Step = {
  n: string
  title: string
  text: string
  icon: LucideIcon
  highlight?: boolean
  bars?: boolean
}

const steps: Step[] = [
  {
    n: '01',
    title: 'Discover the brief',
    text: 'We capture your goals, users, and constraints — website, software, or CRM — so scope is clear before a single screen is drawn.',
    icon: FileScan,
  },
  {
    n: '02',
    title: 'Architect the system',
    text: 'Flows, data models, and UI structure get mapped to how your team actually works. Progress stays visible as decisions lock in.',
    icon: BrainCircuit,
    bars: true,
  },
  {
    n: '03',
    title: 'Build & integrate',
    text: 'We develop the product, connect APIs and tools, and test against real workflows so launch day feels calm, not chaotic.',
    icon: Cpu,
  },
  {
    n: '04',
    title: 'Launch & refine',
    text: 'Ship to production, train your team, and keep iterating — so the system grows with the business, not against it.',
    icon: ShieldCheck,
    highlight: true,
  },
]

const EASE = EASE_OUT_EXPO

export function HomeProcess() {
  const reduce = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, amount: 0.25 })

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Soft static glow — no scroll-linked parallax (keeps scroll light) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#00DEFF]/[0.08] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <span className="mb-4 inline-block font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]">
            How we work
          </span>
          <AnimatedHeading
            as="h2"
            variant="rise"
            className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          >
            From idea to working product
          </AnimatedHeading>
          <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-neutral-400 sm:text-base">
            A clear four-step path from first conversation to a live system your
            team can run every day.
          </p>
        </div>

        <div ref={gridRef} className="relative">
          {/* Desktop connector line through icon centers (~28% from top of grid) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[28%] z-0 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block"
          />

          {/* Desktop pill loop under steps (first ↔ last) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[10%] bottom-0 top-[72%] z-0 hidden rounded-b-[999px] border-x border-b border-white/15 lg:block"
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, i) => (
              <WorkflowStep
                key={step.n}
                step={step}
                index={i}
                active={inView}
                reduce={!!reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkflowStep({
  step,
  index,
  active,
  reduce,
}: {
  step: Step
  index: number
  active: boolean
  reduce: boolean
}) {
  const Icon = step.icon
  const highlight = !!step.highlight

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      className={`group relative flex flex-col rounded-[24px] border p-6 backdrop-blur-md transition-colors sm:p-7 ${
        highlight
          ? 'border-[#00DEFF]/40 bg-[#00DEFF] text-[#0A0A0A] shadow-[0_0_40px_rgba(0,222,255,0.25)]'
          : 'border-white/10 bg-white/[0.03] text-white'
      }`}
    >
      {/* Icon circle */}
      <div
        className={`relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full border transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
          highlight
            ? 'border-black/15 bg-black/10 text-[#0A0A0A]'
            : 'border-[#00DEFF]/35 bg-[#00DEFF]/10 text-[#00DEFF]'
        }`}
      >
        <Icon size={22} strokeWidth={1.75} className="transition-transform duration-300 group-hover:scale-110" />
      </div>

      <div
        className={`mb-2 font-display text-xs font-semibold uppercase tracking-[0.22em] ${
          highlight ? 'text-black/50' : 'text-[#00DEFF]/70'
        }`}
      >
        Step {step.n}
      </div>

      <h3
        className={`font-display text-xl font-semibold tracking-tight ${
          highlight ? 'text-[#0A0A0A]' : 'text-white'
        }`}
      >
        {step.title}
      </h3>

      <p
        className={`mt-3 flex-1 font-sans text-sm leading-relaxed ${
          highlight ? 'text-black/70' : 'text-neutral-400'
        }`}
      >
        {step.text}
      </p>

      {step.bars ? <AnalysisBars active={active} reduce={reduce} /> : null}
    </motion.div>
  )
}

function AnalysisBars({
  active,
  reduce,
}: {
  active: boolean
  reduce: boolean
}) {
  const heights = [42, 68, 55, 88, 72]

  return (
    <div
      className="mt-6 flex h-16 items-end gap-1.5 rounded-xl border border-white/10 bg-black/30 px-3 py-2"
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="relative flex-1 overflow-hidden rounded-sm bg-[#00DEFF]/90"
          style={{ height: `${h}%`, transformOrigin: 'bottom' }}
          initial={reduce ? false : { scaleY: 0 }}
          animate={active ? { scaleY: 1 } : undefined}
          transition={{
            duration: 0.8,
            delay: 0.35 + i * 0.08,
            ease: EASE,
          }}
        >
          {/* Soft pulse on taller bars */}
          <span
            className="absolute inset-0 animate-pulse bg-white/25"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        </motion.div>
      ))}
    </div>
  )
}
