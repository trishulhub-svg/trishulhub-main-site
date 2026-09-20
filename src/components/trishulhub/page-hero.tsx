'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT_EXPO } from '@/lib/animations'

type PageHeroProps = {
  title: ReactNode
  subtitle?: string
  label?: string
  /** Optional extra content rendered under the subtitle (chips, CTAs…) */
  children?: ReactNode
}

export function PageHero({ title, subtitle, label, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#e5e7eb] pt-28 pb-14 sm:pt-32 sm:pb-16">
      {/* Zero-request local hero background (CSS grid + animated aurora) */}
      <div aria-hidden className="th-hero-bg" />

      <div className="lt-container relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="max-w-3xl"
        >
          {label ? (
            <span className="th-eyebrow mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
              {label}
            </span>
          ) : null}
          <h1 className="text-balance text-4xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[#6b7280] sm:text-lg">
              {subtitle}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </motion.div>
      </div>
    </section>
  )
}
