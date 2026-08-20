'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, LayoutDashboard, Smartphone, Zap } from 'lucide-react'
import { NexusButton } from './nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'

type PlanId = 'website' | 'software' | 'mobile'

const plans: {
  id: PlanId
  label: string
  icon: typeof Zap
  price: string
  period: string
  description: string
  features: string[]
  cta: string
}[] = [
  {
    id: 'software',
    label: 'Custom Software Development',
    icon: LayoutDashboard,
    price: 'Custom',
    period: '/build',
    description:
      'Admin panels and tools that match how your team works every day.',
    features: [
      'Stock, health, shop, or HR tools',
      'Safe login for each role',
      'Simple alerts',
      'Clear dashboards',
      'Easy to use screens',
    ],
    cta: 'Start your software',
  },
  {
    id: 'website',
    label: 'Website Development',
    icon: Globe,
    price: 'Custom',
    period: '/project',
    description:
      'Clean websites that look good and help customers find you.',
    features: [
      'Pages that match your brand',
      'Shop or business layouts',
      'Works on phones',
      'Contact forms',
      'Help launching',
    ],
    cta: 'Start your website',
  },
  {
    id: 'mobile',
    label: 'Mobile Apps',
    icon: Smartphone,
    price: 'Custom',
    period: '/app',
    description:
      'Phone apps for Android and iOS that help customers or your staff.',
    features: [
      'Android and iPhone apps',
      'Easy to use screens',
      'Push alerts',
      'Login for users',
      'Works with your website or software',
    ],
    cta: 'Start your app',
  },
]

type LineGeom = {
  id: PlanId
  y: number
}

export function HomeUnlock() {
  const { links } = useSiteContact()
  const [active, setActive] = useState<PlanId>('software')
  const current = useMemo(
    () => plans.find((p) => p.id === active) ?? plans[0],
    [active],
  )

  const bridgeRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Record<PlanId, HTMLButtonElement | null>>({
    website: null,
    software: null,
    mobile: null,
  })
  const [lines, setLines] = useState<LineGeom[]>([])
  const [bridgeHeight, setBridgeHeight] = useState(240)
  const [midY, setMidY] = useState(120)

  const measure = () => {
    const bridge = bridgeRef.current
    if (!bridge) return
    const bridgeBox = bridge.getBoundingClientRect()
    if (bridgeBox.height <= 0) return

    setBridgeHeight(bridgeBox.height)
    setMidY(bridgeBox.height / 2)

    const next: LineGeom[] = []
    for (const plan of plans) {
      const btn = buttonRefs.current[plan.id]
      if (!btn) continue
      const box = btn.getBoundingClientRect()
      const y = box.top + box.height / 2 - bridgeBox.top
      next.push({ id: plan.id, y })
    }
    setLines(next)
  }

  useLayoutEffect(() => {
    measure()
  }, [])

  useEffect(() => {
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => measure())
        : null
    if (bridgeRef.current) ro?.observe(bridgeRef.current)
    for (const plan of plans) {
      const el = buttonRefs.current[plan.id]
      if (el) ro?.observe(el)
    }
    const t1 = window.setTimeout(measure, 50)
    const t2 = window.setTimeout(measure, 250)
    return () => {
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  return (
    <section
      id="solutions"
      className="relative overflow-hidden border-y border-[#e5e7eb] bg-[#fafafa] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-medium text-[#6b7280]">Solutions</p>
          <h2 className="text-4xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-5xl">
            Unlock custom <span className="accent-text">growth</span>
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            Choose the solution that fits your business — then talk with us and
            we will build it with you.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#111111] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-6 lg:p-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#111111]/20 to-transparent" />
            <span className="rounded-full border border-[#111111]/15 bg-[#fafafa] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
              Pick a path
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#111111]/20 to-transparent" />
          </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-0">
          <div className="flex flex-col justify-center gap-3 lg:col-span-4">
            {plans.map((plan) => {
              const isActive = plan.id === active
              const Icon = plan.icon
              return (
                <button
                  key={plan.id}
                  ref={(el) => {
                    buttonRefs.current[plan.id] = el
                  }}
                  type="button"
                  onClick={() => setActive(plan.id)}
                  className={`relative flex min-h-[68px] w-full items-center justify-between rounded-[1.75rem] px-5 py-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'bg-[#0D3C1F] text-white shadow-[0_12px_32px_rgba(13,60,31,0.2)]'
                      : 'border border-[#111111] bg-white text-[#6b7280] hover:border-[#0D3C1F]/40 hover:text-[#0D3C1F]'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon
                      size={18}
                      className={`shrink-0 ${
                        isActive ? 'text-[#0d9488]' : 'text-[#6b7280]'
                      }`}
                    />
                    <span className="truncate text-sm font-semibold sm:text-base">
                      {plan.label}
                    </span>
                  </div>
                  {isActive ? (
                    <Zap size={16} className="shrink-0 text-[#0d9488]" />
                  ) : null}
                </button>
              )
            })}
          </div>

          <div className="flex justify-center py-1 lg:hidden" aria-hidden>
            <svg width="24" height="56" className="overflow-visible">
              <line
                x1="12"
                y1="0"
                x2="12"
                y2="56"
                stroke="#0d9488"
                strokeWidth="1.75"
                strokeDasharray="6 6"
                className="animate-flow"
              />
              <circle r="3.5" fill="#0d9488">
                <animateMotion
                  dur="1.4s"
                  repeatCount="indefinite"
                  path="M12,0 L12,56"
                />
              </circle>
            </svg>
          </div>

          <div
            ref={bridgeRef}
            className="relative hidden lg:col-span-3 lg:block"
          >
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox={`0 0 240 ${bridgeHeight}`}
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              {lines.map((line) => {
                const isActive = line.id === active
                const y = Math.round(line.y * 10) / 10
                const end = Math.round(midY * 10) / 10
                return (
                  <path
                    key={line.id}
                    d={`M0 ${y} C 90 ${y}, 120 ${end}, 180 ${end} L 240 ${end}`}
                    stroke={isActive ? '#0d9488' : '#cbd5e1'}
                    strokeOpacity={isActive ? 1 : 0.7}
                    strokeWidth="1.75"
                    strokeDasharray="8 8"
                    className={isActive ? 'animate-flow' : undefined}
                  />
                )
              })}
            </svg>
          </div>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex min-h-[480px] flex-col overflow-hidden rounded-[1.75rem] border border-[#111111] bg-[#fafafa] p-6 sm:p-8 lg:col-span-5"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#0d9488]/20 blur-3xl" />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h3 className="max-w-[16rem] font-display text-2xl font-medium text-foreground sm:max-w-none sm:text-3xl lg:text-4xl">
                {current.label}
              </h3>
              <div className="text-right">
                <span className="font-display text-2xl font-medium text-foreground sm:text-3xl">
                  {current.price}
                </span>
                <span className="ml-1 font-sans text-sm text-[#0d9488]">
                  {current.period}
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground">
              {current.description}
            </p>

            <div className="my-6 h-px w-full bg-border" />

            <ul className="flex-1 space-y-3">
              {current.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 font-sans text-sm text-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#111111]" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 w-full">
              <NexusButton href={links.whatsapp} fullWidth>
                {current.cta}
              </NexusButton>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
