'use client'

import { motion } from 'framer-motion'
import { Database, Cpu, Send, Sparkles } from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

const PATH_A = 'M210,260 C380,260 420,170 560,170 C680,170 735,170 820,170'
const PATH_B = 'M210,260 C380,260 420,350 560,350 C680,350 735,350 820,350'

export function AboutHeroProtocol() {
  return (
    <section className="relative">
      <div className="max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          About TrishulHub
        </motion.span>
        <AnimatedHeading
          as="h1"
          variant="rise"
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
        >
          We build the systems behind growing businesses
        </AnimatedHeading>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mt-6 max-w-2xl font-sans text-base font-light text-white/60 sm:text-lg"
        >
          Founded in 2023 as a website studio, TrishulHub grew into custom
          software and CRM — so founders and teams can manage customers,
          operations, and growth without fighting their tools.
        </motion.p>
      </div>

      {/* UNIFIED DATA PROTOCOL layout — TrishulHub info */}
      <div className="relative mt-16 overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#0a0a0a]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[20px] sm:mt-20 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'url(https://grainy-gradients.vercel.app/noise.svg)',
            backgroundSize: '200px 200px',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00DEFF]">
              Unified data protocol
            </span>
            <p className="mt-1 font-sans text-sm text-neutral-400">
              How your brief becomes a live TrishulHub system
            </p>
          </div>
          <span className="rounded-full border border-[#00DEFF]/25 bg-[#00DEFF]/10 px-3 py-1 font-mono text-[10px] tracking-wider text-[#00DEFF]">
            SYNC · ACTIVE
          </span>
        </div>

        <div className="relative mx-auto hidden min-h-[420px] w-full max-w-5xl lg:block">
          <svg
            viewBox="0 0 1000 520"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="udp-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00DEFF" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#00DEFF" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0088CC" stopOpacity="0.25" />
              </linearGradient>
              <filter id="udp-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={PATH_A}
              stroke="url(#udp-beam)"
              strokeWidth="2"
              strokeLinecap="round"
              className="about-udp-beam"
              filter="url(#udp-glow)"
            />
            <path
              d={PATH_B}
              stroke="url(#udp-beam)"
              strokeWidth="2"
              strokeLinecap="round"
              className="about-udp-beam"
              style={{ animationDelay: '0.6s' }}
              filter="url(#udp-glow)"
            />

            <circle r="4" fill="#00DEFF" filter="url(#udp-glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path={PATH_A} />
            </circle>
            <circle r="4" fill="#67E8F9" filter="url(#udp-glow)">
              <animateMotion dur="3s" repeatCount="indefinite" path={PATH_B} />
            </circle>
          </svg>

          {/* Input Source */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="absolute left-[4%] top-[42%] w-[220px] -translate-y-1/2 rounded-[18px] border border-white/10 bg-[#0A0A0C]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[20px]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
              <Database size={16} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00DEFF]">
              Input source
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              Your business brief
            </h3>
            <p className="mt-2 font-sans text-xs font-light leading-relaxed text-neutral-400">
              How you sell, serve, and operate — the real work we design around.
            </p>
          </motion.div>

          {/* Execute Logic (top) */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="absolute left-[48%] top-[8%] w-[240px] -translate-x-1/2 rounded-[18px] border border-white/10 bg-[#0A0A0C]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[20px]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
              <Cpu size={16} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00DEFF]">
              Execute logic
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              Craft the system
            </h3>
            <p className="mt-2 font-sans text-xs font-light leading-relaxed text-neutral-400">
              Websites, custom software panels, and CRM modules — built to fit.
            </p>
          </motion.div>

          {/* Execute Logic alt / middle note (bottom path) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT_EXPO }}
            className="absolute bottom-[10%] left-[48%] w-[240px] -translate-x-1/2 rounded-[18px] border border-white/10 bg-[#0A0A0C]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[20px]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
              <Cpu size={16} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00DEFF]">
              Execute logic
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              Three clear lanes
            </h3>
            <p className="mt-2 font-sans text-xs font-light leading-relaxed text-neutral-400">
              Software for ops. Web for presence. CRM for people and pipeline.
            </p>
          </motion.div>

          {/* Output Data */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="absolute right-[3%] top-[42%] w-[220px] -translate-y-1/2 rounded-[18px] border border-white/10 bg-[#0A0A0C]/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[20px]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
              <Send size={16} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00DEFF]">
              Output data
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              Live & growing
            </h3>
            <p className="mt-2 font-sans text-xs font-light leading-relaxed text-neutral-400">
              Previewable systems your team can run — then iterate as you grow.
            </p>
          </motion.div>
        </div>

        {/* Mobile stack */}
        <div className="relative grid gap-4 lg:hidden">
          {[
            {
              label: 'Input source',
              title: 'Your business brief',
              text: 'How you sell, serve, and operate — the real work we design around.',
              icon: Database,
            },
            {
              label: 'Execute logic',
              title: 'Craft the system',
              text: 'Websites, custom software panels, and CRM modules — built to fit.',
              icon: Cpu,
            },
            {
              label: 'Execute logic',
              title: 'Three clear lanes',
              text: 'Software for ops. Web for presence. CRM for people and pipeline.',
              icon: Cpu,
            },
            {
              label: 'Output data',
              title: 'Live & growing',
              text: 'Previewable systems your team can run — then iterate as you grow.',
              icon: Send,
            },
          ].map((n) => {
            const Icon = n.icon
            return (
              <div
                key={n.title}
                className="rounded-[18px] border border-white/10 bg-[#0A0A0C]/90 p-5 backdrop-blur-[20px]"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
                  <Icon size={16} />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00DEFF]">
                  {n.label}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">
                  {n.title}
                </h3>
                <p className="mt-2 font-sans text-sm font-light text-neutral-400">
                  {n.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
