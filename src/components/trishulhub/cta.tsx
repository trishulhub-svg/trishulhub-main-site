'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { NexusButton } from './nexus-button'
import { MAILTO_URL, SITE_EMAIL, WHATSAPP_URL } from '@/lib/contacts'
import { EASE_OUT_EXPO } from '@/lib/animations'

export function CTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="relative overflow-hidden rounded-3xl border border-[#00DEFF]/20 bg-[#00DEFF]/[0.05] p-8 backdrop-blur-md sm:p-14"
        >
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)',
            }}
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <AnimatedHeading
              as="h2"
              variant="rise"
              stagger={0.09}
              duration={0.65}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Ready to build something for your business?
            </AnimatedHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
              Tell us what you need — a website, software, or a mobile app —
              and we will help you get started.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <NexusButton href={WHATSAPP_URL}>Contact us</NexusButton>
              <a
                href={MAILTO_URL}
                className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#00DEFF]"
              >
                <Mail size={16} />
                {SITE_EMAIL}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
