import { db } from '@/lib/db'

/**
 * Runtime settings the owner edits from the admin (currently just SMTP).
 * Stored as one JSON row so adding a field never needs a migration.
 */

export type SmtpSettings = {
  host: string
  port: number
  /** true = implicit TLS (465). false = STARTTLS upgrade (587/25). */
  secure: boolean
  user: string
  pass: string
  fromName: string
  fromEmail: string
}

const SMTP_KEY = 'smtp'

export async function getSmtpSettings(): Promise<SmtpSettings | null> {
  try {
    const row = await db.setting.findUnique({ where: { key: SMTP_KEY } })
    if (!row) return null
    const parsed = JSON.parse(row.value) as Partial<SmtpSettings>
    if (!parsed.host || !parsed.port) return null
    return {
      host: String(parsed.host),
      port: Number(parsed.port),
      secure: Boolean(parsed.secure),
      user: String(parsed.user ?? ''),
      pass: String(parsed.pass ?? ''),
      fromName: String(parsed.fromName ?? 'TrishulHub'),
      fromEmail: String(parsed.fromEmail ?? parsed.user ?? ''),
    }
  } catch (error) {
    console.error('[settings] could not read smtp settings', error)
    return null
  }
}

export async function saveSmtpSettings(
  settings: SmtpSettings,
  updatedBy: string,
): Promise<void> {
  const value = JSON.stringify(settings)
  await db.setting.upsert({
    where: { key: SMTP_KEY },
    create: { key: SMTP_KEY, value, updatedBy },
    update: { value, updatedBy },
  })
}

export function smtpIsComplete(settings: SmtpSettings | null): boolean {
  return Boolean(settings?.host && settings?.port && settings?.fromEmail)
}
