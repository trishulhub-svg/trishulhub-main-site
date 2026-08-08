'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import { AboutTimeline } from '@/components/trishulhub/about-timeline'
import { AboutProtocol } from '@/components/trishulhub/about-protocol'
import { AboutSignals } from '@/components/trishulhub/about-signals'
import { EASE_OUT_EXPO } from '@/lib/animations'

const pillars = [
  {
    title: 'Built around real work',
    text: 'We do not force a generic product onto your team. Websites, admin panels, and CRMs are shaped around how you sell, serve, and operate.',
  },
  {
    title: 'Three clear lanes',
    text: 'Custom software for ops. Web development for any customer need. CRM for employees and customers — each lane intentional.',
  },
  {
    title: 'Preview before commit',
    text: 'On our services page you can generate a tailored preview — then talk to us when the direction feels right.',
  },
]

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.35])
  const layerA = useTransform(scrollYProgress, [0, 1], [0, -200])
  const layerB = useTransform(scrollYProgress, [0, 1], [0, 160])
  const layerC = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <div ref={ref} className="relative pb-28 pt-28 sm:pt-32">
      <motion.div
        style={{ y: layerA }}
        className="pointer-events-none absolute left-[8%] top-40 h-64 w-64 rounded-full bg-[#00DEFF]/15 blur-[110px]"
      />
      <motion.div
        style={{ y: layerB }}
        className="pointer-events-none absolute right-[5%] top-[40%] h-80 w-80 rounded-full bg-[#0088CC]/20 blur-[120px]"
      />
      <motion.div
        style={{ y: layerC }}
        className="pointer-events-none absolute bottom-40 left-1/3 h-56 w-56 rounded-full bg-[#00DEFF]/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-4xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            About TrishulHub
          </motion.span>
          <AnimatedHeading
            as="h1"
            variant="rise"
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            We build the systems behind growing businesses
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT_EXPO }}
            className="mt-6 max-w-2xl font-sans text-base font-light text-white/60 sm:text-lg"
          >
            Founded in 2023 as a website studio, TrishulHub grew into custom
            software and CRM — so founders and teams can manage customers,
            operations, and growth without fighting their tools.
          </motion.p>
        </motion.div>

        <div className="mt-24 grid gap-6 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: EASE_OUT_EXPO,
              }}
              className="rounded-[18px] border border-white/10 bg-white/[0.03] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
            >
              <div className="mb-5 font-display text-sm font-semibold text-[#00DEFF]">
                0{i + 1}
              </div>
              <h2 className="font-display text-xl font-bold text-white">
                {p.title}
              </h2>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/55">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>

        <AboutTimeline />
        <AboutProtocol />
        <AboutSignals />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="relative mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#00DEFF]/10 via-transparent to-[#0088CC]/10 p-8 sm:p-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,222,255,0.12),transparent_45%)]" />
          <div className="relative max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Why teams choose us
            </h2>
            <p className="mt-4 font-sans text-base font-light text-white/60">
              Because every business is different. Some need a storefront. Some
              need inventory control. Some need a healthcare admin. Some need a
              CRM for staff and customers. We listen first — then build software
              that matches the work, not the other way around.
            </p>
            <Link
              href="/contact"
              className="btn-cyan btn-shine mt-8 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/40 bg-[#00DEFF]/10 px-6 py-3 text-sm font-semibold text-[#00DEFF]"
            >
              Talk with TrishulHub
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
