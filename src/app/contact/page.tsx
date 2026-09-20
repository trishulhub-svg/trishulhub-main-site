import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { ContactPage } from '@/components/trishulhub/contact-page'

export const metadata = {
  title: 'Contact us',
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
      <ContactPage />
    </ServerSiteShell>
  )
}
