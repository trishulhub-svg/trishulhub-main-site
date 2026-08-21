import { getCurrentFounder } from '@/lib/auth'
import { AdminDashboardClient } from './dashboard-client'
import { LoginClient } from './login/login-client'

export const dynamic = 'force-dynamic'

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
    projects: founder.projects,
    image: founder.image,
    image2: founder.image2,
    videoUrl: founder.videoUrl,
    dateOfBirth: founder.dateOfBirth,
    address: founder.address,
    zipCode: founder.zipCode,
    email: founder.email,
    phone: founder.phone,
    origin: founder.origin,
    github: founder.github,
    linkedin: founder.linkedin,
    twitter: founder.twitter,
    website: founder.website,
    skills: JSON.parse(founder.skills),
    education: JSON.parse(founder.education),
    experience: JSON.parse(founder.experience),
    projectsList: JSON.parse(founder.projectsList),
    username: founder.username,
  }

  return <AdminDashboardClient founder={safeFounder} />
}
