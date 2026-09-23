'use client'

import { useEffect, useMemo, useState } from 'react'

type HeroAccentWordProps = {
  /** Single phrase, or a list that cycles with a typewriter write/delete loop */
  words: string | readonly string[]
  className?: string
  /**
   * When false, render the full Playfair italic accent immediately
   * (same two-font look, no typing or blink cursor).
   * @default true
   */
  animate?: boolean
}

/**
 * Green Playfair accent — typewriter + blink when animate, or static otherwise
 * (same visual language as the home hero).
 */
export function HeroAccentWord({
  words,
  className = '',
  animate = true,
}: HeroAccentWordProps) {
  const list = useMemo(
    () => (Array.isArray(words) ? [...words] : [words]).filter(Boolean),
    // Serialize so parent inline arrays/strings stay stable when content is equal
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Array.isArray(words) ? words.join('\0') : words],
  )

  const fullStatic = list[0] ?? ''

  const [index, setIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing')

  const full = list[index] ?? ''
  const shown = full.slice(0, charCount)
  /**
   * Reserve the width of the longest phrase so the typing loop can never
   * reflow the surrounding heading. Without this, every typed/deleted
   * character changed the heading's height and pushed the rest of the page up
   * and down while the visitor was reading it.
   */
  const spacer = list.reduce(
    (longest, candidate) =>
      candidate.length > longest.length ? candidate : longest,
    '',
  )

  useEffect(() => {
    if (!animate || !full) return

    if (phase === 'holding') {
      const id = window.setTimeout(() => setPhase('deleting'), 1600)
      return () => window.clearTimeout(id)
    }

    if (phase === 'typing') {
      if (charCount >= full.length) {
        setPhase('holding')
        return
      }
      const id = window.setTimeout(() => setCharCount((n) => n + 1), 70)
      return () => window.clearTimeout(id)
    }

    // deleting
    if (charCount <= 0) {
      const id = window.setTimeout(() => {
        setIndex((i) => (i + 1) % list.length)
        setCharCount(0)
        setPhase('typing')
      }, 240)
      return () => window.clearTimeout(id)
    }
    const id = window.setTimeout(() => setCharCount((n) => n - 1), 38)
    return () => window.clearTimeout(id)
  }, [animate, phase, charCount, full, list.length])

  if (!animate) {
    return (
      <span
        className={`font-playfair italic normal-case text-[#0D3C1F] ${className}`}
      >
        {fullStatic}
      </span>
    )
  }

  return (
    /*
     * Both copies sit in the SAME grid cell: the invisible spacer sets the
     * width (so typing cannot reflow the heading) and the visible copy draws
     * on top of it. Grid gives the cell the taller of the two line boxes and
     * sizes the parent, which is why this cannot overlap neighbouring text the
     * way an absolutely-positioned overlay could.
     */
    <span
      className={`inline-grid font-playfair italic normal-case text-[#0D3C1F] ${className}`}
    >
      <span aria-hidden className="invisible whitespace-nowrap" style={{ gridArea: '1 / 1' }}>
        {spacer}
      </span>
      <span
        className="whitespace-nowrap border-r-4 border-[#0D3C1F] pr-1 animate-blink"
        style={{ gridArea: '1 / 1' }}
        aria-live="polite"
        aria-label={full}
      >
        {shown || '\u00A0'}
      </span>
    </span>
  )
}
