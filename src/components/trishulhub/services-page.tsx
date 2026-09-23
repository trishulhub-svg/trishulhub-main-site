'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Pencil,
  Code2,
  Rocket,
  Clock,
  ShieldCheck,
  Headphones,
  Gauge,
  Lock,
  Search,
  LifeBuoy,
  Layers,
  Plus,
  type LucideIcon,
} from 'lucide-react'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { CTA } from '@/components/trishulhub/cta'
import { HeroAccentWord } from '@/components/trishulhub/hero-accent-word'
import { ServiceVisual } from '@/components/trishulhub/service-visuals'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'
import { SERVICES_FAQ } from '@/lib/services-content'

type ServiceCard = {
  id: string
  num: string
  icon: LucideIcon
  title: string
  tagline: string
  outcomes: string[]
}

const services: ServiceCard[] = [
  {
    id: 'mobile',
    num: '01',
    icon: Smartphone,
    title: 'Mobile App Development',
    tagline: 'Your service in every pocket',
    outcomes: [
      'iOS and Android from one clear plan',
      'Push notifications that matter',
      'Secure login for users and staff',
      'Connects to your website or software',
    ],
  },
  {
    id: 'website',
    num: '02',
    icon: Globe,
    title: 'Website Development',
    tagline: 'Your business, clearly online',
    outcomes: [
      'Brand-matched pages that load quickly',
      'Contact, booking, and WhatsApp flows',
      'Shop or brochure layouts as needed',
      'Launch support and simple handoff',
    ],
  },
  {
    id: 'software',
    num: '03',
    icon: LayoutDashboard,
    title: 'Custom Software',
    tagline: 'Tools built around your workflow',
    outcomes: [
      'Role-based logins and permissions',
      'Dashboards and actionable reports',
      'Alerts, workflows, and daily ops screens',
      'Training so your team can run it',
    ],
  },
]

const steps = [
  {
    n: '01',
    title: 'Discover',
    text: 'A short WhatsApp or call to understand goals, budget, and constraints.',
    icon: MessageSquare,
  },
  {
    n: '02',
    title: 'Scope',
    text: 'A plain-English plan with timeline, milestones, and a clear quote.',
    icon: Pencil,
  },
  {
    n: '03',
    title: 'Build',
    text: 'Design and development with regular check-ins you can actually follow.',
    icon: Code2,
  },
  {
    n: '04',
    title: 'Launch',
    text: 'Go live with training, support, and room to grow later.',
    icon: Rocket,
  },
]

const reasons = [
  {
    icon: Clock,
    title: 'Clear timelines',
    text: 'You always know what happens next and when we expect to ship it.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready builds',
    text: 'We ship software people can use on day one — not demos that stall.',
  },
  {
    icon: Headphones,
    title: 'Human support',
    text: 'Talk to us on WhatsApp after launch. Real answers, not ticket queues.',
  },
]

const inclusions = [
  {
    icon: Gauge,
    title: 'Performance budget',
    text: 'We set a load-time target up front and measure it on the live site, not just locally.',
  },
  {
    icon: Search,
    title: 'Technical SEO foundations',
    text: 'Semantic markup, sitemap, structured data and metadata configured for real search visibility.',
  },
  {
    icon: Lock,
    title: 'Secure by default',
    text: 'Hashed credentials, scoped sessions, rate-limited APIs and no secrets in the client bundle.',
  },
  {
    icon: Layers,
    title: 'Admin you can actually use',
    text: 'Where content changes often, we ship a simple dashboard so you are not paying for edits.',
  },
  {
    icon: ShieldCheck,
    title: 'Analytics & monitoring',
    text: 'Traffic and error visibility wired in from launch, so problems surface before customers report them.',
  },
  {
    icon: LifeBuoy,
    title: 'Handover & support',
    text: 'Documentation, a walkthrough call and a support window after go-live. No lock-in.',
  },
] as { icon: LucideIcon; title: string; text: string }[]


