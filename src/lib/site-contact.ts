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
  whatsappPrefill:
    'Hello TrishulHub — I would like to enquire about a new project. I will share the details here:',
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

/** Email clients want CRLF; bare \n is what turns drafts into one wall of text. */
const CRLF = '\r\n'

type EnquiryDetails = {
  service?: string
  budget?: string
  timing?: string
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

/** Professional, ready-to-send email brief. */
export function enquiryEmailDraft(extra?: EnquiryDetails): {
  subject: string
  body: string
} {
  const service = extra?.service?.trim() || 'Not decided yet'
  const budget = extra?.budget?.trim() || 'Open to your recommendation'
  const timing = extra?.timing?.trim() || 'Flexible'

  const body = [
    'Hello TrishulHub team,',
    '',
    'I would like to discuss a new project. Here is a short brief:',
    '',
    'PROJECT',
    `• Type of work: ${service}`,
    '• Who it is for: ',
    '• Main goal: ',
    '',
    'SCOPE',
    '• Must-have features: ',
    '• Nice to have: ',
    `• Preferred start: ${timing}`,
    `• Budget range: ${budget}`,
    '',
    'CONTEXT',
    '• Current website / references: ',
    '• Anything else we should know: ',
    '',
    'ABOUT ME',
    '• Name: ',
    '• Company: ',
    '• Role: ',
    '• Best number: ',
    '• Preferred reply: email / WhatsApp / phone',
    '',
    'Thanks,',
    '',
    // Signature block the sender fills in
    '',
  ].join(CRLF)

  return {
    subject: `Project enquiry — ${service}`,
    body,
  }
}

/**
 * WhatsApp version: WhatsApp renders *bold* and real line breaks, so this is
 * the same brief in chat form — shorter, scannable, still professional.
 */
export function enquiryWhatsAppDraft(extra?: EnquiryDetails): string {
  const service = extra?.service?.trim() || 'Not decided yet'
  const budget = extra?.budget?.trim() || 'Open to advice'
  const timing = extra?.timing?.trim() || 'Flexible'

  return [
    'Hello TrishulHub — project enquiry',
    '',
    `*Service:* ${service}`,
    `*Timeline:* ${timing}`,
    `*Budget:* ${budget}`,
    '',
    '*What it needs to do:* ',
    '*Who it is for:* ',
    '*Current site / links:* ',
    '',
    'Name: ',
    'Company: ',
    '',
    'Thanks!',
  ].join('\n')
}

export function contactLinks(contact: SiteContact) {
  return {
    whatsapp: whatsappUrl(contact),
    tel: telUrl(contact),
    mailto: mailtoUrl(contact),
    instagram: contact.instagram,
  }
}
