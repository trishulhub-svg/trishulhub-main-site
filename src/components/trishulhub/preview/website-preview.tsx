'use client'

import Link from 'next/link'
import type { WebsiteType } from '@/lib/preview'

export function WebsitePreviewTemplate({
  brand,
  domain,
  type,
}: {
  brand: string
  domain: string
  type: WebsiteType
}) {
  const label = brand.trim() || 'Your Brand'

  if (type === 'ecommerce') {
    return (
      <PreviewChrome domain={domain}>
        <div className="bg-[#0B0F14] text-white">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="text-sm font-bold tracking-wide text-[#00DEFF]">
              {label}
            </div>
            <div className="hidden gap-4 text-xs text-white/50 sm:flex">
              <span>Shop</span>
              <span>Collections</span>
              <span>Cart (2)</span>
            </div>
          </div>
          <div className="grid gap-6 px-5 py-8 sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#00DEFF]/80">
                New season
              </div>
              <h3
                className="mt-3 text-3xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Discover {label}
              </h3>
              <p className="mt-3 text-sm text-white/55">
                A clean ecommerce storefront with featured products, fast
                checkout, and inventory-ready structure.
              </p>
              <div className="mt-5 inline-flex rounded-full bg-[#00DEFF] px-4 py-2 text-xs font-semibold text-black">
                Shop now
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Alpha', 'Nova', 'Pulse', 'Orbit'].map((p) => (
                <div
                  key={p}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <div className="mb-3 h-20 rounded-lg bg-gradient-to-br from-[#00DEFF]/30 to-[#0088CC]/10" />
                  <div className="text-xs font-semibold">{p} Pack</div>
                  <div className="mt-1 text-[11px] text-white/45">$49</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PreviewChrome>
    )
  }

  if (type === 'portfolio') {
    return (
      <PreviewChrome domain={domain}>
        <div className="bg-[#090909] text-white">
          <div className="px-5 py-10 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-[#00DEFF]">
              {label}
            </div>
            <h3
              className="mt-4 text-4xl font-bold"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Selected Work
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
              A portfolio landing page that puts your projects first — bold
              typography, case-study blocks, and a clear hire CTA.
            </p>
          </div>
          <div className="grid gap-3 px-5 pb-8 sm:grid-cols-3">
            {['Studio', 'Motion', 'Brand'].map((c, i) => (
              <div
                key={c}
                className="h-28 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-[#00DEFF]/[0.08] p-4"
              >
                <div className="text-xs text-white/40">0{i + 1}</div>
                <div className="mt-8 text-sm font-semibold">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </PreviewChrome>
    )
  }

  if (type === 'restaurant') {
    return (
      <PreviewChrome domain={domain}>
        <div className="bg-[#0C0A08] text-white">
          <div className="px-5 py-10">
            <div className="text-xs uppercase tracking-[0.3em] text-[#00DEFF]">
              Reserve · Order · Visit
            </div>
            <h3
              className="mt-3 text-3xl font-bold"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Welcome to {label}
            </h3>
            <p className="mt-3 max-w-lg text-sm text-white/55">
              Local-business style landing page with menu highlights, hours, and
              a reservation-friendly layout.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Signature plates', 'Weekend brunch', 'Private dining'].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/70"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-px border-t border-white/10 bg-white/10">
            {['Mon–Thu', 'Fri–Sat', 'Sun'].map((d) => (
              <div key={d} className="bg-[#0C0A08] px-3 py-4 text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/40">
                  {d}
                </div>
                <div className="mt-1 text-xs text-[#00DEFF]">11am – 10pm</div>
              </div>
            ))}
          </div>
        </div>
      </PreviewChrome>
    )
  }

  // business / general
  return (
    <PreviewChrome domain={domain}>
      <div className="bg-[#0A0A0A] text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="text-sm font-bold">{label}</div>
          <div className="hidden gap-4 text-xs text-white/45 sm:flex">
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="px-5 py-10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#00DEFF]">
            Trusted growth partner
          </div>
          <h3
            className="mt-3 max-w-xl text-3xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {label} helps modern businesses move faster
          </h3>
          <p className="mt-4 max-w-lg text-sm text-white/55">
            A general business landing page with a clear offer, proof section,
            and contact path — ready to customize for any industry.
          </p>
          <div className="mt-6 inline-flex rounded-full border border-[#00DEFF]/40 bg-[#00DEFF]/10 px-4 py-2 text-xs font-semibold text-[#00DEFF]">
            Book a call
          </div>
        </div>
      </div>
    </PreviewChrome>
  )
}

function PreviewChrome({
  domain,
  children,
}: {
  domain: string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/60 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center text-[11px] text-white/50">
          https://{domain}
        </div>
      </div>
      {children}
      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/50 px-4 py-3">
        <p className="text-[11px] text-white/40">
          Preview template · powered by TrishulHub
        </p>
        <Link
          href="/contact"
          className="rounded-full border border-[#00DEFF]/40 bg-[#00DEFF]/10 px-3 py-1.5 text-[11px] font-semibold text-[#00DEFF]"
        >
          Contact us
        </Link>
      </div>
    </div>
  )
}
