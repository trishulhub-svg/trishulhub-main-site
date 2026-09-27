import { promises as fs } from 'fs'
import path from 'path'
import { db } from '@/lib/db'
import {
  DEFAULT_SITE_CONTACT,
  mergeSiteContact,
  type SiteContact,
} from '@/lib/site-contact'

const CONTACT_PATH = path.join(process.cwd(), 'public', 'site-contact.json')

/**
 * Where the live site contact actually lives.
 *
 * It used to be only `public/site-contact.json`. That cannot work in
 * production: `public/` is part of the read-only deployment bundle on Vercel,
 * so a save could never persist — and the public pages are pre-rendered at
 * build time, so they would keep the build's copy even if it did.
 *
 * The database is now the source of truth (the same `Setting` key/value table
 * the SMTP credentials use). The JSON file stays as a fallback for local dev
 * and for a database that has no row yet, and is mirrored on save so a local
 * checkout still reflects what the admin entered.
 */
const SETTING_KEY = 'site-contact'

/** File layer — fallback only. */
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

/** The live values: database first, then the bundled file, then defaults. */
export async function getSiteContact(): Promise<SiteContact> {
  try {
    const row = await db.setting.findUnique({ where: { key: SETTING_KEY } })
    if (row?.value) {
      return mergeSiteContact(JSON.parse(row.value) as Partial<SiteContact>)
    }
  } catch (error) {
    console.warn(
      '[site-contact] database read failed, falling back to the bundled file:',
      error instanceof Error ? error.message : error,
    )
  }
  return readSiteContactFile()
}

/** Persist an admin edit. Returns the merged values that are now live. */
export async function saveSiteContact(
  input: Partial<SiteContact>,
  updatedBy?: string | null,
): Promise<SiteContact> {
  /*
   * `phoneDisplay` is always re-derived from `phone`.
   *
   * The admin form only asks for the number ("Phone (for Call button)") — the
   * human-readable version is generated. But the form still posts the whole
   * object back, including the display string it was given, and that stale
   * value used to win the merge: you could change the phone number and the
   * number shown across the site would not move. Forcing it empty makes the
   * merge regenerate it from the number, so the two can never disagree.
   */
  const next = mergeSiteContact({
    ...DEFAULT_SITE_CONTACT,
    ...input,
    phoneDisplay: '',
  })
  const value = JSON.stringify(next)

  await db.setting.upsert({
    where: { key: SETTING_KEY },
    create: { key: SETTING_KEY, value, updatedBy: updatedBy ?? null },
    update: { value, updatedBy: updatedBy ?? null },
  })

  return next
}
