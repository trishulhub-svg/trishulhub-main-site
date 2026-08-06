'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedHeading } from './animated-heading'

type PlanId = 'website' | 'software' | 'crm'

const plans: {
  id: PlanId
  label: string
  title: string
  priceNote: string
  features: string[]
}[] = [
  {
    id: 'website',
    label: 'Website',
    title: 'Website Development',
    priceNote: 'Custom sites for any business',
    features: [
      'Brand-matched landing pages',
      'Ecommerce or business layouts',
      'Mobile-first structure',
      'Launch-ready contact flows',
    ],
  },
  {
    id: 'software',
    label: 'Software',
    title: 'Custom Software',
    priceNote: 'Admin panels & app systems',
    features: [
      'Inventory, health, shop, HR modules',
      'Role-based access',
      'Workflow alerts & dashboards',
      'Built around your process',
    ],
  },
  {
    id: 'crm',
    label: 'CRM',
    title: 'CRM Solutions',
    priceNote: 'People & pipeline clarity',
    features: [
      'Customers + employees together',
      'Pipeline and follow-ups',
      'Team ownership visibility',
      'Calm shared workspace',
    ],
  },
]

export function HomeUnlock() {
  const [active, setActive] = useState<PlanId>('website')
  const current = useMemo(
    () => plans.find((p) => p.id === active) ?? plans[0],
    [active],
  )

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] stars-bg" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#00DEFF]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]">
            Unlock custom growth
          </span>
          <AnimatedHeading
            as="h2"
            variant="rise"
            className="text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Choose the system you want to unlock
          </AnimatedHeading>
          <p className="mt-4 text-base text-neutral-400">
            Switch between Website, Software, and CRM — same interactive flow,
            TrishulHub services instead of pricing tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left plan buttons */}
          <div className="relative lg:col-span-4">
            <div className="flex flex-col gap-3">
              {plans.map((plan) => {
                const isActive = plan.id === active
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setActive(plan.id)}
                    className={`relative rounded-2xl border px-5 py-4 text-left transition-all ${
                      isActive
                        ? 'border-[#00DEFF]/50 bg-[#00DEFF]/10 shadow-[0_0_30px_rgba(0,222,255,0.3)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-full rounded-full bg-[#00DEFF] shadow-[0_0_12px_rgba(0,222,255,0.8)] lg:right-0 lg:translate-x-[18px]" />
                    )}
                    <div
                      className="text-lg font-medium text-white"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {plan.label}
                    </div>
                    <div className="mt-1 text-xs text-neutral-400">
                      {plan.priceNote}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Dashed connectors (desktop) */}
            <svg
              className="pointer-events-none absolute left-full top-0 z-10 hidden h-full w-24 translate-y-4 lg:block"
              viewBox="0 0 96 280"
              fill="none"
              aria-hidden="true"
            >
              {plans.map((plan, i) => {
                const y = 36 + i * 88
                const isActive = plan.id === active
                return (
                  <path
                    key={plan.id}
                    d={`M-8 ${y} C 30 ${y}, 30 ${160}, 70 ${160} L 96 ${160}`}
                    stroke={isActive ? '#00DEFF' : '#525252'}
                    strokeOpacity={isActive ? 1 : 0.55}
                    strokeWidth="1.5"
                    strokeDasharray="8 8"
                    className={isActive ? 'animate-flow' : ''}
                  />
                )
              })}
            </svg>
          </div>

          {/* Details card */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="electric-card relative z-10 overflow-hidden rounded-[32px] border border-white/10 bg-[#111111] p-7 sm:p-9 lg:col-span-8"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-[#00DEFF]">
              Selected path
            </div>
            <h3
              className="mt-3 text-3xl font-light text-white"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {current.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-400">{current.priceNote}</p>

            <ul className="mt-8 space-y-3">
              {current.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-neutral-200">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="mt-0.5 shrink-0 text-[#00DEFF]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M22 12 6 22V2z" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/services#${current.id}`}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#00DEFF] to-[#0088CC] px-5 py-3 text-sm font-semibold text-[#0A0A0A] shadow-[0_0_24px_rgba(0,222,255,0.3)]"
              >
                View {current.label} service
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-[#00DEFF]/40 hover:text-[#00DEFF]"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
