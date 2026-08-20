'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/animations'

type PageHeroProps = {
  title: string
  subtitle?: string
  label?: string
}

export function PageHero({ title, subtitle, label }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#f9f9f9] pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="lt-glow pointer-events-none absolute right-0 top-0 h-72 w-72 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="max-w-2xl"
        >
          {label ? (
            <p className="mb-3 text-sm font-medium text-[#6b7280]">{label}</p>
          ) : null}
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#111111] sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6b7280] sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
