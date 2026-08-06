'use client'

import Link from 'next/link'
import { BrandLogo } from './brand-logo'

const services = [
  { label: 'Website Development', href: '/services#website' },
  { label: 'Custom Software', href: '/services#software' },
  { label: 'CRM Solutions', href: '/services#crm' },
]

const company = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-white/10 bg-[#0A0A0A]/85 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00DEFF]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <BrandLogo size="lg" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Custom websites, business software, and CRM systems built around
              how your company actually works.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Company
            </div>
            <ul className="mt-4 space-y-2.5">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-sm text-white/60 transition-colors hover:text-[#00DEFF]"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Services
            </div>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/60 transition-colors hover:text-[#00DEFF]"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Get in Touch
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <a
                  href="mailto:trishulhub@gmail.com"
                  className="transition-colors hover:text-[#00DEFF]"
                >
                  trishulhub@gmail.com
                </a>
              </li>
              <li>India</li>
              <li>
                <a
                  href="https://www.trishulhub.in"
                  className="transition-colors hover:text-[#00DEFF]"
                >
                  trishulhub.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} TrishulHub. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-xs text-white/40 transition-colors hover:text-[#00DEFF]"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
