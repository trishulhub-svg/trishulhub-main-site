import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Universal lead payload — JSON for embedding in other sites/admin panels.
 * GET /api/leads/:token
 */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ token: string }> },
) {
  const { token } = await ctx.params
  const shareToken = String(token || '').trim()
  if (!shareToken || shareToken.length < 16) {
    return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 400 })
  }

  try {
    const lead = await db.contactLead.findUnique({
      where: { shareToken },
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
        message: true,
        shareToken: true,
        createdAt: true,
      },
    })
    if (!lead) {
      return NextResponse.json({ ok: false, error: 'Lead not found' }, { status: 404 })
    }

    const payload = {
      ok: true,
      schema: 'trishulhub.contact_lead.v1',
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        service: lead.service,
        message: lead.message,
        shareToken: lead.shareToken,
        submittedAt: lead.createdAt.toISOString(),
      },
    }

    return NextResponse.json(payload, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (e) {
    console.error('[api/leads/token] GET', e)
    return NextResponse.json({ ok: false, error: 'Lookup failed' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
