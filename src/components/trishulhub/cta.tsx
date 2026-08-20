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
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="relative overflow-hidden rounded-[2rem] bg-foreground px-8 py-14 text-white sm:px-14 sm:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-teal-400/30 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-teal-500/20 blur-[110px]"
          />
          <div className="atelier-grain absolute inset-0 opacity-[0.08]" />

          <div className="relative mx-auto max-w-3xl text-center">
            <AnimatedHeading
              as="h2"
              variant="rise"
              stagger={0.09}
              duration={0.65}
              className="font-display text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
            >
              Ready to build something for your business?
            </AnimatedHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
              Tell us what you need — a website, software, or a mobile app —
              and we will help you get started.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <NexusButton href={links.whatsapp}>Contact us</NexusButton>
              <a
                href={links.mailto}
                className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-teal-300"
              >
                <Mail size={16} />
                {email}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
