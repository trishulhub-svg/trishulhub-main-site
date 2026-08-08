'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Check } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/lib/animations'

type Currency = 'USD' | 'INR'

const BUDGETS_USD = ['$500', '$750', '$1,000', '$1,500', '$2,000'] as const
const BUDGETS_INR = ['₹50k', '₹75k', '₹1L', '₹1.5L', '₹2L'] as const

const STEPS = [
  {
    id: 1,
    title: "What's your project budget?",
    subtitle:
      "Select the range that matches your scope. We'll fine-tune together.",
  },
  {
    id: 2,
    title: 'Which lane fits best?',
    subtitle:
      'Custom software, web development, or CRM — pick your primary need.',
  },
  {
    id: 3,
    title: 'When do you want to start?',
    subtitle: 'Tell us your preferred kickoff window so we can plan capacity.',
  },
  {
    id: 4,
    title: 'Ready for a flight plan?',
    subtitle:
      "Share a few details and we'll reply with a tailored plan within 48 hours.",
  },
] as const

const LANES = ['Custom Software', 'Web Development', 'CRM Solutions'] as const
const TIMING = ['ASAP', 'This month', 'Next quarter', 'Flexible'] as const

export function AboutProtocol({
  className = 'mt-28 sm:mt-36',
}: {
  className?: string
}) {
  const [step, setStep] = useState(1)
  const [currency, setCurrency] = useState<Currency>('USD')
  const [budgetIndex, setBudgetIndex] = useState(1)
  const [lane, setLane] = useState<string>(LANES[0])
  const [timing, setTiming] = useState<string>(TIMING[1])
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const budgets = currency === 'USD' ? BUDGETS_USD : BUDGETS_INR
  const current = STEPS[step - 1]
  const budget = budgets[budgetIndex]

  useEffect(() => {
    setBudgetIndex((i) => Math.min(i, budgets.length - 1))
  }, [currency, budgets.length])

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
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="work-wizard-attract relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/70 p-8 backdrop-blur-[18px] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#00DEFF]/35 md:p-12"
        >
          <div
            aria-hidden
            className="work-wizard-glow pointer-events-none absolute -inset-px rounded-3xl"
          />
          <div
            aria-hidden
            className="work-wizard-shine pointer-events-none absolute inset-0 opacity-40"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <h3 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
              How TrishulHub works with you
            </h3>
            <p className="mt-3 font-sans text-white/70">
              Tell us about your mission and we&apos;ll share a tailored flight
              plan within 48 hours.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              {[1, 2, 3, 4].map((n) => {
                const active = n === step
                const done = n < step
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStep(n)}
                    className={`flex size-10 items-center justify-center rounded-full font-sans text-sm font-semibold transition-all duration-500 hover:scale-110 ${
                      active
                        ? 'bg-gradient-to-tr from-[#00DEFF] to-[#0088CC] text-[#0A0A0A] shadow-[0_0_24px_rgba(0,222,255,0.45)]'
                        : done
                          ? 'border border-[#00DEFF]/40 bg-[#00DEFF]/15 text-[#00DEFF]'
                          : 'bg-white/10 text-white/60'
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
                  key={`${step}-${currency}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                >
                  <p className="font-display text-lg font-semibold tracking-tight text-white">
                    {current.title}
                  </p>
                  <p className="mt-1 font-sans text-sm text-white/60">
                    {current.subtitle}
                  </p>

                  {step === 1 && (
                    <div className="mt-6">
                      <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
                        {(
                          [
                            { id: 'USD' as const, label: 'Dollars ($)' },
                            { id: 'INR' as const, label: 'Rupees (₹)' },
                          ] as const
                        ).map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setCurrency(c.id)}
                            className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold transition-all duration-300 ${
                              currency === c.id
                                ? 'bg-[#00DEFF] text-[#0A0A0A] shadow-[0_0_16px_rgba(0,222,255,0.35)]'
                                : 'text-white/60 hover:text-white'
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>

                      <div
                        ref={trackRef}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        className="relative h-14 cursor-pointer select-none rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/20"
                      >
                        <div className="absolute left-4 right-4 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/10" />
                        <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between">
                          {budgets.map((b) => (
                            <div key={b} className="h-3 w-px bg-white/20" />
                          ))}
                        </div>
                        <div
                          className="pointer-events-none absolute left-4 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#00DEFF] to-[#0088CC]"
                          style={{
                            width: `calc((100% - 2rem) * ${budgetIndex / (budgets.length - 1)})`,
                          }}
                        />
                        <button
                          type="button"
                          aria-label="Budget handle"
                          className="absolute top-1/2 size-6 -translate-y-1/2 rounded-full border border-white/10 bg-gradient-to-tr from-[#00DEFF] to-[#0088CC] shadow-[0_0_18px_rgba(0,222,255,0.45)] transition-transform duration-300 hover:scale-125"
                          style={{ left: handleLeft }}
                          onPointerDown={onPointerDown}
                        />
                        <div
                          className="absolute -bottom-8 transition-all duration-300"
                          style={{ left: badgeLeft }}
                        >
                          <div className="work-wizard-badge inline-flex items-center rounded-lg bg-[#00DEFF] px-2.5 py-1 text-[#0A0A0A] shadow-[0_0_16px_rgba(0,222,255,0.4)]">
                            <span className="font-sans text-xs font-semibold tracking-tight">
                              {budget}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 flex justify-between font-sans text-xs text-white/50">
                        {budgets.map((b) => (
                          <span
                            key={b}
                            className="transition-colors duration-300 hover:text-white/80"
                          >
                            {b}
                          </span>
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
                          className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-all duration-300 ${
                            lane === l
                              ? 'border-[#00DEFF]/50 bg-[#00DEFF]/15 text-[#00DEFF]'
                              : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25'
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
                          className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-all duration-300 ${
                            timing === t
                              ? 'border-[#00DEFF]/50 bg-[#00DEFF]/15 text-[#00DEFF]'
                              : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 4 && (
                    <div className="mx-auto mt-6 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
                      <p className="font-display text-sm font-semibold text-white">
                        Your flight plan snapshot
                      </p>
                      <ul className="mt-3 space-y-2 font-sans text-sm text-white/70">
                        <li>
                          Currency:{' '}
                          <span className="text-[#00DEFF]">{currency}</span>
                        </li>
                        <li>
                          Budget:{' '}
                          <span className="text-[#00DEFF]">{budget}</span>
                        </li>
                        <li>
                          Lane: <span className="text-[#00DEFF]">{lane}</span>
                        </li>
                        <li>
                          Timing:{' '}
                          <span className="text-[#00DEFF]">{timing}</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#00DEFF] to-[#0088CC] px-5 py-3 font-sans text-sm font-semibold tracking-tight text-[#0A0A0A] shadow-[0_0_24px_rgba(0,222,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(0,222,255,0.5)]"
              >
                <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span>Next step</span>
              </button>
            ) : (
              <Link
                href={`/contact?currency=${currency}&budget=${encodeURIComponent(budget)}&lane=${encodeURIComponent(lane)}&timing=${encodeURIComponent(timing)}`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#00DEFF] to-[#0088CC] px-5 py-3 font-sans text-sm font-semibold tracking-tight text-[#0A0A0A] shadow-[0_0_24px_rgba(0,222,255,0.35)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span>Talk with TrishulHub</span>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
