import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { FounderDetailClient } from '@/components/trishulhub/founder-detail'
import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'

export async function generateStaticParams() {
  try {
    const founders = await db.founder.findMany({ select: { slug: true } })
    return founders.map((f) => ({ slug: f.slug }))
  } catch (err) {
    console.warn(
      '[founders/[slug]] generateStaticParams skipped:',
      err instanceof Error ? err.message : err,
    )
    return []
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const founder = await db.founder.findUnique({ where: { slug } })
  if (!founder) return { title: 'Founder Not Found | TrishulHub' }
  return {
    title: `${founder.name} — ${founder.role} | TrishulHub`,
    description: founder.bio.slice(0, 160),
  }
}

export default async function FounderPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const founder = await db.founder.findUnique({ where: { slug } })

  if (!founder) notFound()

  const data = {
    name: founder.name,
    initial: founder.initial,
    role: founder.role,
    bio: founder.bio,
    projects: founder.projects,
    image: founder.image,
    image2: founder.image2,
    dateOfBirth: founder.dateOfBirth,
    address: founder.address,
    zipCode: founder.zipCode,
    email: founder.email,
    phone: founder.phone,
    github: founder.github,
    linkedin: founder.linkedin,
    twitter: founder.twitter,
    website: founder.website,
    skills: JSON.parse(founder.skills) as { name: string; level: number }[],
    education: JSON.parse(founder.education) as {
      degree: string
      school: string
      year: string
      description: string
    }[],
    experience: JSON.parse(founder.experience) as {
      role: string
      company: string
      period: string
      description: string
    }[],
    projectsList: JSON.parse(founder.projectsList) as {
      name: string
      description: string
      link: string
      year: string
    }[],
  }

  return (
    <ServerSiteShell>
      <FounderDetailClient slug={slug} founder={data} />
    </ServerSiteShell>
  )
}
