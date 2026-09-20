'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion-safe'
import {
  Clock,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { HeroAccentWord } from './hero-accent-word'
import { EASE_OUT_EXPO } from '@/lib/animations'

type Pillar = { name: string; icon: LucideIcon; detail: string }

const PILLARS: Pillar[] = [
  {
    name: 'Clear plans',
    icon: MessageCircle,
    detail: 'Fixed scope, fixed price, plain English — you always know what is next.',
  },
  {
    name: 'Quality work',
    icon: ShieldCheck,
    detail: 'Clean, reviewed code with tested paths before anything reaches your users.',
  },
  {
    name: 'On time',
    icon: Clock,
    detail: 'Milestones agreed up front and hit in order, with weekly visibility.',
  },
  {
    name: 'Real support',
    icon: HeartHandshake,
    detail: 'A direct line to the people who built it — not a ticket queue.',
  },
  {
    name: 'Built to grow',
    icon: TrendingUp,
    detail: 'Simple to extend when your customers, team or data volumes grow.',
  },
]

const STEP_MS = 2600

/**
 * HomeIntelligences — "TrishulHub promise" signal rail.
 *
 * One travelling hub walks a five-stop rail; the stop it reaches lights up and
 * its commitment fades in underneath. One index + one interval drives the whole
 * thing, so the motion stays cheap. Hover/tap a stop to park the hub on it;
 * reduced motion renders the rail statically with every commitment listed.
 */
export function HomeIntelligences() {
  const reduce = useReducedMotionSafe()
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % PILLARS.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [reduce])

  const travel = (active / (PILLARS.length - 1)) * 100

  return (
    <section className="relative overflow-hidden lt-section">
      <div className="lt-glow pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 opacity-40" />

      <div className="relative mx-auto lt-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="th-eyebrow">
            <HeartHandshake className="h-3.5 w-3.5 text-[#0d9488]" />
            The TrishulHub promise
          </span>
          <h2 className="text-balance mt-6 text-4xl font-bold uppercase tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl">
            What you can{' '}
            <HeroAccentWord words="expect from us" animate={false} />
          </h2>
          <p className="text-pretty mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            No jargon, no hidden steps — just a clear, friendly way of working
            that puts your business first.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-[#0d3c1f]/12 bg-white p-6 shadow-[0_18px_50px_rgba(6,43,22,0.07)] sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0d3c1f_1px,transparent_1px)] [background-size:26px_26px] opacity-[0.05]"
          />

          {/* ---------- Desktop rail ---------- */}
          <div className="relative hidden md:block">
            <div className="relative h-[112px]">
              {/* Rail */}
              <div className="absolute left-[10%] right-[10%] top-[38px] h-[2px] rounded-full bg-[#0d3c1f]/12">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#5eead4]"
                  animate={{ width: `${travel}%` }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                />
              </div>

              {/* Travelling hub */}
              <motion.div
                aria-hidden
                animate={{ left: `calc(10% + (80% * ${active / (PILLARS.length - 1)}))` }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="absolute top-[38px] z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-[#0D3C1F]/20 bg-white shadow-[0_12px_30px_rgba(6,43,22,0.18)]">
                  <motion.span
                    animate={reduce ? undefined : { scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl border border-[#0d9488]"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/trishulhub-logo.png"
                    alt="TrishulHub"
                    width={48}
                    height={48}
                    className="relative z-10 h-[86%] w-[86%] translate-x-[3%] translate-y-[3.5%] object-contain object-center"
                  />
                </span>
              </motion.div>

              {/* Stops */}
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon
                const isActive = i === active
                const isDone = i < active
                return (
                  <button
                    key={pillar.name}
                    type="button"
                    onMouseEnter={() => {
                      paused.current = true
                      setActive(i)
                    }}
                    onMouseLeave={() => {
                      paused.current = false
                    }}
                    onFocus={() => {
                      paused.current = true
                      setActive(i)
                    }}
                    onBlur={() => {
                      paused.current = false
                    }}
                    className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
                    style={{ left: `${10 + (80 * i) / (PILLARS.length - 1)}%` }}
                  >
                    <motion.span
                      animate={{
                        scale: isActive ? 1.08 : 1,
                        borderColor: isActive
                          ? 'rgba(13,60,31,0.55)'
                          : 'rgba(13,60,31,0.12)',
                        backgroundColor: isActive
                          ? '#ffffff'
                          : isDone
                            ? '#e8f5ef'
                            : '#ffffff',
                      }}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      className={`relative flex h-[76px] w-[76px] items-center justify-center rounded-2xl border shadow-[0_10px_28px_rgba(6,43,22,0.07)] ${
                        isActive ? 'text-[#0D3C1F]' : 'text-[#9ca3af]'
                      }`}
                    >
                      <Icon size={28} strokeWidth={1.55} />
                    </motion.span>
                    <span
                      className={`mt-3 text-[12.5px] font-semibold transition-colors ${
                        isActive ? 'text-[#0D3C1F]' : 'text-[#6b7280]'
                      }`}
                    >
                      {pillar.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Commitment detail */}
            <div className="mt-6 flex min-h-[64px] items-center justify-center rounded-2xl border border-[#0d3c1f]/10 bg-[#f7fbf9] px-6 py-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={PILLARS[active].name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                  className="max-w-3xl text-center text-[14.5px] leading-relaxed text-[#374151]"
                >
                  <span className="font-semibold text-[#0D3C1F]">
                    {PILLARS[active].name}:
                  </span>{' '}
                  {PILLARS[active].detail}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* ---------- Mobile: vertical rail ---------- */}
          <div className="relative md:hidden">
            <span
              aria-hidden
              className="absolute left-[26px] top-3 bottom-3 w-[2px] rounded-full bg-[#0d3c1f]/12"
            />
            <motion.span
              aria-hidden
              className="absolute left-[26px] top-3 w-[2px] rounded-full bg-gradient-to-b from-[#0d9488] to-[#5eead4]"
              animate={{ height: `${(active / (PILLARS.length - 1)) * 86 + 5}%` }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            />
            <ul className="relative space-y-3">
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon
                const isActive = i === active
                return (
                  <li key={pillar.name}>
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
                            : 'border-[#0d3c1f]/12 bg-white text-[#9ca3af]'
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-[14px] font-bold ${
                            isActive ? 'text-[#0D3C1F]' : 'text-[#374151]'
                          }`}
                        >
                          {pillar.name}
                        </span>
                        <span className="mt-1 block text-[12.5px] leading-relaxed text-[#6b7280]">
                          {pillar.detail}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Closing chips */}
        <div className="mx-auto mt-12 max-w-3xl sm:mt-14">
          <div className="flex flex-nowrap items-center justify-center gap-2 whitespace-nowrap text-[11px] sm:gap-5 sm:text-base">
            <div className="inline-flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#0d9488] sm:h-5 sm:w-5" />
              <span className="font-display font-medium text-foreground">
                Plain English updates
              </span>
            </div>
            <div className="h-px w-6 shrink-0 border-t border-dashed border-[#0d9488]/30 sm:w-28" />
            <div className="inline-flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#0d9488] sm:h-5 sm:w-5" />
              <span className="font-display font-medium text-foreground">
                Work you can trust
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
