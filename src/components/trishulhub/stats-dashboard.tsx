'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { TrendingUp, Wallet, PieChart, Target, ArrowUpRight, Activity } from 'lucide-react'

/*
 * SSR/HYDRATION SAFETY
 * -------------------
 * All hooks below return `0` on the server AND during the very first client
 * render (before `useEffect` runs). This guarantees the server-rendered HTML
 * matches the client's initial hydrated HTML exactly — no "tree hydrated but
 * some attributes didn't match" errors.
 *
 * The `mounted` flag flips to `true` inside `useEffect`, and only then do we
 * kick off framer-motion `animate()` calls. This prevents any WeakMap-related
 * errors that can occur if framer-motion tries to register a value before the
 * client is fully mounted.
 */

/* ---------- Hook: looping count-up using framer-motion animate() ---------- */
function useLoopingNumber(target: number, duration: number, paused: boolean) {
  const [val, setVal] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Don't run animation until mounted AND not paused.
    // Returning early when !mounted guarantees identical SSR/initial-client render.
    if (!mounted || paused) {
      return
    }
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.7,
      repeatType: 'loop',
      onUpdate: (latest) => setVal(latest),
    })
    return () => controls.stop()
  }, [target, duration, paused, mounted])

  // When paused OR not yet mounted, return 0 (matches SSR output).
  return !mounted || paused ? 0 : val
}

/* ---------- Hook: looping multi-keyframe number (synced to bar keyframes) ----------
 * Animates through [0, 12, 48, 76, 100, 0] with the same timing as the
 * progress bar so the displayed % always matches the bar's actual width.
 *
 * Implementation note: we drive a simple 0→100 progress value via
 * `animate(from: number, to: number, options)` (the safest 3-arg form),
 * and map the progress fraction through the same keyframe stops & times
 * the motion.div bar uses. This avoids any ambiguity with array-as-second-arg
 * overloads and keeps the displayed value perfectly in sync with the bar.
 */
const GOAL_TIMES = [0, 0.18, 0.45, 0.7, 0.9, 1] as const
const GOAL_VALUES = [0, 12, 48, 76, 100, 0] as const
function goalPctFromProgress(p: number): number {
  // p ∈ [0, 1] → returns interpolated value from the keyframe tables.
  if (p <= GOAL_TIMES[0]) return GOAL_VALUES[0]
  if (p >= GOAL_TIMES[GOAL_TIMES.length - 1]) return GOAL_VALUES[GOAL_VALUES.length - 1]
  let i = 0
  while (i < GOAL_TIMES.length - 1 && p > GOAL_TIMES[i + 1]) i++
  const span = GOAL_TIMES[i + 1] - GOAL_TIMES[i]
  const localT = span === 0 ? 0 : (p - GOAL_TIMES[i]) / span
  return GOAL_VALUES[i] + (GOAL_VALUES[i + 1] - GOAL_VALUES[i]) * localT
}

function useLoopingGoalPercent(paused: boolean) {
  const [val, setVal] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || paused) {
      return
    }
    // Drive a 0→100 progress value, then map through the keyframe table.
    // This uses the simplest 3-arg `animate(from, to, options)` form which
    // cannot throw "Invalid value used as weak map key" (no array passed
    // as a subject/keyframe ambiguity).
    const controls = animate(0, 100, {
      duration: 5.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
      onUpdate: (latest) => setVal(goalPctFromProgress(latest / 100)),
    })
    return () => controls.stop()
  }, [paused, mounted])

  return !mounted || paused ? 0 : val
}

/* ---------- Formatters ---------- */
const fmtInt = (n: number) => Math.round(n).toLocaleString('en-US')
const fmtUsd = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const fmtK = (n: number) => '$' + (n / 1000).toFixed(1) + 'k'

/* ---------- Animated stat tile (top row) ---------- */
function StatTile({
  target,
  suffix,
  label,
  delay,
  inView,
}: {
  target: number
  suffix: string
  label: string
  delay: number
  inView: boolean
}) {
  const v = useLoopingNumber(target, 2.4, !inView)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
      />
      <div className="relative">
        <div className="text-4xl font-bold tabular-nums text-white sm:text-5xl md:text-6xl">
          {fmtInt(v)}
          <span className="text-[#00DEFF]">{suffix}</span>
        </div>
        <div className="mt-2 text-sm text-white/50 sm:text-base">{label}</div>
      </div>
    </motion.div>
  )
}

