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
    <section className="relative overflow-hidden bg-[#fafafa] pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div className="lt-glow pointer-events-none absolute -right-20 top-0 h-80 w-80 opacity-70" />
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
