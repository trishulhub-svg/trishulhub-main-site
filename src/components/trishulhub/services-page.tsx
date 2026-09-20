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
import { HeroAccentWord } from '@/components/trishulhub/hero-accent-word'
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
    videoSrc:
      'https://videotourl.com/videos/1787245173747-a2d523b8-abc8-499e-a55e-c746f4011a13.mp4',
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
    videoSrc:
      'https://videotourl.com/videos/1787247239567-7ce4f36c-c7d1-4823-92ae-02a36884da79.mp4',
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
    videoSrc:
      'https://videotourl.com/videos/1787247148510-55835ce0-2d21-4fbe-874a-23cac01637ce.mp4',
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

function MobileAppGraphic() {
  return (
    <div className="relative flex aspect-[10/9] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#0D3C1F]/90 via-[#0a2f18] to-[#051a0d] p-6 text-white shadow-inner sm:aspect-[5/4] lg:aspect-[4/5] lg:min-h-[260px]">
      {/* Ambient background glow & grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#10b981] blur-2xl"
      />

      {/* Animated Mobile Frame Mockup */}
      <div className="relative z-10 w-full max-w-[200px] rounded-2xl border-2 border-white/20 bg-black/40 p-3 backdrop-blur-md shadow-2xl">
        {/* Top bar & notch */}
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/30" />
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-white/70">
          <span className="font-semibold text-emerald-400">iOS / Android</span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          />
        </div>

        {/* Animated App UI Elements */}
        <div className="mt-3 space-y-2">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-lg bg-white/10 p-2 border border-white/10"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Smartphone size={12} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-12 rounded bg-white/60" />
                <div className="h-1 w-16 rounded bg-white/30" />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="flex items-center justify-between rounded-lg bg-emerald-950/60 p-2 border border-emerald-500/30"
          >
            <span className="text-[10px] text-emerald-300 font-medium">Push Notification</span>
            <span className="text-[9px] rounded bg-emerald-500/30 px-1.5 py-0.5 text-emerald-200">Active</span>
          </motion.div>

          <div className="flex gap-1.5 pt-1">
            <div className="h-4 flex-1 rounded bg-white/15" />
            <div className="h-4 flex-1 rounded bg-emerald-500/40" />
          </div>
        </div>
      </div>
    </div>
  )
}

