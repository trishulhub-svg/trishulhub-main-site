import { redirect } from 'next/navigation'
import { getCurrentFounder } from '@/lib/auth'
import { AdminDashboardClient } from './dashboard-client'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const founder = await getCurrentFounder()
  if (!founder) {
    redirect('/admin/login')
  }

  // Pass safe subset to client
  const safeFounder = {
    id: founder.id,
    slug: founder.slug,
    name: founder.name,
    initial: founder.initial,
    role: founder.role,
    bio: founder.bio,
    projects: founder.projects,
    image: founder.image,
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
