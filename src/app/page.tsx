import { LoadingScreen } from '@/components/trishulhub/loading-screen'
import { Navbar } from '@/components/trishulhub/navbar'
import { Hero } from '@/components/trishulhub/hero'
import { StatsDashboard } from '@/components/trishulhub/stats-dashboard'
import { TechStack } from '@/components/trishulhub/tech-stack'
import { Services } from '@/components/trishulhub/services'
import { Portfolio } from '@/components/trishulhub/portfolio'
import { Team } from '@/components/trishulhub/team'
import { CTA } from '@/components/trishulhub/cta'
import { Footer } from '@/components/trishulhub/footer'
import { SmoothScrollProvider } from '@/components/trishulhub/smooth-scroll-provider'
import { db } from '@/lib/db'

// Render at request time so we don't try to hit Turso during build.
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch founders from DB so admin edits reflect here too
  const founders = await db.founder.findMany({
    select: {
      slug: true,
      initial: true,
      name: true,
      role: true,
      projects: true,
      bio: true,
      image: true,
      videoUrl: true,
    },
    orderBy: { createdAt: 'asc' },
  })

  // Fallback if DB is empty — 3 founders (Kiran removed)
  const foundersData = founders.length > 0 ? founders : [
    { slug: 'taroon', initial: 'T', name: 'Taroon', role: 'CEO & Chief Product Architect', projects: '40+', bio: 'Owns company vision, strategy & product roadmap. Architects the TrishulHub dashboard system and holds final authority on tools, tech stack and platform choices. Manages major client relationships & partnerships and holds the override vote on all operational matters.', image: null, videoUrl: null },
    { slug: 'akshat', initial: 'A', name: 'Akshat', role: 'Head of IT & Development', projects: '45+', bio: 'Leads execution of all development work across TrishulHub and client projects. Manages a team of three trainee developers, owns code quality, deployment and technical delivery, and translates architecture into working, shipped features.', image: null, videoUrl: null },
    { slug: 'pruthvi', initial: 'P', name: 'Pruthviraj', role: 'COO & Head of Finance/Admin', projects: '35+', bio: 'Oversees finance (invoicing, expenses, profit, tax), HR (onboarding, attendance, payroll), operations (process docs, vendor management) and admin (legal, compliance, contracts). Keeps the company running smoothly behind every project.', image: null, videoUrl: null },
  ]

  return (
    <SmoothScrollProvider>
      <div className="relative flex min-h-screen flex-col bg-[#0A0A0A]">
        <LoadingScreen />
        <Navbar />
        <main className="relative z-10 flex-1">
          <Hero />
          <StatsDashboard />
          <TechStack />
          <Services />
          <Portfolio />
          <Team founders={foundersData} />
          <CTA />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
