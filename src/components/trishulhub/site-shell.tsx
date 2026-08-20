'use client'

import { LoadingScreen } from '@/components/trishulhub/loading-screen'
import { Navbar } from '@/components/trishulhub/navbar'
import { Footer } from '@/components/trishulhub/footer'
import { SmoothScrollProvider } from '@/components/trishulhub/smooth-scroll-provider'
import { SiteContactProvider } from '@/components/trishulhub/site-contact-provider'
import type { SiteContact } from '@/lib/site-contact'

export function SiteShell({
  children,
  showLoader = false,
  initialContact,
}: {
  children: React.ReactNode
  showLoader?: boolean
  initialContact?: Partial<SiteContact> | null
}) {
  return (
    <SmoothScrollProvider>
      <SiteContactProvider initial={initialContact}>
        <div className="relative flex min-h-screen flex-col bg-[#f9f9f9]">
          {showLoader ? <LoadingScreen /> : null}
          <Navbar />
          <main className="relative z-10 flex min-h-screen flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </SiteContactProvider>
    </SmoothScrollProvider>
  )
}
