import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Public team list for the About page (keeps heavy images out of the RSC HTML). */
export async function GET() {
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
        email: true,
        linkedin: true,
        whatsapp: true,
        instagram: true,
      },
    })
    const founders = all.filter((f) => f.slug !== 'akshat')
    return NextResponse.json(
      { ok: true, founders },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    )
  } catch (err) {
    console.warn(
      '[api/founders] fetch failed:',
      err instanceof Error ? err.message : err,
    )
    return NextResponse.json(
      { ok: false, founders: [], error: 'Could not load founders' },
      { status: 500 },
    )
  }
}
