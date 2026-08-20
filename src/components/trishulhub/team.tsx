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
 * Taroon and Pruthviraj have intro videos.
 *
 * If a founder's DB record has a `videoUrl` set (uploaded via the admin
 * panel), that takes priority. Otherwise we fall back to the hardcoded
 * defaults below.
 */
const FOUNDER_VIDEOS: Record<string, string> = {
  taroon: '/videos/founder-taroon.mp4',
  pruthvi: '/videos/founder-pruthvi.mp4',
}

/* ------------------------------------------------------------------ */
/* ProjectsCountUp — animates the "N+ Projects" badge from 0 → N       */
/* when the card scrolls into view, then re-animates on hover.         */
/* ------------------------------------------------------------------ */
function ProjectsCountUp({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })
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
    <section id="founders" ref={sectionRef} className="relative overflow-hidden bg-[#0d9488]/20 py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#0d9488]"
          >
            Our Founders
          </motion.span>
          <AnimatedHeading
            as="h2"
            variant="rise"
            stagger={0.1}
            duration={0.6}
            className="text-3xl font-medium leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Meet Our Founders
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Meet Taroon and Pruthviraj — the people behind TrishulHub.
            Click anyone to see their full portfolio.
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
          className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2"
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
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm cursor-pointer"
            >
              {/* Hover glow border layer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow:
                    '0 0 0 1px #0d9488, 0 0 32px rgba(2,132,199,0.15)',
                }}
              />

              {/* Top hero area */}
              <div className="relative aspect-square overflow-hidden">
                {/* Background gradient */}
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    background:
                      'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
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
                        color: '#0d9488',
                        fontFamily: 'var(--font-inter)',
                        textShadow: 'rgba(0,222,255,0.357) 0px 0px 24.74px',
                      }}
                    >
                      {m.initial}
                    </span>
                  </div>
                )}

                {/* Top-right "View Portfolio" arrow icon */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white/90 text-muted-foreground backdrop-blur-sm transition-all duration-300 group-hover:border-[#0d9488]/40 group-hover:bg-[#e8f4f3] group-hover:text-[#0d9488]">
                  <ArrowUpRight size={16} />
                </div>

                {/* Bottom reveal bar (slides up on hover) — contains social links */}
                <div
                  className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(2,132,199,0.12) 0%, rgba(2,132,199,0.04) 60%, transparent 100%)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                  }}
                >
                  <div className="flex items-center justify-center gap-3 py-4">
                    <span
                      aria-label={`${m.name} on GitHub`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-[#0d9488] hover:bg-[#000000] hover:text-white"
                    >
                      <Github size={16} />
                    </span>
                    <span
                      aria-label={`${m.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-[#0d9488] hover:bg-[#000000] hover:text-white"
                    >
                      <Linkedin size={16} />
                    </span>
                    <span
                      aria-label={`${m.name} on Twitter`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-[#0d9488] hover:bg-[#000000] hover:text-white"
                    >
                      <Twitter size={16} />
                    </span>
                    <span
                      aria-label={`Email ${m.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-[#0d9488] hover:bg-[#000000] hover:text-white"
                    >
                      <Mail size={16} />
                    </span>
                  </div>
                </div>

                {/* Projects badge (top-left) — animated count-up */}
                <div className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm"
                  style={{
                    backgroundColor: 'rgba(2,132,199,0.1)',
                    color: '#0d9488',
                    border: '1px solid rgba(2,132,199,0.25)',
                  }}
                >
                  <ProjectsCountUp raw={m.projects} /> Projects Delivered
                </div>
              </div>

              {/* Bottom text area */}
              <div className="relative flex flex-1 flex-col gap-2 p-5">
                <h3
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {m.name}
                </h3>
                <span className="text-sm font-medium text-muted-foreground">
                  {m.role}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>

                {/* "View Portfolio" link */}
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#0d9488] opacity-80 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
                  View Full Portfolio
                  <ArrowUpRight size={12} />
                </div>

                {/* Divider line (scales in on hover) */}
                <div
                  className="mt-4 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{
                    background:
                      'linear-gradient(to right, #0d9488 0%, #0369a1 100%)',
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
            className="btn-ghost btn-shine group inline-flex items-center gap-2 rounded-lg border border-[#0d9488]/40 bg-white px-7 py-3 text-sm font-semibold text-[#0d9488] shadow-sm transition-all duration-300 hover:bg-[#000000] hover:text-white"
          >
            <span className="relative z-10">Meet The Founders</span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
