import { NextRequest, NextResponse } from 'next/server'
import { getCurrentFounder } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Accepts either:
 *  - FormData with `file` (image blob), or
 *  - JSON `{ dataUrl: "data:image/..." }` from client-side compressed uploads
 *
 * Always returns a durable data-URL (or existing data URL) so images work on
 * serverless hosts where `public/` is read-only.
 */
export async function POST(req: NextRequest) {
  const founder = await getCurrentFounder()
  if (!founder) {
    return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const contentType = req.headers.get('content-type') || ''

    // Preferred path: pre-compressed data URL from the browser
    if (contentType.includes('application/json')) {
      const body = (await req.json()) as { dataUrl?: string }
      const dataUrl = typeof body.dataUrl === 'string' ? body.dataUrl.trim() : ''
      if (!dataUrl.startsWith('data:image/')) {
        return NextResponse.json(
          { ok: false, error: 'Invalid image data. Please try another file.' },
          { status: 400 },
        )
      }
      // ~1.2MB data URL ≈ comfortable for Turso row size
      if (dataUrl.length > 1_400_000) {
        return NextResponse.json(
          { ok: false, error: 'Image is still too large after compression. Try a smaller photo.' },
          { status: 400 },
        )
      }
      return NextResponse.json({ ok: true, url: dataUrl })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 })
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: 'Only PNG, JPEG, WebP, or GIF images are allowed.' },
        { status: 400 },
      )
    }

    // 8 MB raw max before we encode (client should compress first)
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: 'Image must be under 8 MB.' },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`
    if (dataUrl.length > 1_400_000) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Image is too large to store. Please use a smaller photo (under ~1MB) or wait for compression.',
        },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true, url: dataUrl })
  } catch (e) {
    console.error('[admin/upload-image] error', e)
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : 'Upload failed',
      },
      { status: 500 },
    )
  }
}
