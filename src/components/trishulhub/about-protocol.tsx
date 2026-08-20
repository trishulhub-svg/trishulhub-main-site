'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/lib/animations'
import { NexusButton } from '@/components/trishulhub/nexus-button'
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
    <section className={`relative z-10 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-foreground p-8 text-white shadow-[0_30px_80px_rgba(11,18,32,0.22)] md:p-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-teal-400/25 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-teal-500/20 blur-[80px]"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-300">
              Project planner
            </p>
            <h3 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
              Let&apos;s plan your project
            </h3>
            <p className="mt-3 font-sans text-white/65">
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
                    className={`flex size-10 items-center justify-center rounded-full font-sans text-sm font-semibold transition-all duration-300 ${
                      active
                        ? 'bg-teal-400 text-foreground shadow-[0_0_24px_rgba(45,212,191,0.35)]'
                        : done
                          ? 'bg-white/15 text-teal-200'
                          : 'bg-white/5 text-white/45 ring-1 ring-white/10'
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
                  <p className="font-display text-xl font-medium tracking-tight">
                    {current.title}
                  </p>
                  <p className="mt-1 font-sans text-sm text-white/55">
                    {current.subtitle}
                  </p>

                  {step === 1 && (
                    <div className="mt-6">
                      <div
                        ref={trackRef}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        className="relative h-14 cursor-pointer select-none rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:ring-white/20"
                      >
                        <div className="absolute left-4 right-4 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/10" />
                        <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
                          {budgets.map((b) => (
                            <div key={b} className="h-3 w-px bg-white/25" />
                          ))}
                        </div>
                        <div
                          className="pointer-events-none absolute left-4 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-teal-400 to-teal-200"
                          style={{
                            width: `calc((100% - 2rem) * ${budgetIndex / (budgets.length - 1)})`,
                          }}
                        />
                        <button
                          type="button"
                          aria-label="Budget handle"
                          className="absolute top-1/2 size-6 -translate-y-1/2 rounded-full border-2 border-foreground bg-teal-300 shadow-lg transition-transform duration-300 hover:scale-125"
                          style={{ left: handleLeft }}
                          onPointerDown={onPointerDown}
                        />
                        <div
                          className="absolute -bottom-8 transition-all duration-300"
                          style={{ left: badgeLeft }}
                        >
                          <div className="inline-flex items-center rounded-full bg-teal-300 px-3 py-1 text-foreground shadow-md">
                            <span className="font-sans text-xs font-bold tracking-tight">
                              {budget}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 flex justify-between font-sans text-xs text-white/45">
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
                          className={`rounded-full px-4 py-2 font-sans text-sm font-medium transition-all duration-300 ${
                            lane === l
                              ? 'bg-teal-400 text-foreground'
                              : 'bg-white/5 text-white/65 ring-1 ring-white/10 hover:bg-white/10'
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
                          className={`rounded-full px-4 py-2 font-sans text-sm font-medium transition-all duration-300 ${
                            timing === t
                              ? 'bg-teal-400 text-foreground'
                              : 'bg-white/5 text-white/65 ring-1 ring-white/10 hover:bg-white/10'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 4 && (
                    <div className="mx-auto mt-6 max-w-md rounded-2xl bg-white/5 p-5 text-left ring-1 ring-white/10">
                      <p className="font-display text-sm font-medium">
                        Your project summary
                      </p>
                      <ul className="mt-3 space-y-2 font-sans text-sm text-white/65">
                        <li>
                          Budget:{' '}
                          <span className="font-semibold text-teal-300">
                            {budget}
                          </span>
                        </li>
                        <li>
                          Service:{' '}
                          <span className="font-semibold text-teal-300">
                            {lane}
                          </span>
                        </li>
                        <li>
                          Timing:{' '}
                          <span className="font-semibold text-teal-300">
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
                <NexusButton onClick={next}>Next step</NexusButton>
              ) : (
                <NexusButton
                  href={whatsappWithMessage(
                    `Hi TrishulHub — project plan:\nBudget: ${budget}\nService: ${lane}\nTiming: ${timing}`,
                  )}
                >
                  Talk on WhatsApp
                </NexusButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
