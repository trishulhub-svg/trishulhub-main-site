'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { NexusButton } from './nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const tabs = [
  {
    id: 'website',
    label: 'Websites',
    icon: Globe,
    title: 'Website Development',
    desc: 'Clean, professional websites that help customers find you, understand your offer, and get in touch.',
    tags: ['Business sites', 'Shops', 'Portfolios'],
    features: [
      'Pages that match your brand',
      'Works perfectly on phones',
      'Contact forms & WhatsApp',
      'Help with launch',
    ],
  },
  {
    id: 'software',
    label: 'Software',
    icon: LayoutDashboard,
    title: 'Custom Software',
    desc: 'Admin panels and business tools for stock, orders, staff, and daily operations — built around your workflow.',
    tags: ['Admin panels', 'Ops tools', 'Dashboards'],
    features: [
      'Screens for your team',
      'Safe role-based login',
      'Alerts and reports',
      'Training & support',
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile Apps',
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Android and iPhone apps that make it easy for customers or staff to book, order, track, or get updates.',
    tags: ['iOS', 'Android', 'Push alerts'],
    features: [
      'Easy phone screens',
      'Push notifications',
      'Secure login',
      'Connects to your systems',
    ],
  },
] as const

export function HomeServicesShowcase() {
  const { links } = useSiteContact()
  const [index, setIndex] = useState(0)
  const current = tabs[index]
  const Icon = current.icon

  const prev = () => setIndex((i) => (i === 0 ? tabs.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === tabs.length - 1 ? 0 : i + 1))

  return (
    <section className="lt-section bg-[#fafafa]">
      <div className="lt-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl">
            Choose your perfect solution
          </h2>
          <p className="mt-3 text-xl font-semibold text-[#0d9488]">
            Three clear services. One studio.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#6b7280]">
            Pick what fits your business — we will guide you from first idea to
            a live product.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                i === index ? 'lt-pill-active' : 'lt-pill'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="surface-card mt-8 grid overflow-hidden lg:grid-cols-2"
          >
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9] text-[#0d9488]">
                <Icon size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#0a0a0a]">{current.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-[#6b7280]">
                {current.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[13px] font-medium text-[#0a0a0a]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ul className="mt-6 space-y-2.5">
                {current.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-[#6b7280]"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-[#0d9488]"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center justify-between gap-4">
                <NexusButton href={links.whatsapp} showArrow>
                  Start this service
                </NexusButton>
                <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] hover:bg-[#f3f4f6]"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span>
                    {index + 1}/{tabs.length}
                  </span>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] hover:bg-[#f3f4f6]"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[280px] items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#c8e6c9] p-8 lg:min-h-full">
              <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <Icon size={56} className="text-[#0d9488]" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
