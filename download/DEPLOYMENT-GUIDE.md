# TrishulHub Main Site — Deployment Guide

## ✅ What's Already Done

| Step | Status |
| --- | --- |
| Code pushed to GitHub | ✅ https://github.com/trishulhub-svg/trishulhub-main-site |
| Turso DB schema created (9 tables) | ✅ User, Founder, Category, Product, Cart, CartItem, Order, OrderItem, Post |
| Sample data seeded on Turso | ✅ 4 categories, 8 products, 3 founders |
| vercel.json configured for auto-deploy | ✅ |
| Build verified locally | ✅ `npm run build` passes |
| Home page + founder detail pages tested | ✅ |

## 🚀 Final Step — Vercel Deployment

I couldn't complete this step automatically because no Vercel auth token was provided. Here's how to finish in 3 minutes:

### Option A — Dashboard (Recommended, 3 minutes)

1. Go to **https://vercel.com/new**
2. Sign in with GitHub (use the `trishulhub-svg` account)
3. Click **Import Git Repository** → select `trishulhub-svg/trishulhub-main-site`
4. Vercel auto-detects Next.js — leave defaults
5. **CRITICAL — Add Environment Variables** before clicking Deploy:

   | Name | Value |
   | --- | --- |
   | `DATABASE_URL` | `file:placeholder.db` |
   | `TURSO_DATABASE_URL` | `libsql://trishulhub-main-site-trishulhub-svg.aws-eu-west-1.turso.io` |
   | `TURSO_AUTH_TOKEN` | (the Turso token — keep it secret!) |
   | `DATABASE_AUTH_TOKEN` | (same Turso token — backwards-compat alias) |

6. Click **Deploy** — first build takes ~2 minutes
7. **Auto-deployment is now enabled** — every `git push` to `main` triggers a new deployment

### Option B — Vercel CLI (if you have a Vercel token)

```bash
# Set your Vercel token (get one at https://vercel.com/account/tokens)
export VERCEL_TOKEN="your_vercel_token_here"

# Clone the repo locally (or use the existing one)
git clone https://github.com/trishulhub-svg/trishulhub-main-site.git
cd trishulhub-main-site

# Link to Vercel project (creates one if it doesn't exist)
vercel link --yes --token=$VERCEL_TOKEN

# Set env vars
vercel env add DATABASE_URL production preview development --token=$VERCEL_TOKEN <<< "file:placeholder.db"
vercel env add TURSO_DATABASE_URL production preview development --token=$VERCEL_TOKEN <<< "libsql://trishulhub-main-site-trishulhub-svg.aws-eu-west-1.turso.io"
vercel env add TURSO_AUTH_TOKEN production preview development --token=$VERCEL_TOKEN <<< "YOUR_TURSO_TOKEN_HERE"

# Deploy to production
vercel --prod --token=$VERCEL_TOKEN
```

## 🌐 After Deployment

Once deployed, your live URL will look like:
```
https://trishulhub-main-site.vercel.app
```
(or a custom name you chose during import)

You can also add a custom domain in **Vercel → Project → Settings → Domains**.

## 🔍 Verifying the Deployment

After the first deployment finishes:

1. Visit the live URL — homepage should load with:
   - Hero section with animations
   - Tech stack carousel
   - Services cards
   - Portfolio grid
   - Team section showing **3 founders** (Taroon, Akshat, Pruthviraj) in a single row
   - CTA section
2. Click any founder card → their portfolio detail page should load
3. Visit `/admin/login` → admin login form (use `taroon` / `taroon123` to test)

## 🗄️ Database Management

The Turso DB is already set up with the schema and sample data. To manage it:

- **Web console**: https://turso.tech → sign in → select `trishulhub-main-site`
- **CLI**: `turso db shell trishulhub-main-site`
- **Re-run migrations**: `node scripts/turso-migrate.mjs`
- **Re-seed**: `node scripts/turso-seed.mjs`
- **Verify data**: `node scripts/turso-verify.mjs`

## 🛠️ Local Development

```bash
git clone https://github.com/trishulhub-svg/trishulhub-main-site.git
cd trishulhub-main-site
npm install

# Copy .env.example to .env and fill in Turso credentials
cp .env.example .env
# Edit .env — set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN

npm run dev
```

## 📦 Tech Stack

- Next.js 16 (App Router, RSC, standalone output)
- React 19 + Tailwind CSS 4 + Radix UI + shadcn/ui
- Framer Motion 12 + Lenis smooth scroll
- Prisma 6 + @prisma/adapter-libsql + Turso (libsql)
- TypeScript 5

## 🆘 Troubleshooting

**Build fails with `URL_INVALID: The URL 'undefined'`**:
→ Make sure you set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in Vercel env vars (not just `DATABASE_URL`).

**Homepage shows fallback founders (Kiran appears)**:
→ Turso DB is empty. Run `node scripts/turso-seed.mjs` locally to seed it.

**Founder detail page returns 404**:
→ Make sure the founder slug exists in the DB. Check with `node scripts/turso-verify.mjs`.

**Want to add Kiran back?**:
→ Insert a row in the `Founder` table with `slug='kiran'`. The fallback data in `page.tsx` is only used when the DB is empty.
