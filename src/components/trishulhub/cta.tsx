'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

export function CTA() {
  const reduce = useReducedMotion()
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
              className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg"
            >
              Work with TrishulHub to build scalable, high-quality digital
              solutions that help your business grow, perform better, and stay
              ahead in today&apos;s competitive market.
            </motion.p>

            {/* Contact info + CTA — staggered spring scale-in */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            >
              <motion.a
                href="mailto:trishulhub@gmail.com"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 200, damping: 18 },
                  },
                }}
                whileHover={reduce ? undefined : { scale: 1.05 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="btn-cyan btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00DEFF] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all sm:w-auto"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Get in Touch
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
              <motion.a
                href="mailto:trishulhub@gmail.com"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 200, damping: 18 },
                  },
                }}
                whileHover={reduce ? undefined : { scale: 1.05 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                className="btn-ghost inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#00DEFF]"
              >
                <Mail size={16} />
                trishulhub@gmail.com
              </motion.a>
              <motion.span
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 200, damping: 18 },
                  },
                }}
                className="inline-flex items-center gap-2 text-sm text-white/60"
              >
                <MapPin size={16} />
                India
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
