'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Menu, X, Lock } from 'lucide-react'
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
          className={`mt-3 flex items-center justify-between rounded-2xl border border-border bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 sm:px-5 ${
            scrolled ? 'shadow-md' : ''
          }`}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO }}
          >
            <BrandLogo size="md" />
          </motion.div>

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
                      ? 'bg-sky-100 text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/login"
              className="btn-ghost hidden items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary sm:inline-flex"
            >
              <Lock size={13} />
              <span className="relative z-10">Login</span>
            </Link>
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyan btn-shine hidden rounded-full px-5 py-2 text-sm font-semibold sm:inline-block"
            >
              <span className="relative z-10">Get Started</span>
            </a>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
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
            className="mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-white p-3 shadow-lg md:hidden"
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sky-50 hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-cyan mt-1 rounded-lg px-4 py-3 text-center text-sm font-semibold"
            >
              Get Started
            </a>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
