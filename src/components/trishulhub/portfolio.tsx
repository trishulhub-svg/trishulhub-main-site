'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

const projects = [
  {
    title: 'SaaS Analytics Platform',
    category: 'Web Development',
    desc: 'Real-time analytics dashboard built with Next.js, Prisma, and WebSocket.',
    tag: '2024',
    gradient: 'linear-gradient(135deg, #00DEFF 0%, #0088CC 100%)',
  },
  {
    title: 'E-commerce Marketplace',
    category: 'E-commerce',
    desc: 'Full-featured marketplace with secure payments and inventory management.',
    tag: '2024',
    gradient: 'linear-gradient(135deg, #0088CC 0%, #00DEFF 100%)',
  },
  {
    title: 'CRM Automation Suite',
    category: 'CRM Solutions',
    desc: 'Customer relationship system streamlining workflows for a growing sales team.',
    tag: '2023',
    gradient: 'linear-gradient(135deg, #00DEFF 0%, #005577 100%)',
  },
  {
    title: 'Fintech Mobile App',
    category: 'Software Development',
    desc: 'Cross-platform fintech application with bank-grade security and real-time data.',
    tag: '2023',
    gradient: 'linear-gradient(135deg, #005577 0%, #00DEFF 100%)',
  },
]

export function Portfolio() {
  const reduce = useReducedMotion()
  return (
    <section id="portfolio" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#00DEFF]"
          >
            Portfolio
          </motion.div>
          <AnimatedHeading
            as="h2"
            variant="rise"
            stagger={0.1}
            duration={0.6}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Selected *Work*
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-4 max-w-2xl text-base text-white/50 sm:text-lg"
          >
            A glimpse of the digital products we&apos;ve crafted for clients
            across industries.
          </motion.p>
        </div>

        {/* Staggered card grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {projects.map((p) => (
            <motion.a
              key={p.title}
              href="#contact"
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                },
              }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -12,
                      boxShadow: '0 25px 50px -12px rgba(0,222,255,0.25)',
                    }
              }
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors duration-400 hover:border-[#00DEFF]/50"
            >
              {/* "Image" placeholder — gradient block that ZOOMS on hover.
               * We don't have real project images, so we use a themed gradient
               * that mimics the "image zoom on hover" effect the user asked for. */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-30 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-50"
                style={{
                  background: p.gradient,
                  transformOrigin: 'center',
                }}
                aria-hidden="true"
              />

              {/* Overlay fade — darkens the gradient so text stays readable,
               * fades to slightly transparent on hover to reveal the zoom */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 bg-[#0A0A0A]/80 transition-opacity duration-500 group-hover:bg-[#0A0A0A]/60"
                aria-hidden="true"
              />

              {/* Hover glow blob */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
              />

              <div className="relative flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#00DEFF]">
                    {p.category}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold text-white transition-transform duration-400 group-hover:translate-x-1">
                    {p.title}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 backdrop-blur-sm">
                  {p.tag}
                </span>
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-white/60">
                {p.desc}
              </p>
              <div className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors group-hover:text-[#00DEFF]">
                View Case Study
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
