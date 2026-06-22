/**
 * Turso seed script — populates sample products, categories, founders.
 *
 * Run with:  node scripts/turso-seed.mjs
 *
 * Idempotent: skips any record whose slug/sku/email already exists, so it
 * can be re-run safely. Founders are only created if the Founder table is
 * empty (so admin panel edits are never clobbered).
 */
import { createClient } from '@libsql/client'

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN

if (!url || !url.startsWith('libsql://')) {
  console.error('✖ DATABASE_URL must point at a libsql:// host for this script.')
  process.exit(1)
}

const client = createClient({ url, authToken })

// helper — run a statement, swallow "UNIQUE constraint" errors
async function insertIgnore(sql, params = []) {
  try {
    await client.execute({ sql, args: params })
    return true
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('unique')) return false
    throw err
  }
}

const cuid = (p = '') => p + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)

// =========================================================
// 1. Categories
// =========================================================
const categories = [
  {
    name: 'Web Applications',
    slug: 'web-applications',
    description: 'Full-stack web apps built with Next.js, React, and modern TypeScript.',
  },
  {
    name: 'Mobile Apps',
    slug: 'mobile-apps',
    description: 'Cross-platform mobile applications for iOS and Android.',
  },
  {
    name: 'E-commerce Solutions',
    slug: 'ecommerce-solutions',
    description: 'Online stores with secure payments and inventory management.',
  },
  {
    name: 'Branding & Design',
    slug: 'branding-design',
    description: 'Brand identity, logos, and design systems that tell your story.',
  },
]

