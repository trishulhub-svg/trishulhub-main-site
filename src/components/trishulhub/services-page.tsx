'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Crosshair,
  RefreshCw,
  Shield,
  Sparkles,
  MessageCircle,
  TrendingUp,
  LayoutTemplate,
  Boxes,
  Gauge,
  Users,
  UserCheck,
  GitBranch,
  Globe,
  LayoutDashboard,
  Workflow,
} from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import { EASE_OUT_EXPO, STAGGER } from '@/lib/animations'

type ServiceId = 'website' | 'software' | 'crm'

const services = [
  {
    id: 'website' as const,
    title: 'Scale your presence instantly',
    desc: 'TrishulHub designs and builds websites for every kind of customer need — ecommerce, business, portfolio, or local brand — ready to launch and convert.',
    startLabel: 'Start building your site',
    actions: [
      { icon: Sparkles, label: 'Design System' },
      { icon: LayoutTemplate, label: 'Page Builder' },
      { icon: TrendingUp, label: 'Convert Faster' },
    ],
    rows: [
      { topic: '#Ecommerce', reach: '1.2k', velocity: 'Medium', hot: false },
      { topic: '#BusinessSite', reach: '3.4k', velocity: 'High', hot: true },
    ],
    tableHeaders: ['Site Type', 'Pages', 'Demand'] as const,
    features: [
      {
        icon: Crosshair,
        title: 'Brand-first layouts',
        text: 'Every page is shaped around your offer, audience, and conversion goals — not a generic template dump.',
      },
      {
        icon: RefreshCw,
        title: 'Fast iteration',
        text: 'Ship a polished first version, then refine sections, CTAs, and flows as your business grows.',
      },
      {
        icon: Shield,
        title: 'Solid foundations',
        text: 'Mobile-ready structure, clear navigation, and performance-minded builds from day one.',
      },
    ],
  },
  {
    id: 'software' as const,
    title: 'Run operations on your terms',
    desc: 'Custom admin panels and app systems for inventory, healthcare, ecommerce ops, HR, and any workflow your team needs day to day.',
    startLabel: 'Start designing your software',
    actions: [
      { icon: Boxes, label: 'Build Modules' },
      { icon: Workflow, label: 'Map Workflows' },
      { icon: Gauge, label: 'Track Ops' },
    ],
    rows: [
      { topic: '#Inventory', reach: '48', velocity: 'Stable', hot: false },
      { topic: '#Healthcare', reach: '126', velocity: 'Critical', hot: true },
    ],
    tableHeaders: ['Module', 'Records', 'Priority'] as const,
    features: [
      {
        icon: Crosshair,
        title: 'Process-fit panels',
        text: 'Screens and roles match how your staff actually works — warehouse, clinic, shop floor, or office.',
      },
      {
        icon: RefreshCw,
        title: 'Automated workflows',
        text: 'Alerts, approvals, and status updates run in the background so teams stay ahead of the work.',
      },
      {
        icon: Shield,
        title: 'Access control',
        text: 'Role-based permissions keep sensitive data safe while giving each user what they need.',
      },
    ],
  },
  {
    id: 'crm' as const,
    title: 'Keep every relationship clear',
    desc: 'CRM software to manage employees, customers, pipelines, and follow-ups — so your team stays aligned without chaos.',
    startLabel: 'Start organizing your CRM',
    actions: [
      { icon: Users, label: 'Capture Leads' },
      { icon: MessageCircle, label: 'Follow Up' },
      { icon: UserCheck, label: 'Close Deals' },
    ],
    rows: [
      { topic: '#NewLeads', reach: '84', velocity: 'Warm', hot: false },
      { topic: '#Pipeline', reach: '17', velocity: 'Hot', hot: true },
    ],
    tableHeaders: ['Stage', 'Count', 'Signal'] as const,
    features: [
      {
        icon: Crosshair,
        title: 'Precision follow-ups',
        text: 'Know who needs a reply, who is ready to buy, and which employees own each relationship.',
      },
      {
        icon: RefreshCw,
        title: 'Pipeline automation',
        text: 'Move deals and tasks forward with reminders and status triggers that keep momentum.',
      },
      {
        icon: Shield,
        title: 'Team alignment',
        text: 'One shared view of customers and staff — less dropped context, clearer ownership.',
      },
    ],
  },
]

