import { SiteShell } from '@/components/trishulhub/site-shell'
import { ServicesPage } from '@/components/trishulhub/services-page'

export const metadata = {
  title: 'Services | TrishulHub',
  description:
    'Websites, custom software, and mobile apps from TrishulHub — with simple previews.',
}

export default function ServicesRoute() {
  return (
    <SiteShell>
      <ServicesPage />
    </SiteShell>
  )
}
