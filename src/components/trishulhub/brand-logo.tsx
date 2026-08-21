'use client'

import Image from 'next/image'
import Link from 'next/link'

type BrandLogoProps = {
  href?: string
  size?: 'sm' | 'md' | 'mdPlus' | 'lg' | 'xl'
  showWordmark?: boolean
  className?: string
  variant?: 'default' | 'onDark'
}

const sizes = {
  sm: { box: 28, img: 24, text: 'text-sm sm:text-base' },
  md: { box: 32, img: 28, text: 'text-sm sm:text-base md:text-lg' },
  /** ~20% larger than md — used for mobile navbar icon */
  mdPlus: { box: 38, img: 34, text: 'text-base' },
  lg: { box: 40, img: 36, text: 'text-lg sm:text-xl' },
  xl: { box: 56, img: 50, text: 'text-2xl sm:text-3xl' },
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
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="TrishulHub home"
    >
      <span
        className="relative flex shrink-0 items-center justify-center"
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
        <span
          className={`truncate whitespace-nowrap font-bold uppercase tracking-[0.06em] ${s.text} ${
            onDark ? 'text-white' : 'text-[#0a0a0a]'
          }`}
        >
          TrishulHub
        </span>
      )}
    </Link>
  )
}
