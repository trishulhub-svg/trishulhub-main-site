'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AboutHeroProtocol } from '@/components/trishulhub/about-hero-protocol'
import { AboutTimeline } from '@/components/trishulhub/about-timeline'
import { AboutSignals } from '@/components/trishulhub/about-signals'

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
        <AboutSignals />
      </div>
    </div>
  )
}
