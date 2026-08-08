'use client'

import { motion } from 'framer-motion'
import { Database, Cpu, Send, Sparkles, Layers3 } from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

/**
 * One trunk from Input → fork to two Execute nodes → merge into Output.
 * Top path + bottom path share start (200,260) and end (820,260).
 */
const PATH_A =
  'M200,260 C320,260 360,110 520,90 C640,75 720,150 820,260'
const PATH_B =
  'M200,260 C320,260 360,410 520,430 C640,445 720,370 820,260'

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
          We build tools that help businesses grow
        </AnimatedHeading>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mt-6 max-w-2xl font-sans text-base font-light text-white/60 sm:text-lg"
        >
          We started in 2023 with websites. Now we also build custom software
          and mobile apps — simple tools that help your team work better.
        </motion.p>
      </div>

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
              How we work
            </span>
            <p className="mt-1 font-sans text-sm text-neutral-400">
              From your idea to a finished product
            </p>
          </div>
          <span className="rounded-full border border-[#00DEFF]/25 bg-[#00DEFF]/10 px-3 py-1 font-mono text-[10px] tracking-wider text-[#00DEFF]">
            SYNC · ACTIVE
          </span>
        </div>

        <div className="relative mx-auto hidden min-h-[560px] w-full max-w-5xl lg:block">
          <svg
            viewBox="0 0 1000 520"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="udp-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00DEFF" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#00DEFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0088CC" stopOpacity="0.35" />
              </linearGradient>
              <filter id="udp-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Shared trunk marker */}
            <circle
              cx="200"
              cy="260"
              r="5"
              fill="#00DEFF"
              filter="url(#udp-glow)"
            />
            <circle
              cx="820"
              cy="260"
              r="5"
              fill="#00DEFF"
              filter="url(#udp-glow)"
            />

            <path
              d={PATH_A}
              stroke="url(#udp-beam)"
              strokeWidth="2.25"
              strokeLinecap="round"
              className="about-udp-beam"
              filter="url(#udp-glow)"
            />
            <path
              d={PATH_B}
              stroke="url(#udp-beam)"
              strokeWidth="2.25"
              strokeLinecap="round"
              className="about-udp-beam"
              style={{ animationDelay: '0.55s' }}
              filter="url(#udp-glow)"
            />

            <circle r="4" fill="#00DEFF" filter="url(#udp-glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path={PATH_A} />
            </circle>
            <circle r="4" fill="#67E8F9" filter="url(#udp-glow)">
              <animateMotion dur="3s" repeatCount="indefinite" path={PATH_B} />
            </circle>
          </svg>

          {/* Input Source — left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="absolute left-[2%] top-1/2 z-10 w-[210px] -translate-y-1/2 rounded-[18px] border border-white/10 bg-[#0A0A0C]/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[20px]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
              <Database size={16} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00DEFF]">
              Input source
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              Your idea
            </h3>
            <p className="mt-2 font-sans text-xs font-light leading-relaxed text-neutral-400">
              Tell us what you need. We listen first.
            </p>
          </motion.div>

          {/* Execute top — spaced up */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="absolute left-1/2 top-0 z-10 w-[230px] -translate-x-1/2 rounded-[18px] border border-white/10 bg-[#0A0A0C]/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[20px]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
              <Cpu size={16} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00DEFF]">
              Execute logic
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              We design & build
            </h3>
            <p className="mt-2 font-sans text-xs font-light leading-relaxed text-neutral-400">
              Websites, software, and mobile apps made for your business.
            </p>
          </motion.div>

          {/* Execute bottom — spaced down */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT_EXPO }}
            className="absolute bottom-0 left-1/2 z-10 w-[230px] -translate-x-1/2 rounded-[18px] border border-white/10 bg-[#0A0A0C]/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[20px]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
              <Layers3 size={16} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00DEFF]">
              Execute logic
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              Three clear services
            </h3>
            <p className="mt-2 font-sans text-xs font-light leading-relaxed text-neutral-400">
              Software, websites, and mobile apps — pick what you need.
            </p>
          </motion.div>

          {/* Output — right, where paths merge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="absolute right-[2%] top-1/2 z-10 w-[210px] -translate-y-1/2 rounded-[18px] border border-white/10 bg-[#0A0A0C]/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[20px]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/10 text-[#00DEFF]">
              <Send size={16} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00DEFF]">
              Output data
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              Ready to use
            </h3>
            <p className="mt-2 font-sans text-xs font-light leading-relaxed text-neutral-400">
              A clear product your team can use right away.
            </p>
          </motion.div>
        </div>

        <div className="relative grid gap-4 lg:hidden">
          {[
            {
              label: 'Input source',
              title: 'Your idea',
              text: 'Tell us what you need. We listen first.',
              icon: Database,
            },
            {
              label: 'Execute logic',
              title: 'We design & build',
              text: 'Websites, software, and mobile apps made for your business.',
              icon: Cpu,
            },
            {
              label: 'Execute logic',
              title: 'Three clear services',
              text: 'Software, websites, and mobile apps — pick what you need.',
              icon: Layers3,
            },
            {
              label: 'Output data',
              title: 'Ready to use',
              text: 'A clear product your team can use right away.',
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