console.log('\n📂 Seeding categories…')
const categoryIdBySlug = {}
for (const c of categories) {
  const id = cuid('cat_')
  const ok = await insertIgnore(
    `INSERT INTO "Category" (id, name, slug, description, "updatedAt") VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [id, c.name, c.slug, c.description],
  )
  if (ok) console.log(`  ✓ ${c.name}`)
  // Look up the actual id (whether newly inserted or pre-existing)
  const res = await client.execute({ sql: `SELECT id FROM "Category" WHERE slug = ?`, args: [c.slug] })
  categoryIdBySlug[c.slug] = res.rows[0].id
}

// =========================================================
// 2. Products
// =========================================================
// All prices are stored in paise (1 INR = 100 paise).
const products = [
  {
    name: 'TrishulHub Starter Website',
    slug: 'starter-website',
    description: 'A 5-page marketing website with custom design, CMS for blog, contact form, and SEO setup. Perfect for small businesses launching their online presence.',
    price: 499900, compareAt: 799900,
    sku: 'TH-WEB-001', stock: 999,
    categorySlug: 'web-applications',
    images: ['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format'],
    features: ['5 custom pages', 'CMS for blog', 'Contact form integration', 'Basic SEO setup', 'Mobile responsive', '30 days support'],
    tags: ['website', 'nextjs', 'cms', 'seo'], rating: 4.9, reviewCount: 27, featured: true,
  },
  {
    name: 'TrishulHub Business Web App',
    slug: 'business-web-app',
    description: 'A full-stack web application with authentication, dashboard, role-based access, and database. Built for SaaS, admin panels, and internal tools.',
    price: 1499900, compareAt: 1999900,
    sku: 'TH-WEB-002', stock: 999,
    categorySlug: 'web-applications',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format'],
    features: ['User authentication', 'Admin dashboard', 'Role-based access', 'REST/GraphQL API', 'Database design', '90 days support'],
    tags: ['webapp', 'saas', 'dashboard', 'auth'], rating: 4.8, reviewCount: 18, featured: true,
  },
  {
    name: 'E-commerce Store Package',
    slug: 'ecommerce-store',
    description: 'A complete online store with product catalog, cart, secure checkout (Stripe/Razorpay), order management, and admin panel.',
    price: 1999900, compareAt: 2999900,
    sku: 'TH-ECOM-001', stock: 999,
    categorySlug: 'ecommerce-solutions',
    images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format'],
    features: ['Product catalog', 'Shopping cart', 'Secure checkout (Stripe/Razorpay)', 'Order management', 'Admin panel', 'Inventory tracking', '120 days support'],
    tags: ['ecommerce', 'shopify', 'stripe', 'razorpay'], rating: 4.9, reviewCount: 42, featured: true,
  },
  {
    name: 'Cross-platform Mobile App',
    slug: 'mobile-app-crossplatform',
    description: 'A React Native mobile app for iOS and Android with offline support, push notifications, and backend API.',
    price: 2499900, compareAt: 3499900,
    sku: 'TH-MOB-001', stock: 999,
    categorySlug: 'mobile-apps',
    images: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format'],
    features: ['iOS + Android', 'React Native', 'Offline support', 'Push notifications', 'Backend API', 'App Store submission', '150 days support'],
    tags: ['mobile', 'react-native', 'ios', 'android'], rating: 4.7, reviewCount: 14,
  },
  {
    name: 'Brand Identity Package',
    slug: 'brand-identity',
    description: 'A complete brand identity including logo design, color palette, typography, business cards, and brand guidelines document.',
    price: 799900, compareAt: 1199900,
    sku: 'TH-DES-001', stock: 999,
    categorySlug: 'branding-design',
    images: ['https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&auto=format'],
    features: ['Logo design (3 concepts)', 'Color palette', 'Typography selection', 'Business card design', 'Brand guidelines PDF', 'Source files'],
    tags: ['branding', 'logo', 'design', 'identity'], rating: 5.0, reviewCount: 36, featured: true,
  },
  {
    name: 'Landing Page Design',
    slug: 'landing-page-design',
    description: 'A high-converting single-page landing page with animations, lead capture form, analytics, and A/B test setup.',
    price: 299900, compareAt: 499900,
    sku: 'TH-WEB-003', stock: 999,
    categorySlug: 'web-applications',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format'],
    features: ['Single page design', 'Lead capture form', 'A/B testing setup', 'Analytics integration', 'Mobile responsive', '7 days delivery'],
    tags: ['landing', 'conversion', 'animation'], rating: 4.8, reviewCount: 53,
  },
  {
    name: 'CRM Automation Suite',
    slug: 'crm-automation-suite',
    description: 'A custom CRM with lead pipeline, automated workflows, email sequences, reporting dashboard, and team collaboration features.',
    price: 2999900, compareAt: 3999900,
    sku: 'TH-CRM-001', stock: 999,
    categorySlug: 'web-applications',
    images: ['https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format'],
    features: ['Lead pipeline', 'Automated workflows', 'Email sequences', 'Reporting dashboard', 'Team collaboration', '180 days support'],
    tags: ['crm', 'automation', 'sales', 'pipeline'], rating: 4.6, reviewCount: 9,
  },
  {
    name: 'SaaS Analytics Platform',
    slug: 'saas-analytics-platform',
    description: 'A real-time analytics platform with custom dashboards, event tracking, funnels, cohort analysis, and team permissions.',
    price: 3999900, compareAt: 5999900,
    sku: 'TH-SaaS-001', stock: 999,
    categorySlug: 'web-applications',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format'],
    features: ['Real-time dashboards', 'Event tracking', 'Funnels & cohorts', 'Team permissions', 'API access', '1 year support'],
    tags: ['saas', 'analytics', 'dashboard'], rating: 4.9, reviewCount: 12, featured: true,
  },
]

console.log('\n🛍  Seeding products…')
for (const p of products) {
  const id = cuid('prod_')
  const ok = await insertIgnore(
    `INSERT INTO "Product" (
      id, name, slug, description, price, "compareAt", sku, stock,
      images, features, tags, rating, "reviewCount", featured, active,
      "categoryId", "updatedAt"
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [
      id, p.name, p.slug, p.description, p.price, p.compareAt, p.sku, p.stock,
      JSON.stringify(p.images), JSON.stringify(p.features), JSON.stringify(p.tags),
      p.rating, p.reviewCount, p.featured ? 1 : 0, 1,
      categoryIdBySlug[p.categorySlug],
    ],
  )
  console.log(`  ${ok ? '✓' : '↻'} ${p.name} ${ok ? '' : '(already exists, skipped)'}`)
}

// =========================================================
// 3. Founders — only if table is empty (preserve admin edits)
// =========================================================
const founderCount = await client.execute(`SELECT COUNT(*) as n FROM "Founder"`)
if (Number(founderCount.rows[0].n) > 0) {
  console.log(`\n👥 Founder table already has ${founderCount.rows[0].n} rows — skipping seed.`)
} else {
  console.log('\n👥 Seeding founders (3)…')
  const founders = [
    {
      slug: 'taroon', name: 'Taroon', initial: 'T',
      role: 'CEO & Chief Product Architect', projects: '40+',
      bio: 'Owns company vision, strategy & product roadmap. Architects the TrishulHub dashboard system and holds final authority on tools, tech stack and platform choices. Manages major client relationships & partnerships and holds the override vote on all operational matters.',
      username: 'taroon', password: 'taroon123',
      skills: JSON.stringify([{name:'Product Strategy',level:95},{name:'System Architecture',level:90},{name:'Client Relations',level:92}]),
      education: JSON.stringify([{degree:'B.Tech Computer Science',school:'IIT',year:'2020',description:'Specialized in distributed systems.'}]),
      experience: JSON.stringify([{role:'CEO & Architect',company:'TrishulHub',period:'2020 - Present',description:'Leading product vision and architecture.'}]),
      projectsList: JSON.stringify([{name:'TrishulHub Dashboard',description:'Internal operations dashboard.',link:'#',year:'2024'}]),
    },
    {
      slug: 'akshat', name: 'Akshat', initial: 'A',
      role: 'Head of IT & Development', projects: '45+',
      bio: 'Leads execution of all development work across TrishulHub and client projects. Manages a team of three trainee developers, owns code quality, deployment and technical delivery, and translates architecture into working, shipped features.',
      username: 'akshat', password: 'akshat123',
      skills: JSON.stringify([{name:'React / Next.js',level:95},{name:'Node.js',level:90},{name:'DevOps',level:85}]),
      education: JSON.stringify([{degree:'B.Tech Information Technology',school:'NIT',year:'2021',description:'Full-stack focus.'}]),
      experience: JSON.stringify([{role:'Head of Development',company:'TrishulHub',period:'2021 - Present',description:'Manages dev team and delivery.'}]),
      projectsList: JSON.stringify([{name:'Client SaaS Platform',description:'Full SaaS build with Next.js + Prisma.',link:'#',year:'2024'}]),
    },
    {
      slug: 'pruthvi', name: 'Pruthviraj', initial: 'P',
      role: 'COO & Head of Finance/Admin', projects: '35+',
      bio: 'Oversees finance (invoicing, expenses, profit, tax), HR (onboarding, attendance, payroll), operations (process docs, vendor management) and admin (legal, compliance, contracts). Keeps the company running smoothly behind every project.',
      username: 'pruthvi', password: 'pruthvi123',
      skills: JSON.stringify([{name:'Operations',level:92},{name:'Finance',level:88},{name:'HR & Compliance',level:85}]),
      education: JSON.stringify([{degree:'MBA Finance',school:'IIM',year:'2019',description:'Operations and finance specialization.'}]),
      experience: JSON.stringify([{role:'COO',company:'TrishulHub',period:'2020 - Present',description:'Owns finance, HR, ops, and admin.'}]),
      projectsList: JSON.stringify([{name:'Ops Process Overhaul',description:'Redesigned company operations playbook.',link:'#',year:'2023'}]),
    },
  ]

  for (const f of founders) {
    const id = cuid('fdr_')
    const ok = await insertIgnore(
      `INSERT INTO "Founder" (
        id, slug, name, initial, role, bio, projects,
        skills, education, experience, "projectsList",
        username, password, "updatedAt"
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [id, f.slug, f.name, f.initial, f.role, f.bio, f.projects,
       f.skills, f.education, f.experience, f.projectsList,
       f.username, f.password],
    )
    console.log(`  ${ok ? '✓' : '↻'} ${f.name} (${f.role})`)
  }
}

console.log('\n✔ Seed complete.')
