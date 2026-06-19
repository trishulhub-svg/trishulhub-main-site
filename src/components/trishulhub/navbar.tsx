'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Lock } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mt-3 flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
            scrolled
              ? 'border-white/10 bg-[#0A0A0A]/70 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-[0.15em] sm:text-xl">
              <span className="text-white">TRISHUL</span>
              <span className="gradient-text">HUB</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group/pill rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-[#00DEFF]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/admin/login"
              className="btn-ghost hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:text-[#00DEFF] sm:inline-flex"
            >
              <Lock size={13} />
              <span className="relative z-10">Login</span>
            </a>
            <a
              href="#contact"
              className="btn-cyan btn-shine hidden rounded-full bg-[#00DEFF] px-5 py-2 text-sm font-semibold text-[#0A0A0A] transition-all sm:inline-block"
            >
              <span className="relative z-10">Get Started</span>
            </a>

            {/* Mobile toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0A0A0A]/95 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-[#00DEFF]/10 hover:text-[#00DEFF]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-[#00DEFF] px-4 py-3 text-center text-sm font-semibold text-[#0A0A0A]"
            >
              Get Started
            </a>
            <a
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-center text-sm font-medium text-white/80"
            >
              <Lock size={14} />
              Founder Login
            </a>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
