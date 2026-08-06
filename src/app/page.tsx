import { SiteShell } from '@/components/trishulhub/site-shell'
import { Hero } from '@/components/trishulhub/hero'
import { HomeServices } from '@/components/trishulhub/home-services'
import { HomeProcess } from '@/components/trishulhub/home-process'
import { CTA } from '@/components/trishulhub/cta'

export default function Home() {
  return (
    <SiteShell showLoader>
      <Hero />
      <HomeServices />
      <HomeProcess />
      <CTA />
    </SiteShell>
  )
}
