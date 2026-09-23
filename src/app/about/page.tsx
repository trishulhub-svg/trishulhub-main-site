import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { AboutPage, AboutValues } from '@/components/trishulhub/about-page'
import { TeamSection } from '@/components/trishulhub/team-section'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/structured-data'

export const metadata = {
  title: 'About our UK Studio',
  description:
    'Meet the TrishulHub team — a UK-based digital engineering studio building websites, bespoke software and mobile apps for growing businesses.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About us | TrishulHub',
    description:
      'A UK-based studio building websites, bespoke software and mobile apps that remove friction from growing businesses.',
    url: '/about',
  },
}

export default function AboutRoute() {
  return (
    <ServerSiteShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About us', path: '/about' },
        ])}
      />
      <AboutPage />
      <TeamSection />
      <AboutValues />
    </ServerSiteShell>
  )
}
