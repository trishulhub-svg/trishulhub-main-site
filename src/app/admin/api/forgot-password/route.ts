import { NextRequest, NextResponse } from 'next/server'
import { createHash, randomBytes } from 'node:crypto'
import { db } from '@/lib/db'
import { MailNotConfiguredError, sendMail } from '@/lib/mailer'
import { getSmtpSettings, smtpIsComplete } from '@/lib/settings'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TOKEN_TTL_MINUTES = 60

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

/**
 * Starts a password reset.
 *
 * The reply is deliberately identical whether or not the account exists, so the
 * form can't be used to discover usernames. The one exception is when SMTP has
 * not been configured at all — that is a setup problem, not an account hint, and
 * the owner needs to see it.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const identifier = String(body?.identifier ?? '').trim()

    if (!identifier) {
      return NextResponse.json(
        { ok: false, error: 'Enter your username or email address.' },
        { status: 400 },
      )
    }

    const smtp = await getSmtpSettings()
    if (!smtpIsComplete(smtp)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Email sending is not set up yet, so a reset link cannot be sent. Taroon can add SMTP details under Admin → SMTP settings.',
        },
        { status: 503 },
      )
    }

    const founder = await db.founder.findFirst({
      where: {
        OR: [
          { username: identifier.toLowerCase() },
          { email: identifier },
        ],
      },
      select: { id: true, name: true, email: true },
    })

    // No account, or no address to send to: answer exactly the same way.
    if (!founder?.email) {
      return NextResponse.json({ ok: true })
    }

    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000)

    // Only one live token per founder.
    await db.passwordReset.deleteMany({ where: { founderId: founder.id } })
    await db.passwordReset.create({
      data: { founderId: founder.id, tokenHash: hashToken(token), expiresAt },
    })

    const origin = req.nextUrl.origin
    const link = `${origin}/admin/reset-password?token=${token}`

    try {
      await sendMail({
        to: founder.email,
        subject: 'Reset your TrishulHub admin password',
        text: [
          `Hello ${founder.name},`,
          '',
          'Someone asked to reset the password for your TrishulHub admin login.',
          `This link works once and expires in ${TOKEN_TTL_MINUTES} minutes:`,
          '',
          link,
          '',
          'If this was not you, you can ignore this email — your password has not changed.',
          '',
          '— TrishulHub',
        ].join('\n'),
        html: [
          `<p>Hello ${founder.name},</p>`,
          '<p>Someone asked to reset the password for your TrishulHub admin login.</p>',
          `<p><a href="${link}">Set a new password</a> — this link works once and expires in ${TOKEN_TTL_MINUTES} minutes.</p>`,
          '<p>If this was not you, you can ignore this email — your password has not changed.</p>',
          '<p>— TrishulHub</p>',
        ].join(''),
      })
    } catch (error) {
      console.error('[admin/forgot-password] send failed', error)
      const message =
        error instanceof MailNotConfiguredError
          ? error.message
          : 'We could not send the email — please check the SMTP settings.'
      return NextResponse.json({ ok: false, error: message }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[admin/forgot-password] error', error)
    return NextResponse.json(
      { ok: false, error: 'Server error. Please try again.' },
      { status: 500 },
    )
  }
}
