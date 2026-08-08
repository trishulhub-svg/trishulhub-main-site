'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
        <div className="mb-10 max-w-3xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]">
            About us
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The team behind TrishulHub
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-white/60 sm:text-lg">
            We build websites, custom software, and mobile apps that help
            businesses work with clearer tools and fewer headaches.
          </p>
        </div>
        <AboutTimeline />
        <AboutSignals />
      </div>
    </div>
  )
}
