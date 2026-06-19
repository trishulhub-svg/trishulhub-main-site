'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Code2,
  Globe,
  Megaphone,
  Users,
  PenTool,
  ShoppingBag,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'
import { AnimatedHeading } from './animated-heading'
import { EASE_OUT_EXPO, STAGGER } from '@/lib/animations'

const services = [
  {
    icon: Code2,
    title: 'Software Development',
    desc: 'Custom software solutions built with modern technologies, scalable architecture, and clean code practices.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'High-performance, responsive websites and web applications powered by Next.js, React, and cutting-edge frameworks.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    desc: 'Data-driven marketing strategies including SEO, social media, and content marketing that drive measurable ROI.',
  },
  {
    icon: Users,
    title: 'CRM Solutions',
    desc: 'Customer relationship management systems that streamline workflows, enhance productivity, and improve customer engagement.',
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    desc: 'User-centered design that combines aesthetics with functionality, creating intuitive and engaging digital experiences.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Solutions',
    desc: 'Complete e-commerce platforms with secure payments, inventory management, and seamless shopping experiences.',
  },
]

export function Services() {
  const reduce = useReducedMotion()
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            What We Do
          </motion.span>
          <AnimatedHeading
            as="h2"
            variant="rise"
            stagger={0.1}
            duration={0.6}
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Premium Digital *Solutions*
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: '#A0A0A0' }}
          >
            We offer a comprehensive suite of digital services to help your
            business grow, scale, and succeed in today&apos;s competitive market.
          </motion.p>
        </div>

        {/* Grid with staggered card reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: STAGGER.normal } },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                  },
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -12,
                        boxShadow: '0 25px 50px -15px rgba(0,222,255,0.25)',
                      }
                }
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-400 hover:border-[#00DEFF]/60 hover:bg-[#00DEFF]/[0.04]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {/* Gradient sheen sweep across whole card on hover */}
                <div
                  aria-hidden="true"
                  className="sheen pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#00DEFF]/20 to-transparent"
                />
                {/* Radial spotlight on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 0%, rgba(0,222,255,0.10) 0%, transparent 60%)',
                  }}
                />

                {/* Top-right corner arrow icon */}
                <div className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-400 group-hover:border-[#00DEFF]/50 group-hover:bg-[#00DEFF]/10">
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors duration-400 group-hover:text-[#00DEFF]" />
                </div>

                {/* Main icon box — scales + rotates on hover */}
                <div
                  className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border transition-transform duration-400 group-hover:rotate-[5deg] group-hover:scale-110"
                  style={{
                    borderColor: 'rgba(0,222,255,0.4)',
                    backgroundColor: 'rgba(0,222,255,0.06)',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Icon
                    className="h-7 w-7"
                    style={{ color: '#00DEFF' }}
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3
                  className="mb-3 text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {s.title}
                </h3>

                {/* Description */}
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: '#A0A0A0' }}
                >
                  {s.desc}
                </p>

                {/* "Learn More" — slides up on hover, opacity 0.7 → 1 */}
                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium opacity-70 transition-all duration-400 group-hover:translate-y-[-2px] group-hover:opacity-100 group-hover:text-[#00DEFF]"
                  style={{
                    color: '#A0A0A0',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-[5px]" />
                </a>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View all */}
        <div className="mt-12 text-center">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            className="btn-ghost btn-shine group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:text-[#00DEFF]"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              View All Services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
