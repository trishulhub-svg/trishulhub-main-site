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
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="atelier-mesh absolute inset-0" />
        <div className="atelier-grain absolute inset-0" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="max-w-3xl"
        >
          {label ? <p className="section-label mb-4">{label}</p> : null}
          <h1 className="font-display text-4xl font-medium tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-8 h-px w-24 bg-gradient-to-r from-primary to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
