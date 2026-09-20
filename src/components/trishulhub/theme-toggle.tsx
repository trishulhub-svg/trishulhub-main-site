'use client'

import { useCallback, useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const STORAGE_KEY = 'trishulhub-theme'

/**
 * Light / dark switch.
 *
 * The icon is chosen by CSS off `html.dark`, so the server and client render
 * byte-identical markup — no hydration risk, and the right icon is already
 * showing before React runs (the pre-paint script in the layout sets the class).
 * State here only exists to keep `aria-pressed` honest after mount.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = useCallback(() => {
    const root = document.documentElement
    const next = !root.classList.contains('dark')
    root.classList.toggle('dark', next)
    root.style.colorScheme = next ? 'dark' : 'light'
    setDark(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      /* private mode / storage blocked */
    }
  }, [])

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#111111]/15 text-[#6b7280] transition hover:border-[#0D3C1F]/40 hover:text-[#0D3C1F] ${className}`}
    >
      {/* Both icons are always rendered; CSS shows the right one for the theme. */}
      <Sun
        aria-hidden
        size={17}
        className="hidden transition-transform duration-300 group-hover:rotate-12 dark:block"
      />
      <Moon
        aria-hidden
        size={17}
        className="block transition-transform duration-300 group-hover:-rotate-12 dark:hidden"
      />
    </button>
  )
}