export function ServicesPage() {
  return (
    <div className="relative pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.2] stars-bg" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            Services
          </motion.span>
          <AnimatedHeading
            as="h1"
            variant="rise"
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Three systems. One craft studio.
          </AnimatedHeading>
          <p className="mt-5 text-base text-white/55 sm:text-lg">
            Website development, custom software, and CRM — each shown in the
            same dual-card layout with a live-style preview on the right.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: STAGGER.normal } },
          }}
          className="space-y-24"
        >
          {services.map((s) => (
            <motion.section
              key={s.id}
              id={s.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: EASE_OUT_EXPO },
                },
              }}
              className="scroll-mt-28"
            >
              {/* Header row — title left, start CTA right */}
              <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h2
                    className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {s.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-base">
                    {s.desc}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#00DEFF] to-[#0088CC] px-5 py-3 text-sm font-semibold text-[#0A0A0A] shadow-[0_0_24px_rgba(0,222,255,0.35)] transition hover:brightness-110"
                >
                  {s.startLabel}
                </Link>
              </div>

              {/* Equal dual cards */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                <LeftAnalyticsCard service={s} />
                <RightPreviewCard id={s.id} />
              </div>

              {/* Bottom feature trio */}
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
                {s.features.map((f) => (
                  <div key={f.title} className="max-w-sm">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#00DEFF]">
                      <f.icon size={20} strokeWidth={1.75} />
                    </div>
                    <h3
                      className="text-base font-semibold text-white"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      {f.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function LeftAnalyticsCard({
  service,
}: {
  service: (typeof services)[number]
}) {
  return (
    <div className="electric-card flex h-full min-h-[420px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#111111] p-6 sm:p-7">
      {/* Top action icons */}
      <div className="grid grid-cols-3 gap-3">
        {service.actions.map((a) => (
          <div key={a.label} className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#00DEFF]">
              <a.icon size={22} strokeWidth={1.75} />
            </div>
            <div className="mt-3 text-xs font-medium text-neutral-300">
              {a.label}
            </div>
          </div>
        ))}
      </div>

      {/* Topic table */}
      <div className="mt-8 flex-1">
        <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">
          <span>{service.tableHeaders[0]}</span>
          <span className="text-center">{service.tableHeaders[1]}</span>
          <span className="text-right">{service.tableHeaders[2]}</span>
        </div>
        <div className="mt-1">
          {service.rows.map((row) => (
            <div
              key={row.topic}
              className={`grid grid-cols-3 items-center gap-2 rounded-xl px-2 py-3 text-sm ${
                row.hot ? 'bg-white/[0.03]' : ''
              }`}
            >
              <div className="flex items-center gap-2 text-neutral-300">
                {row.hot ? (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00DEFF]" />
                ) : (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-transparent" />
                )}
                {row.topic}
              </div>
              <div className="text-center text-neutral-400">{row.reach}</div>
              <div
                className={`text-right font-medium ${
                  row.hot ? 'text-[#00DEFF]' : 'text-neutral-400'
                }`}
              >
                {row.velocity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect Facebook Ads style bar → Contact us */}
      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
        <div className="text-sm text-neutral-300">Contact TrishulHub</div>
        <Link
          href="/contact"
          className="rounded-lg border border-white/15 bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white transition hover:border-[#00DEFF]/50 hover:text-[#00DEFF]"
        >
          Contact us
        </Link>
      </div>
    </div>
  )
}

function RightPreviewCard({ id }: { id: ServiceId }) {
  if (id === 'website') return <WebsiteGeneralPreview />
  if (id === 'software') return <SoftwareGeneralPreview />
  return <CrmGeneralPreview />
}

function WebsiteGeneralPreview() {
  return (
    <div className="electric-card flex h-full min-h-[420px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#111111]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center text-[11px] text-white/45">
          https://yourbrand.com
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-white">Your Brand</div>
          <div className="hidden gap-4 text-xs text-white/40 sm:flex">
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="mt-8 flex-1">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#00DEFF]">
            General website preview
          </div>
          <h3
            className="mt-3 max-w-sm text-2xl font-light leading-tight text-white sm:text-3xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            A clean landing page built around your offer
          </h3>
          <p className="mt-3 max-w-md text-sm text-neutral-400">
            Hero, services, proof, and contact — the default TrishulHub website
            structure before we tailor it to your business.
          </p>
          <div className="mt-6 inline-flex rounded-full bg-gradient-to-b from-[#00DEFF] to-[#0088CC] px-4 py-2 text-xs font-semibold text-[#0A0A0A]">
            Book a call
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {['Offer', 'Work', 'Contact'].map((t) => (
            <div
              key={t}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center text-xs text-neutral-400"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SoftwareGeneralPreview() {
  return (
    <div className="electric-card relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#111111] p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,222,255,0.18),transparent_55%)]" />
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <LayoutDashboard size={14} className="text-[#00DEFF]" />
          Ops Hub
        </div>
        <span className="rounded-full bg-[#00DEFF]/15 px-2.5 py-0.5 text-[10px] text-[#00DEFF]">
          Admin preview
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="absolute h-48 w-48 rounded-full border border-[#00DEFF]/20" />
        <div className="absolute h-32 w-32 rounded-full border border-[#00DEFF]/25" />
        <div className="absolute h-16 w-16 rounded-full border border-[#00DEFF]/35" />
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#00DEFF] text-[#0A0A0A] shadow-[0_0_40px_rgba(0,222,255,0.45)]">
          <Boxes size={22} />
        </div>
        {[
          { label: 'Stock', angle: -20 },
          { label: 'Users', angle: 40 },
          { label: 'Orders', angle: 100 },
          { label: 'Reports', angle: 160 },
          { label: 'Roles', angle: 220 },
          { label: 'Alerts', angle: 280 },
        ].map((item, i) => {
          const rad = ((item.angle + i * 8) * Math.PI) / 180
          const r = 110
          return (
            <div
              key={item.label}
              className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0A] text-[10px] text-neutral-300"
              style={{
                transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`,
              }}
            >
              {item.label.slice(0, 2)}
            </div>
          )
        })}
      </div>
      <p className="relative mt-4 text-center text-xs text-neutral-400">
        Custom software modules orbit your core admin
      </p>
    </div>
  )
}

function CrmGeneralPreview() {
  return (
    <div className="electric-card relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#111111] p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,222,255,0.16),transparent_55%)]" />
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Users size={14} className="text-[#00DEFF]" />
          CRM Hub
        </div>
        <span className="rounded-full bg-[#00DEFF]/15 px-2.5 py-0.5 text-[10px] text-[#00DEFF]">
          Pipeline preview
        </span>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="absolute h-48 w-48 rounded-full border border-[#00DEFF]/15" />
        <div className="absolute h-32 w-32 rounded-full border border-[#00DEFF]/25" />
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#00DEFF] text-[#0A0A0A] shadow-[0_0_40px_rgba(0,222,255,0.45)]">
          <GitBranch size={22} />
        </div>
        {[
          { Icon: Users, a: 0 },
          { Icon: MessageCircle, a: 60 },
          { Icon: UserCheck, a: 120 },
          { Icon: Globe, a: 180 },
          { Icon: TrendingUp, a: 240 },
          { Icon: LayoutDashboard, a: 300 },
        ].map(({ Icon, a }) => {
          const rad = (a * Math.PI) / 180
          const r = 112
          return (
            <div
              key={a}
              className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0A] text-neutral-300"
              style={{
                transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`,
              }}
            >
              <Icon size={16} />
            </div>
          )
        })}
      </div>
      <p className="relative mt-4 text-center text-xs text-neutral-400">
        Customers, employees, and deals in one hub
      </p>
    </div>
  )
}
