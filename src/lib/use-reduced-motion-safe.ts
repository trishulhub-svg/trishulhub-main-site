'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * SSR-safe "prefers reduced motion" flag.
 *
 * framer-motion's `useReducedMotion()` resolves during render — `null` on the
 * server, a boolean on the client. Any markup that branches on it therefore
 * hydrates differently for users with reduce-motion enabled, which React
 * reports as error #418 and then throws the whole tree away and re-renders it
 * on the client.
 *
 * This hook returns `false` on the server AND on the first client render, so
 * hydration always matches, then flips to the real value in an effect. Users
 * who prefer reduced motion still get the static version — just one paint later
 * instead of via a hydration failure.
 */
export function useReducedMotionSafe(): boolean {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && prefersReducedMotion === true
}
