import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { AboutPage, AboutValues } from '@/components/trishulhub/about-page'
import { Team } from '@/components/trishulhub/team'
import { db } from '@/lib/db'

export const metadata = {
  title: 'About us | TrishulHub',
  description:
    'TrishulHub builds websites, business software, and mobile apps that help your company work better.',
}

export const dynamic = 'force-dynamic'

export default async function AboutRoute() {
  let founders: {
    slug: string
    initial: string
    name: string
    role: string
    projects: string
    bio: string
    image: string | null
  }[] = []

  try {
    const all = await db.founder.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        slug: true,
        initial: true,
        name: true,
        role: true,
        projects: true,
        bio: true,
        image: true,
      },
    })
    founders = all.filter((f) => f.slug !== 'akshat')
  } catch (err) {
    console.warn(
      '[about] founders fetch skipped:',
      err instanceof Error ? err.message : err,
    )
  }

  return (
    <ServerSiteShell>
      <AboutPage />
      {founders.length > 0 ? <Team founders={founders} /> : null}
      <AboutValues />
    </ServerSiteShell>
  )
}
