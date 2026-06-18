import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { getCurrentFounder } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const founder = await getCurrentFounder()
  if (!founder) {
    return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 })
    }

    // Validate type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: 'Only PNG, JPEG, WebP, or GIF images are allowed.' },
        { status: 400 },
      )
    }

    // 5 MB max
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: 'Image must be under 5 MB.' },
        { status: 400 },
      )
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
    const filename = `founder-${founder.slug}-${Date.now()}.${ext}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'founders')
    await fs.mkdir(uploadDir, { recursive: true })
    const filepath = path.join(uploadDir, filename)

    const arrayBuffer = await file.arrayBuffer()
    await fs.writeFile(filepath, Buffer.from(arrayBuffer))

    const publicUrl = `/uploads/founders/${filename}`
    return NextResponse.json({ ok: true, url: publicUrl })
  } catch (e) {
    console.error('[admin/upload-image] error', e)
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 })
  }
}
