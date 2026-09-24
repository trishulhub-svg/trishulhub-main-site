'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

/**
 * Mounts the chat widget only once the browser is idle.
 *
 * The widget (≈72KB of JS) was part of the initial bundle because layout.tsx
 * imported it directly, so every visitor downloaded it before the page was
 * interactive — for a floating button most people never press. Importing it
 * after idle keeps it off the critical path entirely; the button still appears
 * well before anyone has finished reading the hero.
 */
const ChatWidget = dynamic(
  () => import('@/components/trishulhub/chat-widget').then((m) => m.ChatWidget),
  { ssr: false, loading: () => null },
)

export function ChatWidgetLazy() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(() => setReady(true), 1200)
    return () => window.clearTimeout(t)
  }, [])

  return ready ? <ChatWidget /> : null
}
