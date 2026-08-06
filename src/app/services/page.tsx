import { SiteShell } from '@/components/trishulhub/site-shell'
import { ServicesPage } from '@/components/trishulhub/services-page'

export const metadata = {
  title: 'Services | TrishulHub',
  description:
    'Website development, custom software panels, and CRM solutions from TrishulHub — with interactive previews.',
}

export default function ServicesRoute() {
  return (
    <SiteShell>
      <ServicesPage />
    </SiteShell>
  )
}
