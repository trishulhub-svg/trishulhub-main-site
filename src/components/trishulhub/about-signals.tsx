'use client'

import { useEffect, useRef, useCallback } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'

const LOOP_MS = 6000

export function AboutSignals() {
  const gridRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const runCounters = useCallback(() => {
    const root = gridRef.current
    if (!root) return
    const counters = root.querySelectorAll<HTMLElement>('[data-counter-target]')
    counters.forEach((el) => {
      const target = Number(el.getAttribute('data-counter-target') || 0)
      const prefix = el.getAttribute('data-counter-prefix') || ''
      const suffix = el.getAttribute('data-counter-suffix') || ''
      let count = 0
      const duration = 1400
      const step = target / (duration / 20)
      el.textContent = `${prefix}0${suffix}`
      const timer = setInterval(() => {
        count += step
        if (count >= target) {
          count = target
          clearInterval(timer)
        }
        el.textContent = `${prefix}${Math.ceil(count)}${suffix}`
      }, 20)
    })
  }, [])

  useEffect(() => {
    const root = gridRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            root.classList.add('in-view')
            runCounters()
            if (!intervalRef.current) {
              intervalRef.current = setInterval(() => {
                if (root.classList.contains('in-view')) runCounters()
              }, LOOP_MS)
            }
          } else {
            root.classList.remove('in-view')
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(root)
    return () => {
      observer.disconnect()
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [runCounters])

  return (
    <section className="relative mt-28 sm:mt-36">
      <div className="flex flex-col gap-16 rounded-3xl border border-white/10 bg-[#0A0A0C] px-6 pb-16 pt-8 sm:px-8">
        <div className="flex w-full flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex max-w-3xl flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#00DEFF]/25 bg-[#00DEFF]/10 font-display text-[11px] font-medium text-[#00DEFF] shadow-[0_0_10px_rgba(0,222,255,0.25)]">
                03
              </span>
              <span className="font-display text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                What we focus on
              </span>
            </div>
            <AnimatedHeading
              as="h2"
              variant="rise"
              className="font-display text-4xl font-light tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Clear results for your business
            </AnimatedHeading>
            <p className="mt-3 font-display text-2xl font-light tracking-tight text-neutral-600 sm:text-3xl">
              simple goals, real progress
            </p>
            <p className="max-w-xl font-sans text-lg font-light leading-relaxed text-neutral-400">
              A simple view of how we deliver work, keep clients happy, and
              focus on the services you ask for most.
            </p>
          </div>
          <a
            href="https://wa.me/919662106793?text=Hi%20TrishulHub%20%E2%80%94%20I%20want%20to%20talk%20about%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 font-sans text-sm font-medium text-black transition-all duration-200 hover:bg-neutral-200"
          >
            Talk on WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div
          ref={gridRef}
          id="about-signals-grid"
          className="about-signals-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[400px]"
        >
          {/* On-time delivery */}
          <div className="group relative flex h-[400px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0C] p-8 transition-colors hover:border-white/[0.15]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,222,255,0.12),transparent_55%)]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative z-10">
              <h3 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl">
                On-time delivery
              </h3>
              <p className="mt-2 font-sans text-base font-light leading-relaxed text-neutral-400">
We plan well so your project launches on time.
              </p>
            </div>
            <div className="relative z-10 h-36 w-full">
              <div className="absolute right-2 top-0 about-animate-scale z-20">
                <div className="rounded-xl border border-[#00DEFF]/35 bg-[#0A0A0C]/95 px-3 py-1.5 shadow-[0_0_20px_rgba(0,222,255,0.25)] backdrop-blur-md">
                  <span className="font-display text-sm font-semibold tracking-tight text-[#00DEFF]">
                    <span data-counter-target="24" data-counter-prefix="+">
                      +0
                    </span>
                    %
                  </span>
                  <span className="ml-1.5 font-sans text-[10px] uppercase tracking-wider text-neutral-500">
                    lift
                  </span>
                </div>
              </div>
              <svg
                className="h-full w-full overflow-visible"
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 45 L100 45"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <path
                  d="M0 25 L100 25"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <defs>
                  <linearGradient
                    id="about-grad-area"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#00DEFF"
                      stopOpacity="0.22"
                    />
                    <stop
                      offset="100%"
                      stopColor="#00DEFF"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M0 40 C 20 40, 30 35, 50 20 C 70 5, 80 10, 100 0 V 50 H 0 Z"
                  fill="url(#about-grad-area)"
                  className="about-animate-fade-up"
                  style={{ animationDelay: '0.1s' }}
                />
                <path
                  d="M0 40 C 20 40, 30 35, 50 20 C 70 5, 80 10, 100 0"
                  fill="none"
                  stroke="#00DEFF"
                  strokeWidth="2"
                  className="about-animate-draw"
                />
              </svg>
            </div>
          </div>

          {/* Project pace — tall */}
          <div className="group relative flex h-[400px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0C] p-8 transition-colors hover:border-white/[0.15] lg:row-span-2 lg:h-[824px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,222,255,0.1),transparent_55%)]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage:
                  'radial-gradient(circle, black 40%, transparent 100%)',
                WebkitMaskImage:
                  'radial-gradient(circle, black 40%, transparent 100%)',
              }}
            />
            <div className="relative z-10">
              <h3 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl">
                Project pace
              </h3>
              <p className="mt-2 max-w-[26rem] font-sans text-base font-light leading-relaxed text-neutral-400">
How busy we are and how fast we ship — month by month.
              </p>
            </div>
            <div className="relative z-10 flex flex-1 items-center justify-center pt-6">
              <svg
                viewBox="0 0 300 300"
                className="h-[300px] w-[300px] overflow-visible md:h-[340px] md:w-[340px] lg:h-[380px] lg:w-[380px]"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="about-glow-a" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="about-glow-b" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="about-grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00DEFF" />
                    <stop offset="100%" stopColor="#0088CC" />
                  </linearGradient>
                  <linearGradient id="about-grad-b" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#67E8F9" />
                    <stop offset="100%" stopColor="#00DEFF" />
                  </linearGradient>
                </defs>
                <g
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                >
                  {[22, 44, 66, 88, 110].map((r, i) => (
                    <circle
                      key={r}
                      cx="150"
                      cy="150"
                      r={r}
                      className="about-animate-scale"
                      style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                    />
                  ))}
                </g>
                <g
                  stroke="#ffffff"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                  className="about-animate-fade-up"
                  style={{ animationDelay: '0.3s' }}
                >
                  <line x1="150" y1="150" x2="150" y2="40" />
                  <line x1="150" y1="150" x2="245" y2="95" />
                  <line x1="150" y1="150" x2="245" y2="205" />
                  <line x1="150" y1="150" x2="150" y2="260" />
                  <line x1="150" y1="150" x2="55" y2="205" />
                  <line x1="150" y1="150" x2="55" y2="95" />
                </g>
                <g
                  className="about-animate-fade-up fill-white font-sans text-[11px] font-medium"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ animationDelay: '0.4s' }}
                >
                  <text x="150" y="25">
                    Jan
                  </text>
                  <text x="268" y="85">
                    Feb
                  </text>
                  <text x="268" y="215">
                    Mar
                  </text>
                  <text x="150" y="278">
                    Apr
                  </text>
                  <text x="32" y="215">
                    May
                  </text>
                  <text x="32" y="85">
                    Jun
                  </text>
                </g>
                <path
                  d="M150 62 L197 122 L188 172 L150 249 L102 177 L74 106 Z"
                  fill="none"
                  stroke="url(#about-grad-a)"
                  strokeWidth="2"
                  filter="url(#about-glow-a)"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="about-animate-draw"
                  style={{ animationDelay: '0.3s' }}
                />
                <path
                  d="M150 95 L240 102 L230 196 L150 254 L80 190 L107 125 Z"
                  fill="none"
                  stroke="url(#about-grad-b)"
                  strokeWidth="2"
                  filter="url(#about-glow-b)"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="about-animate-draw"
                  style={{ animationDelay: '0.6s' }}
                />
              </svg>
            </div>
          </div>

          {/* Engagement */}
          <div className="group relative flex h-[400px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0C] p-8 transition-colors hover:border-white/[0.15]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,222,255,0.1),transparent_55%)]" />
            <div className="relative z-10">
              <h3 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl">
                Happy clients
              </h3>
              <p className="mt-2 font-sans text-base font-light leading-relaxed text-neutral-400">
                We stay in touch so you always know what is next.
              </p>
            </div>
            <div className="relative z-10 flex flex-1 items-center justify-center">
              <div
                className="absolute h-32 w-32 rounded-3xl border border-white/[0.05] bg-white/[0.03]"
                style={{
                  animation: 'about-spin-slow 25s linear infinite',
                }}
              />
              <div
                className="absolute h-24 w-24 rounded-2xl border border-white/[0.05] bg-white/[0.05]"
                style={{
                  animation: 'about-spin-slow-reverse 15s linear infinite',
                }}
              />
              <div className="about-animate-scale relative z-10 flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00DEFF] to-[#0088CC] shadow-[0_12px_30px_-10px_rgba(0,222,255,0.45)]">
                <span className="flex items-baseline font-display text-4xl font-light tracking-tight text-[#0A0A0A]">
                  <span data-counter-target="45" data-counter-suffix="k">
                    0k
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Conversion probability — no strike line */}
          <div className="group relative flex h-[400px] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0C] p-8 transition-colors hover:border-white/[0.15]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,222,255,0.1),transparent_55%)]" />
            <div className="absolute inset-0 z-10 flex -translate-y-8 items-center justify-center">
              <div className="about-animate-fade-up relative flex flex-col items-center">
                <span className="select-none font-display text-[7.5rem] font-light leading-none tracking-tight text-white/[0.12] sm:text-[8rem]">
                  <span data-counter-target="92" data-counter-suffix="%">
                    0%
                  </span>
                </span>
                <span className="mt-1 rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00DEFF]">
                  close confidence
                </span>
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl">
                Project yes-rate
              </h3>
              <p className="mt-2 font-sans text-base font-light leading-relaxed text-neutral-400">
                How often a plan turns into a real build.
              </p>
            </div>
          </div>

          {/* What people ask for */}
          <div className="group relative flex h-[400px] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0C] p-8 transition-colors hover:border-white/[0.15]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,222,255,0.1),transparent_55%)]" />
            <div className="relative z-10 mb-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-xl font-semibold tracking-tight text-white">
                  Top lanes
                </h4>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-xs font-medium text-neutral-300">
                  All services
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </span>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  {
                    label: 'Custom Software',
                    width: '88%',
                    value: '88%',
                    color: '#00DEFF',
                    delay: '0.1s',
                  },
                  {
                    label: 'Websites',
                    width: '74%',
                    value: '74%',
                    color: '#67E8F9',
                    delay: '0.2s',
                  },
                  {
                    label: 'Mobile Apps',
                    width: '62%',
                    value: '62%',
                    color: '#0088CC',
                    delay: '0.3s',
                  },
                  {
                    label: 'Ongoing Support',
                    width: '48%',
                    value: '48%',
                    color: '#94A3B8',
                    delay: '0.4s',
                  },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-4">
                    <span className="w-[120px] shrink-0 truncate font-sans text-sm font-medium text-neutral-300">
                      {row.label}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="about-animate-width h-full rounded-full"
                        style={{
                          backgroundColor: row.color,
                          ['--target-width' as string]: row.width,
                          animationDelay: row.delay,
                        }}
                      />
                    </div>
                    <span
                      className="about-animate-fade-up w-10 shrink-0 text-right font-sans text-sm font-medium text-white"
                      style={{ animationDelay: row.delay }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-3xl font-light tracking-tight text-white sm:text-4xl">
                What people ask for
              </h3>
              <p className="mt-2 font-sans text-base font-light leading-relaxed text-neutral-400">
                Which services businesses ask us for most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
