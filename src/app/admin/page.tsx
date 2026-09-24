import { getCurrentFounder } from '@/lib/auth'
import { AdminDashboardClient } from './dashboard-client'
import { LoginClient } from './login/login-client'

export const dynamic = 'force-dynamic'

/** Internal screens must never appear in search results. */
export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, nocache: true },
}

export default async function AdminPage() {
  const founder = await getCurrentFounder()

  // Not signed in → portfolio login at /admin (trishulhub.com/admin)
  if (!founder) {
    return <LoginClient />
  }

  const safeFounder = {
    id: founder.id,
    slug: founder.slug,
    name: founder.name,
    initial: founder.initial,
    role: founder.role,
    bio: founder.bio,
    image: founder.image,
    image2: founder.image2,
    linkedin: founder.linkedin,
    whatsapp: founder.whatsapp,
    instagram: founder.instagram,
    email: founder.email,
    username: founder.username,
  }

  return <AdminDashboardClient founder={safeFounder} />
}
