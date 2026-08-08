import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { ContactPage } from '@/components/trishulhub/contact-page'

export const metadata = {
  title: 'Contact us | TrishulHub',
  description:
    'Contact TrishulHub to start a website, software, or mobile app project.',
}

export default function ContactRoute() {
  return (
    <ServerSiteShell>
      <ContactPage />
    </ServerSiteShell>
  )
}
