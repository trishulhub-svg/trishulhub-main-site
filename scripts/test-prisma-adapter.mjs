/**
 * Standalone Prisma + libsql adapter test.
 * Verifies that the adapter can actually run a query against Turso.
 */
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN

console.log('URL:', url)
console.log('Auth token length:', authToken ? authToken.length : 'undefined')

if (!url) {
  console.error('✖ DATABASE_URL not set')
  process.exit(1)
}

console.log('\n1. Creating libsql client…')
const libsql = createClient({ url, authToken })
console.log('   ✓ libsql client created')

console.log('\n2. Testing direct libsql query…')
try {
  const result = await libsql.execute('SELECT COUNT(*) as n FROM Founder')
  console.log('   ✓ direct query works — Founder count:', result.rows[0].n)
} catch (err) {
  console.error('   ✖ direct query failed:', err.message)
  process.exit(1)
}

console.log('\n3. Creating PrismaLibSQL adapter…')
const adapter = new PrismaLibSQL(libsql)
console.log('   ✓ adapter created')

console.log('\n4. Creating PrismaClient with adapter…')
const prisma = new PrismaClient({ adapter, log: ['query', 'error', 'warn'] })
console.log('   ✓ PrismaClient created')

console.log('\n5. Running prisma.founder.findMany()…')
try {
  const founders = await prisma.founder.findMany()
  console.log(`   ✓ Found ${founders.length} founders via Prisma`)
  for (const f of founders) {
    console.log(`     • ${f.name} — ${f.role}`)
  }
} catch (err) {
  console.error('   ✖ Prisma query failed:', err.message)
  console.error(err)
  process.exit(1)
}

await prisma.$disconnect()
console.log('\n✔ All checks passed.')
