'use client'

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
} from 'lucide-react'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { CTA } from '@/components/trishulhub/cta'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const services = [
  {
    id: 'website',
    num: '01',
    icon: Globe,
    title: 'Website Development',
    tagline: 'Your business, clearly online',
    desc: 'Fast, mobile-first websites that explain what you do and make it easy for customers to contact you or buy.',
    outcomes: [
      'Brand-matched pages that load quickly',
      'Contact, booking, and WhatsApp flows',
      'Shop or brochure layouts as needed',
      'Launch support and simple handoff',
    ],
    fit: 'Best for businesses that need a credible online presence without complexity.',
  },
  {
    id: 'software',
    num: '02',
    icon: LayoutDashboard,
    title: 'Custom Software',
    tagline: 'Tools built around your workflow',
    desc: 'Admin panels and internal systems shaped around how your team already works — stock, orders, staff, clinics, and more.',
    outcomes: [
      'Role-based logins and permissions',
      'Dashboards and actionable reports',
      'Alerts, workflows, and daily ops screens',
      'Training so your team can run it',
    ],
    fit: 'Best when spreadsheets or generic tools no longer keep up.',
  },
  {
    id: 'mobile',
    num: '03',
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: 'Your service in every pocket',
    desc: 'Android and iPhone apps for customers or field staff — booking, ordering, tracking, and updates on the go.',
    outcomes: [
      'iOS and Android from one clear plan',
      'Push notifications that matter',
      'Secure login for users and staff',
      'Connects to your website or software',
    ],
    fit: 'Best when your customers or team need a reliable app, not another website tab.',
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

export function ServicesPage() {
  const { links } = useSiteContact()

  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#e5e7eb] bg-[#fafafa] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="lt-glow pointer-events-none absolute -right-20 top-0 h-[28rem] w-[28rem] opacity-70" />
        <div className="lt-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-4 text-sm font-medium text-[#6b7280]">Services</p>
            <h1 className="text-4xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-5xl lg:text-6xl">
              Built for how your{' '}
              <span className="accent-text">business works</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#6b7280] sm:text-lg">
              Three focused services — websites, custom software, and mobile
              apps — planned simply and delivered with care.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <NexusButton href={links.whatsapp}>Start a project</NexusButton>
              <NexusButton href="#services" variant="secondary">
                See what we offer
              </NexusButton>
            </div>
          </motion.div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.5,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="group flex items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition hover:border-[#0d9488]/35 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e0f7fa] text-[#0d9488] transition group-hover:scale-105">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block truncate text-sm font-semibold text-[#111111]">
                      {s.title}
                    </span>
                    <span className="block truncate text-xs text-[#6b7280]">
                      {s.tagline}
                    </span>
                  </span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service deep-dives */}
      <section id="services" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <div className="lt-container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl md:text-5xl">
              What we build{' '}
              <span className="accent-text">for you</span>
            </h2>
            <p className="mt-4 text-base text-[#6b7280]">
              Pick a lane — or tell us your problem and we will recommend one.
            </p>
          </div>

          <div className="space-y-8 lg:space-y-10">
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
                    delay: i * 0.05,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-[#e5e7eb] bg-[#fafafa] shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
                >
                  <div className="grid lg:grid-cols-12">
                    <div className="flex flex-col justify-between border-b border-[#e5e7eb] bg-white p-7 sm:p-9 lg:col-span-5 lg:border-b-0 lg:border-r">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold tracking-[0.18em] text-[#0d9488]">
                            {s.num}
                          </span>
                          <span className="h-px flex-1 bg-[#e5e7eb]" />
                        </div>
                        <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e0f7fa] text-[#0d9488]">
                          <Icon size={22} strokeWidth={1.75} />
                        </div>
                        <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-[#0d9488]">
                          {s.tagline}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-[#6b7280]">
                          {s.desc}
                        </p>
                      </div>
                      <div className="mt-8">
                        <NexusButton href={links.whatsapp} showArrow>
                          Talk about this
                        </NexusButton>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-7 sm:p-9 lg:col-span-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
                        What you get
                      </p>
                      <ul className="mt-4 space-y-3">
                        {s.outcomes.map((o) => (
                          <li
                            key={o}
                            className="flex items-start gap-3 text-[15px] text-[#111111]"
                          >
                            <CheckCircle2
                              size={18}
                              className="mt-0.5 shrink-0 text-[#0d9488]"
                            />
                            {o}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 rounded-2xl border border-[#e5e7eb] bg-white px-5 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
                          Good fit when
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#6b7280]">
                          {s.fit}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-[#e5e7eb] bg-[#fafafa] py-20 sm:py-28">
        <div className="lt-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl md:text-5xl">
              How we{' '}
              <span className="accent-text">work</span>
            </h2>
            <p className="mt-4 text-base text-[#6b7280]">
              A clear four-step path from first conversation to launch.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.45,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="relative rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.16em] text-[#0d9488]">
                      {s.n}
                    </span>
                    <Icon size={18} className="text-[#0d9488]" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#111111]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                    {s.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why TrishulHub */}
      <section className="bg-white py-20 sm:py-28">
        <div className="lt-container">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl">
                Why teams choose{' '}
                <span className="accent-text">TrishulHub</span>
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
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#111111] transition hover:text-[#0d9488]"
                >
                  Ask us anything
                  <ArrowRight size={16} />
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
                    className="flex gap-4 rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e0f7fa] text-[#0d9488]">
                      <Icon size={20} />
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

      <CTA />
    </div>
  )
}
