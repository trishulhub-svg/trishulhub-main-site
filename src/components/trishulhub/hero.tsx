'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'

const HERO_BG_DESKTOP =
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/169cdb38-2656-4555-bec1-d1acc64bb6fa_3840w.png'
const HERO_BG_MOBILE = 'https://kommodo.ai/i/zbrOcVBf36egW9FwROxf'
const LOGO_URL =
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1cecfee1-4f70-44cb-859d-503cb03a9e42_320w.png'

const CAROUSEL_WORDS = [
  'productive.',
  'efficient.',
  'fast.',
  'successful.',
  'unstoppable.',
  'dangerous.',
] as const

const NAV_CENTER = [
  { label: 'Product', href: '/services' },
  { label: 'Security', href: '/about' },
  { label: 'Pricing', href: '#planner' },
  { label: 'Documentation', href: '/services' },
  { label: 'Support', href: '/contact' },
] as const

function CrystalSvg({ gradId }: { gradId: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className="h-full w-full drop-shadow-[0_20px_40px_rgba(13,60,31,0.25)]"
      fill="none"
    >
      <defs>
        <linearGradient id={`${gradId}-face`} x1="20%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#6BC49A" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#3D7F61" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0D3C1F" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${gradId}-shine`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M60 4 L112 56 L60 156 L8 56 Z"
        fill={`url(#${gradId}-face)`}
        stroke="#E8F5EE"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <path d="M60 4 L112 56 L60 72 Z" fill={`url(#${gradId}-shine)`} />
      <path d="M60 4 L8 56 L60 72 Z" fill="#ffffff" fillOpacity="0.12" />
      <path d="M8 56 L60 72 L60 156 Z" fill="#0D3C1F" fillOpacity="0.18" />
      <path d="M112 56 L60 72 L60 156 Z" fill="#3D7F61" fillOpacity="0.22" />
    </svg>
  )
}

export function Hero() {
  const { links } = useSiteContact()
  const [wordIndex, setWordIndex] = useState(0)
  const [done, setDone] = useState(false)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (done) return
    const id = window.setInterval(() => {
      setWordIndex((i) => {
        if (i >= CAROUSEL_WORDS.length - 1) {
          window.clearInterval(id)
          setDone(true)
          return i
        }
        return i + 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [done])

  useEffect(() => {
    const root = revealRef.current
    if (!root) return
    const nodes = root.querySelectorAll<HTMLElement>('.reveal-up')
    nodes.forEach((el) => {
      el.style.animationPlayState = 'paused'
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.style.animationPlayState = 'running'
          io.unobserve(el)
        })
      },
      { threshold: 0.15 },
    )
    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const word = CAROUSEL_WORDS[wordIndex]

  return (
    <section
      id="home"
      className="relative isolate h-screen overflow-hidden text-gray-900 antialiased selection:bg-gray-100"
    >
      {/* BG Layer — fixed, -z-10 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden h-screen animate-bg-zoom-out bg-cover bg-center bg-no-repeat md:block md:fixed"
        style={{
          backgroundImage: `url(${HERO_BG_DESKTOP})`,
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-screen bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: `url(${HERO_BG_MOBILE})`,
          backgroundPosition: 'center center',
        }}
      />

      {/* Floating green glass crystals */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[4%] top-[52%] z-[1] h-36 w-28 sm:h-44 sm:w-32 md:left-[8%] md:top-[48%] md:h-56 md:w-40 lg:h-64 lg:w-48"
        style={{ animation: 'sondero-float 7s ease-in-out infinite' }}
      >
        <div className="h-full w-full -rotate-12 opacity-90">
          <CrystalSvg gradId="c1" />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[28%] z-[1] h-28 w-20 sm:h-36 sm:w-28 md:right-[10%] md:top-[22%] md:h-48 md:w-36 lg:h-56 lg:w-40"
        style={{ animation: 'sondero-float 8.5s ease-in-out infinite 0.8s' }}
      >
        <div className="h-full w-full rotate-[18deg] opacity-80">
          <CrystalSvg gradId="c2" />
        </div>
      </div>

      {/* Main — z-10 */}
      <div ref={revealRef} className="relative z-10 flex h-full flex-col">
        <header className="relative flex items-center justify-between p-6">
          <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_URL}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain mix-blend-multiply"
            />
            <span className="font-playfair text-lg font-semibold tracking-tight text-[#0D3C1F]">
              TrishulHub
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
            {NAV_CENTER.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-normal text-gray-500 transition hover:text-[#0D3C1F]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-4 sm:gap-5">
            <Link
              href="/admin"
              className="hidden text-sm font-normal uppercase tracking-wide text-gray-500 transition hover:text-[#0D3C1F] sm:inline"
            >
              Log in
            </Link>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center bg-[#0D3C1F] px-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#164a28] sm:px-5 sm:text-xs"
            >
              Start free trial
            </a>
          </div>
        </header>

        {/* Vertically + horizontally centered content */}
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-16 text-center sm:pb-20">
          <h1 className="reveal-up text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-[#0D3C1F] sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.1]">
            <span className="font-sans">
              AI systems that make your best people{' '}
            </span>
            <span
              className={`font-playfair italic ${
                !done
                  ? 'border-r-4 border-[#0D3C1F] pr-1 animate-blink'
                  : 'border-r-0 pr-0'
              }`}
              aria-live="polite"
            >
              {word}
            </span>
          </h1>

          <p className="reveal-up mt-6 max-w-xl text-base font-normal leading-relaxed text-gray-500 sm:text-lg">
            We are building an AI operating system for companies that want more
            revenue in less time.
          </p>

          <div className="reveal-up mt-10">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center bg-[#0D3C1F] px-8 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#164a28] sm:h-14 sm:px-10 sm:text-sm"
            >
              See it in action
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
