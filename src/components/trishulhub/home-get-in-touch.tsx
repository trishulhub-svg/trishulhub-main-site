'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
} from 'lucide-react'
import { type ReactNode } from 'react'
import { EASE_OUT_EXPO } from '@/lib/animations'

const CONTACTS = {
  whatsapp:
    'https://wa.me/?text=' +
    encodeURIComponent('Hi TrishulHub — I want to discuss a project.'),
  email: 'mailto:trishulhub@gmail.com',
  instagram: 'https://www.instagram.com/',
  hub: '/contact',
}

type NodeSpec = {
  label: string
  href: string
  external?: boolean
  color: string
  glow: string
  icon: ReactNode
}

const leftNodes: NodeSpec[] = [
  {
    label: 'WhatsApp',
    href: CONTACTS.whatsapp,
    external: true,
    color: 'text-emerald-400',
    glow: 'rgba(52,211,153,0.35)',
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 fill-current" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Call us',
    href: '/contact',
    color: 'text-[#00DEFF]',
    glow: 'rgba(0,222,255,0.35)',
    icon: <Phone className="h-9 w-9" strokeWidth={1.5} />,
  },
]

const rightNodes: NodeSpec[] = [
  {
    label: 'Email',
    href: CONTACTS.email,
    color: 'text-[#33E6FF]',
    glow: 'rgba(0,222,255,0.35)',
    icon: <Mail className="h-9 w-9" strokeWidth={1.5} />,
  },
  {
    label: 'Instagram',
    href: CONTACTS.instagram,
    external: true,
    color: 'text-pink-400',
    glow: 'rgba(236,72,153,0.35)',
    icon: <Instagram className="h-9 w-9" strokeWidth={1.5} />,
  },
]

