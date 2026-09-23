import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { ServicesPage } from '@/components/trishulhub/services-page'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { SERVICES_FAQ } from '@/lib/services-content'

export const metadata = {
  title: 'Web, Software & App Development Services',
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
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <JsonLd data={faqSchema(SERVICES_FAQ)} />
      <ServicesPage />
    </ServerSiteShell>
  )
}
