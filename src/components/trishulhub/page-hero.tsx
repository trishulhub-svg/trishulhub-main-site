'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT_EXPO } from '@/lib/animations'

const HERO_BG_MOBILE =
  'https://plain-apac-prod-public.komododecks.com/202608/21/dXF5hHeWvycu18MHGGoO/image.png'
const HERO_BG_DESKTOP =
  'https://plain-apac-prod-public.komododecks.com/202608/21/hH54N30aWl3d4olZFyJz/image.png'

type PageHeroProps = {
  title: ReactNode
  subtitle?: string
  label?: string
}

export function PageHero({ title, subtitle, label }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#e5e7eb] pt-28 pb-14 sm:pt-32 sm:pb-16">
      {/* PC background — same as Services */}
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
          {label ? (
            <p className="mb-3 text-sm font-medium text-[#6b7280]">{label}</p>
          ) : null}
          <h1 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#6b7280]">
              {subtitle}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
