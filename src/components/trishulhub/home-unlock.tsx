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
    price: 'Custom',
    period: '/project',
    description:
      'Ideal for brands that need a clean, conversion-ready website tailored to their offer.',
    features: [
      'Brand-matched landing pages',
      'Ecommerce or business layouts',
      'Mobile-first structure',
      'Contact and lead flows',
      'Launch support',
    ],
    cta: 'Start your website',
  },
  {
    id: 'software',
    label: 'Custom Software Development',
    icon: LayoutDashboard,
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
    price: 'Custom',
    period: '/system',
    description:
      'Ideal for teams managing customers, employees, pipelines, and follow-ups in one place.',
    features: [
      'Customers and employees together',
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
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] stars-bg" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-0">
          {/* LEFT — title + plan selectors */}
          <div className="flex flex-col lg:col-span-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Unlock custom growth
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-neutral-400 sm:text-base">
              Choose the system you want to unlock — web development, custom
              software, or CRM — then talk to us to make it real.
            </p>

            <div className="relative mt-8 flex flex-1 flex-col justify-center gap-3">
              {plans.map((plan) => {
                const isActive = plan.id === active
                const Icon = plan.icon
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setActive(plan.id)}
                    className={`relative flex min-h-[64px] w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all ${
                      isActive
                        ? 'bg-[#00DEFF] text-[#0A0A0A] shadow-[0_0_30px_rgba(0,222,255,0.35)]'
                        : 'border border-white/10 bg-white/[0.04] text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Icon
                        size={18}
                        className={`shrink-0 ${
                          isActive ? 'text-[#0A0A0A]' : 'text-neutral-400'
                        }`}
                      />
                      <span className="truncate font-display text-sm font-semibold sm:text-base">
                        {plan.label}
                      </span>
                    </div>
                    {isActive ? (
                      <Zap size={16} className="shrink-0 text-[#0A0A0A]" />
                    ) : null}
                    {isActive && (
                      <span className="absolute -right-1.5 top-1/2 hidden h-3 w-3 -translate-y-1/2 translate-x-full rounded-full bg-[#00DEFF] shadow-[0_0_12px_rgba(0,222,255,0.9)] lg:block" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* MIDDLE — long dashed connector lines */}
          <div className="relative hidden lg:col-span-3 lg:block">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 240 320"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              {plans.map((plan, i) => {
                const y = 118 + i * 76
                const isActive = plan.id === active
                return (
                  <path
                    key={plan.id}
                    d={`M0 ${y} C 70 ${y}, 100 160, 160 160 L 240 160`}
                    stroke={isActive ? '#00DEFF' : '#525252'}
                    strokeOpacity={isActive ? 1 : 0.45}
                    strokeWidth="1.75"
                    strokeDasharray="8 8"
                    className={isActive ? 'animate-flow' : undefined}
                  />
                )
              })}
            </svg>
          </div>

          {/* RIGHT — narrower detail card */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#121212] p-6 shadow-[0_0_0_1px_rgba(0,222,255,0.1),0_0_40px_rgba(0,222,255,0.12)] sm:p-8 lg:col-span-5"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00DEFF]/55 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-[#00DEFF]/45 via-transparent to-transparent" />

            <div className="flex flex-wrap items-start justify-between gap-4">
              <h3 className="max-w-[16rem] font-display text-2xl font-semibold text-white sm:max-w-none sm:text-3xl lg:text-4xl">
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

            <ul className="flex-1 space-y-3">
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
