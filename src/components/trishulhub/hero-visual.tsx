'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion-safe'
import {
  Activity,
  ArrowUpRight,
  Bell,
  Cloud,
  Gauge,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react'

/**
 * HeroVisual — the animated product surface on the home hero.
 *
 * Deliberately dependency-free (no images, no video): SVG + CSS + Framer
 * Motion only, so it costs almost nothing to render but gives the hero real
 * motion. Pointer parallax is desktop-only and skipped for reduced motion.
 */

const KPIS = [
  { label: 'Uptime', value: 99, suffix: '.9%', icon: Activity },
  { label: 'Edge latency', value: 128, suffix: 'ms', icon: Zap },
  { label: 'Deploys / wk', value: 42, suffix: '', icon: Cloud },
] as const

const CHART_PATH =
  'M0,86 C26,74 44,96 70,78 C96,60 116,72 142,52 C168,32 190,44 216,26 C238,12 252,20 272,10'

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const reduce = useReducedMotionSafe()
  const [value, setValue] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce) return
    let raf = 0
    const start = performance.now()
    const duration = 1500
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, reduce])

  return (
    <span>
      {value}
      {suffix}
    </span>
  )
}

export function HeroVisual() {
  const reduce = useReducedMotionSafe()
  const ref = useRef<HTMLDivElement>(null)

  // Pointer parallax (desktop only)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), {
    stiffness: 120,
    damping: 20,
  })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 20,
  })

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType === 'touch') return
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    px.set((e.clientX - box.left) / box.width - 0.5)
    py.set((e.clientY - box.top) / box.height - 0.5)
  }

  function onLeave() {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-full max-w-[520px] [perspective:1400px]"
    >
      {/* Rotating conic ring behind the panel */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.5] blur-[46px] sm:h-[420px] sm:w-[420px]"
        style={{
          background:
            'conic-gradient(from 90deg, rgba(13,148,136,0.55), rgba(94,234,212,0.18), rgba(13,60,31,0.5), rgba(13,148,136,0.55))',
        }}
      />
      {/* Soft grid plate */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 rounded-[2rem] bg-[radial-gradient(#0d3c1f_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.07]"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Main dashboard surface */}
        <div className="relative overflow-hidden rounded-[1.6rem] border border-[#0d3c1f]/12 bg-white/85 p-4 shadow-[0_28px_70px_rgba(6,43,22,0.16)] backdrop-blur-xl sm:p-5">
          {/* Window chrome */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]/80" />
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-[#0d3c1f]/12 bg-white px-2.5 py-1 text-[10px] font-medium text-[#6b7280]">
                <Server size={10} />
                lhr1 · edge
              </span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                <motion.span
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                />
                live
              </span>
            </div>
          </div>

          {/* KPI row */}
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {KPIS.map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                  className="rounded-xl border border-[#0d3c1f]/10 bg-white/80 p-2.5"
                >
                  <span className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-wider text-[#6b7280]">
                    <Icon size={10} className="text-[#0d9488]" />
                    {kpi.label}
                  </span>
                  <p className="mt-1 text-[15px] font-bold text-[#111111] sm:text-lg">
                    <Counter to={kpi.value} suffix={kpi.suffix} />
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Animated throughput chart */}
          <div className="mt-3 overflow-hidden rounded-xl border border-[#0d3c1f]/10 bg-gradient-to-b from-[#f6fbf9] to-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-semibold text-[#111111]">
                Response time
              </span>
              <span className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600">
                <ArrowUpRight size={11} />
                18% faster
              </span>
            </div>

            <div className="relative mt-2 h-[104px] w-full">
              <svg
                viewBox="0 0 272 100"
                preserveAspectRatio="none"
                className="h-full w-full"
                aria-hidden
              >
                <defs>
                  <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d={`${CHART_PATH} L272,100 L0,100 Z`}
                  fill="url(#heroArea)"
                  opacity="0.9"
                />
                <motion.path
                  d={CHART_PATH}
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: [0, 1, 1], opacity: [0.4, 1, 0.85] }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: 'easeInOut',
                  }}
                />
                <circle r="4" fill="#0d9488">
                  <animateMotion dur="3.6s" repeatCount="indefinite" path={CHART_PATH} />
                </circle>
              </svg>
            </div>
          </div>

          {/* Footer chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-lg border border-[#0d3c1f]/10 bg-white px-2.5 py-1.5 text-[10.5px] font-medium text-[#374151]">
              <ShieldCheck size={11} className="text-[#0d9488]" />
              GDPR · EU/UK data
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-[#0d3c1f]/10 bg-white px-2.5 py-1.5 text-[10.5px] font-medium text-[#374151]">
              <Gauge size={11} className="text-[#0d9488]" />
              Lighthouse <Counter to={99} />
            </span>
          </div>
        </div>

        {/* Floating: notification card */}
        <motion.div
          initial={{ opacity: 0, y: 14, x: -8 }}
          animate={{ opacity: 1, y: [0, -8, 0], x: 0 }}
          transition={{
            opacity: { duration: 0.6, delay: 0.7 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -left-3 bottom-6 hidden w-[184px] rounded-2xl border border-[#0d3c1f]/12 bg-white/95 p-3 shadow-[0_18px_40px_rgba(6,43,22,0.16)] backdrop-blur-md sm:block lg:-left-10"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Bell size={14} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-[#111111]">
                New enquiry received
              </p>
              <p className="truncate text-[10px] text-[#6b7280]">
                Website · replied in 3h
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating: performance badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, 7, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.9 },
            scale: { duration: 0.5, delay: 0.9 },
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -right-2 -top-5 hidden items-center gap-2 rounded-2xl border border-[#0d3c1f]/12 bg-[#0D3C1F] px-3 py-2 text-white shadow-[0_18px_40px_rgba(6,43,22,0.3)] sm:flex lg:-right-8"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
            <motion.span
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-[#5eead4]"
            />
            <Zap size={13} className="relative" />
          </span>
          <div>
            <p className="text-[11px] font-bold leading-tight">
              <Counter to={99} />/100
            </p>
            <p className="text-[9.5px] leading-tight text-white/65">
              performance
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
