/**
 * Legal / compliance details used by the privacy notice and the cookie policy.
 *
 * ⚠️ OWNER: the values marked "TODO" are the only things left to confirm.
 * UK GDPR requires the privacy notice to name the controller and give contact
 * details. If TrishulHub trades through a limited company, put the registered
 * name, company number and registered office here — and add the ICO
 * registration number once the annual data protection fee is paid.
 */

/** Trading name shown to visitors. */
export const LEGAL_ENTITY = 'TrishulHub'

/**
 * Registered legal entity, if different from the trading name.
 * TODO: e.g. 'TrishulHub Ltd, company number 12345678'
 * Leave empty to fall back to the trading name above.
 */
export const LEGAL_ENTITY_REGISTERED = ''

/** Contact for privacy, data-protection and cookie questions. */
export const PRIVACY_EMAIL = 'info@trishulhub.in'

/**
 * Registered office / postal address of the controller.
 * TODO: e.g. '123 Example Street, London, EC1A 1AA'
 * Leave empty to omit the address line (an email contact is still shown).
 */
export const REGISTERED_ADDRESS = ''

/**
 * ICO registration number.
 * TODO: most UK controllers must pay the annual data protection fee and will
 * have a reference like 'ZB123456'. Leave empty until it is issued.
 */
export const ICO_REGISTRATION = ''

/** Bumped whenever the wording of either policy changes materially. */
export const POLICY_VERSION = '1.0'

/** Human-readable date shown at the top of both policies. */
export const POLICY_LAST_UPDATED = '24 September 2026'

/** ICO contact details — quoted in the privacy notice. */
export const ICO_CONTACT = {
  name: 'Information Commissioner’s Office',
  helpline: '0303 123 1113',
  website: 'https://ico.org.uk/make-a-complaint/',
  address: 'Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF',
}
