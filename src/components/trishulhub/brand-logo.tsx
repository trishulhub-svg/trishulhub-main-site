'use client'

import Image from 'next/image'
import Link from 'next/link'

type BrandLogoProps = {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  className?: string
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
}: BrandLogoProps) {
  const s = sizes[size]

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
        <span
          className="text-lg font-bold tracking-[0.12em] sm:text-xl"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          <span className="text-white">TRISHUL</span>
          <span className="gradient-text">HUB</span>
        </span>
      )}
    </Link>
  )
}
