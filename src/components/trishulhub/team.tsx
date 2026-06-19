'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, animate, useInView } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO } from '@/lib/animations'

type Founder = {
  slug: string
  initial: string
  name: string
  role: string
  projects: string
  bio: string
  videoUrl?: string | null
  image?: string | null
}

/*
 * Founder intro videos — looping clips for the founder cards.
 * ALL 4 founders (Kiran, Taroon, Akshat, Pruthvi) now have intro videos.
 *
 * If a founder's DB record has a `videoUrl` set (uploaded via the admin
 * panel), that takes priority. Otherwise we fall back to the hardcoded
 * defaults below.
 */
const FOUNDER_VIDEOS: Record<string, string> = {
  kiran: '/videos/founder-kiran.mp4',
  taroon: '/videos/founder-taroon.mp4',
  akshat: '/videos/founder-akshat.mp4',
  pruthvi: '/videos/founder-pruthvi.mp4',
}

/* ------------------------------------------------------------------ */
/* ProjectsCountUp — animates the "N+ Projects" badge from 0 → N       */
/* when the card scrolls into view, then re-animates on hover.         */
/* ------------------------------------------------------------------ */
function ProjectsCountUp({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.5 })
  const reduce = useReducedMotion()

  // Parse the leading number + suffix (e.g. "50+" → 50 and "+")
  const match = raw.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    if (!inView) return

    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => {
        el.textContent = `${Math.round(latest)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, target, suffix, reduce])

  // On hover of the parent card, re-trigger the count-up
  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const card = el.closest('[data-team-card]')
    if (!card) return

    const onEnter = () => {
      const controls = animate(0, target, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: (latest) => {
          el.textContent = `${Math.round(latest)}${suffix}`
        },
      })
      // Store stop function on the element so we can clean it up
      ;(el as HTMLElement & { _stop?: () => void })._stop = () => controls.stop()
    }
    const onLeave = () => {
      const stop = (el as HTMLElement & { _stop?: () => void })._stop
      if (stop) stop()
    }
    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [target, suffix, reduce])

  // Reduced-motion: just show the static number
  if (reduce) {
    return <span ref={ref}>{raw}</span>
  }

  return <span ref={ref}>0{suffix}</span>
}

export function Team({ founders }: { founders: Founder[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

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

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            Our Team
          </motion.span>
          <AnimatedHeading
            as="h2"
            variant="rise"
            stagger={0.1}
            duration={0.6}
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Meet Our *Team*
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: '#A0A0A0' }}
          >
            The minds behind TrishulHub — a team of passionate experts dedicated
            to delivering excellence in every project. Click any founder to view their full portfolio.
          </motion.p>
        </div>

        {/* Grid — staggered left-to-right reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
        >
          {founders.map((m) => {
            const founderVideo = m.videoUrl || FOUNDER_VIDEOS[m.slug] || null
            const founderImage = m.image || null
            return (
            <motion.a
              key={m.slug}
              href={`/founders/${m.slug}`}
              data-team-card
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                },
              }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -10,
                      boxShadow: '0 25px 50px -12px rgba(0,222,255,0.25)',
                    }
              }
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
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

              {/* Top hero area */}
              <div className="relative aspect-square overflow-hidden">
                {/* Background gradient */}
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    background:
                      'linear-gradient(135deg, #141414 0%, #0A0A0A 100%)',
                  }}
                />

                {/* Looping founder intro video */}
                {founderVideo && (
                  <video
                    src={founderVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: 'center top' }}
                  />
                )}

                {/* Founder photo fallback */}
                {!founderVideo && founderImage && (
                  <img
                    src={founderImage}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: 'center top' }}
                  />
                )}

                {/* Big initial letter fallback */}
                {!founderVideo && !founderImage && (
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

                {/* Bottom reveal bar (slides up on hover) — contains social links */}
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

                {/* Projects badge (top-left) — animated count-up */}
                <div className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm"
                  style={{
                    backgroundColor: 'rgba(0,222,255,0.12)',
                    color: '#00DEFF',
                    border: '1px solid rgba(0,222,255,0.3)',
                  }}
                >
                  <ProjectsCountUp raw={m.projects} /> Projects Delivered
                </div>
              </div>

              {/* Bottom text area */}
              <div className="relative flex flex-1 flex-col gap-2 p-5">
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
            )
          })}
        </motion.div>

        {/* Meet the team button */}
        <div className="mt-12 text-center">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            className="btn-ghost btn-shine group inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/50 px-7 py-3 text-sm font-semibold text-[#00DEFF] transition-all duration-300 hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
          >
            <span className="relative z-10">Meet The Team</span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
