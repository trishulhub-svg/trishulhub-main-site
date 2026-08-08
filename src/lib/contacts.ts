/**
 * Public TrishulHub contact helpers.
 *
 * Live values are edited in Admin → Site Contact and stored in
 * `public/site-contact.json`. Prefer `useSiteContact()` in client UI so
 * admin edits apply across the site. These exports are safe defaults /
 * fallbacks for SSR and first paint.
 */

import {
  DEFAULT_SITE_CONTACT,
  mailtoUrl,
  telUrl,
  whatsappUrl,
  type SiteContact,
} from '@/lib/site-contact'

export type { SiteContact }

export const SITE_PHONE_E164 = DEFAULT_SITE_CONTACT.whatsapp
export const SITE_PHONE_DISPLAY = DEFAULT_SITE_CONTACT.phoneDisplay
export const SITE_EMAIL = DEFAULT_SITE_CONTACT.email
export const SITE_INSTAGRAM = DEFAULT_SITE_CONTACT.instagram
export const SITE_LOCATION = DEFAULT_SITE_CONTACT.location

export const WHATSAPP_URL = whatsappUrl(DEFAULT_SITE_CONTACT)
export const TEL_URL = telUrl(DEFAULT_SITE_CONTACT)
export const MAILTO_URL = mailtoUrl(DEFAULT_SITE_CONTACT)

export function whatsappWithMessage(
  message: string,
  contact: SiteContact = DEFAULT_SITE_CONTACT,
) {
  return whatsappUrl(contact, message)
}
