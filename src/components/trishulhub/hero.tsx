'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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

export function Hero() {
  const { links } = useSiteContact()
  const [wordIndex, setWordIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [done, setDone] = useState(false)
  const revealRef = useRef<HTMLDivElement>(null)

  // Word carousel — starts on "productive." (p…), stops on "dangerous." and drops the border
  useEffect(() => {
    if (done) return
    const id = window.setInterval(() => {
      setWordIndex((i) => {
        if (i >= CAROUSEL_WORDS.length - 1) {
          window.clearInterval(id)
          setDone(true)
          setShowCursor(false)
          return i
        }
        return i + 1
      })
    }, 1100)
    return () => window.clearInterval(id)
  }, [done])

  // reveal-up: paused until IntersectionObserver triggers running
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
      { threshold: 0.2 },
    )
    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const word = CAROUSEL_WORDS[wordIndex]

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-x-hidden text-gray-900 antialiased selection:bg-gray-100"
    >
      {/* BG Layer — Absolute / fixed, -z-10 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-screen animate-bg-zoom-out bg-cover bg-center bg-no-repeat md:fixed"
        style={{
          backgroundImage: `url(${HERO_BG_DESKTOP})`,
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Mobile-specific background (overrides desktop on small screens) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-screen bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: `url(${HERO_BG_MOBILE})`,
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF9F6]/25 via-transparent to-[#FAF9F6]/90"
      />

      {/* Main content — Relative, z-10 */}
      <div ref={revealRef} className="relative z-10 flex min-h-screen flex-col">
        {/* In-hero header row (Sondero spacing) — site navbar still handles primary nav */}
        <div className="flex items-center justify-between p-6">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_URL}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain mix-blend-multiply"
            />
            <span className="text-sm font-medium tracking-tight text-[#0D3C1F]">
              TrishulHub
            </span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/services"
              className="hidden text-sm font-normal text-gray-500 transition hover:text-[#0D3C1F] sm:inline"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="hidden text-sm font-normal text-gray-500 transition hover:text-[#0D3C1F] sm:inline"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-normal text-gray-500 transition hover:text-[#0D3C1F]"
            >
              Contact
            </Link>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center rounded-full bg-[#0D3C1F] px-4 text-sm font-medium text-white transition hover:bg-[#3D7F61] sm:inline-flex"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-16 pt-6 md:pb-24 md:pt-10">
          <p className="reveal-up mb-4 max-w-xl text-sm font-normal text-gray-500 md:text-base">
            Websites · Software · Mobile apps for growing businesses
          </p>

          {/* H1: Playfair Display (switches from global sans mid-sentence) */}
          <h1 className="reveal-up max-w-4xl font-playfair text-5xl font-semibold leading-[1.1] md:text-7xl">
            <span className="bg-gradient-to-b from-[#3D7F61] to-[#0D3C1F] bg-clip-text text-transparent">
              Systems that make your business{' '}
            </span>
            <span
              className={`inline-block bg-gradient-to-b from-[#3D7F61] to-[#0D3C1F] bg-clip-text text-transparent ${
                showCursor && !done
                  ? 'border-r-4 border-[#0D3C1F] pr-1 animate-blink'
                  : 'border-r-0 pr-0'
              }`}
              aria-live="polite"
            >
              {word}
            </span>
          </h1>

          <p className="reveal-up mt-6 max-w-lg text-base leading-relaxed text-gray-600 md:text-lg">
            TrishulHub designs and builds clear digital products — websites,
            custom software, and mobile apps — so your team can move faster
            without the noise.
          </p>

          <div className="reveal-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0D3C1F] px-7 text-sm font-medium text-white transition hover:bg-[#3D7F61]"
            >
              Let&apos;s build yours
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#0D3C1F]/20 bg-white/70 px-7 text-sm font-medium text-[#0D3C1F] backdrop-blur-sm transition hover:border-[#0D3C1F]/40"
            >
              See our services
            </Link>
          </div>

          <div className="reveal-up mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 md:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F69066]" />
              From £400 projects
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3D7F61]" />
              Plain-English delivery
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0D3C1F]" />
              WhatsApp support
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
