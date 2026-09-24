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

          {/* ---------- Desktop: same cards as mobile, laid out horizontally ---------- */}
          <div className="hidden gap-3 md:grid md:grid-cols-5">
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
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                      isActive
                        ? 'border-[#0D3C1F] bg-[#0D3C1F] text-white'
                        : 'border-[#0d3c1f]/12 bg-white text-[#9ca3af]'
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.7} />
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
                </motion.button>
              )
            })}
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

        {/* Closing quote — the first chip was removed on request and replaced
            with a line about technology and quality. */}
        <div className="mx-auto mt-12 max-w-3xl sm:mt-14">
          <p className="text-balance text-center font-playfair text-lg italic leading-relaxed text-foreground sm:text-xl">
            “Quality is never an accident in technology — it is what happens
            when engineering, AI and craft are held to the same standard.”
          </p>
          <p className="mt-3 text-center text-xs uppercase tracking-[0.16em] text-[#6b7280]">
            TrishulHub — engineering, AI and quality
          </p>
        </div>
      </div>
    </section>
  )
}
