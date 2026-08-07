import { SiteShell } from '@/components/trishulhub/site-shell'
import { Hero } from '@/components/trishulhub/hero'
import { HomeServices } from '@/components/trishulhub/home-services'
import { HomeUnlock } from '@/components/trishulhub/home-unlock'
import { HomeGetInTouch } from '@/components/trishulhub/home-get-in-touch'
import { CTA } from '@/components/trishulhub/cta'

export default function Home() {
  return (
    <SiteShell showLoader>
      <Hero />
      <HomeServices />
      <HomeUnlock />
      <HomeGetInTouch />
      <CTA />
    </SiteShell>
  )
}
