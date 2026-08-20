'use client'

import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/animations'

const features = [
  {
    title: 'Clear plans',
    text: 'We explain every step in plain English — no jargon, no surprises.',
  },
  {
    title: 'Quality work',
    text: 'Clean design and reliable builds that your team can actually use.',
  },
  {
    title: 'On-time delivery',
    text: 'We agree timelines up front and keep you updated as we go.',
  },
  {
    title: 'Real support',
    text: 'After launch we stay available for fixes, tweaks, and growth.',
  },
]

export function HomeWhyUs() {
  return (
    <section className="lt-section bg-white">
      <div className="lt-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl">
              Why choose{' '}
              <span className="accent-text accent-underline">TrishulHub</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#6b7280]">
              A small studio that stays close to your business — from first call
              to a live product.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <h3 className="text-base font-bold text-[#0a0a0a]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                    {f.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="lt-glow absolute -inset-8 opacity-80" />
            <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:p-8">
              <p className="text-sm font-medium text-white/50">Project pulse</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold text-white">95%</p>
                  <p className="mt-1 text-sm text-white/50">Client satisfaction</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">48h</p>
                  <p className="mt-1 text-sm text-white/50">Typical first reply</p>
                </div>
              </div>
              <div className="mt-8 h-28 rounded-xl bg-white/5 p-4">
                <svg viewBox="0 0 240 80" className="h-full w-full" aria-hidden>
                  <path
                    d="M0 60 C 40 50, 60 20, 100 28 C 140 36, 160 10, 200 18 L 240 8"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 60 C 40 50, 60 20, 100 28 C 140 36, 160 10, 200 18 L 240 8 L 240 80 L 0 80 Z"
                    fill="url(#mintFill)"
                    opacity="0.25"
                  />
                  <defs>
                    <linearGradient id="mintFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="mt-4 rounded-xl bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <p className="text-sm font-semibold text-[#0a0a0a]">
                  Weekly progress updates
                </p>
                <p className="mt-1 text-xs text-[#6b7280]">
                  You always know what shipped and what comes next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
