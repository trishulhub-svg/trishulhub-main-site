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
  type LucideIcon,
} from 'lucide-react'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { CTA } from '@/components/trishulhub/cta'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

type ServiceCard = {
  id: string
  num: string
  icon: LucideIcon
  title: string
  tagline: string
  outcomes: string[]
  /** Canva / embed watch URL (iframe) */
  embedUrl?: string
  /** Aspect padding-top % matching Canva export (e.g. 90 for 90%) */
  embedAspectPct?: number
  /** Optional mp4 for native muted loop */
  videoSrc?: string
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
    embedUrl:
      'https://www.canva.com/design/DAHS16euWg8/SioYRL4f4ITfmCOMkUHhWA/watch?embed',
    embedAspectPct: 90,
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
    // Video embed coming next
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
    // Video embed coming next
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

function ServiceMedia({
  title,
  embedUrl,
  embedAspectPct = 90,
  videoSrc,
  icon: Icon,
}: {
  title: string
  embedUrl?: string
  embedAspectPct?: number
  videoSrc?: string
  icon: LucideIcon
}) {
  if (videoSrc) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg bg-[#0D3C1F]/5 shadow-[0_2px_8px_rgba(63,69,81,0.16)]">
        <video
          className="aspect-[10/9] w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-label={`${title} preview`}
        />
      </div>
    )
  }

  if (embedUrl) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-lg shadow-[0_2px_8px_rgba(63,69,81,0.16)]"
        style={{
          height: 0,
          paddingTop: `${embedAspectPct}%`,
        }}
      >
        <iframe
          loading="lazy"
          title={`${title} preview`}
          className="absolute inset-0 h-full w-full border-0"
          src={embedUrl}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // Placeholder until video is provided
  return (
    <div className="relative flex aspect-[10/9] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9] shadow-[0_2px_8px_rgba(63,69,81,0.16)]">
      <div className="text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-[#0D3C1F]">
          <Icon size={28} strokeWidth={1.5} />
        </span>
        <p className="mt-3 text-xs font-medium text-[#0D3C1F]/70">
          Preview video coming soon
        </p>
      </div>
    </div>
  )
}

export function ServicesPage() {
  const { links } = useSiteContact()

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden border-b border-[#e5e7eb] bg-[#fafafa] pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="lt-glow pointer-events-none absolute -right-20 top-0 h-[28rem] w-[28rem] opacity-70" />
        <div className="lt-container relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <p className="mb-4 text-sm font-medium text-[#6b7280]">Services</p>
            <h1 className="text-4xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-5xl lg:text-6xl">
              Built for how your{' '}
              <span className="accent-text">business works</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#6b7280] sm:text-lg">
              Mobile apps, websites, and custom software — each with a clear
              preview of what we build for you.
            </p>
            <div className="mt-8 flex justify-center">
              <NexusButton href={links.whatsapp}>Start a project</NexusButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service cards — video → heading → features → CTA */}
      <section id="services" className="scroll-mt-28 bg-white py-16 sm:py-24">
        <div className="lt-container">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl md:text-5xl">
              What we build{' '}
              <span className="accent-text">for you</span>
            </h2>
            <p className="mt-4 text-base text-[#6b7280]">
              Watch a preview, then pick the service that fits.
            </p>
          </div>

          <div className="flex flex-col gap-8 xl:snap-y xl:snap-mandatory xl:gap-0">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.article
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="scroll-mt-28 flex w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#111111] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] mx-auto xl:min-h-[calc(100vh-7rem)] xl:max-w-4xl xl:snap-start xl:snap-always xl:justify-center xl:py-8"
                >
                  <div className="p-3 pb-0 sm:p-4 sm:pb-0">
                    <ServiceMedia
                      title={s.title}
                      embedUrl={s.embedUrl}
                      embedAspectPct={s.embedAspectPct}
                      videoSrc={s.videoSrc}
                      icon={Icon}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-[10px] font-semibold tracking-[0.16em] text-[#0D3C1F]">
                        {s.num}
                      </span>
                      <span className="text-xs font-medium text-[#6b7280]">
                        {s.tagline}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
                      {s.title}
                    </h3>

                    <ul className="mt-4 flex-1 space-y-2.5">
                      {s.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-2.5 text-sm text-[#111111]"
                        >
                          <CheckCircle2
                            size={16}
                            strokeWidth={1.5}
                            className="mt-0.5 shrink-0 text-[#0D3C1F]"
                          />
                          {o}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6">
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
              How we <span className="accent-text">work</span>
            </h2>
            <p className="mt-4 text-base text-[#6b7280]">
              A clear four-step path from first conversation to launch.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  className="rounded-xl border border-[#111111] bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.16em] text-[#0D3C1F]">
                      {s.n}
                    </span>
                    <Icon size={18} strokeWidth={1.5} className="text-[#0D3C1F]" />
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

      <section className="bg-white py-16 sm:py-24">
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
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#111111] transition hover:text-[#0D3C1F]"
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

      <CTA />
    </div>
  )
}
