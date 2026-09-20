'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion-safe'
import {
  ArrowRight,
  Code2,
  Gauge,
  Globe,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { HeroVisual } from '@/components/trishulhub/hero-visual'
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
    icon: Gauge,
    title: 'Performance first',
    text: 'Sub-second loads with Core Web Vitals in the green.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & GDPR-ready',
    text: 'EU/UK data residency and hardened auth flows.',
  },
  {
    icon: MessagesSquare,
    title: 'Direct access',
    text: 'You talk to the engineers writing the code.',
  },
  {
    icon: Globe,
    title: 'UK-based, globally remote',
    text: 'Overlap-friendly hours with your team.',
  },
] as const

export function Hero() {
  const { links } = useSiteContact()
  const reduce = useReducedMotionSafe()
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
      className="relative isolate overflow-hidden bg-[#fafafa] pt-28 pb-0 text-gray-900 antialiased sm:pt-32"
    >
      {/* Background: soft aurora + brand glow (no images, no video) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8e5_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />
        <div className="th-aurora-glow absolute -top-[40%] right-[-15%] h-[60rem] w-[60rem] opacity-[0.16]" />
        <div className="absolute -left-40 top-24 h-[26rem] w-[26rem] rounded-full bg-[#0d9488]/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fafafa] to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 pb-16 pt-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-20 lg:pt-10">
          {/* ---------------- Copy ---------------- */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="th-eyebrow mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#0d9488]" />
              <span>UK digital engineering studio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05, ease: EASE_OUT_EXPO }}
              className="text-balance text-[1.9rem] font-bold leading-[1.14] tracking-[-0.03em] text-[#111111] sm:text-[2.6rem] md:text-5xl lg:text-[3.6rem] lg:leading-[1.05]"
            >
              <span className="font-sans">We build digital products that are </span>
              <span className="relative inline-flex align-baseline">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 16, filter: 'blur(7px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(7px)' }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    className="inline-block font-playfair italic text-[#0D3C1F]"
                  >
                    {word}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT_EXPO }}
              className="text-pretty mt-6 max-w-xl text-base leading-relaxed text-[#4b5563] sm:text-lg"
            >
              From high-speed marketing sites to bespoke internal software and
              mobile apps — TrishulHub designs, engineers and ships products your
              team can rely on from day one.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: EASE_OUT_EXPO }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-[#0D3C1F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#164a28] hover:shadow-[0_14px_34px_rgba(13,60,31,0.26)]"
              >
                Start your project
                <ArrowRight size={16} />
              </a>
              <Link
                href="/services"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-[#d1d5db] bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#111111] backdrop-blur-sm transition hover:border-[#0D3C1F]/40 hover:text-[#0D3C1F]"
              >
                <Code2 size={16} />
                Explore services
              </Link>
            </motion.div>

            {/* Proof grid */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-12 grid gap-x-6 gap-y-5 border-t border-[#0d3c1f]/10 pt-8 sm:grid-cols-2"
            >
              {PROOF.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0D3C1F] shadow-[0_6px_18px_rgba(6,43,22,0.08)] ring-1 ring-[#0d3c1f]/10">
                    <Icon size={16} strokeWidth={1.7} />
                  </span>
                  <div>
                    <dt className="text-[13.5px] font-semibold text-[#111111]">
                      {title}
                    </dt>
                    <dd className="mt-0.5 text-[12.5px] leading-snug text-[#6b7280]">
                      {text}
                    </dd>
                  </div>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------------- Animated visual ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="relative lg:pl-4"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Tech marquee strip */}
      <div className="relative border-y border-[#0d3c1f]/10 bg-white/70 py-5 backdrop-blur-sm">
        <div className="mx-auto mb-3 flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Zap size={13} className="text-[#0d9488]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
            Built with a modern, boring-on-purpose stack
          </p>
        </div>
        <div
          aria-hidden
          className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
        >
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
