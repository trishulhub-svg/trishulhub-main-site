'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, animate, useInView } from 'framer-motion'
import { Linkedin, Mail, ArrowUpRight, Instagram } from 'lucide-react'
import { HeroAccentWord } from './hero-accent-word'
import { EASE_OUT_EXPO } from '@/lib/animations'
import {
  externalHref,
  mailtoHref,
  whatsappHref,
} from '@/lib/social-links'

type Founder = {
  slug: string
  initial: string
  name: string
  role: string
  projects: string
  bio: string
  image?: string | null
  email?: string | null
  linkedin?: string | null
  whatsapp?: string | null
  instagram?: string | null
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
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

const iconBtn =
  'flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/15 text-[#6b7280] transition hover:border-[#0D3C1F] hover:bg-[#0D3C1F] hover:text-white'

export function Team({ founders }: { founders: Founder[] }) {
  const reduce = useReducedMotion()

  return (
    <section
      id="founders"
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
            Meet our <HeroAccentWord words="founders" animate={false} />
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
            const founderImage = m.image || null
            const wa = whatsappHref(m.whatsapp)
            const li = externalHref(m.linkedin)
            const ig = externalHref(m.instagram)
            const mail = mailtoHref(m.email)
            const socials = [
              wa
                ? {
                    key: 'whatsapp',
                    href: wa,
                    label: 'WhatsApp',
                    icon: <WhatsAppIcon size={14} />,
                    external: true,
                  }
                : null,
              li
                ? {
                    key: 'linkedin',
                    href: li,
                    label: 'LinkedIn',
                    icon: <Linkedin size={14} />,
                    external: true,
                  }
                : null,
              ig
                ? {
                    key: 'instagram',
                    href: ig,
                    label: 'Instagram',
                    icon: <Instagram size={14} />,
                    external: true,
                  }
                : null,
              mail
                ? {
                    key: 'email',
                    href: mail,
                    label: 'Email',
                    icon: <Mail size={14} />,
                    external: false,
                  }
                : null,
            ].filter(Boolean) as {
              key: string
              href: string
              label: string
              icon: React.ReactNode
              external: boolean
            }[]

            return (
              <motion.div
                key={m.slug}
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
                <Link
                  href={`/founders/${m.slug}`}
                  className="relative aspect-square overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5ef] to-[#fafafa]" />

                  {founderImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founderImage}
                      alt={m.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: 'center top' }}
                    />
                  ) : (
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
                </Link>

                <div className="flex flex-1 flex-col gap-2 p-5">
                  <Link href={`/founders/${m.slug}`} className="block">
                    <h3 className="text-xl font-bold text-[#111111]">{m.name}</h3>
                    <span className="text-sm font-medium text-[#0D3C1F]">
                      {m.role}
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-[#6b7280]">
                      {m.bio}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#0D3C1F] transition-all duration-300 group-hover:gap-2.5">
                      View full portfolio
                      <ArrowUpRight size={12} />
                    </div>
                  </Link>

                  {socials.length > 0 ? (
                    <div className="mt-4 flex items-center gap-2 border-t border-[#e5e7eb] pt-4">
                      {socials.map((s) => (
                        <a
                          key={s.key}
                          href={s.href}
                          aria-label={s.label}
                          className={iconBtn}
                          {...(s.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>
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
