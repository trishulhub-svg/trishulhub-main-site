'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion-safe'
import { Menu, X } from 'lucide-react'
import { BrandLogo } from './brand-logo'
import { ThemeToggle } from './theme-toggle'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About us', href: '/about' },
  { label: 'Contact us', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotionSafe()
  const pathname = usePathname()
  const { links: contactLinks } = useSiteContact()

  // Reading-progress bar (top of the viewport)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {!reduce ? (
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-[#0d9488] via-[#0D3C1F] to-[#5eead4]"
        />
      ) : null}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative mt-3 flex items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 backdrop-blur-md transition-all duration-300 sm:px-5 ${
            scrolled
              ? 'border-[#111111]/20 bg-white/95 shadow-[0_8px_30px_rgba(6,43,22,0.08)]'
              : 'border-[#111111]/12 bg-white/80 shadow-sm'
          }`}
        >
          {/* Mobile: logo left (larger) · Desktop: logo + wordmark */}
          <div className="relative z-10 shrink-0">
            <span className="md:hidden">
              <BrandLogo size="mdPlus" showWordmark={false} />
            </span>
            <span className="hidden md:inline-flex">
              <BrandLogo size="lg" />
            </span>
          </div>

          {/* Mobile: brand name centered */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2.5 text-sm font-bold uppercase tracking-[0.06em] text-[#0a0a0a] md:hidden"
            aria-label="TrishulHub home"
          >
            TrishulHub
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active =
                l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'text-[#0D3C1F]'
                      : 'text-[#6b7280] hover:text-[#0D3C1F]'
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="th-nav-pill"
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      className="absolute inset-0 -z-10 rounded-full bg-[#0D3C1F]/10"
                    />
                  ) : null}
                  <span className="relative z-10">{l.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />

            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group hidden h-10 items-center gap-1.5 rounded-full bg-[#0D3C1F] px-5 text-sm font-semibold text-white transition hover:bg-[#164a28] hover:shadow-[0_8px_22px_rgba(13,60,31,0.22)] sm:inline-flex"
            >
              Get Started
            </a>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e7eb] text-[#0a0a0a] transition hover:border-[#0D3C1F]/40 hover:text-[#0D3C1F] md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
              className="mt-2 flex flex-col rounded-2xl border border-[#111111]/15 bg-white p-3 shadow-xl md:hidden"
            >
              {navLinks.map((l, i) => {
                const active =
                  l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
                return (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.04 * i,
                      duration: 0.3,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold leading-snug tracking-tight transition-colors ${
                        active
                          ? 'bg-[#0D3C1F]/8 text-[#0D3C1F]'
                          : 'text-[#111111] hover:bg-[#0D3C1F]/5 hover:text-[#0D3C1F]'
                      }`}
                    >
                      {l.label}
                      {active ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0D3C1F]" />
                      ) : null}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.3, ease: EASE_OUT_EXPO }}
                className="mt-2 flex h-12 items-center justify-center rounded-full bg-[#0D3C1F] text-sm font-semibold text-white"
              >
                Get Started
              </motion.a>
              <div className="mt-3 flex items-center justify-between rounded-xl border border-[#0d3c1f]/10 px-4 py-2.5 sm:hidden">
                <span className="text-sm font-semibold text-[#111111]">
                  Appearance
                </span>
                <ThemeToggle />
              </div>
              <div className="mt-3 border-t border-[#e5e7eb] px-1 pt-3 text-center text-xs text-[#6b7280]">
                UK-based · Replying within one business day
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
