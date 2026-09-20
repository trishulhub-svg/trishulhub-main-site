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
  location: 'London, United Kingdom · Remote & Global Delivery',
  whatsappPrefill: 'Hi TrishulHub — I would like to discuss a project.',
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

/**
 * Pre-filled mailto so an "Email" click opens a ready-to-send draft — the
 * visitor only has to add their details and hit send.
 *
 * ponytail: mailto caps out around 2000 chars in some clients; the planner
 * summary is well under that. Swap for a hosted form if ever exceeded.
 */
export function emailDraftUrl(
  contact: SiteContact,
  draft: { subject: string; body: string },
): string {
  const params = new URLSearchParams({
    subject: draft.subject,
    body: draft.body,
  })
  // URLSearchParams encodes spaces as "+" which mail clients show literally.
  return `mailto:${contact.email}?${params.toString().replace(/\+/g, '%20')}`
}

/** The default email brief we pre-fill for visitors who prefer email. */
export function enquiryEmailDraft(extra?: {
  service?: string
  budget?: string
  timing?: string
}): { subject: string; body: string } {
  const lines = [
    'Hi TrishulHub,',
    '',
    "I'd like help with the following:",
    '',
    `What we need: ${extra?.service ?? ''}`,
    'Who it is for: ',
    'Must-have features: ',
    `Timeline: ${extra?.timing ?? ''}`,
    `Budget range: ${extra?.budget ?? ''}`,
    'Helpful links (current site, references): ',
    '',
    'My name: ',
    'Company: ',
    'Best number to reach me: ',
    '',
    'Thanks,',
  ]
  return { subject: 'Project enquiry — TrishulHub', body: lines.join('\n') }
}

export function contactLinks(contact: SiteContact) {
  return {
    whatsapp: whatsappUrl(contact),
    tel: telUrl(contact),
    mailto: mailtoUrl(contact),
    instagram: contact.instagram,
  }
}
