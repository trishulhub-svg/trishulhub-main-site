/** Public TrishulHub contact channels — used across CTAs site-wide */

export const SITE_PHONE_E164 = '919662106793'
export const SITE_PHONE_DISPLAY = '+91 96621 06793'
export const SITE_EMAIL = 'trishulhub@gmail.com'

const WA_TEXT = encodeURIComponent(
  'Hi TrishulHub — I want to talk about a project.',
)

export const WHATSAPP_URL = `https://wa.me/${SITE_PHONE_E164}?text=${WA_TEXT}`
export const TEL_URL = `tel:+${SITE_PHONE_E164}`
export const MAILTO_URL = `mailto:${SITE_EMAIL}`

export function whatsappWithMessage(message: string) {
  return `https://wa.me/${SITE_PHONE_E164}?text=${encodeURIComponent(message)}`
}
