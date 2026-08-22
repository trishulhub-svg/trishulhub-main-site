/** Digits only — for WhatsApp / tel inputs. */
export function digitsOnly(value: string): string {
  return String(value || '').replace(/\D/g, '')
}

/** Build https://wa.me/{digits} from a phone/WhatsApp number. */
export function whatsappHref(number: string | null | undefined): string | null {
  const digits = digitsOnly(number || '')
  if (!digits) return null
  return `https://wa.me/${digits}`
}

/** Build mailto: link from an email address. */
export function mailtoHref(email: string | null | undefined): string | null {
  const e = String(email || '').trim()
  if (!e || !e.includes('@')) return null
  return `mailto:${e}`
}

/** Ensure external profile URLs have a protocol. */
export function externalHref(url: string | null | undefined): string | null {
  const u = String(url || '').trim()
  if (!u) return null
  if (/^https?:\/\//i.test(u)) return u
  return `https://${u}`
}
