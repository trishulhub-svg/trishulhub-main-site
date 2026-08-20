'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, LayoutDashboard, Smartphone, Clock } from 'lucide-react'
import { NexusButton } from './nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
}

export function Hero() {
  const { links } = useSiteContact()

  return (
    <section id="home" className="relative overflow-hidden bg-[#fafafa] pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="lt-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[55%_45%] lg:gap-8">
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-xl"
          >
            <motion.p variants={heroItem} className="mb-4 text-sm font-medium text-[#6b7280]">
              Websites · Software · Mobile Apps
            </motion.p>

            <motion.h1
              variants={heroItem}
              className="text-[40px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl lg:text-[64px] xl:text-[68px]"
            >
              Digital products that{' '}
              <span className="accent-text accent-underline">work for you.</span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-[540px] text-lg leading-relaxed text-[#6b7280]"
            >
              TrishulHub builds clear, reliable websites, business software, and
              mobile apps — designed around your goals, not complicated tech talk.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <NexusButton href={links.whatsapp}>Let&apos;s build yours</NexusButton>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-black bg-white px-7 text-[15px] font-medium text-black transition hover:scale-[1.02]"
              >
                See our services
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating cards composition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE_OUT_EXPO }}
            className="relative mx-auto aspect-[1/1.05] w-full max-w-md lg:max-w-none"
          >
            <div className="lt-glow absolute inset-[5%] opacity-90" />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 400 420"
              aria-hidden
            >
              <path
                d="M80 90 C 140 140, 180 180, 220 210"
                className="lt-dotted"
              />
              <path
                d="M300 100 C 260 160, 240 200, 220 240"
                className="lt-dotted"
              />
              <path
                d="M100 320 C 150 280, 180 260, 220 250"
                className="lt-dotted"
              />
            </svg>

            <div className="absolute left-[8%] top-[10%] flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e0f7fa] text-[#0d9488]">
                <Globe size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#0a0a0a]">Websites</p>
                <span className="mt-0.5 inline-block rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[12px] font-medium text-[#6b7280]">
                  Brand sites
                </span>
              </div>
            </div>

            <div className="absolute right-[4%] top-[28%] flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c8e6c9]/50 text-[#0d9488]">
                <LayoutDashboard size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#0a0a0a]">Software</p>
                <span className="mt-0.5 inline-block rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[12px] font-medium text-[#6b7280]">
                  Admin panels
                </span>
              </div>
            </div>

            <div className="absolute bottom-[22%] left-[12%] flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e0f7fa] text-[#0d9488]">
                <Smartphone size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#0a0a0a]">Mobile Apps</p>
                <span className="mt-0.5 inline-block rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[12px] font-medium text-[#6b7280]">
                  iOS & Android
                </span>
              </div>
            </div>

            <div className="absolute bottom-[8%] right-[10%] flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <Clock size={16} className="text-[#0d9488]" />
              <div>
                <p className="text-[11px] font-medium text-[#6b7280]">Typical reply</p>
                <p className="text-sm font-bold text-[#0a0a0a]">&lt; 48 hrs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
