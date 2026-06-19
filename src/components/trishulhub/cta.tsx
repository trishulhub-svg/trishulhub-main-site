'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'

export function CTA() {
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-[#00DEFF]/20 bg-gradient-to-br from-[#00DEFF]/[0.07] via-transparent to-[#0088CC]/[0.05] p-8 sm:p-14"
        >
          {/* glows */}
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full opacity-20 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #0088CC 0%, transparent 70%)' }}
          />
          {/* grid */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

          <div className="relative mx-auto max-w-3xl text-center">
            <AnimatedHeading
              as="h2"
              variant="rise"
              stagger={0.09}
              duration={0.65}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Have an idea in mind? Let&apos;s turn it into *reality.*
            </AnimatedHeading>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
              Work with TrishulHub to build scalable, high-quality digital
              solutions that help your business grow, perform better, and stay
              ahead in today&apos;s competitive market.
            </p>

            {/* Contact info + CTA */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a
                href="mailto:trishulhub@gmail.com"
                className="btn-cyan btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00DEFF] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all sm:w-auto"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Get in Touch
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a
                href="mailto:trishulhub@gmail.com"
                className="btn-ghost inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#00DEFF]"
              >
                <Mail size={16} />
                trishulhub@gmail.com
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} />
                India
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
