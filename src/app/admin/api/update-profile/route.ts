import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentFounder } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type UpdateBody = {
  name?: string
  role?: string
  bio?: string
  projects?: string
  image?: string | null
  videoUrl?: string | null
  dateOfBirth?: string | null
  address?: string | null
  zipCode?: string | null
  email?: string | null
  phone?: string | null
  origin?: string | null
  github?: string | null
  linkedin?: string | null
  twitter?: string | null
  website?: string | null
  skills?: { name: string; level: number }[]
  education?: { degree: string; school: string; year: string; description: string }[]
  experience?: { role: string; company: string; period: string; description: string }[]
  projectsList?: { name: string; description: string; link: string; year: string }[]
  password?: string // optional — only update if non-empty
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
      projects: founder.projects,
      image: founder.image,
      videoUrl: founder.videoUrl,
      dateOfBirth: founder.dateOfBirth,
      address: founder.address,
      zipCode: founder.zipCode,
      email: founder.email,
      phone: founder.phone,
      origin: founder.origin,
      github: founder.github,
      linkedin: founder.linkedin,
      twitter: founder.twitter,
      website: founder.website,
      skills: JSON.parse(founder.skills),
      education: JSON.parse(founder.education),
      experience: JSON.parse(founder.experience),
      projectsList: JSON.parse(founder.projectsList),
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
    if (typeof body.projects === 'string') data.projects = body.projects
    if (body.image !== undefined) data.image = body.image
    if (body.videoUrl !== undefined) data.videoUrl = body.videoUrl
    if (body.dateOfBirth !== undefined) data.dateOfBirth = body.dateOfBirth
    if (body.address !== undefined) data.address = body.address
    if (body.zipCode !== undefined) data.zipCode = body.zipCode
    if (body.email !== undefined) data.email = body.email
    if (body.phone !== undefined) data.phone = body.phone
    if (body.origin !== undefined) data.origin = body.origin
    if (body.github !== undefined) data.github = body.github
    if (body.linkedin !== undefined) data.linkedin = body.linkedin
    if (body.twitter !== undefined) data.twitter = body.twitter
    if (body.website !== undefined) data.website = body.website

    if (Array.isArray(body.skills)) {
      data.skills = JSON.stringify(
        body.skills
          .filter((s) => s && typeof s.name === 'string' && s.name.trim())
          .map((s) => ({
            name: String(s.name).trim(),
            level: Math.max(0, Math.min(100, Number(s.level) || 0)),
          })),
      )
    }
    if (Array.isArray(body.education)) {
      data.education = JSON.stringify(
        body.education.filter((e) => e && e.degree && e.degree.trim()),
      )
    }
    if (Array.isArray(body.experience)) {
      data.experience = JSON.stringify(
        body.experience.filter((e) => e && e.role && e.role.trim()),
      )
    }
    if (Array.isArray(body.projectsList)) {
      data.projectsList = JSON.stringify(
        body.projectsList.filter((p) => p && p.name && p.name.trim()),
      )
    }
    if (typeof body.password === 'string' && body.password.trim().length >= 4) {
      data.password = body.password.trim()
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
