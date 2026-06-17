'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onReady = () => setVideoReady(true)
    // Show video as soon as metadata (dimensions/duration) is known
    v.addEventListener('loadedmetadata', onReady)
    v.addEventListener('loadeddata', onReady)
    v.addEventListener('canplay', onReady)
    // Fallback: if metadata already loaded, show via microtask (avoids sync setState in effect)
    if (v.readyState >= 1) {
      queueMicrotask(() => setVideoReady(true))
    }
    // try to play (some browsers need a nudge)
    v.play().catch(() => {})
    return () => {
      v.removeEventListener('loadedmetadata', onReady)
      v.removeEventListener('loadeddata', onReady)
      v.removeEventListener('canplay', onReady)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:px-6"
    >
      {/* Background video (bottom layer) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 1s ease-out',
        }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Fallback background grid (visible until video loads) */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-60"
        style={{ opacity: videoReady ? 0 : 0.6, transition: 'opacity 1s ease-out' }}
      />

      {/* Radial glows (sit above video, below overlays) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 z-[4] h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-[4] h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #0088CC 0%, transparent 70%)' }}
      />

      {/* DARK + THEMED OVERLAY for readability (sits above video) */}
      {/* Base dark wash to fade video into the site theme */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.45) 35%, rgba(10,10,10,0.6) 70%, rgba(10,10,10,0.95) 100%)',
        }}
      />
      {/* Themed cyan/blue color wash so video blends with site palette */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] mix-blend-color"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,136,204,0.55) 0%, rgba(0,222,255,0.25) 50%, rgba(10,10,10,0.6) 100%)',
        }}
      />
      {/* Radial vignette darkening edges */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(10,10,10,0.45) 55%, rgba(10,10,10,0.9) 100%)',
        }}
      />
      {/* Subtle cyan tint band behind text for contrast */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[420px] w-[900px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,222,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Decorative orbiting ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[4] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00DEFF]/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[4] h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00DEFF]/5" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#00DEFF]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00DEFF] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00DEFF]" />
          </span>
          Digital Solutions Company
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
        >
          <span className="block text-white">DIGITAL SOLUTIONS.</span>
          <span className="block gradient-text">REAL GROWTH.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-base text-white/70 sm:text-lg md:text-xl"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
        >
          TrishulHub delivers premium software development, web development,
          digital marketing, CRM solutions, UI/UX design, and e-commerce
          solutions that transform ideas into powerful digital experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00DEFF] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:shadow-[0_0_30px_rgba(0,222,255,0.5)] sm:w-auto"
          >
            Let&apos;s Get Started
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#portfolio"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#00DEFF]/50 hover:bg-[#00DEFF]/5 hover:text-[#00DEFF] sm:w-auto"
          >
            <Play size={14} className="fill-current" />
            View Our Work
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-[#00DEFF]"
          />
        </div>
      </motion.div>
    </section>
  )
}
