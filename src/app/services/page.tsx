import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { ServicesPage } from '@/components/trishulhub/services-page'

export const metadata = {
  title: 'Services',
  description:
    'Website development, bespoke business software and mobile app development from TrishulHub — clear scope, fixed milestones and performance targets.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | TrishulHub',
    description:
      'Websites, bespoke software and mobile apps engineered for speed and growth.',
    url: '/services',
  },
}

export default function ServicesRoute() {
  return (
    <ServerSiteShell>
      <ServicesPage />
    </ServerSiteShell>
  )
}
