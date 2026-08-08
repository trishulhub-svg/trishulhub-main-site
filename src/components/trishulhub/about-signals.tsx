'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  MessageCircle,
  Clock3,
  Handshake,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const lanes = [
  {
    icon: Globe,
    title: 'Website Development',
    text: 'Clear pages that help customers understand you and reach out.',
  },
  {
    icon: LayoutDashboard,
    title: 'Custom Software',
    text: 'Internal tools for stock, teams, shops, clinics, and daily ops.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    text: 'Phone apps your customers or staff can use on the go.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Listen',
    text: 'We learn how your business works today — not only what you want on screen.',
  },
  {
    step: '02',
    title: 'Plan',
    text: 'You get a simple scope, timeline, and cost before we write a single line.',
  },
  {
    step: '03',
    title: 'Build',
    text: 'We ship in clear stages so you can see progress and give feedback early.',
  },
  {
    step: '04',
    title: 'Support',
    text: 'After launch we stay available for fixes, tweaks, and the next version.',
  },
]

const values = [
  'Plain language — no jargon wall',
  'Timelines you can trust',
  'Tools shaped around your process',
  'One team for web, software, and apps',
]

const audiences = [
  'Local shops',
  'Clinics & care',
  'Growing teams',
  'Service brands',
  'Founders',
  'Operations leads',
]

export function AboutSignals() {
  const { links } = useSiteContact()

  return (
    <section className="relative mt-28 sm:mt-36">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0C] px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex w-full flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex max-w-3xl flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#00DEFF]/25 bg-[#00DEFF]/10 font-display text-[11px] font-medium text-[#00DEFF] shadow-[0_0_10px_rgba(0,222,255,0.25)]">
                02
              </span>
              <span className="font-display text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                How we work with you
              </span>
            </div>
            <AnimatedHeading
              as="h2"
              variant="rise"
              className="font-display text-4xl font-light tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              A studio that stays close to your business
            </AnimatedHeading>
            <p className="max-w-xl font-sans text-lg font-light leading-relaxed text-neutral-400">
              We are not a faceless agency. We plan with you, build what you
              actually need, and keep communication simple from first call to
              launch.
            </p>
          </div>
          <NexusButton href={links.whatsapp}>Talk on WhatsApp</NexusButton>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* What we build */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-7"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,222,255,0.12),transparent_55%)]" />
            <div className="relative">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-[#00DEFF]">
                What we build
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
                Three clear lanes. One team.
              </h3>
              <p className="mt-2 max-w-lg font-sans text-sm leading-relaxed text-neutral-400 sm:text-base">
                Pick the lane that fits today — we can grow with you into the
                next one later.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {lanes.map((lane, i) => {
                  const Icon = lane.icon
                  return (
                    <motion.div
                      key={lane.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.08 * i,
                        duration: 0.45,
                        ease: EASE_OUT_EXPO,
                      }}
                      className="rounded-2xl border border-white/10 bg-[#0A0A0C]/80 p-4"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#00DEFF]/25 bg-[#00DEFF]/10 text-[#00DEFF]">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <h4 className="mt-4 font-display text-base font-semibold text-white">
                        {lane.title}
                      </h4>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-400">
                        {lane.text}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Promise */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-5"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,222,255,0.14),transparent_55%)]" />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#00DEFF]/25 bg-[#00DEFF]/10 text-[#00DEFF]">
                <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
                Easy to reach. Easy to follow.
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-400 sm:text-base">
                Most first replies land within a day on WhatsApp. Updates stay
                short and clear so you always know what is next.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { icon: Clock3, label: 'Quick first reply' },
                  { icon: Handshake, label: 'Direct founder contact' },
                  { icon: Sparkles, label: 'Simple weekly updates' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0A0A0C]/70 px-3 py-2.5"
                    >
                      <Icon className="h-4 w-4 text-[#00DEFF]" strokeWidth={1.7} />
                      <span className="font-sans text-sm text-neutral-200">
                        {item.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE_OUT_EXPO }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-7"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,222,255,0.1),transparent_55%)]" />
            <div className="relative">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-[#00DEFF]">
                Project path
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
                From first idea to a live product
              </h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {steps.map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.06 * i,
                      duration: 0.4,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="rounded-2xl border border-white/10 bg-[#0A0A0C]/75 p-4"
                  >
                    <span className="font-display text-xs font-semibold tracking-[0.2em] text-[#00DEFF]">
                      {item.step}
                    </span>
                    <h4 className="mt-2 font-display text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-neutral-400">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Values + audiences */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:col-span-5"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,136,204,0.16),transparent_60%)]" />
            <div className="relative">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-[#00DEFF]">
                What we stand for
              </p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
                Honest work over hype
              </h3>
              <ul className="mt-6 space-y-3">
                {values.map((value) => (
                  <li
                    key={value}
                    className="flex items-start gap-3 font-sans text-sm text-neutral-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00DEFF]" />
                    {value}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  Who we help
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {audiences.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-[#0A0A0C]/80 px-3 py-1.5 font-sans text-xs text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
