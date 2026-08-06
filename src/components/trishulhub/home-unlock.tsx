'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, LayoutDashboard, Users, Zap } from 'lucide-react'

type PlanId = 'website' | 'software' | 'crm'

const plans: {
  id: PlanId
  label: string
  icon: typeof Zap
  blurb: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
}[] = [
  {
    id: 'website',
    label: 'Web Development',
    icon: Globe,
    blurb: 'Sites that convert',
    price: 'Custom',
    period: '/project',
    description:
      'Ideal for brands that need a clean, conversion-ready website tailored to their offer.',
    features: [
      'Brand-matched landing pages',
      'Ecommerce or business layouts',
      'Mobile-first structure',
      'Contact & lead flows',
      'Launch support',
    ],
    cta: 'Start your website',
  },
  {
    id: 'software',
    label: 'Custom Software',
    icon: LayoutDashboard,
    blurb: 'Ops that scale',
    price: 'Custom',
    period: '/build',
    description:
      'Ideal for teams that need an admin panel or app system shaped around real workflows.',
    features: [
      'Inventory, health, shop, HR modules',
      'Role-based access',
      'Workflow alerts',
      'Live dashboards',
      'Process-fit UX',
    ],
    cta: 'Start your software',
  },
  {
    id: 'crm',
    label: 'CRM Solutions',
    icon: Users,
    blurb: 'Relationships clear',
    price: 'Custom',
    period: '/system',
    description:
      'Ideal for teams managing customers, employees, pipelines, and follow-ups in one place.',
    features: [
      'Customers + employees together',
      'Pipeline visibility',
      'Follow-up reminders',
      'Team ownership',
      'Shared workspace',
    ],
    cta: 'Start your CRM',
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
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] stars-bg" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left column — title + plan buttons */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              <span className="text-white/25">03. </span>
              Unlock custom growth
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-neutral-400 sm:text-base">
              Choose the system you want to unlock — web development, custom
              software, or CRM — then talk to us to make it real.
            </p>

            <div className="relative mt-8 space-y-3">
              {plans.map((plan) => {
                const isActive = plan.id === active
                const Icon = plan.icon
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setActive(plan.id)}
                    className={`relative flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all ${
                      isActive
                        ? 'bg-[#00DEFF] text-[#0A0A0A] shadow-[0_0_30px_rgba(0,222,255,0.35)]'
                        : 'border border-white/10 bg-white/[0.04] text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={isActive ? 'text-[#0A0A0A]' : 'text-neutral-400'}
                      />
                      <span className="font-display text-base font-semibold">
                        {plan.label}
                      </span>
                    </div>
                    {isActive ? (
                      <Zap size={16} className="text-[#0A0A0A]" />
                    ) : (
                      <Icon size={16} className="text-neutral-500" />
                    )}
                    {isActive && (
                      <span className="absolute -right-1.5 top-1/2 hidden h-3 w-3 -translate-y-1/2 translate-x-full rounded-full bg-[#00DEFF] shadow-[0_0_12px_rgba(0,222,255,0.9)] lg:block" />
                    )}
                  </button>
                )
              })}

              {/* Dashed connectors */}
              <svg
                className="pointer-events-none absolute left-full top-0 z-10 hidden h-[240px] w-28 translate-y-2 lg:block"
                viewBox="0 0 112 240"
                fill="none"
                aria-hidden="true"
              >
                {plans.map((plan, i) => {
                  const y = 28 + i * 72
                  const isActive = plan.id === active
                  return (
                    <path
                      key={plan.id}
                      d={`M0 ${y} C 36 ${y}, 36 120, 78 120 L 112 120`}
                      stroke={isActive ? '#00DEFF' : '#525252'}
                      strokeOpacity={isActive ? 1 : 0.45}
                      strokeWidth="1.5"
                      strokeDasharray="8 8"
                      className={isActive ? 'animate-flow' : undefined}
                    />
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Right pricing-style card — same visual weight as image 2 */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 min-h-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-[#121212] p-7 shadow-[0_0_0_1px_rgba(0,222,255,0.08),0_0_40px_rgba(0,222,255,0.12)] sm:p-9 lg:col-span-7"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00DEFF]/50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-[#00DEFF]/40 via-transparent to-transparent" />

            <div className="flex flex-wrap items-start justify-between gap-4">
              <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                {current.label}
              </h3>
              <div className="text-right">
                <span className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {current.price}
                </span>
                <span className="ml-1 font-sans text-sm text-[#00DEFF]">
                  {current.period}
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-neutral-400">
              {current.description}
            </p>

            <div className="my-6 h-px w-full bg-white/10" />

            <ul className="space-y-3">
              {current.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 font-sans text-sm text-neutral-200"
                >
                  <svg
                    width="16"
                    height="16"
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

            <Link
              href="/contact"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00DEFF] via-[#00C4E8] to-[#0088CC] px-6 py-3.5 font-sans text-sm font-semibold text-[#0A0A0A] shadow-[0_0_28px_rgba(0,222,255,0.35)] transition hover:brightness-110"
            >
              {current.cta}
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/15">
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
