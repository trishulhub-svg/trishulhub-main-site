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
} from 'lucide-react'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { CTA } from '@/components/trishulhub/cta'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const services = [
  {
    id: 'website',
    icon: Globe,
    title: 'Website Development',
    desc: 'Professional websites that look great, load fast, and help customers take action.',
    features: [
      'Brand-matched pages',
      'Mobile-first layouts',
      'Contact & WhatsApp forms',
      'Launch support',
    ],
  },
  {
    id: 'software',
    icon: LayoutDashboard,
    title: 'Custom Software',
    desc: 'Admin panels and business tools built around how your team already works.',
    features: [
      'Role-based access',
      'Dashboards & reports',
      'Alerts & workflows',
      'Team training',
    ],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Android and iPhone apps for customers or staff — simple, reliable, and ready to grow.',
    features: [
      'iOS & Android',
      'Push notifications',
      'Secure login',
      'System integrations',
    ],
  },
]

const details = [
  {
    id: 'website',
    badge: 'Websites',
    title: 'A professional online home for your business',
    text: 'We design and build websites that make your offer clear — so visitors know who you are, what you do, and how to reach you.',
    bullets: [
      'Landing pages, shops, and business sites',
      'Fast loading on phones and desktops',
      'Easy updates after launch',
    ],
    reverse: false,
  },
  {
    id: 'software',
    badge: 'Software',
    title: 'Tools that match how your team works',
    text: 'Stop forcing your process into generic software. We build panels for stock, orders, staff, clinics, and day-to-day ops.',
    bullets: [
      'Screens designed with your staff',
      'Safe logins for each role',
      'Clear reports you can act on',
    ],
    reverse: true,
  },
  {
    id: 'mobile',
    badge: 'Mobile',
    title: 'Your business in your customers’ pocket',
    text: 'Apps that help people book, order, track, or get updates on the go — for customers or your field team.',
    bullets: [
      'Clean, tap-friendly screens',
      'Push alerts when it matters',
      'Connects with your website or software',
    ],
    reverse: false,
  },
]

const steps = [
  {
    n: '01',
    title: 'Talk',
    text: 'Tell us your goals and budget on WhatsApp or a short call.',
    icon: MessageSquare,
  },
  {
    n: '02',
    title: 'Plan',
    text: 'We share a clear scope, timeline, and simple quote.',
    icon: Pencil,
  },
  {
    n: '03',
    title: 'Build',
    text: 'We design and develop with weekly progress updates.',
    icon: Code2,
  },
  {
    n: '04',
    title: 'Launch',
    text: 'Go live with training, support, and room to grow.',
    icon: Rocket,
  },
]

const techs = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Prisma',
  'Tailwind',
  'Vercel',
]

export function ServicesPage() {
  const { links } = useSiteContact()

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden bg-[#fafafa] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="lt-glow pointer-events-none absolute right-0 top-10 h-96 w-96 opacity-80" />
        <div className="lt-container relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-[#6b7280]">Services</p>
            <h1 className="text-4xl font-extrabold tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
              Custom solutions for your{' '}
              <span className="accent-text accent-underline">business</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#6b7280]">
              Websites, software, and mobile apps — explained simply, built
              carefully, and ready for real customers.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NexusButton href={links.whatsapp}>Start a project</NexusButton>
              <NexusButton href="#services-grid" variant="secondary">
                Browse services
              </NexusButton>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="lt-glow absolute inset-0" />
            <div className="absolute left-[8%] top-[12%] rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="mb-2 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/70" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-40 rounded bg-[#e5e7eb]" />
                <div className="h-2 w-28 rounded bg-[#e0f7fa]" />
                <div className="h-2 w-36 rounded bg-[#e5e7eb]" />
              </div>
            </div>
            <div className="absolute right-[6%] top-[36%] rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <LayoutDashboard className="text-[#0d9488]" size={28} />
              <p className="mt-2 text-sm font-semibold">Admin dashboard</p>
            </div>
            <div className="absolute bottom-[14%] left-[18%] rounded-[1.5rem] border-[6px] border-[#0a0a0a] bg-white p-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="flex h-28 w-16 flex-col gap-2 rounded-lg bg-gradient-to-b from-[#e0f7fa] to-[#c8e6c9] p-2">
                <div className="h-2 w-full rounded bg-white/70" />
                <div className="h-2 w-3/4 rounded bg-white/50" />
                <Smartphone className="mx-auto mt-auto text-[#0d9488]" size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services-grid" className="lt-section scroll-mt-28 bg-white">
        <div className="lt-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl">
              What we build for you
            </h2>
            <p className="mt-4 text-base text-[#6b7280]">
              Three services. Clear outcomes. Easy next steps.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.article
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="surface-card scroll-mt-28 flex flex-col p-8 hover:-translate-y-1"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9] text-[#0d9488]">
                    <Icon size={28} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a0a0a]">{s.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-[#6b7280]">
                    {s.desc}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-[#6b7280]"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-[#0d9488]"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0a0a0a] transition hover:text-[#0d9488]"
                  >
                    Learn more <ArrowRight size={16} />
                  </a>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {details.map((d) => (
        <section
          key={d.id}
          className={`lt-section ${d.reverse ? 'bg-[#fafafa]' : 'bg-white'}`}
        >
          <div
            className={`lt-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              d.reverse ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] min-h-[280px] flex items-center justify-center">
              <div className="rounded-2xl bg-white/90 px-8 py-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <p className="text-sm font-semibold text-[#0d9488]">{d.badge}</p>
                <p className="mt-2 text-xl font-bold text-[#0a0a0a]">Preview</p>
              </div>
            </div>
            <div>
              <span className="inline-block rounded-full bg-[#e0f7fa] px-3 py-1 text-[13px] font-medium text-[#0d9488]">
                {d.badge}
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-4xl">
                {d.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#6b7280]">
                {d.text}
              </p>
              <ul className="mt-6 space-y-3">
                {d.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[#6b7280]">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#0d9488]"
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <NexusButton href={links.whatsapp}>Talk about this</NexusButton>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="lt-section bg-white">
        <div className="lt-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0a0a]">
              How we work
            </h2>
            <p className="mt-3 text-[#6b7280]">
              A clear four-step path from first conversation to launch.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.n} className="relative">
                  {i < steps.length - 1 ? (
                    <div
                      className="pointer-events-none absolute left-[calc(50%+40px)] top-8 hidden h-px w-[calc(100%-40px)] border-t border-dashed border-[#d1d5db] lg:block"
                      aria-hidden
                    />
                  ) : null}
                  <div className="surface-card p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9] text-sm font-bold text-[#0d9488]">
                      {s.n}
                    </div>
                    <Icon className="mx-auto mt-4 text-[#0d9488]" size={22} />
                    <h3 className="mt-3 font-bold text-[#0a0a0a]">{s.title}</h3>
                    <p className="mt-2 text-sm text-[#6b7280]">{s.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="lt-section bg-[#fafafa]">
        <div className="lt-container">
          <h2 className="text-center text-3xl font-bold text-[#0a0a0a] sm:text-4xl">
            Technologies we use
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {techs.map((t) => (
              <div
                key={t}
                className="flex h-16 items-center justify-center rounded-2xl border border-[#e5e7eb] bg-white text-sm font-semibold text-[#9ca3af] transition hover:text-[#0d9488]"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
