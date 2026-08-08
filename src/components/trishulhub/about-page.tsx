'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AboutHeroProtocol } from '@/components/trishulhub/about-hero-protocol'
import { AboutTimeline } from '@/components/trishulhub/about-timeline'
import { AboutProtocol } from '@/components/trishulhub/about-protocol'
import { AboutSignals } from '@/components/trishulhub/about-signals'
import { EASE_OUT_EXPO } from '@/lib/animations'

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
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
        <AboutHeroProtocol />
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
