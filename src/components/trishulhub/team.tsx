'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react'

type Founder = {
  slug: string
  initial: string
  name: string
  role: string
  projects: string
  bio: string
}

/*
 * Founder intro videos — looping background clips for the founder cards.
 * Kiran and Taroon have custom intro videos; other founders fall back to
 * the gradient + big-initial design (no video).
 */
const FOUNDER_VIDEOS: Record<string, string> = {
  kiran: '/videos/founder-kiran.mp4',
  taroon: '/videos/founder-taroon.mp4',
}

export function Team({ founders }: { founders: Founder[] }) {
  const sectionRef = useRef<HTMLElement>(null)

  // Some browsers won't autoplay muted videos reliably (especially on mobile
  // or when the page was loaded in a background tab). As a belt-and-suspenders
  // measure, after mount we explicitly call .play() on every founder video in
  // this section. If a video is already playing, .play() is a no-op.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const videos = Array.from(section.querySelectorAll<HTMLVideoElement>('video'))
    const kick = () => {
      videos.forEach((v) => {
        v.muted = true
        v.play().catch(() => {
          /* autoplay blocked — will retry on next user interaction */
        })
      })
    }
    // Kick once on mount, and again on first user interaction (covers the
    // case where the browser blocks autoplay until the user interacts).
    kick()
    const onFirstInteraction = () => {
      kick()
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }
    window.addEventListener('click', onFirstInteraction)
    window.addEventListener('touchstart', onFirstInteraction)
    window.addEventListener('keydown', onFirstInteraction)
    return () => {
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* bg glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]">
            Our Team
          </span>
          <h2
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Meet The Founders
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: '#A0A0A0' }}
          >
            The minds behind TrishulHub — a team of passionate experts dedicated
            to delivering excellence in every project. Click any founder to view their full portfolio.
          </p>
        </div>

        {/* Grid - 2 columns */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {founders.map((m, i) => (
            <motion.a
              key={m.slug}
              href={`/founders/${m.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 cursor-pointer"
            >
              {/* Hover glow border layer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow:
                    '0 0 0 1px #00DEFF, 0 0 32px rgba(0,222,255,0.25)',
                }}
              />

              {/* Top hero area
               * Video is 858x1072 (4:5 portrait). We use aspect-[4/5]
               * CONSISTENTLY on mobile AND desktop so the video never gets
               * cropped (the previous sm:h-64 sm:aspect-auto override turned
               * the desktop container into a wide rectangle, squashing the
               * portrait video and cutting off the top of the head/hair).
               * We also use object-position: center top as a belt-and-suspenders
               * guard so the head is always prioritised if any tiny rounding
               * crop happens at the bottom.
               */}
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* Background gradient (scales on hover) — always present as base */}
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    background:
                      'linear-gradient(135deg, #141414 0%, #0A0A0A 100%)',
                  }}
                />

                {/* Looping founder intro video (kiran + taroon only) */}
                {FOUNDER_VIDEOS[m.slug] && (
                  <video
                    src={FOUNDER_VIDEOS[m.slug]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ objectPosition: 'center top' }}
                  />
                )}

                {/* Radial cyan glow (sits above video) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,222,255,0.18) 0%, transparent 70%)',
                  }}
                />
                {/* Grid pattern overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                {/* Big initial letter — only shown for founders WITHOUT a video */}
                {!FOUNDER_VIDEOS[m.slug] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="select-none text-[120px] font-bold leading-none sm:text-[140px]"
                      style={{
                        color: '#00DEFF',
                        fontFamily: 'var(--font-space-grotesk)',
                        textShadow: 'rgba(0,222,255,0.357) 0px 0px 24.74px',
                      }}
                    >
                      {m.initial}
                    </span>
                  </div>
                )}

                {/* Top-right "View Portfolio" arrow icon */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/40 backdrop-blur-sm transition-all duration-300 group-hover:border-[#00DEFF]/60 group-hover:bg-[#00DEFF]/10 group-hover:text-[#00DEFF]">
                  <ArrowUpRight size={16} />
                </div>

                {/* Bottom reveal bar (slides up on hover) */}
                <div
                  className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,222,255,0.18) 0%, rgba(0,222,255,0.08) 60%, transparent 100%)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                  }}
                >
                  <div className="flex items-center justify-center gap-3 py-4">
                    <span
                      aria-label={`${m.name} on GitHub`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#00DEFF] hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                    >
                      <Github size={16} />
                    </span>
                    <span
                      aria-label={`${m.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#00DEFF] hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                    >
                      <Linkedin size={16} />
                    </span>
                    <span
                      aria-label={`${m.name} on Twitter`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#00DEFF] hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                    >
                      <Twitter size={16} />
                    </span>
                    <span
                      aria-label={`Email ${m.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#00DEFF] hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                    >
                      <Mail size={16} />
                    </span>
                  </div>
                </div>

                {/* Projects badge (top-left) */}
                <div className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm"
                  style={{
                    backgroundColor: 'rgba(0,222,255,0.12)',
                    color: '#00DEFF',
                    border: '1px solid rgba(0,222,255,0.3)',
                  }}
                >
                  {m.projects} Projects Delivered
                </div>
              </div>

              {/* Bottom text area */}
              <div className="relative flex flex-1 flex-col gap-2 p-6">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {m.name}
                </h3>
                <span className="text-sm font-medium text-white/60">
                  {m.role}
                </span>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: '#A0A0A0' }}
                >
                  {m.bio}
                </p>

                {/* "View Portfolio" link */}
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#00DEFF] opacity-80 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
                  View Full Portfolio
                  <ArrowUpRight size={12} />
                </div>

                {/* Divider line (scales in on hover) */}
                <div
                  className="mt-4 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{
                    background:
                      'linear-gradient(to right, #00DEFF 0%, #0088CC 100%)',
                  }}
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Meet the team button */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/50 px-7 py-3 text-sm font-semibold text-[#00DEFF] transition-all duration-300 hover:bg-[#00DEFF] hover:text-[#0A0A0A] hover:shadow-[0_0_30px_rgba(0,222,255,0.4)]"
          >
            Meet The Team
          </a>
        </div>
      </div>
    </section>
  )
}
