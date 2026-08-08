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

import { MAILTO_URL, TEL_URL, WHATSAPP_URL } from '@/lib/contacts'

const CONTACTS = {
  whatsapp: WHATSAPP_URL,
  call: TEL_URL,
  email: MAILTO_URL,
  instagram: 'https://www.instagram.com/',
}

type NodeSpec = {
  id: string
  label: string
  href: string
  external?: boolean
  color: string
  glow: string
  x: number
  y: number
  icon: ReactNode
}

const VB_W = 1000
const VB_H = 560

const nodes: NodeSpec[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: CONTACTS.whatsapp,
    external: true,
    color: 'text-emerald-400',
    glow: 'rgba(52,211,153,0.35)',
    x: 165,
    y: 130,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: 'call',
    label: 'Call us',
    href: CONTACTS.call,
    external: true,
    color: 'text-[#00DEFF]',
    glow: 'rgba(0,222,255,0.35)',
    x: 165,
    y: 430,
    icon: <Phone className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    id: 'email',
    label: 'Email',
    href: CONTACTS.email,
    color: 'text-[#33E6FF]',
    glow: 'rgba(0,222,255,0.35)',
    x: 835,
    y: 130,
    icon: <Mail className="h-6 w-6" strokeWidth={1.5} />,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: CONTACTS.instagram,
    external: true,
    color: 'text-pink-400',
    glow: 'rgba(236,72,153,0.35)',
    x: 835,
    y: 430,
    icon: <Instagram className="h-6 w-6" strokeWidth={1.5} />,
  },
]

const PATHS = [
  'M 165 130 L 290 130 Q 360 130 360 200 V 255 Q 360 280 390 280 L 440 280',
  'M 165 430 L 290 430 Q 360 430 360 360 V 305 Q 360 280 390 280 L 440 280',
  'M 835 130 L 710 130 Q 640 130 640 200 V 255 Q 640 280 610 280 L 560 280',
  'M 835 430 L 710 430 Q 640 430 640 360 V 305 Q 640 280 610 280 L 560 280',
  'M 440 280 L 560 280',
]

function NodeFace({ node }: { node: NodeSpec }) {
  return (
    <>
      <div
        className="absolute inset-0 scale-150 rounded-full opacity-0 blur-xl transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${node.glow}, transparent 60%)`,
        }}
      />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] shadow-[0_12px_28px_-14px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-[1.06] md:h-[76px] md:w-[76px]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        <span
          className={`relative ${node.color}`}
          style={{ filter: `drop-shadow(0 0 10px ${node.glow})` }}
        >
          {node.icon}
        </span>
      </div>
      <span className="mt-2 font-sans text-[10px] uppercase tracking-[0.16em] text-neutral-400">
        {node.label}
      </span>
    </>
  )
}

function AbsoluteNode({ node }: { node: NodeSpec }) {
  const style = {
    left: `${(node.x / VB_W) * 100}%`,
    top: `${(node.y / VB_H) * 100}%`,
  }
  const cls =
    'group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center'

  if (node.external) {
    return (
      <a
        href={node.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={node.label}
        className={cls}
        style={style}
      >
        <NodeFace node={node} />
      </a>
    )
  }

  return (
    <Link href={node.href} aria-label={node.label} className={cls} style={style}>
      <NodeFace node={node} />
    </Link>
  )
}

function MobileNode({ node }: { node: NodeSpec }) {
  const cls = 'group relative flex flex-col items-center'
  if (node.external) {
    return (
      <a
        href={node.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={node.label}
        className={cls}
      >
        <NodeFace node={node} />
      </a>
    )
  }
  return (
    <Link href={node.href} aria-label={node.label} className={cls}>
      <NodeFace node={node} />
    </Link>
  )
}

export function HomeGetInTouch() {
  return (
    <section className="relative py-10 sm:py-14">
      <div className="relative mx-auto max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.02] to-white/10 px-5 py-10 sm:px-10">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-6">
            <span className="font-display text-xs tracking-widest text-[#00DEFF]">
              01
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
                Want to talk?
                <span className="mt-1 block text-neutral-500">
                  We are ready to help.
                </span>
              </motion.h2>
              <p className="max-w-xl font-sans text-base font-light leading-relaxed text-neutral-400 sm:text-lg">
                Message us on WhatsApp, call, or email. Tell us what you need
                and we will reply soon.
              </p>
            </div>

            <a
              href="#contact-form"
              className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-6 py-3 font-sans text-sm font-medium text-white transition hover:bg-white/5"
            >
              <span>Contact form</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-14 hidden aspect-[1000/560] w-full max-w-5xl md:mt-16 md:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="wireContact" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="25%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#00DEFF" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="noodleContact" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00DEFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#7af0ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#00DEFF" stopOpacity="0" />
              </linearGradient>
              <filter id="wireGlowContact" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {PATHS.map((d, i) => (
              <g key={d}>
                <path
                  d={d}
                  stroke="url(#wireContact)"
                  strokeWidth="1.5"
                  fill="none"
                  filter="url(#wireGlowContact)"
                  opacity="0.55"
                />
                <path
                  d={d}
                  stroke="url(#noodleContact)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#wireGlowContact)"
                  className={i === 4 ? 'animate-noodle-delayed' : 'animate-noodle'}
                />
              </g>
            ))}
          </svg>

          {nodes.map((n) => (
            <AbsoluteNode key={n.id} node={n} />
          ))}

          <a
            href="#contact-form"
            aria-label="Contact TrishulHub"
            className="absolute left-1/2 top-1/2 z-10 block -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(0,222,255,0.28),transparent_65%)] blur-3xl" />
            <div
              className="animate-beam-spin pointer-events-none absolute -inset-[20%] rounded-full opacity-40"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, rgba(0,222,255,0.45) 360deg)',
                maskImage: 'radial-gradient(transparent 55%, black 60%)',
                WebkitMaskImage: 'radial-gradient(transparent 55%, black 60%)',
              }}
            />
            <div className="relative flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_40px_100px_-40px_rgba(0,222,255,0.7)] backdrop-blur-2xl md:h-[120px] md:w-[120px]">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
              <div className="absolute inset-[8px] rounded-full border border-white/10" />
              <MessageCircle
                className="relative h-9 w-9 text-[#00DEFF] md:h-10 md:w-10"
                strokeWidth={1.5}
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,222,255,0.55))' }}
              />
              <span className="relative mt-1 font-display text-[9px] uppercase tracking-[0.2em] text-white/70">
                Contact
              </span>
            </div>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 md:hidden">
          {nodes.map((n) => (
            <div key={`m-${n.id}`} className="flex justify-center">
              <MobileNode node={n} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
