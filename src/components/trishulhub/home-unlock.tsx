'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  LayoutDashboard,
  Users,
  Zap,
  Shield,
  Cpu,
} from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

const orbitIcons = [
  { Icon: Globe, label: 'Web' },
  { Icon: LayoutDashboard, label: 'Admin' },
  { Icon: Users, label: 'CRM' },
  { Icon: Zap, label: 'Speed' },
  { Icon: Shield, label: 'Secure' },
  { Icon: Cpu, label: 'Build' },
]

export function HomeUnlock() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] stars-bg" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#00DEFF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[#0088CC]/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            Unlock custom growth
          </motion.span>
          <AnimatedHeading
            as="h2"
            variant="rise"
            className="text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Unlock systems that *actually fit* how you work
          </AnimatedHeading>
          <p className="mt-5 max-w-xl text-base text-neutral-400">
            Websites, custom software, and CRM — orbiting one craft approach.
            Preview a mock, then we build the real thing around your customers
            and team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="btn-cyan btn-shine inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/40 bg-gradient-to-b from-[#00DEFF]/25 to-[#0088CC]/20 px-6 py-3 text-sm font-semibold text-[#00DEFF] shadow-[0_0_24px_rgba(0,222,255,0.25)]"
            >
              Explore services
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md hover:text-[#00DEFF]"
            >
              Talk to us
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:col-span-6">
          <div className="relative h-[320px] w-[320px] scale-[0.65] sm:h-[420px] sm:w-[420px] sm:scale-100">
            {/* static rings */}
            <div className="absolute inset-6 rounded-full border border-white/10 opacity-30" />
            <div className="absolute inset-16 rounded-full border border-white/10 opacity-20" />
            <div className="absolute inset-[5.5rem] rounded-full border border-[#00DEFF]/20 opacity-30" />

            <motion.div
              style={{ rotate }}
              className="orbit-spin absolute inset-0"
            >
              {orbitIcons.map((item, i) => {
                const angle = (i / orbitIcons.length) * Math.PI * 2
                const r = 150
                const x = Math.cos(angle) * r
                const y = Math.sin(angle) * r
                return (
                  <div
                    key={item.label}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="orbit-spin-reverse flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-neutral-900/90 text-[#00DEFF] shadow-[0_0_20px_rgba(0,222,255,0.2)] backdrop-blur-md">
                      <item.Icon size={18} />
                    </div>
                  </div>
                )
              })}
            </motion.div>

            <div className="electric-card absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[24px] border border-white/10 bg-neutral-900/90 text-center backdrop-blur-md">
              <div
                className="text-2xl font-light text-white"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                3
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                Core lanes
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
