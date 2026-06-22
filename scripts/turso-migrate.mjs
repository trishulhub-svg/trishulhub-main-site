/**
 * Turso migration script.
 *
 * Prisma's sqlite datasource validator rejects `libsql://` URLs, so we cannot
 * use `prisma db push` against Turso directly. Instead, we connect to Turso
 * via `@libsql/client` and run the table DDL by hand. The shape mirrors the
 * `prisma/schema.prisma` models exactly so Prisma Client queries against the
 * resulting tables work without surprises.
 *
 * Run with:  node scripts/turso-migrate.mjs
 */
import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN

if (!url || !url.startsWith('libsql://')) {
  console.error('✖ DATABASE_URL must point at a libsql:// host for this script.')
  process.exit(1)
}

const client = createClient({ url, authToken })

const statements = [
  // ---- User ----
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'customer',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
  );`,

  // ---- Post (legacy) ----
  `CREATE TABLE IF NOT EXISTS "Post" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
  );`,

  // ---- Founder ----
  `CREATE TABLE IF NOT EXISTS "Founder" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "initial" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "projects" TEXT NOT NULL,
    "image" TEXT,
    "videoUrl" TEXT,
    "dateOfBirth" TEXT,
    "address" TEXT,
    "zipCode" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "origin" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "skills" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "projectsList" TEXT NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
  );`,

  // ---- Category ----
  `CREATE TABLE IF NOT EXISTS "Category" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL UNIQUE,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
  );`,

  // ---- Product ----
  `CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "compareAt" INTEGER,
    "sku" TEXT UNIQUE,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("categoryId") REFERENCES "Category"("id")
  );`,

  // ---- Cart ----
  `CREATE TABLE IF NOT EXISTS "Cart" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "userId" TEXT NOT NULL UNIQUE,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("id")
  );`,

  // ---- CartItem ----
  `CREATE TABLE IF NOT EXISTS "CartItem" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE,
    FOREIGN KEY ("productId") REFERENCES "Product"("id")
  );`,

  // ---- Order ----
  `CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "userId" TEXT NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL DEFAULT 0,
    "shipping" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentId" TEXT,
    "shippingAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("id")
  );`,

  // ---- OrderItem ----
  `CREATE TABLE IF NOT EXISTS "OrderItem" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE,
    FOREIGN KEY ("productId") REFERENCES "Product"("id")
  );`,
]

console.log(`Connecting to Turso at ${url.replace(/\?.*$/, '')}…`)
let applied = 0
for (const stmt of statements) {
  try {
    await client.execute(stmt)
    applied++
    const tableName = (stmt.match(/"(\w+)"/) || [])[1]
    console.log(`  ✓ ${tableName}`)
  } catch (err) {
    console.error(`  ✖ Failed on statement: ${stmt.slice(0, 80)}…`)
    console.error(`    ${err.message}`)
    process.exit(1)
  }
}
console.log(`\n✔ Migration complete — ${applied} tables ready on Turso.`)
