'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
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
              Have a business to run better? Let&apos;s *build the system.*
            </AnimatedHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
              Tell us what you need — a website, custom software, or CRM — and
              we will shape a solution that fits your customers and your team.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="btn-cyan btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#00DEFF]/40 bg-[#00DEFF]/10 px-7 py-3.5 text-sm font-semibold text-[#00DEFF] backdrop-blur-md transition-all hover:bg-[#00DEFF]/20 sm:w-auto"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Contact us
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
              <a
                href="mailto:trishulhub@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#00DEFF]"
              >
                <Mail size={16} />
                trishulhub@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
