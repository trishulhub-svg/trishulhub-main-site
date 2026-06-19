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

    // Validate type — videos only
    const allowedTypes = [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
      'video/mov',
    ]
    // Some browsers send video/quicktime for .mov files; also accept by extension
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const allowedExts = ['mp4', 'webm', 'ogg', 'mov', 'm4v']
    if (!allowedTypes.includes(file.type) && !allowedExts.includes(ext)) {
      return NextResponse.json(
        { ok: false, error: 'Only MP4, WebM, OGG, or MOV videos are allowed.' },
        { status: 400 },
      )
    }

    // 30 MB max — videos are larger than images
    if (file.size > 30 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: 'Video must be under 30 MB.' },
        { status: 400 },
      )
    }

    const safeExt = ['mp4', 'webm', 'ogg', 'mov', 'm4v'].includes(ext) ? ext : 'mp4'
    const filename = `founder-${founder.slug}-video-${Date.now()}.${safeExt}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'founders')
    await fs.mkdir(uploadDir, { recursive: true })
    const filepath = path.join(uploadDir, filename)

    const arrayBuffer = await file.arrayBuffer()
    await fs.writeFile(filepath, Buffer.from(arrayBuffer))

    const publicUrl = `/uploads/founders/${filename}`
    return NextResponse.json({ ok: true, url: publicUrl })
  } catch (e) {
    console.error('[admin/upload-video] error', e)
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 })
  }
}
