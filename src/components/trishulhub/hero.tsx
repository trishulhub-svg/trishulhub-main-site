'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Code2,
  Gauge,
} from 'lucide-react'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const CAROUSEL_WORDS = [
  'high-performing.',
  'future-proof.',
  'reliable.',
  'scalable.',
  'secure.',
  'measurable.',
] as const

const TECH = [
  { file: 'nextdotjs.svg', name: 'Next.js' },
  { file: 'react.svg', name: 'React' },
  { file: 'typescript.svg', name: 'TypeScript' },
  { file: 'tailwindcss.svg', name: 'Tailwind' },
  { file: 'nodedotjs.svg', name: 'Node.js' },
  { file: 'prisma.svg', name: 'Prisma' },
  { file: 'turso.svg', name: 'Turso' },
  { file: 'postgresql.svg', name: 'PostgreSQL' },
  { file: 'vercel.svg', name: 'Vercel' },
  { file: 'cloudflare.svg', name: 'Cloudflare' },
  { file: 'docker.svg', name: 'Docker' },
  { file: 'graphql.svg', name: 'GraphQL' },
  { file: 'python.svg', name: 'Python' },
  { file: 'figma.svg', name: 'Figma' },
  { file: 'greensock.svg', name: 'GSAP' },
] as const

const PROOF = [
  {
    icon: Zap,
    title: 'Performance first',
    text: 'Sub-second loads, Core Web Vitals in the green.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & GDPR-ready',
    text: 'EU/UK data residency and hardened auth flows.',
  },
  {
    icon: Gauge,
    title: 'Clear scope, clear price',
    text: 'Fixed milestones, weekly updates, no surprises.',
  },
  {
    icon: Globe,
    title: 'UK-based, globally remote',
    text: 'Overlap-friendly hours with your team.',
  },
] as const

export function Hero() {
  const { links } = useSiteContact()
  const reduce = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(
      () => setWordIndex((i) => (i + 1) % CAROUSEL_WORDS.length),
      2400,
    )
    return () => window.clearInterval(id)
  }, [reduce])

  const word = CAROUSEL_WORDS[wordIndex]

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92svh] items-center justify-center overflow-hidden bg-[#fafafa] pb-16 pt-28 text-gray-900 antialiased selection:bg-[#0d3c1f]/10 sm:pt-32 md:min-h-screen"
    >
      {/* Zero-request background: fine grid + drifting aurora + brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8e5_1px,transparent_1px)] [background-size:26px_26px] opacity-70" />
        <div className="th-aurora-glow absolute -top-[35%] left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 opacity-[0.14]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fafafa] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="th-eyebrow mb-7"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#0d9488]" />
            <span>UK digital engineering studio</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease: EASE_OUT_EXPO }}
            className="text-balance max-w-4xl text-[2rem] font-bold leading-[1.14] tracking-[-0.03em] text-[#111111] sm:text-5xl md:text-6xl lg:text-[4.1rem] lg:leading-[1.06]"
          >
            <span className="font-sans">We build digital products that are </span>
            <span className="relative inline-flex align-baseline">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
                  className="inline-block font-playfair italic text-[#0D3C1F]"
                >
                  {word}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE_OUT_EXPO }}
            className="text-pretty mt-6 max-w-2xl text-base leading-relaxed text-[#4b5563] sm:text-lg"
          >
            From high-speed marketing sites to bespoke internal software and
            mobile apps — TrishulHub designs, engineers and ships products your
            team can rely on from day one.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: EASE_OUT_EXPO }}
            className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#0D3C1F] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#164a28] hover:shadow-[0_14px_34px_rgba(13,60,31,0.24)] sm:w-auto"
            >
              Start your project
              <ArrowRight size={16} />
            </a>
            <Link
              href="/services"
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-[#d1d5db] bg-white/85 px-8 py-3.5 text-sm font-semibold text-[#111111] backdrop-blur-sm transition hover:border-[#0D3C1F]/40 hover:text-[#0D3C1F] sm:w-auto"
            >
              <Code2 size={16} />
              Explore services
            </Link>
          </motion.div>

          {/* Proof points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 text-left sm:gap-4 lg:grid-cols-4"
          >
            {PROOF.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#111111]/10 bg-white/70 p-4 backdrop-blur-sm transition hover:border-[#0D3C1F]/25 hover:bg-white"
              >
                <span className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#0D3C1F]">
                  <Icon size={17} strokeWidth={1.7} />
                </span>
                <p className="text-[13px] font-semibold leading-tight text-[#111111]">
                  {title}
                </p>
                <p className="mt-1 text-[11.5px] leading-snug text-[#6b7280]">
                  {text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tech marquee — purely decorative, CSS-animated, uses local SVGs */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 hidden border-t border-[#111111]/8 bg-white/60 py-4 backdrop-blur-sm md:block"
      >
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="animate-marquee flex min-w-max items-center gap-12 pr-12">
            {[...TECH, ...TECH].map((t, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${t.name}-${i}`}
                src={`/images/logos/${t.file}`}
                alt=""
                width={26}
                height={26}
                loading="lazy"
                decoding="async"
                className="h-6 w-auto shrink-0 opacity-45 grayscale transition hover:opacity-80"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
