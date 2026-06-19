const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
  const founders = await prisma.founder.findMany({ orderBy: { createdAt: 'asc' } })
  founders.forEach(f => {
    console.log(`--- ${f.slug} ---`)
    console.log(`Name: ${f.name}`)
    console.log(`Role: ${f.role}`)
    console.log(`Bio: ${f.bio?.substring(0, 200)}`)
    console.log(`Image: ${f.image}`)
    console.log()
  })
}
main().then(() => prisma.$disconnect()).catch(e => { console.error(e); process.exit(1) })
