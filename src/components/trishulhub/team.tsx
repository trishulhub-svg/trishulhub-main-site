'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, animate, useInView } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import { HeroAccentWord } from './hero-accent-word'
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

const FOUNDER_VIDEOS: Record<string, string> = {
  taroon: '/videos/founder-taroon.mp4',
  pruthvi: '/videos/founder-pruthvi.mp4',
}

function ProjectsCountUp({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })
  const reduce = useReducedMotion()

  const match = raw.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el || !inView) return

    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => {
        el.textContent = `${Math.round(latest)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, target, suffix, reduce])

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
        v.play().catch(() => {})
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
    <section
      id="founders"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fafafa] px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="lt-glow pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 opacity-50" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-4 text-sm font-medium text-[#6b7280]"
          >
            Our founders
          </motion.p>
          <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl lg:text-5xl">
            Meet our <HeroAccentWord words="founders" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6b7280] sm:text-lg"
          >
            Meet Taroon and Pruthviraj — the people behind TrishulHub. Click
            anyone to see their full portfolio.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
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
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
                  },
                }}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-[#111111] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5ef] to-[#fafafa]" />

                  {founderVideo && (
                    <video
                      src={founderVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      aria-hidden
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: 'center top' }}
                    />
                  )}

                  {!founderVideo && founderImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founderImage}
                      alt={m.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: 'center top' }}
                    />
                  )}

                  {!founderVideo && !founderImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="select-none text-[120px] font-bold leading-none text-[#0D3C1F]/25 sm:text-[140px]">
                        {m.initial}
                      </span>
                    </div>
                  )}

                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#111111]/15 bg-white/90 text-[#6b7280] backdrop-blur-sm transition group-hover:border-[#0D3C1F] group-hover:bg-[#0D3C1F] group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </div>

                  <div className="absolute left-4 top-4 rounded-full border border-[#111111]/15 bg-white/90 px-3 py-1 text-xs font-semibold text-[#0D3C1F] backdrop-blur-sm">
                    <ProjectsCountUp raw={m.projects} /> projects delivered
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-xl font-bold text-[#111111]">{m.name}</h3>
                  <span className="text-sm font-medium text-[#0D3C1F]">{m.role}</span>
                  <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">{m.bio}</p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#0D3C1F] transition-all duration-300 group-hover:gap-2.5">
                    View full portfolio
                    <ArrowUpRight size={12} />
                  </div>

                  <div className="mt-4 flex items-center gap-2 border-t border-[#e5e7eb] pt-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/15 text-[#6b7280]">
                      <Github size={14} />
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/15 text-[#6b7280]">
                      <Linkedin size={14} />
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/15 text-[#6b7280]">
                      <Twitter size={14} />
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/15 text-[#6b7280]">
                      <Mail size={14} />
                    </span>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center gap-2 rounded-full bg-[#0D3C1F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#164a28]"
          >
            Talk with the team
          </motion.a>
        </div>
      </div>
    </section>
  )
}
