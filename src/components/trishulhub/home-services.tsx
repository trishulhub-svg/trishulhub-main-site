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
      {/* Ambient blobs — cyan theme */}
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

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <AutomationCard />
          <ImpactCard />
        </div>
      </div>
    </section>
  )
}

function AutomationCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.25 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#00DEFF]/10 blur-3xl transition-opacity group-hover:opacity-100" />

      <div className="relative mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
          <Gauge size={20} />
        </div>
        <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
          Automation Performance Metrics
        </h3>
      </div>

      <div className="relative space-y-5">
        {pipelines.map((p, i) => (
          <PipelineRow
            key={p.name}
            {...p}
            active={inView}
            delayMs={i * 180}
          />
        ))}
      </div>

      <div className="relative mt-8 border-t border-white/10 pt-6">
        <div className="mb-2 flex items-center gap-2 text-[#00DEFF]">
          <Zap size={16} />
          <h4 className="font-display text-base font-semibold text-white">
            Intelligent Workflow Automation
          </h4>
        </div>
        <p className="font-sans text-sm leading-relaxed text-neutral-400">
          Monitor process efficiency, task completion, and system automation in
          real-time. We build custom engines that eliminate manual bottlenecks,
          reduce human error.
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
  delayMs = 0,
}: {
  name: string
  tag: string
  pct: number
  active: boolean
  delayMs?: number
}) {
  const [value, setValue] = useState(0)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    if (reduceMotion) {
      setValue(pct)
      return
    }

    let raf = 0
    let timeout = 0
    let cancelled = false
    const fillMs = 1400
    const holdMs = 900
    const resetMs = 450

    const runCycle = () => {
      if (cancelled) return
      const start = performance.now()
      const tick = (now: number) => {
        if (cancelled) return
        const t = Math.min(1, (now - start) / fillMs)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(eased * pct))
        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          timeout = window.setTimeout(() => {
            if (cancelled) return
            // Soft reset, then loop
            const resetStart = performance.now()
            const resetTick = (rNow: number) => {
              if (cancelled) return
              const rt = Math.min(1, (rNow - resetStart) / resetMs)
              setValue(Math.round(pct * (1 - rt)))
              if (rt < 1) {
                raf = requestAnimationFrame(resetTick)
              } else {
                timeout = window.setTimeout(runCycle, 120)
              }
            }
            raf = requestAnimationFrame(resetTick)
          }, holdMs)
        }
      }
      raf = requestAnimationFrame(tick)
    }

    timeout = window.setTimeout(runCycle, delayMs)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.clearTimeout(timeout)
    }
  }, [active, pct, delayMs, reduceMotion])

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="font-sans text-sm font-medium text-white">{name}</div>
        <span className="rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/10 px-2.5 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider text-[#00DEFF]">
          {tag}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00DEFF] to-[#0088CC] transition-[width] duration-75 ease-out"
            style={{ width: `${value}%` }}
          />
        </div>
        <div className="w-10 text-right font-display text-sm font-semibold tabular-nums text-[#00DEFF]">
          {value}%
        </div>
      </div>
    </div>
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
      className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -left-10 top-[-80px] h-56 w-56 rounded-full bg-[#0088CC]/15 blur-3xl transition-opacity group-hover:opacity-100" />

      <div className="relative mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
          <Activity size={20} />
        </div>
        <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
          Modern, Tech-Forward
        </h3>
      </div>

      {/* Infinite vertical ticker */}
      <div className="relative mb-6 h-48 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
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

      <div className="relative mt-auto border-t border-white/10 pt-6">
        <h4 className="font-display text-base font-semibold text-white">
          Engineered for Impact
        </h4>
        <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-400">
          We don&apos;t just build software; we accelerate business growth.
          Explore the measurable outcomes and operational excellence Avg.
          Deployment: 15 days
        </p>
      </div>
    </motion.div>
  )
}
