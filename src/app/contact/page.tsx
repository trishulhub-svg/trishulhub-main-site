import { SiteShell } from '@/components/trishulhub/site-shell'
import { ContactPage } from '@/components/trishulhub/contact-page'

export const metadata = {
  title: 'Contact | TrishulHub',
  description:
    'Contact TrishulHub to start a website, software, or mobile app project.',
}

export default function ContactRoute() {
  return (
    <SiteShell>
      <ContactPage />
    </SiteShell>
  )
}
