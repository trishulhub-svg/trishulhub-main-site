'use client'

import { motion } from 'framer-motion'
import { HeroAccentWord } from './hero-accent-word'
import { EASE_OUT_EXPO } from '@/lib/animations'

type Founder = {
  slug: string
  initial: string
  name: string
  role: string
  bio: string
  image?: string | null
}

export function Team({ founders }: { founders: Founder[] }) {
  return (
    <section
      id="founders"
      className="relative overflow-hidden bg-[#fafafa] px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="lt-glow pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 opacity-50" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-4 text-sm font-medium text-[#6b7280]"
          >
            Our founders
          </motion.p>
          <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl lg:text-5xl">
            Meet our <HeroAccentWord words="founders" animate={false} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6b7280] sm:text-lg"
          >
            Meet Taroon and Pruthviraj — the people behind TrishulHub.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {founders.map((m) => {
            const founderImage = m.image || null

            return (
              <motion.div
                key={m.slug}
                data-team-card
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
                  },
                }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="relative flex flex-col overflow-hidden rounded-xl border border-[#111111] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5ef] to-[#fafafa]" />

                  {founderImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founderImage}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: 'center top' }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="select-none text-[120px] font-bold leading-none text-[#0D3C1F]/25 sm:text-[140px]">
                        {m.initial}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#111111]">{m.name}</h3>
                    <span className="text-sm font-medium text-[#0D3C1F]">
                      {m.role}
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">
                      {m.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center gap-2 rounded-full bg-[#0D3C1F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#164a28]"
          >
            Contact us
          </motion.a>
        </div>
      </div>
    </section>
  )
}
