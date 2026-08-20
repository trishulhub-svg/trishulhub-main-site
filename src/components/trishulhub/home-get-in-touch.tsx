'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, Instagram } from 'lucide-react'
import { type ReactNode } from 'react'
import { EASE_OUT_EXPO } from '@/lib/animations'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'

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

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

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
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-white shadow-[0_10px_28px_rgba(11,18,32,0.1)] transition-transform duration-300 group-hover:scale-[1.06] sm:h-16 sm:w-16 md:h-[76px] md:w-[76px]">
        <span className={`relative scale-90 sm:scale-100 ${node.color}`}>
          {node.icon}
        </span>
      </div>
      <span className="mt-1.5 font-sans text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:mt-2 sm:text-[10px]">
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

export function HomeGetInTouch() {
  const { links } = useSiteContact()

  const nodes: NodeSpec[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: links.whatsapp,
      external: true,
      color: 'text-emerald-600',
      glow: 'rgba(16,185,129,0.25)',
      x: 165,
      y: 130,
      icon: WHATSAPP_ICON,
    },
    {
      id: 'call',
      label: 'Call us',
      href: links.tel,
      external: true,
      color: 'text-[#75B4B1]',
      glow: 'rgba(15,118,110,0.25)',
      x: 165,
      y: 430,
      icon: <Phone className="h-6 w-6" strokeWidth={1.5} />,
    },
    {
      id: 'email',
      label: 'Email',
      href: links.mailto,
      color: 'text-[#75B4B1]',
      glow: 'rgba(15,118,110,0.25)',
      x: 835,
      y: 130,
      icon: <Mail className="h-6 w-6" strokeWidth={1.5} />,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: links.instagram,
      external: true,
      color: 'text-rose-500',
      glow: 'rgba(244,63,94,0.2)',
      x: 835,
      y: 430,
      icon: <Instagram className="h-6 w-6" strokeWidth={1.5} />,
    },
  ]

  return (
    <section className="relative py-8 sm:py-12">
      <div className="surface-card relative overflow-hidden rounded-[2rem] px-5 py-10 sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#75B4B1]/20 blur-[90px]"
        />
        <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-3xl flex-col gap-4">
            <p className="section-label">Channels</p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Want to talk?
              <span className="mt-1 block text-muted-foreground">
                We are ready to help.
              </span>
            </motion.h2>
            <p className="max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
              Tap a channel below or use the contact form. Tell us what you need
              and we will reply soon.
            </p>
          </div>

          <NexusButton href="#contact-form">Contact form</NexusButton>
        </div>

        <div className="relative mx-auto mt-10 aspect-[1000/720] w-full max-w-5xl sm:mt-14 sm:aspect-[1000/560]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="wireContact" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#75B4B1" stopOpacity="0" />
                <stop offset="25%" stopColor="#75B4B1" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#75B4B1" stopOpacity="0.45" />
                <stop offset="75%" stopColor="#75B4B1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#75B4B1" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="noodleContact" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#75B4B1" stopOpacity="0" />
                <stop offset="50%" stopColor="#9eccc9" stopOpacity="1" />
                <stop offset="100%" stopColor="#75B4B1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {PATHS.map((d, i) => (
              <g key={d}>
                <path
                  d={d}
                  stroke="url(#wireContact)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.55"
                />
                <path
                  d={d}
                  stroke="url(#noodleContact)"
                  strokeWidth="2"
                  fill="none"
                  className={i === 4 ? 'animate-noodle-delayed' : 'animate-noodle'}
                />
              </g>
            ))}
          </svg>

          {nodes.map((n) => (
            <AbsoluteNode key={n.id} node={n} />
          ))}

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 scale-90 sm:scale-100">
            <div className="pointer-events-none absolute -inset-12 rounded-full bg-[#75B4B1]/20 blur-2xl" />
            <NexusButton href="#contact-form">Contact us</NexusButton>
          </div>
        </div>
      </div>
    </section>
  )
}
