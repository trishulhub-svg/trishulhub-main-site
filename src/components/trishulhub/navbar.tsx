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
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b border-[#e5e7eb] transition-colors ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="lt-container flex h-full items-center justify-between">
        <BrandLogo size="md" />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`px-3.5 py-2 text-[15px] font-medium transition-colors ${
                  active
                    ? 'text-[#0a0a0a]'
                    : 'text-[#6b7280] hover:text-[#0a0a0a]'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className="hidden text-[15px] font-medium text-[#6b7280] transition hover:text-[#0a0a0a] sm:inline"
          >
            Log In
          </Link>
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center rounded-lg bg-black px-5 text-[15px] font-medium text-white transition hover:scale-[1.02] sm:inline-flex"
          >
            Get Started
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#0a0a0a] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
          className="border-b border-[#e5e7eb] bg-white px-4 py-4 md:hidden"
        >
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center rounded-lg px-3 text-base font-medium text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#0a0a0a]"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 flex h-12 items-center justify-center rounded-lg bg-black text-[15px] font-medium text-white"
          >
            Get Started
          </a>
        </motion.nav>
      )}
    </motion.header>
  )
}
