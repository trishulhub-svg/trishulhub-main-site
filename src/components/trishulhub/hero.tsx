'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'

const HERO_VIDEO_DESKTOP =
  'https://videotourl.com/videos/1787373793283-a7a319b3-9af4-4903-ab04-d08a9d00fbe2.mp4'
const HERO_VIDEO_MOBILE =
  'https://videotourl.com/videos/1787374175670-eabf5216-f601-480c-b114-3179ce86bbff.mp4'

const CAROUSEL_WORDS = [
  'productive.',
  'efficient.',
  'fast.',
  'successful.',
  'reliable.',
  'scalable.',
] as const

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return isDesktop
}

/** Full-bleed muted hero video — infinite loop, covers the hero with no gaps. */
function HeroBgVideo({ src }: { src: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#f3f4f6]"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
      />
    </div>
  )
}

export function Hero() {
  const { links } = useSiteContact()
  const [wordIndex, setWordIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const revealRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()

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
  const videoSrc =
    isDesktop === null
      ? null
      : isDesktop
        ? HERO_VIDEO_DESKTOP
        : HERO_VIDEO_MOBILE

  return (
    <section
      id="home"
      className="relative isolate h-[80svh] overflow-hidden text-gray-900 antialiased selection:bg-gray-100 md:h-screen"
    >
      {videoSrc ? (
        <HeroBgVideo src={videoSrc} />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[#f3f4f6]"
        />
      )}

      <div ref={revealRef} className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-start px-5 pb-12 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-32 md:justify-center md:py-28">
          <h1 className="reveal-up text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-[#111111] sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.1]">
            <span className="font-sans text-[#111111]">
              Digital products that make your business{' '}
            </span>
            <span
              className="inline-block border-r-4 border-[#0D3C1F] pr-1 font-playfair italic text-[#0D3C1F] animate-blink transition-opacity duration-200"
              style={{ opacity: fade ? 1 : 0 }}
              aria-live="polite"
            >
              {word}
            </span>
          </h1>

          <p className="reveal-up mt-5 max-w-xl text-sm font-normal leading-relaxed text-gray-500 sm:mt-6 sm:text-base md:text-lg">
            TrishulHub builds websites, custom software, and mobile apps for
            growing businesses — clear products your team can use every day.
          </p>

          <div className="reveal-up mt-8 sm:mt-10">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#0D3C1F] px-8 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#164a28] sm:h-14 sm:px-10 sm:text-sm"
            >
              Let&apos;s build yours
            </a>
          </div>

          <div className="reveal-up mt-6 sm:mt-8">
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
