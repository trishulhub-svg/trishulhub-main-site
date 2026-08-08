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
  LayoutDashboard,
  Workflow,
  Package,
  ShoppingCart,
  BarChart3,
  ShieldCheck,
  Bell,
  UserPlus,
  Handshake,
  ListChecks,
  PieChart,
  Waypoints,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

type ServiceId = 'website' | 'software' | 'mobile'

const services = [
  {
    id: 'software' as const,
    num: '01',
    title: 'Custom Software Development',
    desc: 'Admin panels and business tools for stock, health, shops, HR, and day-to-day work.',
    startLabel: 'Start your software',
    actions: [
      { icon: Boxes, label: 'Add Features' },
      { icon: Workflow, label: 'Plan Steps' },
      { icon: Gauge, label: 'Track Work' },
    ],
    rows: [
      { topic: '#Inventory', reach: 'Stock + SKUs', velocity: 'Stable', hot: false },
      { topic: '#Healthcare', reach: 'Patients + ops', velocity: 'In demand', hot: true },
    ],
    tableHeaders: ['System Type', 'Focus', 'Priority'] as const,
    features: [
      {
        icon: Crosshair,
        title: 'Screens that fit your work',
        text: 'We design screens around how your staff already works — in a shop, clinic, warehouse, or office.',
      },
      {
        icon: RefreshCw,
        title: 'Automatic updates',
        text: 'Alerts and status changes happen in the background so your team stays on track.',
      },
      {
        icon: Shield,
        title: 'Safe access',
        text: 'Each person only sees what they need — your data stays protected.',
      },
    ],
  },
  {
    id: 'website' as const,
    num: '02',
    title: 'Website Development',
    desc: 'Websites for shops, businesses, portfolios, and local brands — ready to launch and easy to use.',
    startLabel: 'Start your website',
    actions: [
      { icon: Sparkles, label: 'Clean Design' },
      { icon: LayoutTemplate, label: 'Clear Pages' },
      { icon: TrendingUp, label: 'More Leads' },
    ],
    rows: [
      { topic: '#Ecommerce', reach: 'Store + cart', velocity: 'Popular', hot: false },
      { topic: '#BusinessSite', reach: 'Lead-focused', velocity: 'Most booked', hot: true },
    ],
    tableHeaders: ['Project Type', 'Focus', 'Demand'] as const,
    features: [
      {
        icon: Crosshair,
        title: 'Design that matches your brand',
        text: 'Every page is shaped around your offer and your customers — not a generic template.',
      },
      {
        icon: RefreshCw,
        title: 'Quick improvements',
        text: 'Launch a strong first version, then improve pages and buttons as your business grows.',
      },
      {
        icon: Shield,
        title: 'Strong basics',
        text: 'Works well on phones, with clear menus and fast loading from day one.',
      },
    ],
  },
  {
    id: 'mobile' as const,
    num: '03',
    title: 'Mobile Apps',
    desc: 'Phone apps for Android and iPhone that help your customers or your team get work done on the go.',
    startLabel: 'Start your mobile app',
    actions: [
      { icon: Users, label: 'User Login' },
      { icon: MessageCircle, label: 'Push Alerts' },
      { icon: UserCheck, label: 'Easy Screens' },
    ],
    rows: [
      { topic: '#Android', reach: 'Play Store ready', velocity: 'Popular', hot: false },
      { topic: '#iPhone', reach: 'App Store ready', velocity: 'In demand', hot: true },
    ],
    tableHeaders: ['Platform', 'Focus', 'Demand'] as const,
    features: [
      {
        icon: Crosshair,
        title: 'Built for phones',
        text: 'Screens that feel natural on a phone — fast taps, clear buttons, and simple flows.',
      },
      {
        icon: RefreshCw,
        title: 'Always up to date',
        text: 'Your app can connect to your website or software so information stays current.',
      },
      {
        icon: Shield,
        title: 'Safe for users',
        text: 'Secure login and careful permissions so your data and your customers stay protected.',
      },
    ],
  },
]

