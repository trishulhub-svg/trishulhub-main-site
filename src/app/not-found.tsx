import Link from 'next/link'
import { ArrowRight, Home, Search } from 'lucide-react'

export const metadata = {
  title: 'Page not found',
  description: 'The page you were looking for could not be found.',
  robots: { index: false, follow: false },
}

const links = [
  { label: 'Services', href: '/services', hint: 'Websites, software, mobile apps' },
  { label: 'About us', href: '/about', hint: 'How we work and who we are' },
  { label: 'Contact', href: '/contact', hint: 'Start a project conversation' },
]

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] px-4 py-24">
      <div aria-hidden className="th-hero-bg" />

      <div className="relative w-full max-w-2xl text-center">
        <span className="th-eyebrow mb-6">
          <Search size={13} className="text-[#0d9488]" />
          Error 404
        </span>

        <h1 className="text-balance text-4xl font-bold tracking-[-0.03em] text-[#111111] sm:text-6xl">
          This page took a{' '}
          <span className="font-playfair italic text-[#0D3C1F]">
            wrong turn.
          </span>
        </h1>

        <p className="text-pretty mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#6b7280] sm:text-lg">
          The link may be out of date, or the page has moved. Here are the places
          most people are heading to.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#0D3C1F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#164a28] sm:w-auto"
          >
            <Home size={16} />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-[#d1d5db] bg-white px-7 py-3.5 text-sm font-semibold text-[#111111] transition hover:border-[#0D3C1F]/40 hover:text-[#0D3C1F] sm:w-auto"
          >
            Contact us
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="th-card rounded-2xl border border-[#111111]/12 bg-white p-5 text-left"
            >
              <p className="text-sm font-bold text-[#111111]">{l.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#6b7280]">
                {l.hint}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
