'use client'

import { motion } from 'framer-motion'
import {
  MessageCircle,
  ShieldCheck,
  Clock,
  HeartHandshake,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { EASE_OUT_EXPO } from '@/lib/animations'

type Pillar = {
  name: string
  desc: string
  icon: LucideIcon
}

const pillars: Pillar[] = [
  {
    name: 'Clear plans',
    desc: 'Plain-English scopes, timelines, and budgets before we start.',
    icon: MessageCircle,
  },
  {
    name: 'Quality work',
    desc: 'Clean builds you can trust — tested on real devices and workflows.',
    icon: ShieldCheck,
  },
  {
    name: 'On time',
    desc: 'Milestones you can track, with honest updates if anything shifts.',
    icon: Clock,
  },
  {
    name: 'Real support',
    desc: 'WhatsApp and email support after launch — not a ticket black hole.',
    icon: HeartHandshake,
  },
  {
    name: 'Built to grow',
    desc: 'Architecture that can expand as your team and customers grow.',
    icon: TrendingUp,
  },
]

export function HomeIntelligences() {
  return (
    <section className="relative overflow-hidden border-y border-[#e5e7eb] bg-white py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6b7280]">
            <HeartHandshake className="h-3.5 w-3.5 text-[#0d9488]" />
            The TrishulHub promise
          </span>

          <h2 className="mt-5 text-4xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-5xl">
            What you can expect{' '}
            <span className="accent-text">from us</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-[#6b7280] sm:text-lg">
            No jargon, no hidden steps — just a clear, friendly way of working
            that puts your business first.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.06,
                  ease: EASE_OUT_EXPO,
                }}
                className={`rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:border-[#0d9488]/30 hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:p-7 ${
                  i === 3 ? 'lg:col-start-1' : ''
                } ${i === 4 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e0f7fa] text-[#0d9488]">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-[#111111]">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                  {item.desc}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
