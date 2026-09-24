'use client'

import { useEffect, useState } from 'react'
import { Team } from '@/components/trishulhub/team'

type FounderCard = {
  slug: string
  initial: string
  name: string
  role: string
  bio: string
  image: string | null
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
        <div className="relative z-10 mx-auto max-w-4xl">
          {/*
            This mirrors <Team /> exactly — same container width, same heading
            block, same grid, same card structure — so when the live data
            arrives nothing moves. The mismatch here was the source of the
            0.06 CLS on /about.
          */}
          <div className="mb-14 text-center">
            <p className="mb-4 text-sm font-medium text-[#6b7280]">
              Our founders
            </p>
            <h2 className="text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl lg:text-5xl">
              Meet our{' '}
              <span className="font-playfair italic normal-case text-[#0D3C1F]">
                founders
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6b7280] sm:text-lg">
              Meet Taroon and Pruthviraj — the people behind TrishulHub.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-xl border border-[#111111] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="aspect-square w-full animate-pulse bg-gradient-to-br from-[#e8f5ef] to-[#fafafa]" />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="h-6 w-32 animate-pulse rounded bg-[#f3f4f6]" />
                  <div className="h-4 w-44 animate-pulse rounded bg-[#f3f4f6]" />
                  <div className="mt-1 h-3 w-full animate-pulse rounded bg-[#f3f4f6]" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-[#f3f4f6]" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <span className="inline-block h-12 w-36 animate-pulse rounded-full bg-[#f3f4f6]" />
          </div>
        </div>
      </section>
    )
  }

  if (founders.length === 0) return null

  return <Team founders={founders} />
}
