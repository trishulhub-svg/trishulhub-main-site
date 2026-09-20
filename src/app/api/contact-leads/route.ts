import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function makeShareToken() {
  return randomBytes(16).toString('hex')
}

/** Public contact form submission → stores lead + returns share token. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim()
    const service = String(body?.service || '').trim() || 'Not sure yet'
    const company = String(body?.company || '').trim().slice(0, 120)
    const budget = String(body?.budget || '').trim().slice(0, 60)
    const honeypot = String(body?.website || '').trim()
    const rawMessage = String(body?.message || '').trim()

    // Silently accept-and-drop obvious bot submissions (honeypot filled).
    if (honeypot) {
      return NextResponse.json({ ok: true, lead: null })
    }

    if (!name || name.length > 120) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid name.' },
        { status: 400 },
      )
    }
    if (!email || !email.includes('@') || email.length > 200) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email.' },
        { status: 400 },
      )
    }
    if (!rawMessage || rawMessage.length > 5000) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a message.' },
        { status: 400 },
      )
    }

    // Keep the extra qualification detail with the message so the stored
    // schema stays unchanged while admins still see the full context.
    const extras = [
      company ? `Company: ${company}` : null,
      budget ? `Budget: ${budget}` : null,
    ].filter(Boolean)
    const message = extras.length
      ? `${rawMessage}\n\n—\n${extras.join('\n')}`
      : rawMessage

    const shareToken = makeShareToken()
    const lead = await db.contactLead.create({
      data: {
        name,
        email,
        service: service.slice(0, 80),
        message,
        shareToken,
      },
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
        shareToken: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      ok: true,
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        service: lead.service,
        shareToken: lead.shareToken,
        createdAt: lead.createdAt,
      },
    })
  } catch (e) {
    console.error('[api/contact-leads] POST', e)
    return NextResponse.json(
      { ok: false, error: 'Could not submit form. Please try again.' },
      { status: 500 },
    )
  }
}
