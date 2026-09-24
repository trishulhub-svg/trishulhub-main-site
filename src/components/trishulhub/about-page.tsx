'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AboutTimeline } from '@/components/trishulhub/about-timeline'
import { PageHero } from '@/components/trishulhub/page-hero'
import { HeroAccentWord } from '@/components/trishulhub/hero-accent-word'
import {
  Shield,
  HeartHandshake,
  Target,
  Sparkles,
  Globe,
  Gauge,
  Lock,
  Users,
} from 'lucide-react'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const principles = [
  {
    icon: Gauge,
    title: 'Speed is a feature',
    text: 'We treat load time and Core Web Vitals as product requirements, not afterthoughts.',
  },
  {
    icon: Globe,
    title: 'Built for the UK market',
    text: 'EU/UK hosting regions, GDPR-aware data handling and British English copy throughout.',
  },
  {
    icon: Lock,
    title: 'Own your stack',
    text: 'Your repository, your database, your accounts. No lock-in and no black boxes.',
  },
  {
    icon: Users,
    title: 'Small team, direct access',
    text: 'You speak to the people writing the code — not an account manager.',
  },
] as const

const stats = [
  { value: '2023', label: 'Building since' },
  { value: '3', label: 'Core services' },
  { value: '2-3 days', label: 'Typical reply time' },
  { value: '100%', label: 'Code you own' },
] as const

const values = [
  {
    icon: Target,
    title: 'Clarity first',
    text: 'Plain English plans, honest timelines, and no hidden jargon.',
  },
  {
    icon: Shield,
    title: 'Reliable builds',
    text: 'Products your team can trust every day — stable and secure.',
  },
  {
    icon: HeartHandshake,
    title: 'Close partnership',
    text: 'We stay near your business from kickoff through launch.',
  },
  {
    icon: Sparkles,
    title: 'Room to grow',
    text: 'Start simple, then improve as your customers and ops grow.',
  },
]

export function AboutValues() {
  return (
    <section className="lt-section bg-white">
      <div className="lt-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="th-eyebrow mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
            Values
          </span>
          <h2 className="text-3xl font-bold uppercase tracking-[-0.02em] text-[#0a0a0a] sm:text-4xl">
            How we show up for every{' '}
            <HeroAccentWord words="client project" animate={false} />
          </h2>
          <p className="mt-4 text-[#6b7280]">
            Four commitments we hold to on every engagement, large or small.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.45,
                  ease: EASE_OUT_EXPO,
                }}
                className="th-card rounded-2xl border border-[#111111]/12 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
              >
                {/* Solid brand tile: the old light gradient left the icon
                    barely visible against the card. */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D3C1F] text-white shadow-[0_8px_20px_rgba(13,60,31,0.18)]">
                  <Icon size={22} strokeWidth={1.7} />
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0a]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                  {v.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const layerA = useTransform(scrollYProgress, [0, 1], [0, -120])
  const { links } = useSiteContact()

  return (
    <div ref={ref} className="relative overflow-hidden pb-8">
      <PageHero
        label="About us"
        title={
          <>
            The team behind{' '}
            <HeroAccentWord words="TrishulHub" animate={false} />
          </>
        }
        subtitle="We are a UK-based studio building websites, bespoke software and mobile apps — the kind of tools that quietly remove friction from a business every single day."
      >
        <div className="flex flex-wrap items-center gap-3">
          <NexusButton href="/contact" showArrow>
            Contact us
          </NexusButton>
          <NexusButton href="/services" variant="secondary">
            See our services
          </NexusButton>
        </div>
      </PageHero>

      <motion.div
        style={{ y: layerA }}
        className="lt-glow pointer-events-none absolute left-[8%] top-40 h-64 w-64 opacity-50"
      />

      <div className="lt-container mt-6 md:mt-12 lg:mt-16">
        <div className="rounded-xl border border-[#111111] bg-white p-4 sm:p-6">
          <AboutTimeline />
        </div>
      </div>

      {/* Numbers that don't need spin */}
      <div className="lt-container mt-6">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#111111]/12 bg-white p-5 sm:grid-cols-4 sm:gap-6 sm:p-7">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE_OUT_EXPO }}
              className="text-center sm:text-left"
            >
              <p className="font-playfair text-2xl font-semibold text-[#0D3C1F] sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#6b7280]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How we operate */}
      <div className="lt-container mt-14 md:mt-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="th-eyebrow mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
            How we work
          </span>
          <h2 className="text-3xl font-bold uppercase tracking-[-0.02em] text-[#0a0a0a] sm:text-4xl">
            Principles behind every{' '}
            <HeroAccentWord words="build" animate={false} />
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: EASE_OUT_EXPO }}
                className="th-card rounded-2xl border border-[#111111]/12 bg-[#fafafa] p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#0D3C1F]/15 bg-[#0D3C1F] text-white">
                  <Icon size={19} strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-base font-bold text-[#0a0a0a]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                  {p.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
