'use client'

import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type NexusButtonProps = {
  href: string
  children: ReactNode
  className?: string
  fullWidth?: boolean
  showArrow?: boolean
}

/**
 * Primary CTA — Framer-style bottom glow with infinite auto-hover pulse.
 * TrishulHub cyan theme + Space Grotesk. No outer rectangle border frame.
 */
export function NexusButton({
  href,
  children,
  className = '',
  fullWidth = false,
  showArrow = true,
}: NexusButtonProps) {
  const shellStyle: CSSProperties = fullWidth
    ? { display: 'block', width: '100%' }
    : { display: 'inline-flex' }

  return (
    <div className={`relative ${className}`} style={shellStyle}>
      <Link
        href={href}
        className={`th-glow-btn group relative flex h-[50px] min-w-[180px] cursor-pointer items-center justify-center px-6 outline-none transition-transform active:scale-95 ${
          fullWidth ? 'w-full' : 'w-auto'
        }`}
        style={{
          backgroundColor: 'rgba(0, 222, 255, 0.06)',
          borderRadius: 8,
          border: 'none',
        }}
      >
        {/* Glow idle / hover (auto pulse + real hover) */}
        <div
          aria-hidden
          className="th-glow-idle pointer-events-none absolute inset-0 rounded-lg"
          style={{
            background:
              'radial-gradient(15% 50% at 50% 100%, rgba(0,222,255,0.95) 0%, rgba(0,222,255,0) 100%)',
            filter: 'blur(15px)',
          }}
        />
        <div
          aria-hidden
          className="th-glow-on pointer-events-none absolute inset-0 rounded-lg"
          style={{
            background:
              'radial-gradient(60.6% 50% at 50% 100%, rgba(0,222,255,1) 0%, rgba(0,222,255,0) 100%)',
            filter: 'blur(18px)',
          }}
        />

        {/* Stroke idle / hover */}
        <div
          aria-hidden
          className="th-glow-idle pointer-events-none absolute inset-0 rounded-lg"
          style={{
            background:
              'radial-gradient(10.7% 50% at 50% 100%, rgba(0,222,255,0.9) 0%, rgba(0,222,255,0) 100%)',
          }}
        />
        <div
          aria-hidden
          className="th-glow-on pointer-events-none absolute inset-0 rounded-lg"
          style={{
            background:
              'radial-gradient(60.1% 50% at 50% 100%, rgba(0,222,255,1) 0%, rgba(0,222,255,0) 100%)',
          }}
        />

        {/* Fill */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[1px] z-10 rounded-[7px] bg-[#050505]"
        />

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center gap-2">
          <span
            className="m-0 p-0 font-display text-[15px] font-medium tracking-wide text-white"
            style={{
              WebkitFontSmoothing: 'antialiased',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {children}
          </span>
          {showArrow ? (
            <ArrowRight size={16} className="th-glow-arrow text-[#00DEFF]" />
          ) : null}
        </div>
      </Link>
    </div>
  )
}
