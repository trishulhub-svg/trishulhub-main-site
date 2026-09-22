'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

/**
 * Agentation — visual feedback toolbar (https://agentation.com).
 *
 * You click an element on the page, write a note, then copy the structured
 * markdown and paste it to the coding agent. It reports the element, its CSS
 * classes and the file/line it came from, so "the button in the hero" becomes
 * something the agent can grep for.
 *
 * How to turn it on (one time, any browser):
 *   1. Open https://trishulhub.com/?agent=1
 *   2. That is it — the choice is remembered in localStorage, so the toolbar
 *      now loads on every page of the site in this browser.
 *   To switch it off: open https://trishulhub.com/?agent=0
 *
 * Why it is not simply "always on":
 *   - It is a tool for us, not for your customers, so visitors should never
 *     load a 650KB annotation bundle they will not use.
 *   - So it only loads for a browser that has explicitly opted in, and only
 *     after the page goes idle so it cannot affect LCP.
 *
 * It works on phones too (the owner annotates from mobile) — the vendor's docs
 * say "desktop only", but in practice the toolbar covers touch fine; the one
 * rough edge is the settings panel being wider than a small viewport, which
 * `globals.css` caps with a `max-width` nudge.
 */

const STORAGE_KEY = 'trishulhub:agentation'

const Agentation = dynamic(
  () => import('agentation').then((mod) => mod.Agentation),
  { ssr: false, loading: () => null },
)

export function AgentationLive() {
  const [enabled, setEnabled] = useState(false)
  const [idle, setIdle] = useState(false)

  /* 1. `?agent=1` turns it on and remembers; `?agent=0` forgets. */
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      const flag =
        url.searchParams.get('agent') ?? (url.hash === '#agent' ? '1' : null)
      if (flag === '1') localStorage.setItem(STORAGE_KEY, '1')
      else if (flag === '0') localStorage.removeItem(STORAGE_KEY)
      setEnabled(localStorage.getItem(STORAGE_KEY) === '1')
    } catch {
      setEnabled(false)
    }
  }, [])

  /* 2. Stay out of the way of first paint / Core Web Vitals. */
  useEffect(() => {
    if (!enabled) return
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
    }
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(() => setIdle(true))
      : window.setTimeout(() => setIdle(true), 1200)
    return () => window.clearTimeout(id)
  }, [enabled])

  /* 3. Flag the document so the chat button can step out of the same corner. */
  useEffect(() => {
    const on = enabled && idle
    document.documentElement.classList.toggle('agent-on', on)
    return () => document.documentElement.classList.remove('agent-on')
  }, [enabled, idle])

  if (!enabled || !idle) return null

  return (
    <Agentation
      // Agent Sync (real-time MCP) needs a local server; leave unset so the
      // toolbar copies to the clipboard instead.
      // endpoint="http://localhost:4747"
      onSessionCreated={(sessionId) =>
        console.info('[agentation] session', sessionId)
      }
    />
  )
}
