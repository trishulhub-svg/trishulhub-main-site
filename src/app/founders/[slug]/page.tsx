import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { FounderDetailClient } from '@/components/trishulhub/founder-detail'
import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { JsonLd } from '@/components/seo/json-ld'
import { personSchema } from '@/lib/structured-data'
import { founderPhotoUrl } from '@/lib/founder-photo'

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
    // absolute: skips the "| TrishulHub" template so a long job title still
    // fits in a search result. .trim() drops the stored trailing space.
    title: {
      absolute: `${founder.name} — ${founder.role.trim()}`,
    },
    description: founder.bio.slice(0, 160).trim(),
    alternates: { canonical: `/founders/${founder.slug}` },
    openGraph: {
      type: 'profile',
      title: `${founder.name} — ${founder.role.trim()} | TrishulHub`,
      description: founder.bio.slice(0, 160).trim(),
      url: `/founders/${founder.slug}`,
    },
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
    /* Cacheable image URL instead of a ~140KB base64 string in the HTML. */
    image: founderPhotoUrl(founder),
  }

  return (
    <ServerSiteShell>
      {/*
       * Start the portrait download while the HTML is still parsing — it is
       * the largest element on the page (the LCP), and without this it only
       * begins after the document has arrived. React hoists this into <head>.
       */}
      {data.image ? (
        <link rel="preload" as="image" href={data.image} fetchPriority="high" />
      ) : null}
      <JsonLd
        data={personSchema({
          name: founder.name,
          role: founder.role,
          bio: founder.bio,
          slug: founder.slug,
          image: founder.image,
          email: founder.email,
          linkedin: founder.linkedin,
        })}
      />
      <FounderDetailClient slug={slug} founder={data} />
    </ServerSiteShell>
  )
}
