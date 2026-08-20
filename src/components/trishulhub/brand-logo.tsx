'use client'

import Image from 'next/image'
import Link from 'next/link'

type BrandLogoProps = {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  className?: string
  variant?: 'default' | 'onDark'
}

const sizes = {
  sm: { box: 36, img: 32 },
  md: { box: 44, img: 40 },
  lg: { box: 56, img: 50 },
}

export function BrandLogo({
  href = '/',
  size = 'md',
  showWordmark = true,
  className = '',
  variant = 'default',
}: BrandLogoProps) {
  const s = sizes[size]
  const onDark = variant === 'onDark'

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="TrishulHub home"
    >
      <span
        className="relative flex shrink-0 items-center justify-center overflow-visible"
        style={{ width: s.box, height: s.box }}
      >
        <Image
          src="/images/trishulhub-logo.png"
          alt="TrishulHub logo"
          width={s.img}
          height={s.img}
          className="object-contain"
          priority
        />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-medium tracking-[-0.01em] sm:text-xl">
          <span className={onDark ? 'text-white' : 'text-foreground'}>Trishul</span>
          <span className={onDark ? 'text-teal-300' : 'gradient-text'}>Hub</span>
        </span>
      )}
    </Link>
  )
}
