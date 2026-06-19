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

  // Fallback if DB is empty
  const foundersData = founders.length > 0 ? founders : [
    { slug: 'kiran', initial: 'K', name: 'Kiran', role: 'Fullstack Developer', projects: '50+', bio: 'Fullstack developer with expertise in React, Node.js, and modern web technologies.', image: null, videoUrl: null },
    { slug: 'taroon', initial: 'T', name: 'Taroon', role: 'CEO & Co-Founder', projects: '40+', bio: 'Visionary leader driving TrishulHub\'s strategic growth.', image: null, videoUrl: null },
    { slug: 'akshat', initial: 'A', name: 'Akshat', role: 'Fullstack Developer & SMM Lead', projects: '45+', bio: 'Bridging development and marketing with expertise in React, SEO, and social media.', image: null, videoUrl: null },
    { slug: 'pruthvi', initial: 'P', name: 'Pruthvi', role: 'Management & Operations Head', projects: '35+', bio: 'Operations expert ensuring smooth project delivery.', image: null, videoUrl: null },
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
