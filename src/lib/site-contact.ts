export type SiteContact = {
  /** Digits-only WhatsApp number, country code included (e.g. 919662106793) */
  whatsapp: string
  /** tel: target, with or without + (e.g. +919662106793) */
  phone: string
  /** Human-readable phone shown in UI */
  phoneDisplay: string
  email: string
  /** Full Instagram profile URL */
  instagram: string
  /** Location line shown on Contact us (e.g. India · Remote-friendly) */
  location: string
  /** Default WhatsApp prefill message */
  whatsappPrefill: string
}

export const DEFAULT_SITE_CONTACT: SiteContact = {
  whatsapp: '919662106793',
  phone: '+919662106793',
  phoneDisplay: '+91 96621 06793',
  email: 'info@trishulhub.in',
  instagram: 'https://www.instagram.com/',
  location: 'India · Remote-friendly',
  whatsappPrefill: 'Hi TrishulHub — I want to talk about a project.',
}

export function normalizeWhatsapp(value: string): string {
  return String(value || '')
    .replace(/\D/g, '')
    .trim()
}

export function normalizePhone(value: string): string {
  const raw = String(value || '').trim()
  if (!raw) return DEFAULT_SITE_CONTACT.phone
  const digits = raw.replace(/\D/g, '')
  if (!digits) return DEFAULT_SITE_CONTACT.phone
  return `+${digits}`
}

export function mergeSiteContact(
  partial: Partial<SiteContact> | null | undefined,
): SiteContact {
  const base = { ...DEFAULT_SITE_CONTACT, ...(partial || {}) }
  return {
    whatsapp: normalizeWhatsapp(base.whatsapp) || DEFAULT_SITE_CONTACT.whatsapp,
    phone: normalizePhone(base.phone),
    phoneDisplay: String(base.phoneDisplay || DEFAULT_SITE_CONTACT.phoneDisplay).trim(),
    email: String(base.email || DEFAULT_SITE_CONTACT.email).trim(),
    instagram: String(base.instagram || DEFAULT_SITE_CONTACT.instagram).trim(),
    location: String(base.location || DEFAULT_SITE_CONTACT.location).trim(),
    whatsappPrefill: String(
      base.whatsappPrefill || DEFAULT_SITE_CONTACT.whatsappPrefill,
    ).trim(),
  }
}

export function whatsappUrl(contact: SiteContact, message?: string): string {
  const text = encodeURIComponent(message ?? contact.whatsappPrefill)
  return `https://wa.me/${contact.whatsapp}?text=${text}`
}

export function telUrl(contact: SiteContact): string {
  const digits = contact.phone.replace(/\D/g, '')
  return `tel:+${digits}`
}

export function mailtoUrl(contact: SiteContact): string {
  return `mailto:${contact.email}`
}

export function contactLinks(contact: SiteContact) {
  return {
    whatsapp: whatsappUrl(contact),
    tel: telUrl(contact),
    mailto: mailtoUrl(contact),
    instagram: contact.instagram,
  }
}
