import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { AboutPage, AboutValues } from '@/components/trishulhub/about-page'
import { TeamSection } from '@/components/trishulhub/team-section'

export const metadata = {
  title: 'About us | TrishulHub',
  description:
    'TrishulHub builds websites, business software, and mobile apps that help your company work better.',
}

export default function AboutRoute() {
  return (
    <ServerSiteShell>
      <AboutPage />
      <TeamSection />
      <AboutValues />
    </ServerSiteShell>
  )
}
