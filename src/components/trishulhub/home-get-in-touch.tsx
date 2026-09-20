'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'
import { emailDraftUrl, enquiryEmailDraft } from '@/lib/site-contact'

type Channel = {
  id: string
  label: string
  value: string
  hint: string
  href: string
  external?: boolean
  icon: React.ReactNode
}

const STEP_MS = 1800

/**
 * HomeGetInTouch — animated channel relay for the contact page.
 *
 * Three channels, one at a time "live": its card lifts, a signal ring fires,
 * its beam to the centre lights up. Same single-index pattern as the other
 * home sections — one interval, CSS transitions, no per-node choreography.
 * Instagram was intentionally dropped here (it stays in the footer).
 */
export function HomeGetInTouch() {
  const contact = useSiteContact()
  const { email, phoneDisplay, links } = contact
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  const channels: Channel[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: 'Chat now',
      hint: 'Fastest — usually minutes',
      href: links.whatsapp,
      external: true,
      icon: <MessageCircle size={20} strokeWidth={1.7} />,
    },
    {
      id: 'email',
      label: 'Email',
      value: email,
      hint: 'Opens a ready-to-send draft',
      href: emailDraftUrl(contact, enquiryEmailDraft()),
      icon: <Mail size={20} strokeWidth={1.7} />,
    },
    {
      id: 'phone',
      label: 'Phone',
      value: phoneDisplay,
      hint: 'Mon–Sat, 9am–7pm',
      href: links.tel,
      external: true,
      icon: <Phone size={20} strokeWidth={1.7} />,
    },
  ]

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      if (!paused.current) setActive((i) => (i + 1) % channels.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  return (
    <section className="relative">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#0d3c1f]/12 bg-white px-5 py-10 sm:px-10 sm:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0d3c1f_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-16 h-64 w-64 rounded-full bg-[#0d9488]/12 blur-[90px]"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="th-eyebrow">
            <MessageCircle size={13} className="text-[#0d9488]" />
            Contact
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="text-balance mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Want to talk?
            <span className="mt-1 block text-muted-foreground">
              We are ready to help.
            </span>
          </motion.h2>
          <p className="text-pretty mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
            Pick whichever suits you best. Email opens a pre-written brief — add
            your details, hit send, done. Every message reaches a real engineer,
            not a queue.
          </p>
        </div>

        {/* Channel cards */}
        <div className="relative mx-auto mt-11 grid max-w-4xl gap-4 sm:grid-cols-3">
          {channels.map((c, i) => {
            const isActive = i === active
            return (
              <motion.a
                key={c.id}
                href={c.href}
                {...(c.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                onMouseEnter={() => {
                  paused.current = true
                  setActive(i)
                }}
                onMouseLeave={() => {
                  paused.current = false
                }}
                onFocus={() => {
                  paused.current = true
                  setActive(i)
                }}
                onBlur={() => {
                  paused.current = false
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
                animate={{
                  y: isActive ? -6 : 0,
                  borderColor: isActive
                    ? 'rgba(13,60,31,0.35)'
                    : 'rgba(13,60,31,0.1)',
                  boxShadow: isActive
                    ? '0 20px 46px rgba(6,43,22,0.13)'
                    : '0 8px 24px rgba(6,43,22,0.05)',
                }}
                className="relative flex flex-col items-center overflow-hidden rounded-2xl border bg-white px-5 py-6 text-center"
              >
                {/* Signal ring on the active card */}
                {isActive && !reduce ? (
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0.5, scale: 0.6 }}
                    animate={{ opacity: 0, scale: 2.4 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    className="pointer-events-none absolute top-8 h-14 w-14 rounded-full border border-[#0d9488]"
                  />
                ) : null}

                <motion.span
                  animate={{ scale: isActive ? 1.06 : 1 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#0D3C1F] text-white'
                      : 'bg-[#e8f5ef] text-[#0D3C1F]'
                  }`}
                >
                  {c.icon}
                </motion.span>

                <p className="mt-4 text-[15px] font-bold text-[#111111]">
                  {c.label}
                </p>
                <p className="mt-1 max-w-full truncate text-[13px] font-medium text-[#0D3C1F]">
                  {c.value}
                </p>
                <p className="mt-1.5 text-[11.5px] text-[#6b7280]">{c.hint}</p>

                {/* Live pill */}
                <span
                  className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isActive
                      ? 'border-[#0d9488]/30 bg-[#e8f5ef] text-[#0D3C1F]'
                      : 'border-[#0d3c1f]/10 bg-[#fafafa] text-[#9ca3af]'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="h-1.5 w-1.5 rounded-full bg-[#0d9488]"
                    />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
                  )}
                  {isActive ? 'Ready now' : 'Available'}
                </span>
              </motion.a>
            )
          })}
        </div>

        {/* Relay beams → centre CTA */}
        <div className="relative mx-auto mt-2 hidden h-24 max-w-4xl md:block" aria-hidden>
          <svg viewBox="0 0 800 96" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="relay-beam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.75" />
              </linearGradient>
            </defs>
            {[133, 400, 667].map((x, i) => {
              const isActive = i === active
              return (
                <g key={x}>
                  <path
                    d={`M${x} 0 C ${x} 40, 400 44, 400 96`}
                    stroke="#0d3c1f"
                    strokeOpacity="0.1"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <motion.path
                    d={`M${x} 0 C ${x} 40, 400 44, 400 96`}
                    stroke="url(#relay-beam)"
                    strokeWidth={isActive ? 2.4 : 1.5}
                    fill="none"
                    initial={false}
                    animate={{ pathLength: isActive ? 1 : 0.12, opacity: isActive ? 1 : 0.35 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  />
                  {!reduce && isActive ? (
                    <circle r="3.5" fill="#5eead4">
                      <animateMotion
                        dur="1.4s"
                        repeatCount="indefinite"
                        path={`M${x} 0 C ${x} 40, 400 44, 400 96`}
                      />
                    </circle>
                  ) : null}
                </g>
              )
            })}
          </svg>
        </div>

        <div className="relative mt-4 flex justify-center md:-mt-6">
          <NexusButton href="#contact-form" showArrow>
            Send us a message
          </NexusButton>
        </div>
      </div>
    </section>
  )
}
