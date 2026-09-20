'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, Mail, MessageCircle, ShieldCheck } from 'lucide-react'
import { HeroAccentWord } from './hero-accent-word'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const ASSURANCES = [
  { icon: Clock, label: 'Reply within 1 business day' },
  { icon: ShieldCheck, label: 'NDA-friendly, GDPR-aware' },
  { icon: MessageCircle, label: 'No obligation first call' },
] as const

export function CTA() {
  const { email, links } = useSiteContact()

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-20 sm:py-28">
      <div className="lt-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          className="th-conic-border relative isolate overflow-hidden rounded-[2rem] bg-[#07140c] px-6 py-14 text-center shadow-[0_30px_80px_rgba(6,43,22,0.28)] sm:px-14 sm:py-20"
        >
          {/* Aurora + grid overlay */}
          <div
            aria-hidden
            className="th-aurora-glow pointer-events-none absolute inset-0 opacity-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent_75%)]"
          />

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9ff0dd] backdrop-blur-sm">
              <span className="th-float h-1.5 w-1.5 rounded-full bg-[#5eead4]" />
              Available for new projects
            </span>

            <h2 className="text-balance mt-7 text-3xl font-bold uppercase tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
              Let&apos;s build something{' '}
              <HeroAccentWord words="worth shipping" animate={false} />
            </h2>

            <p className="text-pretty mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Tell us the outcome you need — a faster website, an internal tool
              that removes manual work, or an app your customers will actually
              use. We will come back with a clear plan.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#07140c] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(255,255,255,0.18)] sm:w-auto"
              >
                Start on WhatsApp
                <ArrowRight size={16} />
              </a>
              <a
                href={links.mailto}
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/5 sm:w-auto"
              >
                <Mail size={16} />
                {email}
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[12.5px] text-white/55">
              {ASSURANCES.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon size={14} className="text-[#5eead4]" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