function ContactNode({
  node,
  offset,
}: {
  node: NodeSpec
  offset?: 'right' | 'left'
}) {
  const extra =
    offset === 'right'
      ? 'md:translate-x-10'
      : offset === 'left'
        ? 'md:-translate-x-10'
        : ''

  const sharedClass = `group relative ${extra}`

  const inner = (
    <>
      <div
        className="absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${node.glow}, transparent 60%)`,
        }}
      />
      <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-[1.06] md:h-[92px] md:w-[92px]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        <span
          className={node.color}
          style={{ filter: `drop-shadow(0 0 12px ${node.glow})` }}
        >
          {node.icon}
        </span>
      </div>
      <span className="mt-3 block text-center font-sans text-[11px] uppercase tracking-[0.18em] text-neutral-400 md:absolute md:left-1/2 md:top-full md:mt-3 md:-translate-x-1/2 md:opacity-70">
        {node.label}
      </span>
    </>
  )

  if (node.external) {
    return (
      <a
        href={node.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={node.label}
        className={sharedClass}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={node.href} aria-label={node.label} className={sharedClass}>
      {inner}
    </Link>
  )
}

/**
 * Get In Touch — 4 contact channels wired into a glowing hub (TrishulHub theme).
 */
export function HomeGetInTouch() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.02] to-white/10 px-5 py-10 sm:px-10">
        {/* Header */}
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-6">
            <span className="font-display text-xs tracking-widest text-[#00DEFF]">
              02
            </span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-display text-xs uppercase tracking-widest text-neutral-500">
              Get in touch
            </span>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-3xl flex-col gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="font-display text-4xl font-semibold leading-[1.05] text-white md:text-5xl lg:text-6xl"
              >
                Let&apos;s build something
                <span className="mt-1 block text-neutral-500">
                  great together.
                </span>
              </motion.h2>
              <p className="max-w-xl font-sans text-base font-light leading-relaxed text-neutral-400 sm:text-lg">
                Have a project in mind or need expert guidance? We&apos;re just
                a message away. Let&apos;s connect and bring your ideas to life.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-6 py-3 font-sans text-sm font-medium text-white transition hover:bg-white/5"
            >
              <span>Contact form</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Hub + wires */}
        <div className="relative mx-auto mt-16 flex min-h-[480px] w-full max-w-6xl items-center justify-center px-2 sm:min-h-[560px] md:mt-20">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 560"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="wire" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="25%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#00DEFF" stopOpacity="0.35" />
                <stop offset="75%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="noodleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00DEFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#7af0ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#00DEFF" stopOpacity="0" />
              </linearGradient>
              <filter id="wireGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static wires — 4 corners only */}
            <path
              d="M 165 130 L 290 130 Q 360 130 360 200 V 255 Q 360 280 390 280 L 440 280"
              stroke="url(#wire)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#wireGlow)"
              opacity="0.5"
            />
            <path
              d="M 165 430 L 290 430 Q 360 430 360 360 V 305 Q 360 280 390 280 L 440 280"
              stroke="url(#wire)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#wireGlow)"
              opacity="0.5"
            />
            <path
              d="M 440 280 L 560 280"
              stroke="url(#wire)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#wireGlow)"
              opacity="0.35"
            />
            <path
              d="M 835 130 L 710 130 Q 640 130 640 200 V 255 Q 640 280 610 280 L 560 280"
              stroke="url(#wire)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#wireGlow)"
              opacity="0.5"
            />
            <path
              d="M 835 430 L 710 430 Q 640 430 640 360 V 305 Q 640 280 610 280 L 560 280"
              stroke="url(#wire)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#wireGlow)"
              opacity="0.5"
            />

            {/* Animated noodles */}
            <path
              d="M 165 130 L 290 130 Q 360 130 360 200 V 255 Q 360 280 390 280 L 440 280"
              stroke="url(#noodleGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#wireGlow)"
              className="animate-noodle"
            />
            <path
              d="M 165 430 L 290 430 Q 360 430 360 360 V 305 Q 360 280 390 280 L 440 280"
              stroke="url(#noodleGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#wireGlow)"
              className="animate-noodle"
            />
            <path
              d="M 835 130 L 710 130 Q 640 130 640 200 V 255 Q 640 280 610 280 L 560 280"
              stroke="url(#noodleGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#wireGlow)"
              className="animate-noodle"
            />
            <path
              d="M 835 430 L 710 430 Q 640 430 640 360 V 305 Q 640 280 610 280 L 560 280"
              stroke="url(#noodleGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#wireGlow)"
              className="animate-noodle"
            />
            <path
              d="M 440 280 L 560 280"
              stroke="url(#noodleGradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#wireGlow)"
              className="animate-noodle-delayed"
            />

            <circle
              cx="440"
              cy="280"
              r="3"
              fill="#00DEFF"
              filter="url(#dotGlow)"
              className="animate-pulse"
            />
            <circle
              cx="560"
              cy="280"
              r="3"
              fill="#00DEFF"
              filter="url(#dotGlow)"
              className="animate-pulse"
            />
          </svg>

          <div className="relative z-10 grid h-full w-full grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
            {/* Left — WhatsApp + Call */}
            <div className="flex h-full flex-row items-center justify-center gap-8 px-4 md:flex-col md:justify-between md:gap-0 md:px-12 md:py-16">
              <ContactNode node={leftNodes[0]} />
              <ContactNode node={leftNodes[1]} offset="right" />
            </div>

            {/* Center hub */}
            <div className="flex items-center justify-center py-6 md:py-0">
              <Link href={CONTACTS.hub} className="relative block" aria-label="Contact TrishulHub">
                <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(0,222,255,0.28),transparent_65%)] blur-3xl" />
                <div
                  className="animate-beam-spin pointer-events-none absolute -inset-[20%] rounded-full opacity-40"
                  style={{
                    background:
                      'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, rgba(0,222,255,0.45) 360deg)',
                    maskImage: 'radial-gradient(transparent 55%, black 60%)',
                    WebkitMaskImage:
                      'radial-gradient(transparent 55%, black 60%)',
                  }}
                />
                <div
                  className="animate-beam-spin pointer-events-none absolute -inset-[15%] rounded-full opacity-25"
                  style={{
                    background:
                      'conic-gradient(from 180deg at 50% 50%, transparent 0deg, transparent 240deg, rgba(0,136,204,0.55) 360deg)',
                    animationDirection: 'reverse',
                    animationDuration: '12s',
                    maskImage: 'radial-gradient(transparent 55%, black 60%)',
                    WebkitMaskImage:
                      'radial-gradient(transparent 55%, black 60%)',
                  }}
                />
                <div className="relative flex h-[110px] w-[110px] flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_40px_100px_-40px_rgba(0,222,255,0.7)] backdrop-blur-2xl md:h-[132px] md:w-[132px]">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
                  <div className="absolute inset-[10px] rounded-full border border-white/10" />
                  <MessageCircle
                    className="relative h-12 w-12 text-[#00DEFF] md:h-14 md:w-14"
                    strokeWidth={1.5}
                    style={{
                      filter: 'drop-shadow(0 0 24px rgba(0,222,255,0.6))',
                    }}
                  />
                  <span className="relative mt-1 font-display text-[10px] uppercase tracking-[0.2em] text-white/70">
                    Contact
                  </span>
                </div>
              </Link>
            </div>

            {/* Right — Email + Instagram */}
            <div className="flex h-full flex-row items-center justify-center gap-8 px-4 md:flex-col md:justify-between md:gap-0 md:px-12 md:py-16">
              <ContactNode node={rightNodes[0]} />
              <ContactNode node={rightNodes[1]} offset="left" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
