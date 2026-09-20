'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Cpu, Database, Send, Smartphone } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/lib/animations'

const STAGES = [
  {
    n: '01',
    label: 'Start',
    title: 'Your idea',
    text: 'Tell us what your business needs — we listen first.',
    icon: Database,
  },
  {
    n: '02',
    label: 'Shape',
    title: 'We design & build',
    text: 'Websites, software panels and mobile apps made for you.',
    icon: Cpu,
  },
  {
    n: '03',
    label: 'Choose',
    title: 'Three clear services',
    text: 'Software, websites and mobile apps — pick what you need.',
    icon: Smartphone,
  },
  {
    n: '04',
    label: 'Result',
    title: 'Ready to use',
    text: 'You get a clear product your team can use right away.',
    icon: Send,
  },
] as const

const STEP_MS = 2200

/**
 * HowWeWork — auto-advancing four-stage pipeline.
 *
 * One index drives everything (rail fill, node states, mobile progress), so
 * the "advanced" motion is one interval + CSS transitions rather than a pile
 * of bespoke animations. Hover/focus parks the loop on a stage; reduced-motion
 * users get a static, fully-visible diagram.
 */
export function HowWeWork() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % STAGES.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [reduce])

  const progress = reduce ? 100 : (active / (STAGES.length - 1)) * 100

  return (
    <div className="surface-card relative mt-14 overflow-hidden rounded-[2rem] border border-[#0d3c1f]/12 bg-white p-5 sm:p-8 lg:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0d3c1f_1px,transparent_1px)] [background-size:26px_26px] opacity-[0.05]"
      />

      <div className="relative mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="th-eyebrow">How we work</span>
          <p className="mt-2 text-2xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-3xl">
            From your idea to a{' '}
            <span className="accent-text">live product</span>
          </p>
        </div>
        <span className="flex items-center gap-2 text-[11px] font-medium text-[#6b7280]">
          <motion.span
            animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-[#0d9488]"
          />
          Stage {active + 1} of {STAGES.length}
        </span>
      </div>

      {/* ---------- Desktop pipeline ---------- */}
      <div className="relative hidden md:block">
        {/* Rail */}
        <div className="absolute left-[12.5%] right-[12.5%] top-[26px] h-[2px] rounded-full bg-[#0d3c1f]/12">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#5eead4]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          />
          {!reduce ? (
            <motion.span
              aria-hidden
              className="absolute -top-[3px] h-2 w-2 rounded-full bg-[#0d9488] shadow-[0_0_0_4px_rgba(13,148,136,0.18)]"
              animate={{ left: `calc(${progress}% - 4px)` }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            />
          ) : null}
        </div>

        <div className="grid grid-cols-4 gap-5">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon
            const isActive = i === active
            const isDone = i < active
            return (
              <div
                key={stage.n}
                onMouseEnter={() => {
                  paused.current = true
                  setActive(i)
                }}
                onMouseLeave={() => {
                  paused.current = false
                }}
                className="group flex flex-col items-center text-center"
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1.06 : 1,
                    boxShadow: isActive
                      ? '0 14px 34px rgba(13,60,31,0.22)'
                      : '0 6px 18px rgba(6,43,22,0.08)',
                  }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className={`relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border transition-colors duration-300 ${
                    isActive
                      ? 'border-[#0D3C1F] bg-[#0D3C1F] text-white'
                      : isDone
                        ? 'border-[#0d9488]/30 bg-[#e8f5ef] text-[#0D3C1F]'
                        : 'border-[#0d3c1f]/12 bg-white text-[#6b7280]'
                  }`}
                >
                  {isDone ? <Check size={18} /> : <Icon size={19} strokeWidth={1.7} />}
                  {isActive && !reduce ? (
                    <motion.span
                      aria-hidden
                      animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border border-[#0d9488]"
                    />
                  ) : null}
                </motion.span>

                <p
                  className={`mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                    isActive ? 'text-[#0D3C1F]' : 'text-[#9ca3af]'
                  }`}
                >
                  {stage.n} · {stage.label}
                </p>
                <h3 className="mt-1 text-[15px] font-bold text-[#111111]">
                  {stage.title}
                </h3>
                <p className="mt-2 max-w-[220px] text-[12.5px] leading-relaxed text-[#6b7280]">
                  {stage.text}
                </p>

                <span className="mt-4 h-[3px] w-10 overflow-hidden rounded-full bg-[#0d3c1f]/10">
                  <motion.span
                    className="block h-full rounded-full bg-[#0d9488]"
                    animate={{ width: isActive ? '100%' : isDone ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  />
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ---------- Mobile vertical pipeline ---------- */}
      <div className="relative md:hidden">
        <span
          aria-hidden
          className="absolute left-[25px] top-2 bottom-2 w-[2px] rounded-full bg-[#0d3c1f]/12"
        />
        <motion.span
          aria-hidden
          className="absolute left-[25px] top-2 w-[2px] rounded-full bg-gradient-to-b from-[#0d9488] to-[#5eead4]"
          animate={{ height: `${(active / (STAGES.length - 1)) * 88 + 4}%` }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        />

        <ul className="relative space-y-4">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon
            const isActive = i === active
            return (
              <li key={stage.n}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-[#0D3C1F]/35 bg-white shadow-[0_14px_34px_rgba(6,43,22,0.1)]'
                      : 'border-[#0d3c1f]/10 bg-white/70'
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border transition-colors ${
                      isActive
                        ? 'border-[#0D3C1F] bg-[#0D3C1F] text-white'
                        : 'border-[#0d3c1f]/12 bg-white text-[#6b7280]'
                    }`}
                  >
                    <Icon size={19} strokeWidth={1.7} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-[10px] font-semibold uppercase tracking-[0.2em] ${
                        isActive ? 'text-[#0D3C1F]' : 'text-[#9ca3af]'
                      }`}
                    >
                      {stage.n} · {stage.label}
                    </span>
                    <span className="mt-0.5 block text-[15px] font-bold text-[#111111]">
                      {stage.title}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-relaxed text-[#6b7280]">
                      {stage.text}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
