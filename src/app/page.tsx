import { SiteShell } from '@/components/trishulhub/site-shell'
import { Hero } from '@/components/trishulhub/hero'
import { HomeServices } from '@/components/trishulhub/home-services'
import { HomeUnlock } from '@/components/trishulhub/home-unlock'
import { HomeIntelligences } from '@/components/trishulhub/home-intelligences'
import { CTA } from '@/components/trishulhub/cta'

export default function Home() {
  return (
    <SiteShell showLoader>
      <Hero />
      <HomeServices />
      <HomeUnlock />
      <HomeIntelligences />
      <CTA />
    </SiteShell>
  )
}
