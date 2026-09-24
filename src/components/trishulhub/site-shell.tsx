'use client'

import { Navbar } from '@/components/trishulhub/navbar'
import { Footer } from '@/components/trishulhub/footer'
import { CookieConsent } from '@/components/trishulhub/cookie-consent'
import { SmoothScrollProvider } from '@/components/trishulhub/smooth-scroll-provider'
import { SiteContactProvider } from '@/components/trishulhub/site-contact-provider'
import type { SiteContact } from '@/lib/site-contact'

export function SiteShell({
  children,
  initialContact,
}: {
  children: React.ReactNode
  /**
   * Kept for API compatibility. The WebGL launch screen pulled GSAP (~43KB)
   * and a full-screen shader into every page load, so it is no longer wired
   * in. `src/components/trishulhub/loading-screen.tsx` is still available if
   * the launch gate is ever wanted again — import it dynamically at that point.
   */
  showLoader?: boolean
  initialContact?: Partial<SiteContact> | null
}) {
  return (
    <SmoothScrollProvider>
      <SiteContactProvider initial={initialContact}>
        <div className="relative flex min-h-screen flex-col bg-[#fafafa]">
          <Navbar />
          <main className="relative z-10 flex min-h-screen flex-1 flex-col">
            {children}
          </main>
          <Footer />
          {/* Cookie / device-storage notice + preference centre (PECR). */}
          <CookieConsent />
        </div>
      </SiteContactProvider>
    </SmoothScrollProvider>
  )
}
