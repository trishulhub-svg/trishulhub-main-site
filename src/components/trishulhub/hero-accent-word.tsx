'use client'

import { useEffect, useMemo, useState } from 'react'

type HeroAccentWordProps = {
  /** Single phrase, or a list that cycles with a typewriter write/delete loop */
  words: string | readonly string[]
  className?: string
}

/**
 * Green Playfair accent with a typewriter write-in animation and blink cursor
 * (same visual language as the home hero).
 */
export function HeroAccentWord({ words, className = '' }: HeroAccentWordProps) {
  const list = useMemo(
    () => (Array.isArray(words) ? [...words] : [words]).filter(Boolean),
    // Serialize so parent inline arrays/strings stay stable when content is equal
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Array.isArray(words) ? words.join('\0') : words],
  )

  const [index, setIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing')

  const full = list[index] ?? ''
  const shown = full.slice(0, charCount)

  useEffect(() => {
    if (!full) return

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
  }, [phase, charCount, full, list.length])

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
