'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { FadeIn } from './motion-primitives'
import { NexusButton } from './nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'
import { Globe, LayoutDashboard, Smartphone } from 'lucide-react'

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

const floatCards = [
  { label: 'Websites', icon: Globe, top: '8%', left: '8%', delay: 0 },
  { label: 'Software', icon: LayoutDashboard, top: '38%', left: '42%', delay: 0.1 },
  { label: 'Mobile Apps', icon: Smartphone, top: '62%', left: '12%', delay: 0.2 },
]

export function Hero() {
  const reduce = useReducedMotion()
  const { links } = useSiteContact()

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#fafafa]" />
        <div className="lt-glow absolute right-[-10%] top-[10%] h-[32rem] w-[32rem] blur-0" />
        <div className="lt-glow absolute bottom-[5%] left-[5%] h-64 w-64 opacity-40" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-xl"
        >
          <motion.p
            variants={heroItem}
            className="mb-5 text-sm font-medium text-[#6b7280]"
          >
            Built for growing businesses
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-[3.75rem]"
          >
            Digital products that{' '}
            <span className="accent-text">work for you.</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-6 max-w-md text-base leading-relaxed text-[#6b7280] sm:text-lg"
          >
            TrishulHub helps businesses run smoother with clear, reliable
            websites, software, and mobile apps — designed around your goals.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <NexusButton href={links.whatsapp}>Let&apos;s build yours</NexusButton>
            <NexusButton href="/services" variant="secondary">
              See our services
            </NexusButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT_EXPO }}
          className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
        >
          <div className="lt-glow absolute inset-[8%] rounded-full" />
          <div className="absolute inset-[18%] overflow-hidden rounded-2xl bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9] shadow-[0_24px_60px_rgba(13,148,136,0.2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/trishulhub-logo.png"
              alt=""
              className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 object-contain opacity-90 sm:h-36 sm:w-36"
            />
          </div>

          {floatCards.map((c) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + c.delay, duration: 0.55 }}
                className="absolute flex items-center gap-2.5 rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                style={{ top: c.top, left: c.left }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e0f7fa] text-[#0d9488]">
                  <Icon size={15} />
                </span>
                <span className="text-sm font-semibold text-[#0a0a0a]">
                  {c.label}
                </span>
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="absolute bottom-[12%] right-[4%] rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <p className="text-[11px] font-medium text-[#6b7280]">From</p>
            <p className="text-sm font-bold text-[#0a0a0a]">
              £400 <span className="font-medium text-[#0d9488]">projects</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <FadeIn delay={1} whenInView={false}>
        <div className="mt-14 flex justify-center lg:mt-20">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[#e5e7eb] bg-white p-1.5">
            <motion.div
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full bg-[#0d9488]"
            />
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
