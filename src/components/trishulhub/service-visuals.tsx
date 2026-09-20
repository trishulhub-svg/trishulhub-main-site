'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion-safe'
import {
  BatteryFull,
  Bell,
  Cloud,
  CreditCard,
  Database,
  FileBarChart,
  Globe,
  LayoutDashboard,
  Lock,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

const LOOP = { duration: 4.2, repeat: Infinity, ease: 'easeInOut' } as const

function Glow({ className = '', color = '#10b981' }: { className?: string; color?: string }) {
  return (
    <motion.div
      aria-hidden
      animate={{ scale: [1, 1.22, 1], opacity: [0.28, 0.55, 0.28] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: color }}
    />
  )
}

/** Small counter that ticks up to `to` whenever the card scrolls into view. */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const reduce = useReducedMotionSafe()
  const [value, setValue] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce) return
    let raf = 0
    const start = performance.now()
    const duration = 1400
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      // ease-out cubic
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

function VisualShell({
  children,
  tint,
  caption,
  className = '',
}: {
  children: React.ReactNode
  tint: string
  caption: string
  className?: string
}) {
  return (
    <div
      className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:aspect-[16/11] lg:aspect-[4/3.4] lg:min-h-[268px] ${className}`}
      style={{ background: tint }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:15px_15px] opacity-[0.09]"
      />
      <div className="relative z-10 flex w-full flex-col items-center">
        {children}
        <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-white/70">
          {caption}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 01 — Mobile app                                                     */
/* ------------------------------------------------------------------ */

const APP_ROWS = [
  { icon: ShoppingBag, label: 'Orders', value: '1,284', pct: 82 },
  { icon: Users, label: 'Customers', value: '436', pct: 64 },
  { icon: TrendingUp, label: 'Revenue', value: '£18.4k', pct: 91 },
] as const

function MobileAppVisual() {
  return (
    <VisualShell
      tint="linear-gradient(160deg,#0b3b22 0%,#082e1a 45%,#04160d 100%)"
      caption="Native-feel UI · push alerts · offline-first"
    >
      <Glow className="-right-10 -top-12 h-40 w-40" color="rgba(16,185,129,0.75)" />
      <Glow className="-bottom-14 -left-12 h-40 w-40" color="rgba(94,234,212,0.45)" />

      <div className="relative mt-1 w-full max-w-[196px]">
        {/* Floating push notification */}
        <motion.div
          animate={{ y: [0, -6, 0], opacity: [0.85, 1, 0.85] }}
          transition={{ ...LOOP, duration: 3.6 }}
          className="th-keep-light absolute -top-5 right-[-26px] z-20 hidden w-[148px] rounded-xl border border-white/20 bg-white/95 p-2.5 shadow-[0_14px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:block"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600">
              <Bell size={12} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold text-[#0b3b22]">
                New order received
              </p>
              <p className="truncate text-[9px] text-[#6b7280]">
                #4821 · £249.00
              </p>
            </div>
          </div>
        </motion.div>

        {/* Phone body */}
        <div className="relative mx-auto w-[176px] rounded-[1.9rem] border border-white/25 bg-[#05100a] p-1.5 shadow-[0_26px_60px_rgba(0,0,0,0.5)]">
          <span className="absolute -left-[3px] top-16 h-8 w-[3px] rounded-l bg-white/20" />
          <span className="absolute -right-[3px] top-24 h-12 w-[3px] rounded-r bg-white/20" />

          <div className="relative overflow-hidden rounded-[1.55rem] bg-[#0a1a12]">
            {/* Status bar */}
            <div className="flex items-center justify-between px-3 pt-2 text-[8px] text-white/70">
              <span className="font-semibold">09:41</span>
              <span className="h-4 w-12 rounded-full bg-black/80" />
              <span className="flex items-center gap-1">
                <Wifi size={8} />
                <BatteryFull size={9} />
              </span>
            </div>

            {/* Screen content */}
            <div className="px-3 pb-3 pt-2.5">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={LOOP}
                className="rounded-xl bg-gradient-to-br from-emerald-500/25 to-emerald-500/5 p-2.5"
              >
                <p className="text-[8px] uppercase tracking-wider text-emerald-300">
                  This month
                </p>
                <p className="mt-0.5 text-[15px] font-bold text-white">
                  £<Counter to={18} suffix=".4k" />
                </p>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    animate={{ width: ['35%', '88%', '35%'] }}
                    transition={{ ...LOOP, duration: 5 }}
                    className="h-full rounded-full bg-emerald-400"
                  />
                </div>
              </motion.div>

              <div className="mt-2 space-y-1.5">
                {APP_ROWS.map((row, i) => {
                  const Icon = row.icon
                  return (
                    <motion.div
                      key={row.label}
                      animate={{ x: [0, 2, 0] }}
                      transition={{ ...LOOP, duration: 3.2, delay: i * 0.35 }}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1.5"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-emerald-300">
                        <Icon size={10} />
                      </span>
                      <span className="flex-1 text-[9px] text-white/75">
                        {row.label}
                      </span>
                      <span className="text-[9px] font-semibold text-white">
                        {row.value}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Tab bar with travelling active dot */}
              <div className="relative mt-2.5 flex items-center justify-around rounded-lg bg-white/[0.06] py-1.5">
                <Globe size={11} className="text-white/40" />
                <LayoutDashboard size={11} className="text-emerald-300" />
                <Bell size={11} className="text-white/40" />
                <motion.span
                  animate={{ x: [-19, 0, 19, 0, -19] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-0.5 h-[3px] w-4 rounded-full bg-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  )
}

/* ------------------------------------------------------------------ */
/* 02 — Website                                                        */
/* ------------------------------------------------------------------ */

function WebsiteVisual() {
  return (
    <VisualShell
      tint="linear-gradient(160deg,#0d2c40 0%,#0a2233 45%,#06141f 100%)"
      caption="Core Web Vitals in the green · edge cached"
    >
      <Glow className="-left-12 -bottom-12 h-40 w-40" color="rgba(56,189,248,0.6)" />
      <Glow className="-right-10 -top-10 h-36 w-36" color="rgba(94,234,212,0.45)" />

      <div className="relative w-full max-w-[262px] rounded-xl border border-white/20 bg-[#061620]/90 shadow-[0_24px_54px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <div className="ml-1.5 flex flex-1 items-center gap-1.5 rounded-md bg-white/10 px-2 py-[3px]">
            <Lock size={8} className="text-emerald-300" />
            <span className="text-[8px] text-white/75">trishulhub.com</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              className="ml-auto h-2.5 w-[1.5px] bg-emerald-300"
            />
          </div>
        </div>

        <div className="p-2.5">
          {/* Hero block with shimmer sweep */}
          <div className="relative overflow-hidden rounded-lg bg-white/[0.06] p-2.5">
            <motion.div
              animate={{ x: ['-120%', '160%'] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent"
            />
            <div className="h-1.5 w-24 rounded-full bg-white/40" />
            <div className="mt-1.5 h-1.5 w-16 rounded-full bg-white/20" />
            <div className="mt-2 flex items-center gap-1.5">
              <span className="rounded bg-sky-400/80 px-1.5 py-[2px] text-[7px] font-semibold text-[#06141f]">
                Get a quote
              </span>
              <span className="rounded border border-white/20 px-1.5 py-[2px] text-[7px] text-white/70">
                See work
              </span>
            </div>
          </div>

          {/* Card grid staggering in */}
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ ...LOOP, duration: 3.2, delay: i * 0.4 }}
                className="rounded-md border border-white/10 bg-white/[0.05] p-1.5"
              >
                <div className="h-4 w-4 rounded bg-sky-400/25" />
                <div className="mt-1 h-1 w-full rounded-full bg-white/25" />
                <div className="mt-1 h-1 w-2/3 rounded-full bg-white/15" />
              </motion.div>
            ))}
          </div>

          {/* Speed + accessibility badges */}
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex flex-1 items-center gap-1.5 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-1">
              <Zap size={9} className="text-emerald-300" />
              <span className="text-[8px] font-semibold text-emerald-200">
                <Counter to={99} /> / 100
              </span>
              <motion.span
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-300"
              />
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.05] px-2 py-1">
              <Search size={9} className="text-sky-300" />
              <span className="text-[8px] text-white/70">SEO ready</span>
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  )
}

/* ------------------------------------------------------------------ */
/* 03 — Custom software                                                */
/* ------------------------------------------------------------------ */

const CHART = [38, 62, 46, 78, 56, 90, 70]
const TABLE_ROWS = [
  { id: 'INV-2041', name: 'Northgate Ltd', status: 'Paid' },
  { id: 'INV-2042', name: 'Brindley Co', status: 'Due' },
  { id: 'INV-2043', name: 'Elmsworth', status: 'Paid' },
] as const

function SoftwareVisual() {
  return (
    <VisualShell
      tint="linear-gradient(160deg,#241a3d 0%,#1b1430 45%,#0d0a18 100%)"
      caption="Role-based access · live data · audit trail"
    >
      <Glow className="-right-12 -bottom-14 h-40 w-40" color="rgba(168,85,247,0.55)" />
      <Glow className="-left-10 -top-10 h-36 w-36" color="rgba(94,234,212,0.35)" />

      <div className="relative w-full max-w-[268px] overflow-hidden rounded-xl border border-white/20 bg-[#0c0817]/90 shadow-[0_24px_54px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-400/20 text-purple-200">
              <LayoutDashboard size={10} />
            </span>
            <span className="text-[9px] font-semibold text-purple-100">
              Operations console
            </span>
          </div>
          <span className="flex items-center gap-1 rounded bg-emerald-400/15 px-1.5 py-[2px] text-[7px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            live
          </span>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-[46px] shrink-0 flex-col gap-1.5 border-r border-white/10 p-2 sm:flex">
            {[FileBarChart, Database, CreditCard, Settings].map((Icon, i) => (
              <motion.span
                key={i}
                animate={{ x: [0, 2, 0] }}
                transition={{ ...LOOP, duration: 3.6, delay: i * 0.4 }}
                className={`flex h-6 w-full items-center justify-center rounded-md ${
                  i === 0
                    ? 'bg-purple-400/25 text-purple-100'
                    : 'bg-white/[0.04] text-white/40'
                }`}
              >
                <Icon size={10} />
              </motion.span>
            ))}
          </div>

          <div className="min-w-0 flex-1 p-2.5">
            {/* KPI strip */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: 'Open', value: 24, icon: Cloud },
                { label: 'SLA', value: 98, icon: ShieldCheck, suffix: '%' },
                { label: 'Users', value: 12, icon: Users },
              ].map((kpi, i) => {
                const Icon = kpi.icon
                return (
                  <div
                    key={kpi.label}
                    className="rounded-md border border-white/10 bg-white/[0.05] px-1.5 py-1.5"
                  >
                    <div className="flex items-center gap-1 text-[7px] uppercase tracking-wider text-white/45">
                      <Icon size={8} />
                      {kpi.label}
                    </div>
                    <p className="mt-0.5 text-[11px] font-bold text-white">
                      <Counter to={kpi.value} suffix={kpi.suffix || ''} />
                      {kpi.label === 'Users' ? '+' : ''}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Animated bar chart */}
            <div className="mt-2 rounded-md border border-white/10 bg-white/[0.04] p-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-white/60">Weekly throughput</span>
                <span className="flex items-center gap-1 text-[8px] font-semibold text-emerald-300">
                  <TrendingUp size={8} />
                  +14%
                </span>
              </div>
              <div className="mt-1.5 flex h-11 items-end gap-1">
                {CHART.map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h * 0.45}%`, `${h}%`, `${h * 0.6}%`] }}
                    transition={{ ...LOOP, duration: 3.4, delay: i * 0.16 }}
                    className={`flex-1 rounded-t ${
                      i === CHART.length - 2
                        ? 'bg-emerald-400/85'
                        : 'bg-purple-400/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Table with a sweeping highlight row */}
            <div className="relative mt-2 overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
              <motion.div
                animate={{ y: ['-100%', '320%'] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-purple-300/12 to-transparent"
              />
              {TABLE_ROWS.map((r) => (
                <div
                  key={r.id}
                  className="relative flex items-center gap-1.5 border-b border-white/5 px-2 py-1 last:border-0"
                >
                  <span className="text-[7px] font-semibold text-white/45">
                    {r.id}
                  </span>
                  <span className="flex-1 truncate text-[8px] text-white/75">
                    {r.name}
                  </span>
                  <span
                    className={`rounded px-1.5 py-[1px] text-[7px] font-semibold ${
                      r.status === 'Paid'
                        ? 'bg-emerald-400/15 text-emerald-300'
                        : 'bg-amber-400/15 text-amber-300'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-1.5 flex items-center gap-1 text-[7.5px] text-white/40">
              <Sparkles size={8} className="text-purple-300" />
              Exports, permissions and audit history built in
            </div>
          </div>
        </div>
      </div>
    </VisualShell>
  )
}

/* ------------------------------------------------------------------ */
/* Exported picker                                                     */
/* ------------------------------------------------------------------ */

export function ServiceVisual({ id }: { id: string }) {
  if (id === 'mobile') return <MobileAppVisual />
  if (id === 'software') return <SoftwareVisual />
  return <WebsiteVisual />
}
