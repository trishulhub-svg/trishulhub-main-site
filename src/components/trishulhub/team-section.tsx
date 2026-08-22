'use client'

import { useEffect, useState } from 'react'
import { Team } from '@/components/trishulhub/team'

type FounderCard = {
  slug: string
  initial: string
  name: string
  role: string
  projects: string
  bio: string
  image: string | null
  email: string | null
  linkedin: string | null
  whatsapp: string | null
  instagram: string | null
}

/**
 * Loads founders client-side so /about HTML stays small and navigates instantly
 * (server-rendered pages used to embed huge base64 portrait data URLs).
 */
export function TeamSection() {
  const [founders, setFounders] = useState<FounderCard[] | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/founders')
        const data = await res.json()
        if (cancelled) return
        if (res.ok && data?.ok && Array.isArray(data.founders)) {
          setFounders(data.founders)
        } else {
          setFounders([])
        }
      } catch {
        if (!cancelled) setFounders([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (founders === null) {
    return (
      <section
        id="founders"
        className="relative overflow-hidden bg-[#fafafa] px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
        aria-busy="true"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-[#6b7280]">Our founders</p>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-xl border border-[#111111]/10 bg-white"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (founders.length === 0) return null

  return <Team founders={founders} />
}