/* ---------- Looping equalizer chart bars ---------- */
const chartData = [35, 50, 42, 65, 58, 78, 70, 92, 85, 100, 88, 95]

function ChartBar({ base, index, inView }: { base: number; index: number; inView: boolean }) {
  return (
    <motion.div
      className="flex-1 rounded-t bg-gradient-to-t from-[#0088CC]/40 to-[#00DEFF]"
      initial={{ height: 0 }}
      animate={
        inView
          ? {
              height: [`${base * 0.4}%`, `${base}%`, `${base * 0.55}%`, `${base * 0.9}%`, `${base * 0.4}%`],
            }
          : { height: 0 }
      }
      transition={{
        height: {
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.12,
        },
      }}
    />
  )
}

export function StatsDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })

  // looping dashboard numbers
  const portfolio = useLoopingNumber(1250000, 3, !inView)
  const pct = useLoopingNumber(12.4, 2.6, !inView)
  const savings = useLoopingNumber(45200, 2.4, !inView)
  const investments = useLoopingNumber(82700, 2.8, !inView)
  const budget = useLoopingNumber(12100, 2.2, !inView)
  // Goal % syncs EXACTLY with the progress bar keyframes (0→12→48→76→100→0)
  const goalPct = useLoopingGoalPercent(!inView)

  const dashCards = [
    { label: 'Smart Savings', raw: savings, fmt: fmtK, icon: Wallet },
    { label: 'Investments', raw: investments, fmt: fmtK, icon: PieChart },
    { label: 'Budget Planner', raw: budget, fmt: fmtK, icon: Target },
  ]

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <StatTile target={170} suffix="+" label="Projects Delivered" delay={0} inView={inView} />
        <StatTile target={98} suffix="%" label="Client Satisfaction" delay={0.1} inView={inView} />
      </div>

      {/* Dashboard widget */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-1 sm:mt-8"
      >
        <div className="relative rounded-[22px] border border-white/5 bg-[#0A0A0A]/60 p-5 backdrop-blur-sm sm:p-8">
          {/* Live indicator */}
          <div className="pointer-events-none absolute right-5 top-5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#00DEFF]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00DEFF] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00DEFF]" />
            </span>
            Live
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00DEFF]/10 text-[#00DEFF]">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                  TH Dashboard
                </div>
                <div className="text-lg font-semibold text-white">Total Portfolio</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold tabular-nums text-white sm:text-4xl">
                {fmtUsd(portfolio)}
              </div>
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#00DEFF]/10 px-2 py-0.5 text-xs font-semibold text-[#00DEFF]"
              >
                <ArrowUpRight size={12} />
                +{pct.toFixed(1)}%
              </motion.div>
            </div>
          </div>

          {/* Sub label */}
          <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
            <span className="rounded-md border border-white/10 px-2 py-0.5">Analytics</span>
            <span>6 months</span>
            <Activity size={12} className="ml-1 text-[#00DEFF]" />
          </div>

          {/* Mini chart bars (looping equalizer) */}
          <div className="mt-6 flex h-24 items-end gap-2 sm:h-32">
            {chartData.map((h, i) => (
              <ChartBar key={i} base={h} index={i} inView={inView} />
            ))}
          </div>

          {/* Cards row */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {dashCards.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-[#00DEFF]/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00DEFF]/10 text-[#00DEFF]">
                      <Icon size={16} />
                    </div>
                  </div>
                  <div className="mt-4 text-2xl font-bold tabular-nums text-white">
                    {c.fmt(c.raw)}
                  </div>
                  <div className="mt-1 text-xs text-white/50">{c.label}</div>
                </motion.div>
              )
            })}
          </div>

          {/* Next goal — looping fill + reset */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Next Goal</span>
              <span className="font-semibold text-white">$10,000 target</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#00DEFF] to-[#0088CC]"
                style={{ boxShadow: '0 0 10px rgba(0,222,255,0.5)' }}
                initial={{ width: '0%' }}
                animate={inView ? { width: ['0%', '12%', '48%', '76%', '100%', '0%'] } : { width: '0%' }}
                transition={{
                  width: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.18, 0.45, 0.7, 0.9, 1] },
                }}
              />
            </div>
            <div className="mt-2 text-right text-xs tabular-nums text-[#00DEFF]">
              {Math.round(goalPct)}%
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/30">
          <span className="h-px w-8 bg-white/20" />
          Scroll
          <span className="h-px w-8 bg-white/20" />
        </div>
      </div>
    </section>
  )
}
