'use client'

import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type NexusButtonProps = {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  fullWidth?: boolean
  showArrow?: boolean
  external?: boolean
  type?: 'button' | 'submit'
}

/** Primary CTA — clean filled button for the light theme. */
export function NexusButton({
  href,
  onClick,
  children,
  className = '',
  fullWidth = false,
  showArrow = true,
  external,
  type = 'button',
}: NexusButtonProps) {
  const shellStyle: CSSProperties = fullWidth
    ? { display: 'block', width: '100%' }
    : { display: 'inline-flex' }

  const isExternal =
    external ??
    (!!href &&
      (href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('https://wa.me')))

  const classNames = `btn-cyan btn-shine group relative flex h-[50px] min-w-[180px] cursor-pointer items-center justify-center rounded-lg px-6 text-sm font-semibold outline-none transition-transform active:scale-[0.98] ${
    fullWidth ? 'w-full' : 'w-auto'
  }`

  const inner = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      <span className="font-display text-[15px] font-medium tracking-wide">
        {children}
      </span>
      {showArrow ? (
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      ) : null}
    </span>
  )

  return (
    <div className={`relative ${className}`} style={shellStyle}>
      {!href ? (
        <button type={type} onClick={onClick} className={classNames}>
          {inner}
        </button>
      ) : isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames}
        >
          {inner}
        </a>
      ) : (
        <Link href={href} className={classNames}>
          {inner}
        </Link>
      )}
    </div>
  )
}
