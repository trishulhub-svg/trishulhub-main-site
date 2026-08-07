'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plug, Network, BrainCircuit } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

const intelligences = [
  { name: 'GitHub', src: '/images/logos/github.svg', x: 90 },
  { name: 'Turso', src: '/images/logos/turso.svg', x: 270 },
  { name: 'Vercel', src: '/images/logos/vercel-white.svg', x: 450 },
  { name: 'Cloudflare', src: '/images/logos/cloudflare.svg', x: 630 },
  { name: 'Cursor', src: '/images/logos/cursor.svg', x: 810 },
]

const paths = [
  { d: 'M450 320 C 450 210, 220 130, 90 48', len: 580 },
  { d: 'M450 320 C 450 220, 340 140, 270 48', len: 500 },
  { d: 'M450 320 C 450 160, 450 90, 450 48', len: 280 },
  { d: 'M450 320 C 450 220, 560 140, 630 48', len: 500 },
  { d: 'M450 320 C 450 210, 680 130, 810 48', len: 580 },
]

export function HomeIntelligences() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#00DEFF]/[0.07] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00DEFF]/10 px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00DEFF] ring-1 ring-[#00DEFF]/25">
            <Plug className="h-3.5 w-3.5" />
            Integrations
          </span>

          <AnimatedHeading
            as="h2"
            variant="rise"
            className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Five Intelligences. One Unified System.
          </AnimatedHeading>

          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-neutral-300 sm:text-lg">
            TrishulHub systems connect six specialized AI engines into a single,
            unified workflow.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          {/* Top icon row */}
          <div className="relative z-10 flex items-start justify-between gap-2 px-1 sm:px-6">
            {intelligences.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
                className="flex flex-col items-center gap-2"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white ring-1 ring-white/15 sm:h-14 sm:w-14">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={26}
                    height={26}
                    className="h-6 w-6 object-contain brightness-0 invert sm:h-7 sm:w-7"
                  />
                </span>
                <span className="hidden font-sans text-[11px] text-neutral-400 sm:block">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Animated connection field */}
          <div className="relative mt-2 h-72 sm:h-80 lg:h-96">
            <svg
              viewBox="0 0 900 380"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {intelligences.map((item, i) => (
                <circle
                  key={`dot-${item.name}`}
                  cx={item.x}
                  cy={48}
                  r={5}
                  fill="#00DEFF"
                  filter="url(#cyanGlow)"
                >
                  <animate
                    attributeName="opacity"
                    values="0.45;1;0.45"
                    dur="2s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {paths.map((p, i) => (
                <path
                  key={p.d}
                  d={p.d}
                  stroke="#00DEFF"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    strokeDasharray: p.len,
                    strokeDashoffset: p.len,
                  }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values={`${p.len};0;${p.len}`}
                    dur="3.2s"
                    begin={`${i * 0.18}s`}
                    repeatCount="indefinite"
                  />
                </path>
              ))}
            </svg>

            {/* Center TrishulHub logo (replaces lightning) */}
            <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 sm:bottom-4">
              <span
                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00DEFF]/15 ring-2 ring-[#00DEFF]/45 sm:h-20 sm:w-20"
                style={{
                  boxShadow:
                    '0 0 24px rgba(0,222,255,0.55), 0 0 48px rgba(0,222,255,0.28)',
                }}
              >
                <Image
                  src="/images/trishulhub-logo.png"
                  alt="TrishulHub"
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom traits */}
        <div className="mx-auto mt-14 max-w-3xl text-neutral-300 sm:mt-16">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm sm:gap-5 sm:text-base">
            <div className="inline-flex items-center gap-2.5">
              <Network className="h-5 w-5 text-[#00DEFF]" />
              <span className="font-display font-medium text-white">
                Neural Sync
              </span>
            </div>
            <div className="hidden h-px w-28 border-t border-dashed border-[#00DEFF]/40 sm:block" />
            <div className="inline-flex items-center gap-2.5">
              <BrainCircuit className="h-5 w-5 text-[#00DEFF]" />
              <span className="font-display font-medium text-white">
                Unified Intelligence
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
