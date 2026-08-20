import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { Hero } from '@/components/trishulhub/hero'
import { HomeAbout } from '@/components/trishulhub/home-about'
import { HomeUnlock } from '@/components/trishulhub/home-unlock'
import { AboutProtocol } from '@/components/trishulhub/about-protocol'
import { HomeIntelligences } from '@/components/trishulhub/home-intelligences'
import { CTA } from '@/components/trishulhub/cta'

export default function Home() {
  return (
    <ServerSiteShell>
      <Hero />
      {/* Sections sit above hero stacking context (z-20) for overlap behavior */}
      <div className="relative z-20 bg-[#FAF9F6]">
        <HomeAbout />
      </div>
      <div className="relative z-20 bg-white">
        <HomeUnlock />
      </div>
      <div className="relative z-20 bg-[#FAF9F6]">
        <AboutProtocol className="mt-8 sm:mt-12" />
      </div>
      <div className="relative z-20 bg-white">
        <HomeIntelligences />
      </div>
      <div className="relative z-20 bg-[#FAF9F6]">
        <CTA />
      </div>
    </ServerSiteShell>
  )
}
