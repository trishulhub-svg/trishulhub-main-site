import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'
import type { SiteContact } from '@/lib/site-contact'
import { getSiteContact, saveSiteContact } from '@/lib/site-contact-io'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(await getSiteContact())
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as Partial<SiteContact>

  try {
    const saved = await saveSiteContact(body, session.slug)

    /*
     * The public pages are pre-rendered at build time, so they carry the
     * contact details that were live when the site was last built. Purging the
     * cache here means the next visitor gets a page rebuilt with the new
     * values — no redeploy needed. The client-side fetch of
     * /api/site-contact is already uncached, so the footer, contact page,
     * chat and planner update immediately.
     */
    revalidatePath('/', 'layout')

    return NextResponse.json({ ok: true, contact: saved })
  } catch (error) {
    console.error('[admin/api/site-contact] POST', error)
    return NextResponse.json(
      { ok: false, error: 'Could not save the contact details. Please try again.' },
      { status: 500 },
    )
  }
}
