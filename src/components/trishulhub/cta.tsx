'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { NexusButton } from './nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

export function CTA() {
  const { email, links } = useSiteContact()

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="lt-glow pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          className="relative mx-auto max-w-3xl rounded-[2rem] border border-[#111111] bg-white px-8 py-14 text-center sm:px-14 sm:py-16"
        >
          <AnimatedHeading
            as="h2"
            variant="rise"
            stagger={0.09}
            duration={0.65}
            highlightColor="#75B4B1"
            className="text-3xl font-bold tracking-[-0.03em] text-[#111111] sm:text-4xl md:text-5xl"
          >
            Ready to build something for your *business?*
          </AnimatedHeading>
          <p className="mx-auto mt-6 max-w-xl text-base text-[#6b7280] sm:text-lg">
            Tell us what you need — a website, software, or a mobile app — and
            we will help you get started.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <NexusButton href={links.whatsapp}>Contact us</NexusButton>
            <a
              href={links.mailto}
              className="inline-flex items-center gap-2 text-sm text-[#6b7280] transition-colors hover:text-[#111111]"
            >
              <Mail size={16} />
              {email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
