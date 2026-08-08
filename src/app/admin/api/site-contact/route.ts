import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import {
  DEFAULT_SITE_CONTACT,
  mergeSiteContact,
  type SiteContact,
} from '@/lib/site-contact'
import {
  readSiteContactFile,
  writeSiteContactFile,
} from '@/lib/site-contact-io'

export async function GET() {
  const data = await readSiteContactFile()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as Partial<SiteContact>
  const next = mergeSiteContact({
    ...DEFAULT_SITE_CONTACT,
    ...body,
  })

  const saved = await writeSiteContactFile(next)
  return NextResponse.json({ ok: true, contact: saved })
}
