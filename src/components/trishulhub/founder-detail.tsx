'use client'

import { motion } from 'framer-motion'
import { HeroAccentWord } from '@/components/trishulhub/hero-accent-word'
import { EASE_OUT_EXPO } from '@/lib/animations'

type Founder = {
  name: string
  initial: string
  role: string
  bio: string
  image: string | null
}

/**
 * Owner request: the founder page shows only the photo, name, position and
 * description. Skills / education / experience / projects and the personal
 * contact fields were removed from both the page and the admin editor.
 */
export function FounderDetailClient({
  founder: f,
}: {
  slug: string
  founder: Founder
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111]">
      {/* Hero — padded for shared site navbar */}
      <section className="relative overflow-hidden border-b border-[#e5e7eb] px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8">
        <div className="lt-glow pointer-events-none absolute -right-20 top-0 h-[28rem] w-[28rem] opacity-60" />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            className="order-2 lg:order-1"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#6b7280]">
              Portfolio
            </p>
            <h1 className="text-4xl font-bold uppercase leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              I&apos;m <HeroAccentWord words={f.name} />
            </h1>
            <p className="mt-4 text-lg font-medium text-[#0D3C1F] sm:text-xl">
              {f.role}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#6b7280] sm:text-base">
              {f.bio}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="order-1 lg:order-2"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-[#111111] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5ef] to-[#fafafa]" />
              {f.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={f.image}
                  alt={f.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="select-none text-[160px] font-bold leading-none text-[#0D3C1F]/20 sm:text-[200px]">
                    {f.initial}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
