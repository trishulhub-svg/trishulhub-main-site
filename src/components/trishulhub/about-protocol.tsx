'use client'

import { motion } from 'framer-motion'
import {
  Compass,
  PenTool,
  Cpu,
  Rocket,
  RefreshCw,
  Link2,
} from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

const nodes = [
  {
    code: 'UDP-01',
    title: 'Listen first',
    text: 'Map how you sell, serve, and operate before a single screen is drawn.',
    icon: Compass,
  },
  {
    code: 'UDP-02',
    title: 'Design the system',
    text: 'Structure flows, roles, and brand language into a clear build plan.',
    icon: PenTool,
  },
  {
    code: 'UDP-03',
    title: 'Engineer the product',
    text: 'Ship websites, admin panels, or CRM modules that match real work.',
    icon: Cpu,
  },
  {
    code: 'UDP-04',
    title: 'Launch with care',
    text: 'Hand off polished builds with training so teams can own day one.',
    icon: Rocket,
  },
  {
    code: 'UDP-05',
    title: 'Iterate together',
    text: 'Refine after launch — new modules, better CTAs, tighter pipelines.',
    icon: RefreshCw,
  },
]

export function AboutProtocol() {
  return (
    <section className="relative mt-28 sm:mt-36">
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#00DEFF]/25 bg-[#00DEFF]/10 font-display text-[11px] font-medium text-[#00DEFF] shadow-[0_0_12px_rgba(0,222,255,0.2)]">
              02
            </span>
            <span className="inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              <Link2 className="h-3.5 w-3.5 text-[#00DEFF]" />
              Unified craft protocol
            </span>
          </div>
          <AnimatedHeading
            as="h2"
            variant="rise"
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            How TrishulHub works with you
          </AnimatedHeading>
          <p className="mt-4 max-w-xl font-sans text-base font-light leading-relaxed text-neutral-400 sm:text-lg">
            A five-node protocol that keeps every build — website, software, or
            CRM — aligned to your business, not a generic template.
          </p>
        </div>
        <p className="max-w-xs font-sans text-xs uppercase tracking-[0.18em] text-neutral-500">
          Protocol sync · always on
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#0a0a0a]/70 p-6 backdrop-blur-[18px] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00DEFF]/10 blur-[90px]" />

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {nodes.map((n, i) => {
            const Icon = n.icon
            return (
              <motion.div
                key={n.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: EASE_OUT_EXPO,
                }}
                className="group relative flex min-h-[220px] flex-col rounded-[18px] border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00DEFF]/35"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-wider text-[#00DEFF]/80">
                    {n.code}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#00DEFF]/10 text-[#00DEFF] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={16} />
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                  {n.title}
                </h3>
                <p className="mt-2 flex-1 font-sans text-sm font-light leading-relaxed text-neutral-400">
                  {n.text}
                </p>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-[#00DEFF]/50 via-white/10 to-transparent" />
                {i < nodes.length - 1 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 top-1/2 z-10 hidden h-px w-4 bg-[#00DEFF]/40 lg:block"
                  />
                ) : null}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
