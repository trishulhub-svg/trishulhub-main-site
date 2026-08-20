'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AboutTimeline } from '@/components/trishulhub/about-timeline'
import { PageHero } from '@/components/trishulhub/page-hero'
import { Shield, HeartHandshake, Target, Sparkles } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/lib/animations'

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

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const layerA = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <div ref={ref} className="relative pb-16">
      <PageHero
        label="About us"
        title={
          <>
            The team behind{' '}
            <span className="uppercase text-[#0D3C1F]">TrishulHub</span>
          </>
        }
        subtitle="We build websites, custom software, and mobile apps that help businesses work with clearer tools and fewer headaches."
      />

      <motion.div
        style={{ y: layerA }}
        className="lt-glow pointer-events-none absolute left-[8%] top-40 h-64 w-64 opacity-50"
      />

      <section className="lt-section bg-white">
        <div className="lt-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold uppercase tracking-[-0.02em] text-[#0a0a0a] sm:text-4xl">
              Our values
            </h2>
            <p className="mt-3 text-[#6b7280]">
              How we show up for every client project.
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
                  className="rounded-xl border border-[#111111] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9] text-[#0D3C1F]">
                    <Icon size={22} />
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

      <div className="lt-container">
        <div className="rounded-xl border border-[#111111] bg-white p-4 sm:p-6">
          <AboutTimeline />
        </div>
      </div>
    </div>
  )
}
