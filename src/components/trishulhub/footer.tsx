'use client'

import Link from 'next/link'
import { BrandLogo } from './brand-logo'
import {
  MAILTO_URL,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  TEL_URL,
  WHATSAPP_URL,
} from '@/lib/contacts'

const services = [
  { label: 'Custom Software', href: '/services#software' },
  { label: 'Websites', href: '/services#website' },
  { label: 'Mobile Apps', href: '/services#mobile' },
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
              Websites, business software, and mobile apps — built to help your
              company work better.
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
                  href={MAILTO_URL}
                  className="transition-colors hover:text-[#00DEFF]"
                >
                  {SITE_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={TEL_URL}
                  className="transition-colors hover:text-[#00DEFF]"
                >
                  {SITE_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#00DEFF]"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} TrishulHub. All rights reserved.
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 transition-colors hover:text-[#00DEFF]"
          >
            Start a project
          </a>
        </div>
      </div>
    </footer>
  )
}