// Service visuals (animated device / browser / dashboard mockups) live in ./service-visuals
export function ServicesPage() {
  const { links } = useSiteContact()
  const [step, setStep] = useState(0)

  // Sequential highlight for the "How we work" steps (same single-index
  // pattern used on the home page — one timer, no per-card choreography).
  useEffect(() => {
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % steps.length),
      2200,
    )
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden border-b border-[#e5e7eb] pt-28 pb-14 sm:pt-32 sm:pb-16">
        {/* Zero-request local hero background (CSS grid + animated aurora) */}
        <div aria-hidden className="th-hero-bg" />

        <div className="lt-container relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="max-w-3xl"
          >
            <span className="th-eyebrow mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
              Services
            </span>
            <h1 className="text-balance text-4xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
              Built for how your{' '}
              <HeroAccentWord words="business works" animate={false} />
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#6b7280] sm:text-lg">
              Websites, bespoke software, and mobile apps — engineered for speed,
              security, and the way your team actually works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service cards — video → heading → features → CTA */}
      <section id="services" className="scroll-mt-28 bg-white py-16 sm:py-24">
        <div className="lt-container">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <h2 className="text-[clamp(1.4rem,6.4vw,3rem)] font-bold uppercase tracking-[-0.03em] text-[#111111]">
              What we build <HeroAccentWord words="for you" animate={false} />
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[clamp(0.85rem,3.6vw,1rem)] text-[#6b7280]">
              Three focused services. Each one shipped with a clear scope,
              measurable speed targets and full handover.
            </p>
          </div>

          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-6">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.article
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="group scroll-mt-28 mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-[#0d3c1f]/12 bg-white shadow-[0_10px_40px_rgba(6,43,22,0.06)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#0d3c1f]/30 hover:shadow-[0_26px_60px_rgba(6,43,22,0.13)] lg:max-w-none"
                >
                  {/* Animated visual — full bleed, no surrounding frame */}
                  <div className="relative">
                    <ServiceVisual id={s.id} />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#0D3C1F] transition-colors duration-300 group-hover:bg-[#0D3C1F] group-hover:text-white">
                        <Icon size={18} strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0D3C1F]">
                          Service {s.num}
                        </p>
                        <p className="truncate text-xs text-[#6b7280]">
                          {s.tagline}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl lg:text-[1.4rem] lg:leading-snug">
                      {s.title}
                    </h3>

                    <ul className="mt-4 flex-1 space-y-3">
                      {s.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-[#374151] sm:text-[15px] lg:text-sm"
                        >
                          <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#e8f5ef] text-[#0D3C1F]">
                            <CheckCircle2 size={12} strokeWidth={2.2} />
                          </span>
                          {o}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 border-t border-[#0d3c1f]/8 pt-5">
                      <NexusButton href={links.whatsapp} fullWidth showArrow>
                        Talk about this
                      </NexusButton>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e5e7eb] bg-[#fafafa] py-16 sm:py-24">
        <div className="lt-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl">
              How we <HeroAccentWord words="work" animate={false} />
            </h2>
            <p className="mt-4 text-base text-[#6b7280]">
              A clear four-step path from first conversation to launch.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon
              const isActive = i === step
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  onMouseEnter={() => setStep(i)}
                  animate={{
                    y: isActive ? -6 : 0,
                    borderColor: isActive
                      ? 'rgba(13,60,31,0.35)'
                      : 'rgba(13,60,31,0.1)',
                    boxShadow: isActive
                      ? '0 18px 42px rgba(6,43,22,0.11)'
                      : '0 6px 20px rgba(6,43,22,0.04)',
                  }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.45,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="relative overflow-hidden rounded-2xl border bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-[11px] font-bold transition-colors duration-300 ${
                        isActive
                          ? 'bg-[#0D3C1F] text-white'
                          : 'bg-[#e8f5ef] text-[#0D3C1F]'
                      }`}
                    >
                      {s.n}
                    </span>
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className={isActive ? 'text-[#0D3C1F]' : 'text-[#9ca3af]'}
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#111111]">
                    {s.title}
                  </h3>
                  <p className="mt-2 pb-5 text-sm leading-relaxed text-[#6b7280]">
                    {s.text}
                  </p>
                  <span className="absolute inset-x-6 bottom-4 block h-[3px] overflow-hidden rounded-full bg-[#0d3c1f]/10">
                    <motion.span
                      className="block h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#5eead4]"
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 1.9, ease: 'linear' }}
                    />
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="lt-container">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl">
                Why teams choose{' '}
                <HeroAccentWord words="TrishulHub" animate={false} />
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#6b7280]">
                We keep projects understandable. You get a partner who explains
                trade-offs, ships in stages, and stays reachable after launch.
              </p>
              <div className="mt-8">
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 text-[15px] font-semibold text-[#111111] transition hover:text-[#0D3C1F]"
                >
                  Ask us anything
                  <ArrowRight size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
              {reasons.map((r, i) => {
                const Icon = r.icon
                return (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.45,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="flex gap-4 rounded-xl border border-[#111111] bg-[#fafafa] p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#0D3C1F]">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-bold text-[#111111]">{r.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">
                        {r.text}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What's always included */}
      <section className="border-y border-[#e5e7eb] bg-[#fafafa] py-16 sm:py-24">
        <div className="lt-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="th-eyebrow mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
              Always included
            </span>
            <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl">
              Every build ships with the{' '}
              <HeroAccentWord words="boring bits done right" animate={false} />
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#6b7280]">
              The fundamentals that keep a product healthy long after launch.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: EASE_OUT_EXPO }}
                  className="th-card rounded-2xl border border-[#111111]/12 bg-white p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#0D3C1F]">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                    {item.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="lt-container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <span className="th-eyebrow mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
                Questions
              </span>
              <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl">
                Answers before you{' '}
                <HeroAccentWord words="ask" animate={false} />
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#6b7280]">
                Still unsure about something? Message us on WhatsApp — you will
                get a straight answer, not a sales pitch.
              </p>
              <div className="mt-6">
                <NexusButton href={links.whatsapp} variant="secondary" showArrow>
                  Ask a question
                </NexusButton>
              </div>
            </div>

            <div className="divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
              {SERVICES_FAQ.map((f, i) => (
                <details key={f.q} className="group py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                    <span className="text-base font-semibold text-[#111111] sm:text-lg">
                      {f.q}
                    </span>
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#111111]/15 text-[#0D3C1F] transition group-open:rotate-45 group-open:border-[#0D3C1F] group-open:bg-[#0D3C1F] group-open:text-white">
                      <Plus size={14} />
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6b7280]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
