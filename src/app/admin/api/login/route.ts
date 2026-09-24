import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { signSession, setSessionCookie } from '@/lib/auth'
import { hashPassword, needsRehash, verifyPassword } from '@/lib/password'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const username = String(body?.username ?? '').trim().toLowerCase()
    const password = String(body?.password ?? '')

    if (!username || !password) {
      return NextResponse.json(
        { ok: false, error: 'Username and password are required.' },
        { status: 400 },
      )
    }

    const founder = await db.founder.findUnique({ where: { username } })

    if (!founder || !verifyPassword(password, founder.password)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid username or password.' },
        { status: 401 },
      )
    }

    // Anyone still on a legacy plain-text row gets hashed on their next login.
    if (needsRehash(founder.password)) {
      await db.founder
        .update({
          where: { id: founder.id },
          data: { password: hashPassword(password) },
        })
        .catch((error) => {
          console.warn('[admin/login] password rehash failed', error)
        })
    }

    const token = await signSession({
      founderId: founder.id,
      slug: founder.slug,
      username: founder.username,
    })
    await setSessionCookie(token)

    return NextResponse.json({
      ok: true,
      founder: {
        slug: founder.slug,
        name: founder.name,
        role: founder.role,
        username: founder.username,
      },
    })
  } catch (e) {
    console.error('[admin/login] error', e)
    return NextResponse.json(
      { ok: false, error: 'Server error. Try again.' },
      { status: 500 },
    )
  }
}
