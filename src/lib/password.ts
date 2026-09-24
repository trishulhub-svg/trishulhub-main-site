import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

/**
 * Password hashing built on node:crypto scrypt — no extra dependency, and the
 * stored format is self-describing so hashing parameters can change later.
 *
 * Legacy rows hold plain text (the original build compared them directly). Those
 * still verify, and the caller re-hashes them on the next successful login.
 */

const KEYLEN = 64
const PREFIX = 'scrypt'

export function hashPassword(plain: string): string {
  const salt = randomBytes(16).toString('hex')
  const derived = scryptSync(plain, salt, KEYLEN).toString('hex')
  return `${PREFIX}$${salt}$${derived}`
}

export function verifyPassword(plain: string, stored: string | null): boolean {
  if (!stored) return false

  if (!stored.startsWith(`${PREFIX}$`)) {
    // Legacy plain-text comparison, kept so nobody is locked out.
    return stored === plain
  }

  const [, salt, expectedHex] = stored.split('$')
  if (!salt || !expectedHex) return false

  const expected = Buffer.from(expectedHex, 'hex')
  const candidate = scryptSync(plain, salt, expected.length || KEYLEN)
  return (
    candidate.length === expected.length && timingSafeEqual(candidate, expected)
  )
}

export function needsRehash(stored: string | null): boolean {
  return !stored || !stored.startsWith(`${PREFIX}$`)
}

/** Minimum we enforce anywhere a password is set. */
export const MIN_PASSWORD_LENGTH = 8
