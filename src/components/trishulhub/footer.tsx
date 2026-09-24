'use client'

import Link from 'next/link'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from './brand-logo'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { CookieSettingsButton } from '@/components/trishulhub/cookie-consent'

const company = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About us', href: '/about' },
  { label: 'Contact us', href: '/contact' },
]

const services = [
  { label: 'Website development', href: '/services#website' },
  { label: 'Custom software', href: '/services#software' },
  { label: 'Mobile app development', href: '/services#mobile' },
  { label: 'Project planner', href: '/#planner' },
]

const legal = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Terms', href: '/terms' },
]

function WhatsAppIcon({ size = 16 }: { size?: number }) {
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

const socialBtn =
  'flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-[#5eead4] hover:bg-white/5 hover:text-[#5eead4]'

export function Footer() {
  const { email, phoneDisplay, location, links } = useSiteContact()

  return (
    <footer className="th-footer relative overflow-hidden bg-[#0a0a0a] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#0d9488]/12 blur-[100px]"
      />

      <div className="lt-container relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandLogo size="lg" variant="onDark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              A UK-based digital engineering studio building high-performance
              websites, bespoke software and mobile apps for growing companies.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={socialBtn}
              >
                <WhatsAppIcon size={16} />
              </a>
              <a
                href={links.mailto}
                aria-label="Email"
                className={socialBtn}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-white">Company</h2>
            <ul className="mt-5 space-y-1">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="th-link inline-block py-1.5 text-sm text-white/55 transition hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-white">Services</h2>
            <ul className="mt-5 space-y-1">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="th-link inline-block py-1.5 text-sm text-white/55 transition hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-white">Get in touch</h2>
            {/* Same rhythm as the Company / Services columns so the three lists
                line up: mt-5, space-y-1, py-1.5 targets. */}
            <ul className="mt-5 space-y-1 text-sm text-white/55">
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-[#5eead4]" />
                <a href={links.mailto} className="th-link py-1.5 hover:text-white">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-[#5eead4]" />
                <a href={links.tel} className="th-link py-1.5 hover:text-white">
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="shrink-0 text-[#5eead4]" />
                <span className="py-1.5 text-white/55">{location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-xs text-white/65">
            © {new Date().getFullYear()} TrishulHub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legal.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="th-link inline-block py-2 text-xs text-white/65 transition hover:text-white/80"
              >
                {l.label}
              </Link>
            ))}
            {/* Reopens the cookie / storage preference centre (PECR: the user
                must be able to change or withdraw their choice at any time). */}
            <CookieSettingsButton className="th-link inline-block py-2 text-xs text-white/65 transition hover:text-white/80">
              Cookie settings
            </CookieSettingsButton>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 py-2 text-xs text-white/65 transition hover:text-white/80"
            >
              Back to top
              <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
