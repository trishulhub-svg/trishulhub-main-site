'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { HeroAccentWord } from '@/components/trishulhub/hero-accent-word'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'
import { HowWeWork } from '@/components/trishulhub/how-we-work'

/** Same facts shown on /about — restated here so the home page stands alone. */
const FACTS = [
  { value: '2023', label: 'Building since' },
  { value: '3', label: 'Core services' },
  { value: '1 day', label: 'Typical reply time' },
  { value: '100%', label: 'Code you own' },
] as const

export function HomeAbout() {
  const { links } = useSiteContact()

  return (
    <section id="about-home" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[26rem] w-[26rem] rounded-full bg-[#0d9488]/8 blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="th-eyebrow mb-5"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#0d9488]" />
              <span>About TrishulHub</span>
            </motion.span>
            <h2 className="text-balance text-4xl font-bold uppercase leading-[1.08] tracking-[-0.03em] text-[#111111] sm:text-5xl lg:text-6xl">
              We build the systems behind{' '}
              <HeroAccentWord words="growing businesses" animate={false} />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.55, ease: EASE_OUT_EXPO }}
              className="text-pretty font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              We started in 2023 building websites. Today we also design and
              engineer bespoke software and mobile apps — products that remove
              manual work, surface the right numbers, and stay fast as you grow.
            </motion.p>
            <div className="mt-7">
              <NexusButton href={links.whatsapp}>Talk on WhatsApp</NexusButton>
            </div>
          </div>
        </div>

        <HowWeWork />

        {/* Fact rail — the same numbers we stand behind, restyled */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {FACTS.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_OUT_EXPO }}
              className="th-card rounded-2xl border border-[#0d3c1f]/10 bg-white p-5 text-center sm:text-left"
            >
              <p className="font-playfair text-2xl font-semibold text-[#0D3C1F] sm:text-[1.7rem]">
                {f.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#6b7280]">
                {f.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
