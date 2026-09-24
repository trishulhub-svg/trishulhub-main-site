'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
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
 * HomeIntelligences — "TrishulHub promise".
 *
 * Five commitment cards light up in sequence — one index + one interval drives
 * the whole thing, so the motion stays cheap. Hover/focus a card to park the
 * cycle on it. Desktop shows the same cards laid out horizontally (phones keep
 * the vertical stack the owner preferred).
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

          {/* ---------- Desktop: pipeline rail + cards ----------
              Same treatment as the "How we work" section: a rail that fills
              across the five stops with a travelling marker, then the cards. */}
          <div className="hidden md:block">
            <div aria-hidden className="relative mb-8 h-3">
              <div className="absolute inset-x-[10%] top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#0d3c1f]/12">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#5eead4]"
                  animate={{ width: `${(active / (PILLARS.length - 1)) * 100}%` }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                />
                {!reduce ? (
                  <motion.span
                    className="absolute -top-[3px] h-2 w-2 rounded-full bg-[#0d9488] shadow-[0_0_0_4px_rgba(13,148,136,0.18)]"
                    animate={{
                      left: `calc(${(active / (PILLARS.length - 1)) * 100}% - 4px)`,
                    }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  />
                ) : null}
              </div>
              <div className="relative grid grid-cols-5">
                {PILLARS.map((pillar, i) => (
                  <span key={pillar.name} className="flex justify-center">
                    <span
                      className={`h-3 w-3 rounded-full border-2 border-white shadow-sm transition-colors duration-300 ${
                        i <= active ? 'bg-[#0d9488]' : 'bg-[#d1d5db]'
                      }`}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-5">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon
              const isActive = i === active
              return (
                <motion.button
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
                  animate={{
                    y: isActive ? -4 : 0,
                    borderColor: isActive
                      ? 'rgba(13,60,31,0.5)'
                      : 'rgba(13,60,31,0.1)',
                    boxShadow: isActive
                      ? '0 16px 36px rgba(6,43,22,0.12)'
                      : '0 6px 18px rgba(6,43,22,0.04)',
                  }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className="flex h-full flex-col items-start rounded-2xl border bg-white/70 p-4 text-left"
                >
                  <span
                    className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                      isActive
                        ? 'border-[#0D3C1F] bg-[#0D3C1F] text-white'
                        : 'border-[#0d3c1f]/12 bg-white text-[#9ca3af]'
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.7} />
                    {/* Same "live pulse" the mobile rail uses, so the desktop
                        cards animate on their own instead of only changing
                        colour when the index moves. */}
                    {isActive && !reduce ? (
                      <motion.span
                        aria-hidden
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="absolute inset-0 rounded-xl border border-[#0d9488]"
                      />
                    ) : null}
                  </span>
                  <span
                    className={`mt-3 block text-[14px] font-bold ${
                      isActive ? 'text-[#0D3C1F]' : 'text-[#374151]'
                    }`}
                  >
                    {pillar.name}
                  </span>
                  <span className="mt-1.5 block text-[12.5px] leading-relaxed text-[#6b7280]">
                    {pillar.detail}
                  </span>
                  {/* Auto-advancing progress bar — the desktop counterpart of
                      the mobile vertical rail. */}
                  <span className="mt-auto block w-full pt-4">
                    <span className="block h-[3px] w-full overflow-hidden rounded-full bg-[#0d3c1f]/10">
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#5eead4]"
                        animate={{ width: isActive ? '100%' : '0%' }}
                        transition={{
                          duration: isActive ? STEP_MS / 1000 : 0.3,
                          ease: isActive ? 'linear' : 'easeOut',
                        }}
                      />
                    </span>
                  </span>
                </motion.button>
              )
            })}
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

        {/* Closing quote moved out of this section — it is now its own band
            between "What you can expect from us" and "Let's build something"
            (see src/app/page.tsx). */}
      </div>
    </section>
  )
}
