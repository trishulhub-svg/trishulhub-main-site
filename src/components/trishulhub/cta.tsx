'use client'

import { motion } from 'framer-motion'
import { NexusButton } from './nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

export function CTA() {
  const { links } = useSiteContact()

  return (
    <section className="lt-section relative overflow-hidden bg-[#fafafa]">
      <div className="lt-glow pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 opacity-80" />
      <div className="lt-container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white px-8 py-14 text-center shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:px-12"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 600 320"
            aria-hidden
          >
            <path d="M40 40 C 120 80, 100 160, 40 220" className="lt-dotted" />
            <path d="M560 40 C 480 80, 500 160, 560 220" className="lt-dotted" />
          </svg>
          <h2 className="relative text-3xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-4xl md:text-5xl">
            Get started with TrishulHub
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-base text-[#6b7280]">
            Tell us what you need — a website, software, or a mobile app — and
            we will help you get started.
          </p>
          <div className="relative mt-8 flex justify-center">
            <NexusButton href={links.whatsapp}>Contact us</NexusButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
