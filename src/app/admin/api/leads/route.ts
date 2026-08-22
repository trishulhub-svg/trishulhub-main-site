import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentFounder } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Admin-only list of contact form leads. */
export async function GET() {
  const founder = await getCurrentFounder()
  if (!founder) {
    return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const leads = await db.contactLead.findMany({
      orderBy: { createdAt: 'desc' },
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
    return NextResponse.json({ ok: true, leads })
  } catch (e) {
    console.error('[admin/api/leads] GET', e)
    return NextResponse.json(
      { ok: false, error: 'Could not load leads' },
      { status: 500 },
    )
  }
}

/** Admin-only delete a contact lead. */
export async function DELETE(req: NextRequest) {
  const founder = await getCurrentFounder()
  if (!founder) {
    return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const id = String(body?.id || '').trim()
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Lead id required' }, { status: 400 })
    }
    await db.contactLead.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[admin/api/leads] DELETE', e)
    return NextResponse.json(
      { ok: false, error: 'Could not delete lead' },
      { status: 500 },
    )
  }
}
