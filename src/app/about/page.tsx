import { SiteShell } from '@/components/trishulhub/site-shell'
import { AboutPage } from '@/components/trishulhub/about-page'

export const metadata = {
  title: 'About | TrishulHub',
  description:
    'TrishulHub builds custom websites, business software, and CRM systems around how your company actually works.',
}

export default function AboutRoute() {
  return (
    <SiteShell>
      <AboutPage />
    </SiteShell>
  )
}
