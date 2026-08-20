'use client'

import { useEffect, useState } from 'react'

type HeroAccentWordProps = {
  /** Single phrase, or a list that cycles like the home hero */
  words: string | readonly string[]
  className?: string
}

/**
 * Green Playfair accent with the same fade come-and-go rhythm as the home hero.
 */
export function HeroAccentWord({ words, className = '' }: HeroAccentWordProps) {
  const list = (Array.isArray(words) ? words : [words]).filter(Boolean)
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    if (list.length === 0) return
    const id = window.setInterval(() => {
      setFade(false)
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % list.length)
        setFade(true)
      }, 220)
    }, 2200)
    return () => window.clearInterval(id)
  }, [list.length])

  const word = list[index] ?? list[0] ?? ''

  return (
    <span
      className={`inline-block border-r-4 border-[#0D3C1F] pr-1 font-playfair italic normal-case text-[#0D3C1F] animate-blink transition-opacity duration-200 ${className}`}
      style={{ opacity: fade ? 1 : 0 }}
      aria-live="polite"
    >
      {word}
    </span>
  )
}
