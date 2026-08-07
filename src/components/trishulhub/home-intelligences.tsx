'use client'

import { motion } from 'framer-motion'
import { Plug, Network, BrainCircuit } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

const VB_W = 900
const VB_H = 420

const intelligences = [
  { name: 'GitHub', src: '/images/logos/github.svg', x: 90 },
  { name: 'Turso', src: '/images/logos/turso.svg', x: 270 },
  { name: 'Vercel', src: '/images/logos/vercel-white.svg', x: 450 },
  { name: 'Cloudflare', src: '/images/logos/cloudflare.svg', x: 630 },
  { name: 'Cursor', src: '/images/logos/cursor.svg', x: 810 },
]

/** Hub box 80×80 centered at (450, 380) → top border y=340 */
const HUB_TOP = 340
/** Just under icon labels — close, not overlapping text */
const LINE_END_Y = 82

const paths = intelligences.map((item) => {
  const endX = item.x
  const midX = 450 + (endX - 450) * 0.35
  return {
    d: `M450 ${HUB_TOP} C 450 ${HUB_TOP - 70}, ${midX} ${LINE_END_Y + 55}, ${endX} ${LINE_END_Y}`,
    len: 360 + Math.abs(endX - 450) * 0.3,
  }
})

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

        <div className="relative mx-auto mt-14 w-full max-w-5xl sm:mt-16">
          <div className="relative aspect-[900/420] w-full">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
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

            {intelligences.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: EASE_OUT_EXPO,
                }}
                className="absolute z-10 flex -translate-x-1/2 flex-col items-center"
                style={{
                  left: `${(item.x / VB_W) * 100}%`,
                  top: 0,
                }}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white ring-1 ring-white/15 sm:h-12 sm:w-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt=""
                    width={24}
                    height={24}
                    className="h-5 w-5 object-contain brightness-0 invert sm:h-6 sm:w-6"
                  />
                </span>
                <span className="relative z-20 mt-1.5 hidden bg-transparent font-sans text-[10px] text-neutral-400 sm:block">
                  {item.name}
                </span>
              </motion.div>
            ))}

            {/* Same box size — larger centered logo */}
            <div
              className="absolute left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ top: `${(380 / VB_H) * 100}%` }}
            >
              <span
                className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#00DEFF]/15 p-0.5 ring-2 ring-[#00DEFF]/45 sm:h-20 sm:w-20 sm:p-1"
                style={{
                  boxShadow:
                    '0 0 24px rgba(0,222,255,0.55), 0 0 48px rgba(0,222,255,0.28)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/trishulhub-logo.png"
                  alt="TrishulHub"
                  width={80}
                  height={80}
                  className="h-[92%] w-[92%] object-contain object-center"
                />
              </span>
            </div>
          </div>
        </div>

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
