import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentFounder } from '@/lib/auth'
import {
  MIN_PASSWORD_LENGTH,
  hashPassword,
  verifyPassword,
} from '@/lib/password'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type UpdateBody = {
  name?: string
  role?: string
  bio?: string
  image?: string | null
  image2?: string | null
  email?: string | null
  linkedin?: string | null
  whatsapp?: string | null
  instagram?: string | null
  currentPassword?: string
  password?: string // optional — only update if non-empty + currentPassword matches
}

export async function GET() {
  const founder = await getCurrentFounder()
  if (!founder) {
    return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 })
  }
  // Return full founder record for the editor
  return NextResponse.json({
    ok: true,
    founder: {
      id: founder.id,
      slug: founder.slug,
      name: founder.name,
      initial: founder.initial,
      role: founder.role,
      bio: founder.bio,
      image: founder.image,
      image2: founder.image2,
      email: founder.email,
      linkedin: founder.linkedin,
      whatsapp: founder.whatsapp,
      instagram: founder.instagram,
      username: founder.username,
    },
  })
}

export async function PUT(req: NextRequest) {
  const founder = await getCurrentFounder()
  if (!founder) {
    return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const body = (await req.json()) as UpdateBody

    // Build update object — only fields that are present
    const data: Record<string, unknown> = {}
    if (typeof body.name === 'string' && body.name.trim()) data.name = body.name.trim()
    if (typeof body.role === 'string') data.role = body.role
    if (typeof body.bio === 'string') data.bio = body.bio
    if (body.image !== undefined) data.image = body.image
    if (body.image2 !== undefined) data.image2 = body.image2
    if (body.email !== undefined) data.email = body.email
    if (body.linkedin !== undefined) data.linkedin = body.linkedin
    if (body.whatsapp !== undefined) {
      data.whatsapp =
        typeof body.whatsapp === 'string'
          ? body.whatsapp.replace(/\D/g, '') || null
          : body.whatsapp
    }
    if (body.instagram !== undefined) data.instagram = body.instagram

    if (typeof body.password === 'string' && body.password.trim().length > 0) {
      const next = body.password.trim()
      if (next.length < MIN_PASSWORD_LENGTH) {
        return NextResponse.json(
          {
            ok: false,
            error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
          },
          { status: 400 },
        )
      }
      const current =
        typeof body.currentPassword === 'string' ? body.currentPassword : ''
      if (!current) {
        return NextResponse.json(
          { ok: false, error: 'Current password is required to change password.' },
          { status: 400 },
        )
      }
      if (!verifyPassword(current, founder.password)) {
        return NextResponse.json(
          { ok: false, error: 'Current password is incorrect.' },
          { status: 400 },
        )
      }
      data.password = hashPassword(next)
    }

    const updated = await db.founder.update({
      where: { id: founder.id },
      data,
      select: { id: true, name: true, slug: true },
    })

    return NextResponse.json({ ok: true, founder: updated })
  } catch (e) {
    console.error('[admin/update-profile] error', e)
    return NextResponse.json(
      { ok: false, error: 'Failed to update profile. Check your input.' },
      { status: 500 },
    )
  }
}
