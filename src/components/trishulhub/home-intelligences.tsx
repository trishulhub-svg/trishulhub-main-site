'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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

const VB_W = 900
const VB_H = 400

type Pillar = { name: string; icon: LucideIcon; x: number }

const PILLARS: Pillar[] = [
  { name: 'Clear plans', icon: MessageCircle, x: 90 },
  { name: 'Quality work', icon: ShieldCheck, x: 270 },
  { name: 'On time', icon: Clock, x: 450 },
  { name: 'Real support', icon: HeartHandshake, x: 630 },
  { name: 'Built to grow', icon: TrendingUp, x: 810 },
]

const HUB_X = 450
const HUB_Y = 352
const HUB_TOP = HUB_Y - 34
const NODE_Y = 96
const STEP_MS = 1900

const PATHS = PILLARS.map((p) => ({
  name: p.name,
  d: `M${HUB_X} ${HUB_TOP} C ${HUB_X} ${HUB_TOP - 70}, ${HUB_X + (p.x - HUB_X) * 0.35} ${NODE_Y + 46}, ${p.x} ${NODE_Y}`,
}))

/**
 * HomeIntelligences — "signal relay" promise diagram.
 *
 * A single cycling index drives the whole visual: the hub emits a pulse, each
 * connector fills in turn, and the matching pillar lights up. Hovering a
 * pillar parks the relay so people can read it. Reduced motion = fully static.
 */
export function HomeIntelligences() {
  const reduce = useReducedMotion()
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

        {/* ---------- Desktop relay ---------- */}
        <div className="relative mx-auto mt-14 hidden w-full max-w-5xl md:block">
          <div className="relative aspect-[900/400] w-full">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="promise-beam" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.85" />
                </linearGradient>
              </defs>

              {/* Dotted ring around the hub */}
              <motion.circle
                cx={HUB_X}
                cy={HUB_Y}
                r="58"
                stroke="#0d9488"
                strokeOpacity="0.25"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: `${HUB_X}px ${HUB_Y}px` }}
              />

              {/* Connectors — each fills when its pillar is active */}
              {PATHS.map((p, i) => {
                const lit = i <= active
                const isActive = i === active
                return (
                  <g key={p.name}>
                    <path
                      d={p.d}
                      stroke="#0d3c1f"
                      strokeOpacity="0.12"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <motion.path
                      d={p.d}
                      stroke="url(#promise-beam)"
                      strokeWidth={isActive ? 3 : 2}
                      strokeLinecap="round"
                      initial={false}
                      animate={{ pathLength: lit ? 1 : 0, opacity: lit ? 1 : 0 }}
                      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                    />
                    {!reduce && isActive ? (
                      <circle r="4" fill="#5eead4">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path={p.d} />
                      </circle>
                    ) : null}
                  </g>
                )
              })}
            </svg>

            {/* Pillars */}
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon
              const isActive = i === active
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
                  className="absolute z-10 flex -translate-x-1/2 flex-col items-center"
                  style={{
                    left: `${(pillar.x / VB_W) * 100}%`,
                    top: `${(NODE_Y / VB_H) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.08 : 1,
                      borderColor: isActive ? '#0D3C1F' : 'rgba(13,60,31,0.12)',
                    }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    className={`relative flex h-[68px] w-[68px] items-center justify-center rounded-2xl border bg-white shadow-[0_10px_30px_rgba(6,43,22,0.08)] transition-colors duration-300 ${
                      isActive ? 'text-[#0D3C1F]' : 'text-[#9ca3af]'
                    }`}
                  >
                    <Icon size={26} strokeWidth={1.6} />
                    {isActive && !reduce ? (
                      <motion.span
                        aria-hidden
                        animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl border border-[#0d9488]"
                      />
                    ) : null}
                  </motion.span>
                  <span
                    className={`mt-2 text-[11.5px] font-medium transition-colors ${
                      isActive ? 'text-[#0D3C1F]' : 'text-muted-foreground'
                    }`}
                  >
                    {pillar.name}
                  </span>
                </button>
              )
            })}

            {/* Hub */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(HUB_X / VB_W) * 100}%`,
                top: `${(HUB_Y / VB_H) * 100}%`,
              }}
            >
              <span className="relative flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-2xl border border-[#0D3C1F]/15 bg-white shadow-[0_14px_36px_rgba(6,43,22,0.12)]">
                <motion.span
                  aria-hidden
                  animate={reduce ? undefined : { scale: [1, 1.35, 1], opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-2 rounded-full bg-[#0d9488]/25 blur-md"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/trishulhub-logo.png"
                  alt="TrishulHub"
                  width={74}
                  height={74}
                  className="relative z-10 h-[92%] w-[92%] translate-x-[3%] translate-y-[3.5%] object-contain object-center"
                />
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Mobile relay ---------- */}
        <ul className="relative mx-auto mt-12 max-w-md space-y-3 md:hidden">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            const isActive = i === active
            return (
              <li key={pillar.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-[#0D3C1F]/35 bg-white shadow-[0_12px_30px_rgba(6,43,22,0.09)]'
                      : 'border-[#0d3c1f]/10 bg-white/70'
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                      isActive
                        ? 'border-[#0D3C1F] bg-[#0D3C1F] text-white'
                        : 'border-[#0d3c1f]/12 bg-white text-[#9ca3af]'
                    }`}
                  >
                    <Icon size={19} strokeWidth={1.7} />
                  </span>
                  <span
                    className={`text-[14px] font-semibold ${
                      isActive ? 'text-[#0D3C1F]' : 'text-[#374151]'
                    }`}
                  >
                    {pillar.name}
                  </span>
                  <span className="ml-auto h-[3px] w-12 overflow-hidden rounded-full bg-[#0d3c1f]/10">
                    <motion.span
                      className="block h-full rounded-full bg-[#0d9488]"
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

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
