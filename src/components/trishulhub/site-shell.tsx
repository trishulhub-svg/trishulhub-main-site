'use client'

import { LoadingScreen } from '@/components/trishulhub/loading-screen'
import { Navbar } from '@/components/trishulhub/navbar'
import { Footer } from '@/components/trishulhub/footer'
import { SmoothScrollProvider } from '@/components/trishulhub/smooth-scroll-provider'

export function SiteShell({
  children,
  showLoader = false,
}: {
  children: React.ReactNode
  showLoader?: boolean
}) {
  return (
    <SmoothScrollProvider>
      <div className="relative flex min-h-screen flex-col bg-[#050505]">
        {showLoader ? <LoadingScreen /> : null}
        <Navbar />
        <main className="relative z-10 flex min-h-screen flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
