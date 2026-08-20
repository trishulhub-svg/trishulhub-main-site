'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'

const HERO_BG_DESKTOP =
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/169cdb38-2656-4555-bec1-d1acc64bb6fa_3840w.png'
/** Mobile hero background (Kommodo export of the scenic hero art) */
const HERO_BG_MOBILE =
  'https://plain-apac-prod-public.komododecks.com/202608/20/RoEREkz1A5ZTNx3cwro5/image.png'

const CAROUSEL_WORDS = [
  'productive.',
  'efficient.',
  'fast.',
  'successful.',
  'reliable.',
  'scalable.',
] as const

export function Hero() {
  const { links } = useSiteContact()
  const [wordIndex, setWordIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const revealRef = useRef<HTMLDivElement>(null)

  // Smooth infinite word carousel
  useEffect(() => {
    const id = window.setInterval(() => {
      setFade(false)
      window.setTimeout(() => {
        setWordIndex((i) => (i + 1) % CAROUSEL_WORDS.length)
        setFade(true)
      }, 220)
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

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
      {/* BG only inside hero — absolute, not fixed to the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden animate-bg-zoom-out bg-cover bg-center bg-no-repeat md:block"
        style={{
          backgroundImage: `url(${HERO_BG_DESKTOP})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: `url(${HERO_BG_MOBILE})`,
          backgroundPosition: 'center center',
        }}
      />

      <div ref={revealRef} className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-16 pt-24 text-center sm:pb-20 sm:pt-28">
          <h1 className="reveal-up text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-[#0D3C1F] sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.1]">
            <span className="font-sans">
              Digital products that make your business{' '}
            </span>
            <span
              className="inline-block border-r-4 border-[#0D3C1F] pr-1 font-playfair italic animate-blink transition-opacity duration-200"
              style={{ opacity: fade ? 1 : 0 }}
              aria-live="polite"
            >
              {word}
            </span>
          </h1>

          <p className="reveal-up mt-6 max-w-xl text-base font-normal leading-relaxed text-gray-500 sm:text-lg">
            TrishulHub builds websites, custom software, and mobile apps for
            growing businesses — clear products your team can use every day.
          </p>

          <div className="reveal-up mt-10">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center bg-[#0D3C1F] px-8 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#164a28] sm:h-14 sm:px-10 sm:text-sm"
            >
              Let&apos;s build yours
            </a>
          </div>

          <div className="reveal-up mt-8">
            <Link
              href="/services"
              className="text-sm font-medium text-[#0D3C1F]/80 underline-offset-4 transition hover:text-[#0D3C1F] hover:underline"
            >
              See our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
