/**
 * Founder photos are stored in the database as base64 data URLs (the admin
 * uploads a file and we keep it inline). Rendering those inline is expensive:
 * a 140KB portrait becomes a 187KB string inside the API payload and inside
 * the HTML of /founders/<slug>, none of which the browser can cache, resize or
 * lazy-load.
 *
 * So public pages get a tiny cacheable URL instead, served by
 * /api/founders/[slug]/photo. The `?v=` timestamp busts the long cache when
 * the owner changes the photo. If the stored value is already a real file URL
 * (older uploads through /uploads), we just use it.
 */
export function founderPhotoUrl(founder: {
  slug: string
  image?: string | null
  updatedAt?: Date | string | null
}): string | null {
  const image = founder.image ?? null
  if (!image) return null
  if (!image.startsWith('data:')) return image
  const stamp = founder.updatedAt ? new Date(founder.updatedAt).getTime() : 0
  return `/api/founders/${founder.slug}/photo${stamp ? `?v=${stamp}` : ''}`
}
