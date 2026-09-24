import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { db } from '@/lib/db'
import { MIN_PASSWORD_LENGTH, hashPassword } from '@/lib/password'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

/** Completes a reset: single-use token, then the password is stored hashed. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const token = String(body?.token ?? '').trim()
    const password = String(body?.password ?? '')

    if (!token) {
      return NextResponse.json(
        { ok: false, error: 'This reset link is missing its token.' },
        { status: 400 },
      )
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        {
          ok: false,
          error: `Use at least ${MIN_PASSWORD_LENGTH} characters.`,
        },
        { status: 400 },
      )
    }

    const record = await db.passwordReset.findUnique({
      where: { tokenHash: hashToken(token) },
    })

    if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
      return NextResponse.json(
        {
          ok: false,
          error: 'This reset link has expired or was already used. Request a new one.',
        },
        { status: 400 },
      )
    }

    await db.founder.update({
      where: { id: record.founderId },
      data: { password: hashPassword(password) },
    })
    await db.passwordReset.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[admin/reset-password] error', error)
    return NextResponse.json(
      { ok: false, error: 'Server error. Please try again.' },
      { status: 500 },
    )
  }
}
