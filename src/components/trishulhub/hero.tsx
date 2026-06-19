'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { AnimatedText } from './motion-primitives'
import { EASE_OUT_EXPO } from '@/lib/animations'

/* Local looping background video for the hero section.
 * Replaces the previous Mux HLS stream — this is a plain MP4 served from
 * /public/videos/hero-bg.mp4, played on an infinite loop with no audio.
 * Using a local file eliminates the hls.js dependency, the network round-trip
 * to Mux, and the ready/error/force-loop state machine that was needed for
 * streaming. A native <video loop muted autoPlay playsInline> is bullet-proof
 * across browsers.
 */
const HERO_VIDEO_URL = '/videos/hero-bg.mp4'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    let cancelled = false

    const onReady = () => {
      if (!cancelled) setVideoReady(true)
    }

    const tryPlay = () => {
      v.muted = true
      const p = v.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          /* autoplay blocked — will retry on first user interaction */
        })
      }
    }

    v.addEventListener('loadeddata', onReady)
    v.addEventListener('canplay', onReady)
    v.addEventListener('playing', onReady)
    const onError = () => {
      try {
        v.currentTime = 0
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      } catch {
        /* ignore */
      }
    }
    v.addEventListener('error', onError)

    if (v.readyState >= 2) onReady()

    tryPlay()

    const onFirstInteraction = () => {
      tryPlay()
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }
    window.addEventListener('click', onFirstInteraction)
    window.addEventListener('touchstart', onFirstInteraction)
    window.addEventListener('keydown', onFirstInteraction)

    const healthCheck = setInterval(() => {
      if (cancelled) return
      if (v.paused && !v.ended) {
        tryPlay()
      }
    }, 2000)

    const onSeeked = () => onReady()
    v.addEventListener('seeked', onSeeked)

    return () => {
      cancelled = true
      clearInterval(healthCheck)
      v.removeEventListener('loadeddata', onReady)
      v.removeEventListener('canplay', onReady)
      v.removeEventListener('playing', onReady)
      v.removeEventListener('error', onError)
      v.removeEventListener('seeked', onSeeked)
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }
  }, [])

  const handleEnded = () => {
    const v = videoRef.current
    if (!v) return
    try {
      v.currentTime = 0
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } catch {
      /* ignore */
    }
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6"
    >
      {/* Background video (bottom layer) */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={handleEnded}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 1s ease-out',
        }}
      />

      {/* Fallback background grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid"
        style={{
          opacity: videoReady ? 0 : 0.6,
          transition: 'opacity 1s ease-out',
        }}
      />
      {/* Fallback gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0A0A0A 0%, #0A0A0A 40%, #061218 100%)',
          opacity: videoReady ? 0 : 1,
          transition: 'opacity 1s ease-out',
        }}
      />

      {/* HERO-ONLY floating gradient orbs (replaces site-wide spacy bg) */}
      <div className="hero-orbs" aria-hidden="true" />

      {/* Radial glows (sit above video, below overlays) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 z-[4] h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-[4] h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #0088CC 0%, transparent 70%)' }}
      />

      {/* DARK + THEMED OVERLAY for readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0.25) 65%, rgba(10,10,10,0.75) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[5] mix-blend-color"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,136,204,0.25) 0%, rgba(0,222,255,0.12) 50%, rgba(10,10,10,0.2) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 0%, rgba(10,10,10,0.2) 60%, rgba(10,10,10,0.55) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[420px] w-[900px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,222,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#00DEFF]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00DEFF] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00DEFF]" />
          </span>
          Digital Solutions Company
        </motion.div>

        {/* Headline — word-by-word 3D flip reveal.
         * Each word flips in from rotateX(-90deg) with stagger 0.12s and
         * cubic-bezier(0.16, 1, 0.3, 1) easing — exactly as user requested. */}
        <AnimatedText
          as="h1"
          splitBy="words"
          variant="flip3d"
          stagger={0.12}
          duration={0.8}
          whenInView={false}
          className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
        >
          DIGITAL SOLUTIONS. *REAL* *GROWTH.*
        </AnimatedText>

        {/* Subtitle — fade-in with blur effect, 0.5s after heading completes. */}
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)' }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: EASE_OUT_EXPO,
          }}
          className="mx-auto mt-8 max-w-2xl text-base text-white/70 sm:text-lg md:text-xl"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
        >
          TrishulHub delivers premium software development, web development,
          digital marketing, CRM solutions, UI/UX design, and e-commerce
          solutions that transform ideas into powerful digital experiences.
        </motion.p>

        {/* CTAs — spring scale-in with 0.1s stagger + hover scale 1.05 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } },
          }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#contact"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { type: 'spring', stiffness: 200, damping: 18 },
              },
            }}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="btn-cyan btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00DEFF] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all sm:w-auto"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Let&apos;s Get Started
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </motion.a>
          <motion.a
            href="#portfolio"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { type: 'spring', stiffness: 200, damping: 18 },
              },
            }}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="btn-ghost btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:text-[#00DEFF] sm:w-auto"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              <Play size={14} className="fill-current" />
              View Our Work
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-[#00DEFF]"
          />
        </div>
      </motion.div>
    </section>
  )
}
