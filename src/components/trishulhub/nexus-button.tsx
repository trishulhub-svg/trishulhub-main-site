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
  variant?: 'primary' | 'secondary'
}

/** Lawtrades primary/secondary buttons — 48px, 8px radius */
export function NexusButton({
  href,
  onClick,
  children,
  className = '',
  fullWidth = false,
  showArrow = false,
  external,
  type = 'button',
  variant = 'primary',
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

  const base =
    'group relative inline-flex h-12 items-center justify-center gap-2 rounded-lg px-7 text-[15px] font-medium outline-none transition-all duration-200 active:scale-[0.98]'
  const primary =
    'bg-[#0D3C1F] text-white hover:scale-[1.02] hover:bg-[#164a28] hover:shadow-[0_8px_24px_rgba(13,60,31,0.2)]'
  const secondary =
    'border border-[#0D3C1F] bg-white text-[#0D3C1F] hover:scale-[1.02] hover:shadow-[0_2px_8px_rgba(13,60,31,0.08)]'

  const classNames = `${base} ${variant === 'secondary' ? secondary : primary} ${
    fullWidth ? 'w-full' : ''
  } ${className}`

  const inner = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  )

  return (
    <div className="relative" style={shellStyle}>
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
