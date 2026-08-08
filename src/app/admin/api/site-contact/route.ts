import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { getSession } from '@/lib/auth'

const CONTACT_PATH = path.join(process.cwd(), 'public', 'site-contact.json')

const DEFAULTS = {
  phone: '+919662106793',
  phoneDisplay: '+91 96621 06793',
  email: 'trishulhub@gmail.com',
  whatsapp: '919662106793',
}

async function readContact() {
  try {
    const raw = await fs.readFile(CONTACT_PATH, 'utf8')
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULTS }
  }
}

export async function GET() {
  const data = await readContact()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const next = {
    phone: String(body.phone || DEFAULTS.phone).trim(),
    phoneDisplay: String(body.phoneDisplay || DEFAULTS.phoneDisplay).trim(),
    email: String(body.email || DEFAULTS.email).trim(),
    whatsapp: String(body.whatsapp || DEFAULTS.whatsapp)
      .replace(/\D/g, '')
      .trim(),
  }

  await fs.writeFile(CONTACT_PATH, JSON.stringify(next, null, 2) + '\n', 'utf8')
  return NextResponse.json({ ok: true, contact: next })
}
