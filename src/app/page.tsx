import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { Hero } from '@/components/trishulhub/hero'
import { TrustStrip } from '@/components/trishulhub/trust-strip'
import { HomeServicesShowcase } from '@/components/trishulhub/home-services-showcase'
import { HomeWhyUs } from '@/components/trishulhub/home-why-us'
import { AboutProtocol } from '@/components/trishulhub/about-protocol'
import { HomeIntelligences } from '@/components/trishulhub/home-intelligences'
import { CTA } from '@/components/trishulhub/cta'

export default function Home() {
  return (
    <ServerSiteShell>
      <Hero />
      <TrustStrip />
      <HomeServicesShowcase />
      <HomeWhyUs />
      <AboutProtocol className="mt-0" />
      <HomeIntelligences />
      <CTA />
    </ServerSiteShell>
  )
}
