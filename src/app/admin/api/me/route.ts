import { NextResponse } from 'next/server'
import { getCurrentFounder } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const founder = await getCurrentFounder()
  if (!founder) {
    return NextResponse.json({ ok: false, founder: null }, { status: 401 })
  }
  return NextResponse.json({
    ok: true,
    founder: {
      id: founder.id,
      slug: founder.slug,
      name: founder.name,
      role: founder.role,
      username: founder.username,
    },
  })
}
