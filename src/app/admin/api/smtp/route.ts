import { NextRequest, NextResponse } from 'next/server'
import { getCurrentFounder } from '@/lib/auth'
import { sendMail } from '@/lib/mailer'
import {
  getSmtpSettings,
  saveSmtpSettings,
  smtpIsComplete,
  type SmtpSettings,
} from '@/lib/settings'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Only Taroon manages the mail credentials. */
const OWNER_SLUG = 'taroon'

async function requireOwner() {
  const founder = await getCurrentFounder()
  if (!founder) return { error: 'Not authenticated', status: 401 as const }
  if (founder.slug !== OWNER_SLUG) {
    return { error: 'Only Taroon can change SMTP settings.', status: 403 as const }
  }
  return { founder }
}

export async function GET() {
  const gate = await requireOwner()
  if ('error' in gate) {
    return NextResponse.json({ ok: false, error: gate.error }, { status: gate.status })
  }

  const settings = await getSmtpSettings()
  return NextResponse.json({
    ok: true,
    configured: smtpIsComplete(settings),
    // Never return the stored password to the browser.
    settings: settings
      ? {
          host: settings.host,
          port: settings.port,
          secure: settings.secure,
          user: settings.user,
          fromName: settings.fromName,
          fromEmail: settings.fromEmail,
          hasPassword: Boolean(settings.pass),
        }
      : null,
  })
}

export async function POST(req: NextRequest) {
  const gate = await requireOwner()
  if ('error' in gate) {
    return NextResponse.json({ ok: false, error: gate.error }, { status: gate.status })
  }

  try {
    const body = await req.json().catch(() => ({}))

    /* --- send a test email with whatever is currently saved --- */
    if (body?.test) {
      const to = String(
        body?.to || gate.founder.email || '',
      ).trim()
      if (!to) {
        return NextResponse.json(
          { ok: false, error: 'Add an email address to send the test to.' },
          { status: 400 },
        )
      }
      await sendMail({
        to,
        subject: 'TrishulHub SMTP test',
        text: 'Your SMTP settings work — password reset emails will send from this account.',
        html: '<p>Your SMTP settings work — password reset emails will send from this account.</p>',
      })
      return NextResponse.json({ ok: true, sentTo: to })
    }

    /* --- save settings (keeping the stored password if the field is blank) --- */
    const existing = await getSmtpSettings()
    const incomingPass = String(body?.pass ?? '')
    const next: SmtpSettings = {
      host: String(body?.host ?? '').trim(),
      port: Number(body?.port ?? 587) || 587,
      secure: Boolean(body?.secure),
      user: String(body?.user ?? '').trim(),
      pass: incomingPass ? incomingPass : (existing?.pass ?? ''),
      fromName: String(body?.fromName ?? 'TrishulHub').trim(),
      fromEmail: String(body?.fromEmail ?? '').trim(),
    }

    if (!next.host || !next.fromEmail) {
      return NextResponse.json(
        { ok: false, error: 'SMTP host and From email are required.' },
        { status: 400 },
      )
    }

    await saveSmtpSettings(next, gate.founder.slug)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[admin/smtp] error', error)
    const message = error instanceof Error ? error.message : 'Could not save settings.'
    return NextResponse.json({ ok: false, error: message }, { status: 502 })
  }
}
