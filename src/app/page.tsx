import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { Hero } from '@/components/trishulhub/hero'
import { HomeAbout } from '@/components/trishulhub/home-about'
import { HomeUnlock } from '@/components/trishulhub/home-unlock'
import { AboutProtocol } from '@/components/trishulhub/about-protocol'
import { HomeIntelligences } from '@/components/trishulhub/home-intelligences'
import { CTA } from '@/components/trishulhub/cta'

/** Static, zero-JS sector strip — the "who we work with" pattern UK peers use. */
const SECTORS = [
  'Trades & home services',
  'Professional services',
  'Retail & ecommerce',
  'Health & clinics',
  'SaaS & startups',
  'Logistics & operations',
]

export default function Home() {
  return (
    <ServerSiteShell>
      <Hero />

      <section className="relative z-20 border-b border-[#0d3c1f]/10 bg-[#fafafa] py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 sm:px-6 lg:px-8">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
            Sectors we build for
          </span>
          {SECTORS.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[#0d3c1f]/12 bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#374151] transition hover:border-[#0D3C1F]/35 hover:text-[#0D3C1F]"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* About — clean white, soft top wash */}
      <div className="relative z-20 overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f4faf7] to-transparent"
        />
        <HomeAbout />
      </div>

      {/* Solutions — tinted band so the section reads as its own chapter */}
      <div className="relative z-20 overflow-hidden border-y border-[#0d3c1f]/8 bg-[#f4faf7]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0d3c1f_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.05]"
        />
        <HomeUnlock />
      </div>

      {/* Planner — white for contrast against the tinted band */}
      <div className="relative z-20 bg-white">
        <AboutProtocol className="mt-8 sm:mt-12" />
      </div>

      {/* Promise — light band with brand glow */}
      <div className="relative z-20 overflow-hidden bg-[#fafafa]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/3 h-[24rem] w-[24rem] rounded-full bg-[#0d9488]/10 blur-[120px]"
        />
        <HomeIntelligences />
      </div>

      {/* CTA */}
      <div className="relative z-20 bg-white">
        <CTA />
      </div>
    </ServerSiteShell>
  )
}
