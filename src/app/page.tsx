'use client'

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

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#0A0A0A]">
      <LoadingScreen />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsDashboard />
        <TechStack />
        <Services />
        <Portfolio />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
