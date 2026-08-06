'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, LayoutDashboard, Users, ArrowRight } from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO, STAGGER } from '@/lib/animations'

const services = [
  {
    id: 'website',
    icon: Globe,
    title: 'Website Development',
    desc: 'Custom websites for every kind of customer need — stores, brands, local businesses, and portfolios that look sharp and convert.',
  },
  {
    id: 'software',
    icon: LayoutDashboard,
    title: 'Custom Software',
    desc: 'Admin panels and app systems for inventory, healthcare, ecommerce ops, and whatever your business needs to run day to day.',
  },
  {
    id: 'crm',
    icon: Users,
    title: 'CRM Solutions',
    desc: 'CRM software to manage employees, customers, pipelines, and follow-ups — built around your team’s real workflow.',
  },
]

export function HomeServices() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            What we build
          </motion.span>
          <AnimatedHeading
            as="h2"
            variant="rise"
            stagger={0.08}
            duration={0.6}
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Three focused services. Zero fluff.
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg"
          >
            Preview a tailored template on our services page, then talk to us
            when you are ready to make it real.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: STAGGER.normal } },
          }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {services.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                  },
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition-colors hover:border-[#00DEFF]/45"
              >
                <div
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-[#00DEFF]/35 bg-[#00DEFF]/10"
                >
                  <Icon className="h-7 w-7 text-[#00DEFF]" strokeWidth={2} />
                </div>
                <h3
                  className="mb-3 text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {s.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-white/55">
                  {s.desc}
                </p>
                <Link
                  href={`/services#${s.id}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors group-hover:text-[#00DEFF]"
                >
                  Explore & preview
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
