'use client'

import Link from 'next/link'
import { BrandLogo } from './brand-logo'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'

const services = [
  { label: 'Custom Software', href: '/services#software' },
  { label: 'Websites', href: '/services#website' },
  { label: 'Mobile Apps', href: '/services#mobile' },
]

const company = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About us', href: '/about' },
  { label: 'Contact us', href: '/contact' },
]

export function Footer() {
  const { email, phoneDisplay, location, links } = useSiteContact()

  return (
    <footer className="relative z-10 mt-auto bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <BrandLogo size="lg" variant="onDark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Websites, business software, and mobile apps — built to help your
              company work better.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Company</div>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Services</div>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Get in Touch</div>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li>
                <a href={links.mailto} className="transition-colors hover:text-white">
                  {email}
                </a>
              </li>
              <li>
                <a href={links.tel} className="transition-colors hover:text-white">
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li className="text-white/40">{location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} TrishulHub. All rights reserved.
          </div>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 transition-colors hover:text-white"
          >
            Start a project
          </a>
        </div>
      </div>
    </footer>
  )
}
