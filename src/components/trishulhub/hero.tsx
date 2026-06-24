'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Play } from 'lucide-react'

const marqueeItems = [
  'Next.js', 'React', 'TypeScript', 'Prisma', 'Tailwind', 'Node.js',
]

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {})

    const onEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        video.style.opacity = '1'
      }, 100)
    }

    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center overflow-visible px-4 pt-28 sm:px-6">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[527px] w-[984px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a0a0a] opacity-90 blur-[82px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#00DEFF]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00DEFF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00DEFF]" />
            </span>
            Digital Solutions Company
          </div>

          <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.024em] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[9rem]">
            <span className="text-white">DIGITAL</span>{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(to left, #00DEFF, #0088CC, #6366f1)',
              }}
            >
              SOLUTIONS.
            </span>
            <br />
            <span className="text-white">REAL</span>{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(to left, #00DEFF, #0088CC, #fcd34d)',
              }}
            >
              GROWTH.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            TrishulHub delivers premium software development, web development,
            digital marketing, CRM solutions, UI/UX design, and e-commerce
            solutions that transform ideas into powerful digital experiences.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="liquid-glass btn-cyan group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00DEFF] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all sm:w-auto"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                Let&apos;s Get Started
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </a>
            <a
              href="#portfolio"
              className="liquid-glass btn-ghost group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:text-[#00DEFF] sm:w-auto"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                <Play size={14} className="fill-current" />
                View Our Work
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-10">
        <div className="mx-auto flex max-w-5xl items-center gap-12 px-4 sm:px-6">
          <span className="hidden shrink-0 text-sm text-white/50 lg:block">
            Relied on by brands
            <br />
            across the globe
          </span>

          <div className="relative flex-1 overflow-hidden">
            <div className="hero-marquee flex items-center gap-16">
              {[...marqueeItems, ...marqueeItems].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="liquid-glass flex shrink-0 items-center gap-3 rounded-xl px-4 py-2"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold text-[#00DEFF]">
                    {name.charAt(0)}
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold text-white">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
