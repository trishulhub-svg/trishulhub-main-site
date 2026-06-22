/**
 * Quick verification that data landed on Turso.
 */
import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN
const client = createClient({ url, authToken })

for (const table of ['Category', 'Product', 'Founder', 'User']) {
  const res = await client.execute(`SELECT COUNT(*) as n FROM "${table}"`)
  console.log(`  ${table}: ${res.rows[0].n} rows`)
}

console.log('\nSample products:')
const products = await client.execute(`SELECT name, price, "compareAt", featured FROM "Product" LIMIT 5`)
for (const p of products.rows) {
  const featured = p.featured ? '⭐ ' : '   '
  console.log(`  ${featured}${p.name}  —  ₹${(p.price/100).toFixed(2)}  (was ₹${(p.compareAt/100).toFixed(2)})`)
}

console.log('\nFounders:')
const founders = await client.execute(`SELECT name, role FROM "Founder" ORDER BY "createdAt"`)
for (const f of founders.rows) {
  console.log(`  • ${f.name} — ${f.role}`)
}
