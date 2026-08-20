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
  sm: { box: 32, img: 28 },
  md: { box: 36, img: 32 },
  lg: { box: 44, img: 40 },
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
          className={`text-[17px] font-bold tracking-[-0.02em] sm:text-lg ${
            onDark ? 'text-white' : 'text-[#111111]'
          }`}
        >
          TrishulHub
        </span>
      )}
    </Link>
  )
}