export function ServicesPage() {
  const { links } = useSiteContact()

  return (
    <div className="relative pb-28 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            Services
          </motion.span>
          <AnimatedHeading
            as="h1"
            variant="rise"
            className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Solutions built around your business
          </AnimatedHeading>
          <p className="mt-5 font-sans text-base text-neutral-400 sm:text-lg">
            Custom software, website development, and mobile apps — each with a
            clear preview and an easy way to reach us.
          </p>
        </div>

        <div className="flex flex-col">
          {services.map((s, idx) => (
            <motion.section
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="scroll-mt-28"
            >
              {idx > 0 ? <ServiceConnector from={idx} /> : null}

              {/* Outer opaque service card */}
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0F0F0F] p-6 sm:p-8 lg:p-10">
                {/* Header: visible step number + title + CTA */}
                <div className="relative mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-start lg:justify-between">
                  <div className="relative max-w-2xl pt-2">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-1 -top-6 select-none font-display text-7xl font-bold leading-none text-[#00DEFF]/25 sm:-top-8 sm:text-8xl md:text-9xl"
                    >
                      {s.num}.
                    </div>
                    <p className="relative mb-2 font-display text-sm font-semibold tracking-[0.2em] text-[#00DEFF]">
                      {s.num}
                    </p>
                    <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {s.title}
                    </h2>
                    <p className="relative mt-3 max-w-xl font-sans text-sm leading-relaxed text-neutral-400 sm:text-base">
                      {s.desc}
                    </p>
                  </div>
                  <div className="relative z-10 self-start">
                    <NexusButton href={links.whatsapp}>{s.startLabel}</NexusButton>
                  </div>
                </div>

                {/* Equal dual cards */}
                <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
                  <LeftAnalyticsCard service={s} />
                  <RightPreviewCard id={s.id} />
                </div>

                {/* Feature trio — thin top lines like image */}
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-8">
                  {s.features.map((f) => (
                    <div key={f.title}>
                      <div className="mb-5 h-px w-full bg-white/15" />
                      <div className="mb-3 text-[#00DEFF]">
                        <f.icon size={22} strokeWidth={1.75} />
                      </div>
                      <h3 className="font-display text-base font-semibold text-white">
                        {f.title}
                      </h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-400">
                        {f.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServiceConnector({ from }: { from: number }) {
  // Unlock-style dashed curves between service cards
  const d =
    from === 1
      ? 'M 40 8 C 120 70, 280 20, 360 88'
      : 'M 360 8 C 280 70, 120 20, 40 88'

  return (
    <div
      className="relative mx-auto h-24 w-full max-w-xl py-2 sm:h-28"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 400 96"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d={d}
          stroke="#00DEFF"
          strokeOpacity="0.75"
          strokeWidth="1.75"
          strokeDasharray="8 8"
          strokeLinecap="round"
          className="animate-flow"
        />
        <circle cx={from === 1 ? 40 : 360} cy={8} r={4} fill="#00DEFF" />
        <circle cx={from === 1 ? 360 : 40} cy={88} r={4} fill="#00DEFF" />
        <circle r="3.5" fill="#67E8F9">
          <animateMotion dur="2.2s" repeatCount="indefinite" path={d} />
        </circle>
      </svg>
    </div>
  )
}

function LeftAnalyticsCard({
  service,
}: {
  service: (typeof services)[number]
}) {
  const { links } = useSiteContact()

  return (
    <div className="electric-card flex h-full min-h-[440px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#161616] p-6 sm:p-7">
      <div className="grid grid-cols-3 gap-3">
        {service.actions.map((a) => (
          <div key={a.label} className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#00DEFF]">
              <a.icon size={22} strokeWidth={1.75} />
            </div>
            <div className="mt-3 font-sans text-xs font-medium text-neutral-300">
              {a.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex-1">
        <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-500">
          <span>{service.tableHeaders[0]}</span>
          <span className="text-center">{service.tableHeaders[1]}</span>
          <span className="text-right">{service.tableHeaders[2]}</span>
        </div>
        <div className="mt-1">
          {service.rows.map((row) => (
            <div
              key={row.topic}
              className={`grid grid-cols-3 items-center gap-2 rounded-xl px-2 py-3 font-sans text-sm ${
                row.hot ? 'bg-white/[0.03]' : ''
              }`}
            >
              <div className="flex items-center gap-2 text-neutral-300">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    row.hot ? 'bg-[#00DEFF]' : 'bg-transparent'
                  }`}
                />
                <span className="truncate">{row.topic}</span>
              </div>
              <div className="truncate text-center text-neutral-400">
                {row.reach}
              </div>
              <div
                className={`truncate text-right font-medium ${
                  row.hot ? 'text-[#00DEFF]' : 'text-neutral-400'
                }`}
              >
                {row.velocity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect Facebook Ads style bar */}
      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3">
        <div className="font-sans text-sm text-neutral-300">Contact TrishulHub</div>
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/15 bg-neutral-900 px-3.5 py-1.5 font-sans text-xs font-medium text-white transition hover:border-[#00DEFF]/50 hover:text-[#00DEFF]"
        >
          Contact us
        </a>
      </div>
    </div>
  )
}

function RightPreviewCard({ id }: { id: ServiceId }) {
  if (id === 'website') return <WebsiteGeneralPreview />
  if (id === 'software') return <OrbitHubPreview kind="software" />
  return <OrbitHubPreview kind="mobile" />
}

function WebsiteGeneralPreview() {
  return (
    <div className="electric-card flex h-full min-h-[440px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#161616]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-sans text-[11px] text-white/45">
          https://yourbrand.com
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="font-display text-sm font-semibold text-white">
            Your Brand
          </div>
          <div className="hidden gap-4 font-sans text-xs text-white/40 sm:flex">
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="mt-8 flex-1">
          <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#00DEFF]">
            General website preview
          </div>
          <h3 className="mt-3 max-w-sm font-display text-2xl font-medium leading-tight text-white sm:text-3xl">
            A clean landing page built around your offer
          </h3>
          <p className="mt-3 max-w-md font-sans text-sm text-neutral-400">
            Hero, services, proof, and contact — the default TrishulHub website
            structure before we tailor it to your business.
          </p>
          <div className="mt-6 inline-flex rounded-full bg-gradient-to-b from-[#00DEFF] to-[#0088CC] px-4 py-2 font-sans text-xs font-semibold text-[#0A0A0A]">
            Book a call
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {['Offer', 'Work', 'Contact'].map((t) => (
            <div
              key={t}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center font-sans text-xs text-neutral-400"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OrbitHubPreview({ kind }: { kind: 'software' | 'mobile' }) {
  const center =
    kind === 'software' ? (
      <Boxes size={22} />
    ) : (
      <Smartphone size={22} strokeWidth={2.25} />
    )
  const label = kind === 'software' ? 'Ops Hub' : 'App Hub'
  const badge = kind === 'software' ? 'Admin preview' : 'App preview'
  const nodes: { label: string; a: number; icon: LucideIcon }[] =
    kind === 'software'
      ? [
          { label: 'Stock', a: 0, icon: Package },
          { label: 'Users', a: 60, icon: Users },
          { label: 'Orders', a: 120, icon: ShoppingCart },
          { label: 'Reports', a: 180, icon: BarChart3 },
          { label: 'Roles', a: 240, icon: ShieldCheck },
          { label: 'Alerts', a: 300, icon: Bell },
        ]
      : [
          { label: 'Home', a: 0, icon: LayoutDashboard },
          { label: 'Users', a: 60, icon: Users },
          { label: 'Chat', a: 120, icon: MessageCircle },
          { label: 'Alerts', a: 180, icon: Bell },
          { label: 'Tasks', a: 240, icon: ListChecks },
          { label: 'Stats', a: 300, icon: PieChart },
        ]

  return (
    <div className="electric-card relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#161616] p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,222,255,0.16),transparent_55%)]" />
      <div className="relative mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 font-sans text-xs text-neutral-400">
          {kind === 'software' ? (
            <LayoutDashboard size={14} className="text-[#00DEFF]" />
          ) : (
            <Users size={14} className="text-[#00DEFF]" />
          )}
          {label}
        </div>
        <span className="rounded-full bg-[#00DEFF]/15 px-2.5 py-0.5 font-sans text-[10px] text-[#00DEFF]">
          {badge}
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        {/* Slow counter-rotating rings */}
        <div className="orbit-spin absolute h-52 w-52 rounded-full border border-dashed border-[#00DEFF]/20" />
        <div className="orbit-spin-reverse absolute h-36 w-36 rounded-full border border-[#00DEFF]/25" />
        <div className="absolute h-20 w-20 rounded-full border border-[#00DEFF]/35" />

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#00DEFF] text-[#0A0A0A] shadow-[0_0_40px_rgba(0,222,255,0.45)]">
          {center}
        </div>

        {/* Orbiting modules — icons + labels for software / mobile */}
        <div
          className={`absolute h-[236px] w-[236px] ${
            kind === 'software' ? 'orbit-spin' : 'orbit-spin-reverse'
          }`}
        >
          {nodes.map((n) => {
            const rad = (n.a * Math.PI) / 180
            const r = 118
            const Icon = n.icon
            return (
              <div
                key={n.label}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`,
                }}
              >
                <div
                  className={`flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-full border border-white/15 bg-[#0A0A0A] text-neutral-300 shadow-[0_0_16px_rgba(0,222,255,0.15)] ${
                    kind === 'software'
                      ? 'orbit-spin-reverse'
                      : 'orbit-spin'
                  }`}
                >
                  <Icon size={14} className="text-[#00DEFF]" strokeWidth={2} />
                  <span className="font-sans text-[8px] leading-none text-neutral-300">
                    {n.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <p className="relative mt-2 text-center font-sans text-xs text-neutral-400">
        {kind === 'software'
          ? 'Custom software modules orbit your core admin'
          : 'Customers, employees, and deals in one hub'}
      </p>
    </div>
  )
}
