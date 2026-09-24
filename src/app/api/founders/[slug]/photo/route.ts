import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Serves a founder portrait as a real image instead of an inline base64 string.
 *
 * The stored value is either a data URL (base64 in the database) or a file
 * path/URL from an older upload — both are handled. Responses are immutable
 * because the public URL carries a `?v=` cache-buster that changes whenever the
 * founder row is updated.
 */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params

  try {
    const founder = await db.founder.findUnique({
      where: { slug },
      select: { image: true, updatedAt: true },
    })
    const value = founder?.image
    if (!value) {
      return new NextResponse('Not found', { status: 404 })
    }

    // Older uploads already point at a file — hand that straight back.
    if (!value.startsWith('data:')) {
      return NextResponse.redirect(new URL(value, _req.nextUrl.origin), 307)
    }

    const match = /^data:([^;,]+);base64,([\s\S]*)$/.exec(value)
    if (!match) {
      return new NextResponse('Unsupported image', { status: 415 })
    }
    const [, mime, base64] = match
    const bytes = Buffer.from(base64, 'base64')

    return new NextResponse(new Uint8Array(bytes), {
      status: 200,
      headers: {
        'Content-Type': mime,
        'Content-Length': String(bytes.byteLength),
        /*
         * Safe to cache forever — the public URL carries ?v=<updatedAt>, so a
         * new photo gets a new URL. `s-maxage` lets Vercel's CDN hold it too,
         * so the origin/database is only touched on the very first request.
         */
        'Cache-Control':
          'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable',
        'Last-Modified': founder?.updatedAt
          ? new Date(founder.updatedAt).toUTCString()
          : new Date().toUTCString(),
      },
    })
  } catch (e) {
    console.error('[api/founders/photo] GET', e)
    return new NextResponse('Lookup failed', { status: 500 })
  }
}
