import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  // The Turso / libsql URL — the actual remote DB.
  // Read from a SEPARATE env var so Prisma's schema datasource validation
  // (which still runs even when an adapter is supplied) doesn't reject it.
  const tursoUrl =
    process.env.TURSO_DATABASE_URL ||
    process.env.DATABASE_URL_REMOTE ||
    ''
  const tursoAuthToken =
    process.env.TURSO_AUTH_TOKEN ||
    process.env.DATABASE_AUTH_TOKEN ||
    ''

  if (tursoUrl.startsWith('libsql://')) {
    // Prisma's sqlite datasource validator still requires a `file:` URL even
    // when an adapter is supplied. The placeholder is never actually queried
    // — the adapter intercepts every query and routes it to Turso.
    if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('file:')) {
      process.env.DATABASE_URL = 'file:placeholder.db'
    }

    // NOTE: PrismaLibSQL takes a *config object* ({ url, authToken }), not
    // a pre-built libsql client. The adapter factory creates the client
    // internally on connect(). Passing a client here results in
    // `URL_INVALID: The URL 'undefined'` at query time.
    const adapter = new PrismaLibSQL({
      url: tursoUrl,
      authToken: tursoAuthToken || undefined,
    })
    return new PrismaClient({ adapter, log: ['error', 'warn'] })
  }

  // Local SQLite fallback (dev only).
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'file:/home/z/my-project/db/custom.db'
  }
  return new PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['query', 'error', 'warn'] : ['error', 'warn'],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