function WebGraphic() {
  return (
    <div className="relative flex aspect-[10/9] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#091e2b] via-[#0b2b3d] to-[#04121b] p-6 text-white shadow-inner sm:aspect-[5/4] lg:aspect-[4/5] lg:min-h-[260px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#00DEFF_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-cyan-500 blur-2xl"
      />

      {/* Animated Browser Window Mockup */}
      <div className="relative z-10 w-full max-w-[220px] rounded-xl border border-white/20 bg-black/40 p-3 backdrop-blur-md shadow-2xl">
        {/* Browser Top Navigation Bar */}
        <div className="flex items-center gap-1.5 border-b border-white/10 pb-2">
          <span className="h-2 w-2 rounded-full bg-rose-500/80" />
          <span className="h-2 w-2 rounded-full bg-amber-500/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
          <div className="ml-2 flex-1 rounded bg-white/10 px-2 py-0.5 text-[8px] text-cyan-300 truncate">
            trishulhub.com/live
          </div>
        </div>

        {/* Web Visual Elements */}
        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <motion.div
              animate={{ scale: [0.98, 1, 0.98] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="flex-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 p-2 text-center"
            >
              <span className="text-[11px] font-bold text-cyan-300">99.9%</span>
              <p className="text-[8px] text-white/50">Speed Score</p>
            </motion.div>
            <div className="flex-1 rounded-md bg-white/5 border border-white/10 p-2 text-center">
              <span className="text-[11px] font-bold text-white">Edge</span>
              <p className="text-[8px] text-white/50">CDN Global</p>
            </div>
          </div>

          <motion.div
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center justify-between rounded-md bg-white/10 p-2"
          >
            <span className="text-[9px] text-white/80">Next.js & SSR Ready</span>
            <Globe size={11} className="text-cyan-400" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function SoftwareGraphic() {
  return (
    <div className="relative flex aspect-[10/9] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#1b1429] via-[#241a37] to-[#100b1a] p-6 text-white shadow-inner sm:aspect-[5/4] lg:aspect-[4/5] lg:min-h-[260px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-6 -bottom-6 h-36 w-36 rounded-full bg-purple-600 blur-2xl"
      />

      {/* Animated Dashboard / Analytics Mockup */}
      <div className="relative z-10 w-full max-w-[220px] rounded-xl border border-white/20 bg-black/40 p-3 backdrop-blur-md shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <LayoutDashboard size={12} className="text-purple-400" />
            <span className="text-[10px] font-semibold text-purple-300">Custom Admin</span>
          </div>
          <span className="text-[8px] rounded bg-purple-500/20 px-1 py-0.5 text-purple-200">Live DB</span>
        </div>

        <div className="mt-3 space-y-2">
          {/* Mini Data Bar Chart Animation */}
          <div className="flex items-end gap-1.5 rounded-lg bg-white/5 p-2 border border-white/10 h-14">
            <motion.div
              animate={{ height: ['40%', '80%', '40%'] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="w-1/4 rounded-t bg-purple-400/60"
            />
            <motion.div
              animate={{ height: ['60%', '95%', '60%'] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }}
              className="w-1/4 rounded-t bg-purple-500"
            />
            <motion.div
              animate={{ height: ['30%', '70%', '30%'] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
              className="w-1/4 rounded-t bg-purple-400/80"
            />
            <motion.div
              animate={{ height: ['50%', '90%', '50%'] }}
              transition={{ duration: 2.3, repeat: Infinity, delay: 0.1 }}
              className="w-1/4 rounded-t bg-emerald-400"
            />
          </div>

          <div className="flex items-center justify-between text-[9px] text-white/60">
            <span>Real-time Sync</span>
            <span className="text-emerald-400 font-semibold">Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceMedia({ id }: { id: string }) {
  if (id === 'mobile') return <MobileAppGraphic />
  if (id === 'website') return <WebGraphic />
  if (id === 'software') return <SoftwareGraphic />
  return <WebGraphic />
}

export function ServicesPage() {
  const { links } = useSiteContact()

  const HERO_BG_MOBILE =
    'https://plain-apac-prod-public.komododecks.com/202608/21/dXF5hHeWvycu18MHGGoO/image.png'
  const HERO_BG_DESKTOP =
    'https://plain-apac-prod-public.komododecks.com/202608/21/hH54N30aWl3d4olZFyJz/image.png'

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden border-b border-[#e5e7eb] pt-28 pb-14 sm:pt-32 sm:pb-16">
        {/* PC background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
          style={{ backgroundImage: `url(${HERO_BG_DESKTOP})` }}
        />
        {/* Mobile background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: `url(${HERO_BG_MOBILE})` }}
        />
        {/* Soft veil so heading stays readable like About/Contact */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-white/55 md:bg-white/50"
        />

        <div className="lt-container relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="max-w-3xl"
          >
            <p className="mb-3 text-sm font-medium text-[#6b7280]">Services</p>
            <h1 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
              Built for how your{' '}
              <HeroAccentWord words="business works" animate={false} />
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#6b7280]">
              Mobile apps, websites, and custom software — each with a clear
              preview of what we build for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service cards — video → heading → features → CTA */}
      <section id="services" className="scroll-mt-28 bg-white py-16 sm:py-24">
        <div className="lt-container">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <h2 className="whitespace-nowrap text-[clamp(1.4rem,6.4vw,3rem)] font-bold uppercase tracking-[-0.03em] text-[#111111]">
              What we build <HeroAccentWord words="for you" animate={false} />
            </h2>
            <p className="mt-4 whitespace-nowrap text-[clamp(0.78rem,3.6vw,1rem)] text-[#6b7280]">
              Watch a preview, then pick the service that fits.
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
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="scroll-mt-28 mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#111111] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] lg:max-w-none"
                >
                  {/* Video on top (centered) → text → button */}
                  <div className="p-3 pb-0 sm:p-5 sm:pb-0 lg:p-4 lg:pb-0">
                    <ServiceMedia
                      id={s.id}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-5 lg:pt-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-[10px] font-semibold tracking-[0.16em] text-[#0D3C1F]">
                        {s.num}
                      </span>
                      <span className="text-xs font-medium text-[#6b7280]">
                        {s.tagline}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl lg:text-[1.35rem] lg:leading-snug">
                      {s.title}
                    </h3>

                    <ul className="mt-4 flex-1 space-y-2.5">
                      {s.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-2.5 text-sm text-[#111111] sm:text-[15px] lg:text-sm"
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
              How we <HeroAccentWord words="work" animate={false} />
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
