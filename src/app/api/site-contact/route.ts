import { NextResponse } from 'next/server'
import { getSiteContact } from '@/lib/site-contact-io'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Public, always-fresh site contact details (email, phone, WhatsApp, location).
 *
 * The client UI used to fetch the bundled `/site-contact.json`, which was
 * frozen at build time — so an admin edit only appeared after a redeploy. This
 * route reads the live database row instead, and is explicitly uncached.
 */
export async function GET() {
  const contact = await getSiteContact()
  return NextResponse.json(contact, {
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
    },
  })
}
