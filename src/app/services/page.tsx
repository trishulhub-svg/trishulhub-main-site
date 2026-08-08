import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { ServicesPage } from '@/components/trishulhub/services-page'

export const metadata = {
  title: 'Services | TrishulHub',
  description:
    'Websites, custom software, and mobile apps from TrishulHub — with simple previews.',
}

export default function ServicesRoute() {
  return (
    <ServerSiteShell>
      <ServicesPage />
    </ServerSiteShell>
  )
}
