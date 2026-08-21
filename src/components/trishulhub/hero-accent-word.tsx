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
    <span
      className={`inline-block min-w-[0.55em] border-r-4 border-[#0D3C1F] pr-1 font-playfair italic normal-case text-[#0D3C1F] animate-blink ${className}`}
      aria-live="polite"
      aria-label={full}
    >
      {shown || '\u00A0'}
    </span>
  )
}
