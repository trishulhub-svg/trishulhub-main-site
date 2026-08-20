'use client'

import { motion } from 'framer-motion'
import {
  MessageCircle,
  ShieldCheck,
  Clock,
  HeartHandshake,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { HeroAccentWord } from './hero-accent-word'
import { EASE_OUT_EXPO } from '@/lib/animations'

const VB_W = 900
const VB_H = 420

type Pillar = {
  name: string
  icon: LucideIcon
  x: number
}

const pillars: Pillar[] = [
  { name: 'Clear plans', icon: MessageCircle, x: 90 },
  { name: 'Quality work', icon: ShieldCheck, x: 270 },
  { name: 'On time', icon: Clock, x: 450 },
  { name: 'Real support', icon: HeartHandshake, x: 630 },
  { name: 'Built to grow', icon: TrendingUp, x: 810 },
]

const HUB_X = 450
const HUB_Y = 380
const HUB_TOP = HUB_Y - 40
const LINE_END_Y = 118

const paths = pillars.map((item) => {
  const endX = item.x
  const midX = HUB_X + (endX - HUB_X) * 0.35
  return {
    d: `M${HUB_X} ${HUB_TOP} C ${HUB_X} ${HUB_TOP - 70}, ${midX} ${LINE_END_Y + 40}, ${endX} ${LINE_END_Y}`,
    len: 360 + Math.abs(endX - HUB_X) * 0.3,
  }
})

export function HomeIntelligences() {
  return (
    <section className="relative overflow-hidden lt-section bg-[#fafafa]">
      <div className="lt-glow pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 opacity-50" />

      <div className="relative mx-auto lt-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6b7280]">
            <HeartHandshake className="h-3.5 w-3.5 text-[#0d9488]" />
            The TrishulHub promise
          </span>

          <h2 className="mt-5 text-4xl font-bold uppercase tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl">
            What you can <HeroAccentWord words="expect from us" />
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            No jargon, no hidden steps — just a clear, friendly way of working
            that puts your business first.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md md:hidden">
          <div className="flex justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-[#111111] bg-white shadow-[0_12px_40px_rgba(11,18,32,0.08)]"
            >
              <span
                aria-hidden
                className="intel-hub-pulse pointer-events-none absolute inset-[-20%] rounded-full bg-[#0d9488]/25 blur-md"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/trishulhub-logo.png"
                alt="TrishulHub"
                width={80}
                height={80}
                className="relative z-10 h-[72%] w-[72%] object-contain object-center"
              />
            </motion.span>
          </div>

          <div className="relative mx-auto my-3 flex h-10 justify-center" aria-hidden>
            <svg width="8" height="40" className="overflow-visible">
              <line
                x1="4"
                y1="0"
                x2="4"
                y2="40"
                stroke="#0d9488"
                strokeWidth="2"
                strokeDasharray="5 5"
                className="animate-flow"
                opacity="0.8"
              />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {pillars.slice(0, 3).map((item, i) => (
              <PillarTile key={item.name} item={item} delay={i * 0.06} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 px-8">
            {pillars.slice(3).map((item, i) => (
              <PillarTile key={item.name} item={item} delay={(i + 3) * 0.06} />
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-14 hidden w-full max-w-5xl md:mt-16 md:block">
          <div className="relative aspect-[900/420] w-full">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              {paths.map((p, i) => (
                <path
                  key={p.d}
                  d={p.d}
                  stroke="#0d9488"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  fill="none"
                  className="intel-line-shake"
                  style={{
                    strokeDasharray: p.len,
                    strokeDashoffset: p.len,
                    animationDelay: `${i * 0.18}s`,
                    ['--intel-dash' as string]: String(p.len),
                  }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values={`${p.len};0;${p.len}`}
                    dur="3.2s"
                    begin={`${i * 0.18}s`}
                    repeatCount="indefinite"
                  />
                </path>
              ))}
            </svg>

            {pillars.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="absolute z-10 flex -translate-x-1/2 flex-col items-center"
                  style={{
                    left: `${(item.x / VB_W) * 100}%`,
                    top: 0,
                  }}
                >
                  <span
                    className="intel-icon-shake inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#111111] bg-white text-[#0d9488] shadow-[0_10px_30px_rgba(11,18,32,0.08)] sm:h-20 sm:w-20"
                    style={{ animationDelay: `${i * 0.22}s` }}
                  >
                    <Icon size={28} strokeWidth={1.75} />
                  </span>
                  <span className="relative z-20 mt-1.5 font-sans text-[11px] text-muted-foreground">
                    {item.name}
                  </span>
                </motion.div>
              )
            })}

            <div
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{
                left: `${(HUB_X / VB_W) * 100}%`,
                top: `${(HUB_Y / VB_H) * 100}%`,
              }}
            >
              <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#111111] bg-white shadow-md sm:h-20 sm:w-20">
                <span
                  aria-hidden
                  className="intel-hub-pulse pointer-events-none absolute inset-[-20%] rounded-full bg-[#0d9488]/25 blur-md"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/trishulhub-logo.png"
                  alt="TrishulHub"
                  width={80}
                  height={80}
                  className="relative z-10 h-[72%] w-[72%] object-contain object-center"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl sm:mt-16">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm sm:gap-5 sm:text-base">
            <div className="inline-flex items-center gap-2.5">
              <MessageCircle className="h-5 w-5 text-[#0d9488]" />
              <span className="font-display font-medium text-foreground">
                Plain English updates
              </span>
            </div>
            <div className="h-px w-16 border-t border-dashed border-[#0d9488]/30 sm:w-28" />
            <div className="inline-flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-[#0d9488]" />
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

function PillarTile({ item, delay }: { item: Pillar; delay: number }) {
  const Icon = item.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay, ease: EASE_OUT_EXPO }}
      className="flex flex-col items-center rounded-2xl border border-[#111111] bg-white/90 px-3 py-4 shadow-sm"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#e8f4f3] text-[#0d9488]">
        <Icon size={24} strokeWidth={1.75} />
      </span>
      <span className="mt-2 text-center font-sans text-[11px] text-muted-foreground">
        {item.name}
      </span>
    </motion.div>
  )
}
