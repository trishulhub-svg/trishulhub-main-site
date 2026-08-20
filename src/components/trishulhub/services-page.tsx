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

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-10 lg:gap-14">
          {services.map((s, idx) => {
            const Icon = s.icon
            return (
              <motion.article
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: EASE_OUT_EXPO }}
                className="scroll-mt-28 surface-card overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-primary">
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {s.title}
                    </h2>
                    <p className="mt-1 font-display text-base font-medium text-primary">
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

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-secondary/60 p-5">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
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
                  <div className="rounded-2xl border border-border bg-sky-50/80 p-5">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                      Good for
                    </h3>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
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
          className="mt-14 rounded-3xl border border-primary/20 bg-sky-50 p-8 text-center sm:p-10"
        >
          <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Not sure which one you need?
          </h3>
          <p className="mx-auto mt-3 max-w-lg font-sans text-muted-foreground">
            Tell us about your business on WhatsApp — we will suggest the best
            option and give you a clear quote.
          </p>
          <div className="mt-6 flex justify-center">
            <NexusButton href={links.whatsapp}>Chat with us</NexusButton>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
