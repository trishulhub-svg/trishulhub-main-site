'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AboutTimeline } from '@/components/trishulhub/about-timeline'
import { PageHero } from '@/components/trishulhub/page-hero'

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const layerA = useTransform(scrollYProgress, [0, 1], [0, -200])
  const layerB = useTransform(scrollYProgress, [0, 1], [0, 160])

  return (
    <div ref={ref} className="relative pb-28">
      <PageHero
        label="About us"
        title="The team behind TrishulHub"
        subtitle="We build websites, custom software, and mobile apps that help businesses work with clearer tools and fewer headaches."
      />

      <motion.div
        style={{ y: layerA }}
        className="pointer-events-none absolute left-[8%] top-40 h-64 w-64 rounded-full bg-[#75B4B1]/20 blur-[110px]"
      />
      <motion.div
        style={{ y: layerB }}
        className="pointer-events-none absolute right-[5%] top-[40%] h-80 w-80 rounded-full bg-[#75B4B1]/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <AboutTimeline />
      </div>
    </div>
  )
}
