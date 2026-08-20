'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/lib/animations'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'

const BUDGETS_GBP = ['£400', '£600', '£900', '£1,200', '£1,500'] as const

const STEPS = [
  {
    id: 1,
    title: 'What is your budget?',
    subtitle: 'Pick a range in pounds. We can adjust it later together.',
  },
  {
    id: 2,
    title: 'Which service do you need?',
    subtitle:
      'Custom software, websites, or mobile apps — pick one to start.',
  },
  {
    id: 3,
    title: 'When do you want to start?',
    subtitle: 'Tell us your preferred kickoff window so we can plan capacity.',
  },
  {
    id: 4,
    title: 'Ready to talk?',
    subtitle: 'We will message you on WhatsApp with a simple next step.',
  },
] as const

const LANES = ['Custom Software', 'Websites', 'Mobile Apps'] as const
const TIMING = ['ASAP', 'This month', 'Next quarter', 'Flexible'] as const

export function AboutProtocol({
  className = 'mt-28 sm:mt-36',
}: {
  className?: string
}) {
  const { whatsappWithMessage } = useSiteContact()
  const [step, setStep] = useState(1)
  const [budgetIndex, setBudgetIndex] = useState(0)
  const [lane, setLane] = useState<string>(LANES[0])
  const [timing, setTiming] = useState<string>(TIMING[1])
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const budgets = BUDGETS_GBP
  const current = STEPS[step - 1]
  const budget = budgets[budgetIndex]

  const handlePct = useCallback(
    (clientX: number) => {
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const pad = 16
      const usable = rect.width - pad * 2
      const x = Math.min(Math.max(clientX - rect.left - pad, 0), usable)
      const pct = usable <= 0 ? 0 : x / usable
      const idx = Math.round(pct * (budgets.length - 1))
      setBudgetIndex(idx)
    },
    [budgets.length],
  )

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    handlePct(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    handlePct(e.clientX)
  }

  const onPointerUp = () => setDragging(false)

  const handleLeft = useMemo(() => {
    const pct = budgetIndex / (budgets.length - 1)
    return `calc(1rem + (100% - 2rem) * ${pct} - 12px)`
  }, [budgetIndex, budgets.length])

  const badgeLeft = useMemo(() => {
    const pct = budgetIndex / (budgets.length - 1)
    return `calc(1rem + (100% - 2rem) * ${pct} - 28px)`
  }, [budgetIndex, budgets.length])

  const next = () => {
    if (step < 4) setStep((s) => s + 1)
  }

  return (
    <section id="planner" className={`lt-section relative z-10 ${className}`}>
      <div className="lt-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101010] p-8 font-almarai shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:p-12"
        >
          <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" />

          <div className="relative mx-auto max-w-3xl text-center">
            <p
              className="mb-3 text-sm font-medium"
              style={{ color: 'rgba(225, 224, 204, 0.55)' }}
            >
              Project planner
            </p>
            <h3
              className="text-3xl font-bold tracking-[-0.03em] md:text-4xl"
              style={{ color: '#E1E0CC' }}
            >
              Let&apos;s plan your{' '}
              <span className="font-instrument" style={{ color: '#DEDBC8' }}>
                project
              </span>
            </h3>
            <p className="mt-3 text-gray-400">
              Tell us a few details and we will reply with a simple plan within
              48 hours.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((n) => {
                const active = n === step
                const done = n < step
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStep(n)}
                    className={`flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                      active
                        ? 'bg-cream text-black'
                        : done
                          ? 'bg-[#212121] text-cream'
                          : 'border border-white/15 bg-[#212121] text-gray-500'
                    }`}
                    aria-label={`Step ${n}`}
                  >
                    {done ? <Check size={16} /> : `0${n}`}
                  </button>
                )
              })}
            </div>

            <div className="mt-10 min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                >
                  <p
                    className="text-lg font-bold tracking-tight"
                    style={{ color: '#E1E0CC' }}
                  >
                    {current.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">{current.subtitle}</p>

                  {step === 1 && (
                    <div className="mt-6">
                      <div
                        ref={trackRef}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        className="relative h-14 cursor-pointer select-none rounded-2xl bg-[#212121]"
                      >
                        <div className="absolute left-4 right-4 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/10" />
                        <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
                          {budgets.map((b) => (
                            <div key={b} className="h-3 w-px bg-white/20" />
                          ))}
                        </div>
                        <div
                          className="pointer-events-none absolute left-4 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-cream"
                          style={{
                            width: `calc((100% - 2rem) * ${budgetIndex / (budgets.length - 1)})`,
                          }}
                        />
                        <button
                          type="button"
                          aria-label="Budget handle"
                          className="absolute top-1/2 size-6 -translate-y-1/2 rounded-full border-2 border-[#101010] bg-cream shadow-md transition-transform hover:scale-110"
                          style={{ left: handleLeft }}
                          onPointerDown={onPointerDown}
                        />
                        <div
                          className="absolute -bottom-8 transition-all"
                          style={{ left: badgeLeft }}
                        >
                          <div className="inline-flex items-center rounded-lg bg-cream px-3 py-1 text-black">
                            <span className="text-xs font-bold">{budget}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 flex justify-between text-xs text-gray-500">
                        {budgets.map((b) => (
                          <span key={b}>{b}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      {LANES.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLane(l)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            lane === l
                              ? 'bg-cream text-black'
                              : 'border border-white/15 bg-[#212121] text-gray-400 hover:text-cream'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      {TIMING.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTiming(t)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            timing === t
                              ? 'bg-cream text-black'
                              : 'border border-white/15 bg-[#212121] text-gray-400 hover:text-cream'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 4 && (
                    <div className="mx-auto mt-6 max-w-md rounded-[1.5rem] border border-white/10 bg-[#212121] p-5 text-left">
                      <p
                        className="text-sm font-bold"
                        style={{ color: '#E1E0CC' }}
                      >
                        Your project summary
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-gray-400">
                        <li>
                          Budget:{' '}
                          <span className="font-semibold text-cream">
                            {budget}
                          </span>
                        </li>
                        <li>
                          Service:{' '}
                          <span className="font-semibold" style={{ color: '#E1E0CC' }}>
                            {lane}
                          </span>
                        </li>
                        <li>
                          Timing:{' '}
                          <span className="font-semibold" style={{ color: '#E1E0CC' }}>
                            {timing}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-cream px-7 text-[15px] font-medium text-black transition hover:scale-[1.02]"
                >
                  Next step
                </button>
              ) : (
                <a
                  href={whatsappWithMessage(
                    `Hi TrishulHub — project plan:\nBudget: ${budget}\nService: ${lane}\nTiming: ${timing}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-cream px-7 text-[15px] font-medium text-black transition hover:scale-[1.02]"
                >
                  Talk on WhatsApp
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
