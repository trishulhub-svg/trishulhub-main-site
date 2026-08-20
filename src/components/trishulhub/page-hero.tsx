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
    <section className="relative border-b border-border bg-gradient-to-b from-sky-50/80 to-background pt-24 pb-10 sm:pt-28 sm:pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(2,132,199,0.08),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="max-w-2xl"
        >
          {label ? (
            <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {label}
            </p>
          ) : null}
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
