'use client'

import { useEffect, useState } from 'react'

const SPLINE_SCENE =
  'https://my.spline.design/reactiveorb-s0GzgSco0uSVSXvwMHuJvPQs/'

/**
 * Fixed Spline orb — deferred until after first paint / idle so scroll
 * stays smooth on load. Opacity kept readable without crushing text.
 */
export function SplineBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const enable = () => {
      if (!cancelled) setReady(true)
    }

    // Prefer idle time; fall back to a short delay so LCP isn't blocked.
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(enable, { timeout: 1800 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }

    const t = window.setTimeout(enable, 900)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]"
    >
      {ready ? (
        <iframe
          src={SPLINE_SCENE}
          title="TrishulHub reactive orb background"
          frameBorder={0}
          width="100%"
          height="100%"
          className="h-full w-full scale-110 border-0 opacity-[0.38] [contain:strict]"
          loading="lazy"
          allow="autoplay"
        />
      ) : (
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,222,255,0.12),transparent_55%)]" />
      )}
      <div className="absolute inset-0 bg-[#050505]/30" />
    </div>
  )
}
