import { promises as fs } from 'fs'
import path from 'path'
import {
  DEFAULT_SITE_CONTACT,
  mergeSiteContact,
  type SiteContact,
} from '@/lib/site-contact'

const CONTACT_PATH = path.join(process.cwd(), 'public', 'site-contact.json')

/** Server-only: read public/site-contact.json */
export async function readSiteContactFile(): Promise<SiteContact> {
  try {
    const raw = await fs.readFile(CONTACT_PATH, 'utf8')
    return mergeSiteContact(JSON.parse(raw) as Partial<SiteContact>)
  } catch {
    return { ...DEFAULT_SITE_CONTACT }
  }
}

export async function writeSiteContactFile(
  contact: SiteContact,
): Promise<SiteContact> {
  const next = mergeSiteContact(contact)
  await fs.writeFile(
    CONTACT_PATH,
    JSON.stringify(next, null, 2) + '\n',
    'utf8',
  )
  return next
}
