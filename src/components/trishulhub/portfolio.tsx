'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FloatingVideo } from './floating-video'

const projects = [
  {
    title: 'SaaS Analytics Platform',
    category: 'Web Development',
    desc: 'Real-time analytics dashboard built with Next.js, Prisma, and WebSocket.',
    tag: '2024',
  },
  {
    title: 'E-commerce Marketplace',
    category: 'E-commerce',
    desc: 'Full-featured marketplace with secure payments and inventory management.',
    tag: '2024',
  },
  {
    title: 'CRM Automation Suite',
    category: 'CRM Solutions',
    desc: 'Customer relationship system streamlining workflows for a growing sales team.',
    tag: '2023',
  },
  {
    title: 'Fintech Mobile App',
    category: 'Software Development',
    desc: 'Cross-platform fintech application with bank-grade security and real-time data.',
    tag: '2023',
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-28">
      {/* Floating decorative video — serpentine iridescent glass, top-right corner.
        * Black background → mix-blend-mode: screen makes it transparent.
        * Glass already has strong blue/teal palette — natively matches the site. */}
      <FloatingVideo
        src="/videos/decor/gift-glass.mp4"
        corner="top-right"
        size={140}
        inset={32}
        hueRotate={0}
        saturate={1.3}
        brightness={1.15}
        opacity={0.8}
        zIndex={3}
        floatAmplitude={9}
        floatDuration={7.5}
        hideBelow={768}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#00DEFF]">
            Portfolio
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Selected Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/50 sm:text-lg">
            A glimpse of the digital products we&apos;ve crafted for clients
            across industries.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all hover:border-[#00DEFF]/50"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#00DEFF]">
                    {p.category}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {p.title}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                  {p.tag}
                </span>
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-white/50">
                {p.desc}
              </p>
              <div className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors group-hover:text-[#00DEFF]">
                View Case Study
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
