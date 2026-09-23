import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { ContactPage } from '@/components/trishulhub/contact-page'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/structured-data'

export const metadata = {
  title: 'Contact us — Start a Project',
  description:
    'Start a project with TrishulHub. Tell us what you need — a website, bespoke software or a mobile app — and get a clear response within one business day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact us | TrishulHub',
    description:
      'Talk to TrishulHub about your website, software or mobile app project. Replies within one business day.',
    url: '/contact',
  },
}

export default function ContactRoute() {
  return (
    <ServerSiteShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact us', path: '/contact' },
        ])}
      />
      <ContactPage />
    </ServerSiteShell>
  )
}
