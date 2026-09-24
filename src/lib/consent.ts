/**
 * Cookie / device-storage choices.
 *
 * UK rules this implements (PECR reg 6, as amended by the Data (Use and
 * Access) Act 2025, and the ICO's storage and access technologies guidance
 * finalised 29 April 2026):
 *
 *   - You must not store or read information on someone's device without
 *     consent, unless an exception applies.
 *   - Two exceptions are relevant here. "Appearance": storage whose sole
 *     purpose is adapting how the service looks or works to the person's own
 *     preference (our light/dark choice). "Statistical purposes": storage
 *     whose sole purpose is counting how the service is used so it can be
 *     improved (analytics). Neither needs consent, but BOTH require clear
 *     information plus an easy, free way to object.
 *
 * So this file is the "easy way to object": one record per browser, editable
 * at any time from the footer, with the objection respected immediately.
 *
 * Anything that does need consent (advertising, profiling, ad measurement)
 * must check `hasConsent()` before it loads. Nothing like that ships today.
 */

export const CONSENT_STORAGE_KEY = 'trishulhub:consent'

/** Bump when the categories or their meaning change — re-asks for a choice. */
export const CONSENT_VERSION = 1

/** The theme preference key owned by components/trishulhub/theme-toggle.tsx */
export const THEME_STORAGE_KEY = 'trishulhub-theme'

export type ConsentRecord = {
  /** Schema version, so an older record can be ignored. */
  v: number
  /** ISO timestamp of the choice — our record of it. */
  ts: string
  /**
   * Remember the light/dark choice on this device (PECR "appearance").
   * Off = we honour the objection and stop writing it.
   */
  appearance: boolean
  /**
   * Analytics / statistics (PECR "statistical purposes"). Off by default and
   * nothing currently uses it — reserved so any future tool is gated properly.
   */
  analytics: boolean
  /** Where the choice came from, for the record: banner | settings | default */
  source: string
}

export function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    if (!parsed || parsed.v !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function writeConsent(
  choice: { appearance: boolean; analytics: boolean },
  source = 'settings',
): ConsentRecord {
  const record: ConsentRecord = {
    v: CONSENT_VERSION,
    ts: new Date().toISOString(),
    appearance: choice.appearance,
    analytics: choice.analytics,
    source,
  }
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
  } catch {
    /* storage blocked — the choice still applies for this page view */
  }
  /*
   * Withdrawing the appearance choice means we must stop remembering the
   * display preference and remove what we already stored.
   */
  if (!choice.appearance) {
    try {
      window.localStorage.removeItem(THEME_STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }
  window.dispatchEvent(new CustomEvent('trishulhub:consent-changed', { detail: record }))
  return record
}

/** Forget the stored choice entirely (used by "Clear my choice"). */
export function clearConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY)
    window.localStorage.removeItem(THEME_STORAGE_KEY)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent('trishulhub:consent-cleared'))
}

/**
 * Consent check for anything that genuinely needs it. Because no such tool is
 * installed today, this returns false for everything until a visitor opts in.
 */
export function hasConsent(category: 'analytics' | 'appearance'): boolean {
  const record = readConsent()
  if (!record) return false
  return category === 'analytics' ? record.analytics : record.appearance
}

/** True unless the visitor has explicitly objected to the appearance storage. */
export function mayStoreAppearance(): boolean {
  const record = readConsent()
  if (!record) return true // the exception applies; no consent needed
  return record.appearance
}
