'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { BrandLogo } from './brand-logo'
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
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const { links: contactLinks } = useSiteContact()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`relative mt-3 flex items-center justify-between gap-3 rounded-2xl border border-[#111111]/15 bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 sm:px-5 ${
            scrolled ? 'border-[#111111]/25 shadow-md' : ''
          }`}
        >
          {/* Mobile: logo left (larger) · Desktop: logo + wordmark */}
          <div className="relative z-10 shrink-0">
            <span className="md:hidden">
              <BrandLogo size="mdPlus" showWordmark={false} />
            </span>
            <span className="hidden md:inline-flex">
              <BrandLogo size="md" />
            </span>
          </div>

          {/* Mobile: brand name centered */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-bold uppercase tracking-[0.06em] text-[#0a0a0a] md:hidden"
            aria-label="TrishulHub home"
          >
            TrishulHub
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#0D3C1F]/10 text-[#0D3C1F]'
                      : 'text-[#6b7280] hover:text-[#0D3C1F]'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-2">
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center rounded-full bg-[#0D3C1F] px-5 text-sm font-semibold text-white transition hover:bg-[#164a28] sm:inline-flex"
            >
              Get Started
            </a>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] text-[#0a0a0a] md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="mt-2 flex flex-col rounded-2xl border border-[#111111]/15 bg-white p-4 shadow-lg md:hidden"
          >
            <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#0D3C1F]">
              Menu
            </p>
            {navLinks.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3.5 text-base font-semibold leading-snug tracking-tight transition-colors ${
                    active
                      ? 'bg-[#0D3C1F]/8 text-[#0D3C1F]'
                      : 'text-[#111111] hover:bg-[#0D3C1F]/5 hover:text-[#0D3C1F]'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 flex h-12 items-center justify-center rounded-full bg-[#0D3C1F] text-sm font-semibold text-white"
            >
              Get Started
            </a>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
