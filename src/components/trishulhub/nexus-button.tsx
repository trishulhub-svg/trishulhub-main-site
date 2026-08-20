'use client'

import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

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

/** Primary CTA — soft atelier pill with refined motion. */
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

  const classNames = `btn-cyan group relative flex h-[52px] min-w-[176px] cursor-pointer items-center justify-center rounded-full px-7 text-sm font-semibold outline-none transition-transform active:scale-[0.98] ${
    fullWidth ? 'w-full' : 'w-auto'
  }`

  const inner = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      <span className="font-sans text-[15px] font-semibold tracking-wide">
        {children}
      </span>
      {showArrow ? (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
