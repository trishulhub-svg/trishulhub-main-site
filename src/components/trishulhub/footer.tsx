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
    <footer className="relative z-10 mt-auto border-t border-border bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <BrandLogo size="lg" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Websites, business software, and mobile apps — built to help your
              company work better.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Company
            </div>
            <ul className="mt-4 space-y-2.5">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Services
            </div>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Get in Touch
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={links.mailto}
                  className="transition-colors hover:text-primary"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={links.tel}
                  className="transition-colors hover:text-primary"
                >
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Instagram
                </a>
              </li>
              <li>{location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TrishulHub. All rights reserved.
          </div>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            Start a project
          </a>
        </div>
      </div>
    </footer>
  )
}
