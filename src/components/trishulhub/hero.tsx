'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { WordsPullUp } from './words-pull-up'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'

const navItems = [
  { label: 'Our story', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Planner', href: '#planner' },
  { label: 'Inquiries', href: '/contact' },
]

export function Hero() {
  const { links } = useSiteContact()

  return (
    <section id="home" className="relative z-20 h-[100svh] bg-black p-4 font-almarai md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Hanging pill nav */}
        <nav
          aria-label="Hero"
          className="absolute left-1/2 top-0 z-30 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8"
        >
          <ul className="flex max-w-[92vw] items-center gap-3 overflow-x-auto sm:gap-6 md:max-w-none md:gap-12 lg:gap-14">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-[10px] transition-colors sm:text-xs md:text-sm"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#E1E0CC'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-5 sm:px-6 sm:pb-7 md:px-10 md:pb-10">
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-8">
              <h1 className="relative font-medium leading-[0.85] tracking-[-0.07em]">
                <WordsPullUp
                  text="TrishulHub"
                  className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[11vw] 2xl:text-[10.5vw]"
                  style={{ color: '#E1E0CC' }}
                  endMark={
                    <span
                      aria-hidden
                      className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] leading-none"
                      style={{ color: '#E1E0CC' }}
                    >
                      *
                    </span>
                  }
                />
              </h1>
            </div>

            <div className="flex flex-col gap-5 pb-1 md:col-span-4 md:pb-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.5, ease: EASE_OUT_EXPO }}
                className="max-w-md text-xs leading-[1.2] text-cream/70 sm:text-sm md:text-base"
              >
                TrishulHub builds websites, custom software, and mobile apps for
                growing businesses — clear products shaped around how your team
                actually works.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.7, ease: EASE_OUT_EXPO }}
              >
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-cream py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all hover:gap-3 sm:pl-6 sm:text-base"
                >
                  <span>Let&apos;s build yours</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight size={16} className="text-[#E1E0CC]" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
