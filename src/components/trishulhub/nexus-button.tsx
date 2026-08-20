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

/** Lawtrades-style primary CTA — solid black pill */
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

  const classNames = `group relative flex h-[52px] min-w-[160px] cursor-pointer items-center justify-center rounded-full bg-[#111111] px-7 text-sm font-semibold text-white outline-none transition hover:bg-black active:scale-[0.98] ${
    fullWidth ? 'w-full' : 'w-auto'
  }`

  const inner = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
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
