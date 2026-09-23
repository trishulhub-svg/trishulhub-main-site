import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { SITE_URL } from '@/lib/structured-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Founder portfolio pages come from the database so the sitemap can never
  // list a profile that no longer exists (or miss a new one).
  try {
    const founders = await db.founder.findMany({
      select: { slug: true, updatedAt: true },
    })
    return [
      ...staticPages,
      ...founders.map((founder) => ({
        url: `${SITE_URL}/founders/${founder.slug}`,
        lastModified: founder.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ]
  } catch (error) {
    console.warn(
      '[sitemap] founder pages skipped:',
      error instanceof Error ? error.message : error,
    )
    return staticPages
  }
}
