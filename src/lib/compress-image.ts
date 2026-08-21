/** Client-side image compression → JPEG data URL suitable for DB storage. */
export async function compressImageToDataUrl(
  file: File,
  opts?: { maxEdge?: number; quality?: number },
): Promise<string> {
  const maxEdge = opts?.maxEdge ?? 1400
  const quality = opts?.quality ?? 0.82

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    throw new Error('Could not process image in this browser')
  }
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const dataUrl = canvas.toDataURL('image/jpeg', quality)
  if (!dataUrl.startsWith('data:image/')) {
    throw new Error('Could not encode image')
  }
  return dataUrl
}
