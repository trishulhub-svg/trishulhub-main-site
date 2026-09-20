/**
 * Generates public/opengraph-image.png (1200×630) used for social cards.
 *
 * Run:  node scripts/generate-og-image.mjs
 * Requires: sharp (already a project dependency)
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const logoPath = join(root, 'public', 'images', 'trishulhub-logo.png')
const outPath = join(root, 'public', 'opengraph-image.png')

const W = 1200
const H = 630

const background = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07140c"/>
      <stop offset="55%" stop-color="#0a1f13"/>
      <stop offset="100%" stop-color="#04100a"/>
    </linearGradient>
    <radialGradient id="glowA" cx="18%" cy="12%" r="60%">
      <stop offset="0%" stop-color="#5eead4" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#5eead4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="88%" cy="88%" r="55%">
      <stop offset="0%" stop-color="#0d9488" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0d9488" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>

  <text x="96" y="330" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="86" font-weight="700" fill="#ffffff" letter-spacing="-2">
    TrishulHub
  </text>

  <text x="96" y="386" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="31" fill="#9ff0dd">
    Websites · Bespoke Software · Mobile Apps
  </text>

  <text x="96" y="452" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="24" fill="#ffffff" fill-opacity="0.55">
    UK digital engineering studio · Fast, secure, built to scale
  </text>

  <rect x="96" y="505" width="64" height="4" rx="2" fill="#5eead4"/>

  <text x="96" y="560" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="22" font-weight="600" fill="#ffffff" fill-opacity="0.85">
    trishulhub.com
  </text>
</svg>`

const logo = await sharp(logoPath)
  .resize(190, 190, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

await sharp(Buffer.from(background))
  .composite([{ input: logo, left: W - 96 - 190, top: 120 }])
  .png({ quality: 92, compressionLevel: 9 })
  .toFile(outPath)

console.log('Wrote', outPath)
