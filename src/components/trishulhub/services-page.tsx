'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  CheckCircle2,
} from 'lucide-react'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { PageHero } from '@/components/trishulhub/page-hero'
import { EASE_OUT_EXPO } from '@/lib/animations'

const services = [
  {
    id: 'website',
    icon: Globe,
    title: 'Websites',
    tagline: 'A professional online home for your business',
    description:
      'We build clean, easy-to-use websites that help customers find you, understand what you offer, and get in touch.',
    includes: [
      'Pages that match your brand',
      'Works perfectly on phones',
      'Contact forms and WhatsApp links',
      'Help with launch and updates',
    ],
    goodFor: 'Shops, local businesses, portfolios, and service companies',
  },
  {
    id: 'software',
    icon: LayoutDashboard,
    title: 'Custom Software',
    tagline: 'Tools that match how your team actually works',
    description:
      'Admin panels and business software for stock, orders, staff, or daily operations — built around your workflow, not the other way around.',
    includes: [
      'Screens designed for your team',
      'Safe login for each person',
      'Simple alerts and reports',
      'Training and ongoing help',
    ],
    goodFor: 'Shops, clinics, warehouses, and growing teams',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: "Your business in your customers' pocket",
    description:
      'Android and iPhone apps that make it easy for customers or staff to book, order, track, or get updates on the go.',
    includes: [
      'Easy-to-use phone screens',
      'Push alerts when needed',
      'Secure user login',
      'Connects with your website or software',
    ],
    goodFor: 'Businesses that want repeat customers or field teams',
  },
]

export function ServicesPage() {
  const { links } = useSiteContact()

  return (
    <div className="relative pb-28">
      <PageHero
        label="Services"
        title="What we build for you"
        subtitle="Three simple options — websites, custom software, and mobile apps. Pick what fits your business and we will guide you from there."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-8 lg:gap-10">
          {services.map((s, idx) => {
            const Icon = s.icon
            return (
              <motion.article
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.55, delay: idx * 0.05, ease: EASE_OUT_EXPO }}
                className="scroll-mt-28 group relative overflow-hidden rounded-[2rem] border border-border/60 bg-white/80 p-6 shadow-[0_16px_50px_rgba(11,18,32,0.05)] backdrop-blur-sm sm:p-8 lg:p-10"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal-400/10 blur-3xl transition-opacity group-hover:opacity-100"
                />
                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      0{idx + 1}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                      {s.title}
                    </h2>
                    <p className="mt-2 font-sans text-base font-medium text-primary/90">
                      {s.tagline}
                    </p>
                    <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <NexusButton href={links.whatsapp}>
                      Start with {s.title.toLowerCase()}
                    </NexusButton>
                  </div>
                </div>

                <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.35rem] bg-secondary/70 p-5">
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                      What you get
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {s.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 font-sans text-sm text-muted-foreground"
                        >
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-primary"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[1.35rem] bg-accent/60 p-5">
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                      Good for
                    </h3>
                    <p className="mt-4 font-display text-lg font-medium leading-snug text-foreground/90">
                      {s.goodFor}
                    </p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="relative mt-12 overflow-hidden rounded-[2rem] bg-foreground p-8 text-center text-white sm:p-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(45,212,191,0.25),transparent_50%)]"
          />
          <h3 className="relative font-display text-2xl font-medium sm:text-4xl">
            Not sure which one you need?
          </h3>
          <p className="relative mx-auto mt-3 max-w-lg font-sans text-white/60">
            Tell us about your business on WhatsApp — we will suggest the best
            option and give you a clear quote.
          </p>
          <div className="relative mt-7 flex justify-center">
            <NexusButton href={links.whatsapp}>Chat with us</NexusButton>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
