'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity, Gauge, Sparkles, Zap } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

const pipelines = [
  {
    name: 'Client Onboarding Flow',
    tag: 'Auto-Provisioned',
    pct: 98,
  },
  {
    name: 'Inventory Sync Engine',
    tag: 'Real-time Sync',
    pct: 89,
  },
]

const tickerItems = [
  'Client Growth: +156%',
  'ROI Delivered: 312%',
  'Efficiency Gain: 87%',
  'Quality Score: 97/100',
  'Dashboards Built: 50+',
  'Uptime: 99.9%',
  'Client Satisfaction: 98%',
  'Active Projects: 34',
]

export function HomeServices() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-120px] h-[600px] w-[600px] rounded-full bg-[#00DEFF]/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-[-160px] h-[800px] w-[800px] rounded-full bg-neutral-900/40 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-4 inline-block font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            Architected to Accelerate
          </motion.span>
          <AnimatedHeading
            as="h2"
            variant="rise"
            className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Your Visual Output
          </AnimatedHeading>
        </div>

        {/* Equal-height cards so bottom headings sit on one parallel row on desktop */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <AutomationCard />
          <ImpactCard />
        </div>
      </div>
    </section>
  )
}

function AutomationCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
      className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#00DEFF]/10 blur-3xl transition-opacity group-hover:opacity-100" />

      {/* Top heading — aligned with right card heading */}
      <div className="relative mb-6 flex min-h-[48px] items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
          <Gauge size={20} />
        </div>
        <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
          Automation Performance Metrics
        </h3>
      </div>

      <div className="relative flex-1 space-y-6">
        {pipelines.map((p, i) => (
          <PipelineRow key={p.name} {...p} active={inView} delay={i * 180} />
        ))}
      </div>

      {/* Bottom heading — parallel with Engineered for Impact */}
      <div className="relative mt-auto border-t border-white/10 pt-6">
        <div className="mb-2 flex min-h-[28px] items-center gap-2 text-[#00DEFF]">
          <Zap size={16} className="shrink-0" />
          <h4 className="font-display text-base font-semibold text-white">
            Intelligent Workflow Automation
          </h4>
        </div>
        <p className="min-h-[60px] font-sans text-sm leading-relaxed text-neutral-400">
          Monitor process efficiency, task completion, and system automation in
          real-time. We build custom engines that eliminate manual bottlenecks
          and reduce human error.
        </p>
      </div>
    </motion.div>
  )
}

function PipelineRow({
  name,
  tag,
  pct,
  active,
  delay = 0,
}: {
  name: string
  tag: string
  pct: number
  active: boolean
  delay?: number
}) {
  const [value, setValue] = useState(0)
  const [glow, setGlow] = useState(false)

  useEffect(() => {
    if (!active) return
    let raf = 0
    let start = 0
    const duration = 1400
    const timeout = window.setTimeout(() => {
      setGlow(true)
      start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(eased * pct))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [active, pct, delay])

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={active ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.45, delay: delay / 1000, ease: EASE_OUT_EXPO }}
      className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="font-sans text-sm font-medium text-white">{name}</div>
        <span className="rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/10 px-2.5 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider text-[#00DEFF]">
          {tag}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00DEFF] via-[#33E6FF] to-[#0088CC]"
            animate={
              glow
                ? {
                    width: `${value}%`,
                    boxShadow: [
                      '0 0 10px rgba(0,222,255,0.35)',
                      '0 0 22px rgba(0,222,255,0.7)',
                      '0 0 10px rgba(0,222,255,0.35)',
                    ],
                  }
                : { width: `${value}%`, boxShadow: '0 0 0 rgba(0,222,255,0)' }
            }
            transition={{
              width: { duration: 0.05 },
              boxShadow: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{ width: `${value}%` }}
          />
          {/* looping shimmer */}
          {glow && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              initial={{ left: '-30%' }}
              animate={{ left: '120%' }}
              transition={{
                duration: 1.8,
                delay: delay / 1000 + 0.2,
                repeat: Infinity,
                repeatDelay: 0.9,
                ease: 'easeInOut',
              }}
              style={{ width: '28%' }}
            />
          )}
        </div>
        <motion.div
          key={value}
          initial={{ scale: 0.85, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 text-right font-display text-base font-semibold tabular-nums text-[#00DEFF]"
        >
          {value}%
        </motion.div>
      </div>
    </motion.div>
  )
}

function ImpactCard() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    let y = 0
    const speed = 0.35
    const step = () => {
      y -= speed
      const half = track.scrollHeight / 2
      if (Math.abs(y) >= half) y = 0
      track.style.transform = `translateY(${y}px)`
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const loop = [...tickerItems, ...tickerItems]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
      className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -left-10 top-[-80px] h-56 w-56 rounded-full bg-[#0088CC]/15 blur-3xl transition-opacity group-hover:opacity-100" />

      {/* Top heading — same row height as left card */}
      <div className="relative mb-6 flex min-h-[48px] items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
          <Activity size={20} />
        </div>
        <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
          Modern, Tech-Forward
        </h3>
      </div>

      <div className="relative mb-6 min-h-[200px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[#111111] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-[#111111] to-transparent" />
        <div ref={trackRef} className="will-change-transform">
          {loop.map((item, i) => (
            <div
              key={`${item}-${i}`}
              className="flex items-center gap-3 border-b border-white/5 px-4 py-3 font-sans text-sm text-neutral-300"
            >
              <Sparkles size={14} className="shrink-0 text-[#00DEFF]" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom heading — same row structure as Intelligent Workflow Automation */}
      <div className="relative mt-auto border-t border-white/10 pt-6">
        <div className="mb-2 flex min-h-[28px] items-center gap-2 text-[#00DEFF]">
          <Sparkles size={16} className="shrink-0" />
          <h4 className="font-display text-base font-semibold text-white">
            Engineered for Impact
          </h4>
        </div>
        <p className="min-h-[60px] font-sans text-sm leading-relaxed text-neutral-400">
          We don&apos;t just build software; we accelerate business growth.
          Explore the measurable outcomes and operational excellence. Avg.
          Deployment: 15 days.
        </p>
      </div>
    </motion.div>
  )
}
