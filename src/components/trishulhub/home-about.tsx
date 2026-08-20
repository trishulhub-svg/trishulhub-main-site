'use client'

import { motion } from 'framer-motion'
import { Database, Cpu, Send, Sparkles, Smartphone } from 'lucide-react'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

const PATH_A =
  'M200,260 C320,260 360,110 520,90 C640,75 720,150 820,260'
const PATH_B =
  'M200,260 C320,260 360,410 520,430 C640,445 720,370 820,260'

export function HomeAbout() {
  const { links } = useSiteContact()

  return (
    <section id="about-home" className="relative overflow-hidden bg-[#fafafa] py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#6b7280]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#0d9488]" />
              About TrishulHub
            </motion.span>
            <h2 className="text-4xl font-bold uppercase leading-[1.08] tracking-[-0.03em] text-[#111111] sm:text-5xl lg:text-6xl">
              We build the systems behind{' '}
              <span className="accent-text">growing businesses</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55, ease: EASE_OUT_EXPO }}
              className="font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              We started in 2023 making websites. Today we also build custom
              software and mobile apps — simple tools that help your business run
              better every day.
            </motion.p>
            <div className="mt-7">
              <NexusButton href={links.whatsapp}>Talk on WhatsApp</NexusButton>
            </div>
          </div>
        </div>

        <div className="surface-card relative mt-14 overflow-hidden rounded-[2rem] border border-[#e5e7eb] bg-white p-5 sm:p-8 lg:p-10">
          <div className="relative mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-medium text-[#6b7280]">
                How we work
              </span>
              <p className="mt-2 text-2xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-3xl">
                From your idea to a{' '}
                <span className="accent-text">live product</span>
              </p>
            </div>
          </div>

          <div className="relative mx-auto hidden min-h-[520px] w-full max-w-5xl md:block">
            <svg
              viewBox="0 0 1000 520"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="home-udp-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#0d9488" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0f766e" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <path
                d={PATH_A}
                stroke="url(#home-udp-beam)"
                strokeWidth="2.25"
                className="about-udp-beam"
              />
              <path
                d={PATH_B}
                stroke="url(#home-udp-beam)"
                strokeWidth="2.25"
                className="about-udp-beam"
                style={{ animationDelay: '0.55s' }}
              />
              <circle r="4" fill="#0d9488">
                <animateMotion dur="2.5s" repeatCount="indefinite" path={PATH_A} />
              </circle>
              <circle r="4" fill="#5eead4">
                <animateMotion dur="3s" repeatCount="indefinite" path={PATH_B} />
              </circle>
            </svg>

            <NodeCard
              className="absolute left-[2%] top-1/2 z-10 w-[210px] -translate-y-1/2"
              icon={Database}
              label="Start"
              title="Your idea"
              text="Tell us what your business needs — we listen first."
            />
            <NodeCard
              className="absolute left-1/2 top-0 z-10 w-[230px] -translate-x-1/2"
              icon={Cpu}
              label="Build"
              title="We design & build"
              text="Websites, software panels, and mobile apps made for you."
            />
            <NodeCard
              className="absolute bottom-0 left-1/2 z-10 w-[230px] -translate-x-1/2"
              icon={Smartphone}
              label="Build"
              title="Three clear services"
              text="Software, websites, and mobile apps — pick what you need."
            />
            <NodeCard
              className="absolute right-[2%] top-1/2 z-10 w-[210px] -translate-y-1/2"
              icon={Send}
              label="Result"
              title="Ready to use"
              text="You get a clear product your team can use right away."
            />
          </div>

          <div className="relative grid gap-0 md:hidden">
            {[
              {
                label: 'Start',
                title: 'Your idea',
                text: 'Tell us what your business needs — we listen first.',
                icon: Database,
              },
              {
                label: 'Build',
                title: 'We design & build',
                text: 'Websites, software panels, and mobile apps made for you.',
                icon: Cpu,
              },
              {
                label: 'Build',
                title: 'Three clear services',
                text: 'Software, websites, and mobile apps — pick what you need.',
                icon: Smartphone,
              },
              {
                label: 'Result',
                title: 'Ready to use',
                text: 'You get a clear product your team can use right away.',
                icon: Send,
              },
            ].map((n, i, arr) => (
              <div key={n.title}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.06,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <NodeCard {...n} />
                </motion.div>
                {i < arr.length - 1 ? (
                  <div className="flex justify-center py-1" aria-hidden>
                    <svg width="10" height="32" className="overflow-visible">
                      <line
                        x1="5"
                        y1="0"
                        x2="5"
                        y2="32"
                        stroke="#0d9488"
                        strokeWidth="1.75"
                        strokeDasharray="5 5"
                        className="animate-flow"
                        opacity="0.75"
                      />
                      <circle r="3.5" fill="#0d9488">
                        <animateMotion
                          dur="1.5s"
                          repeatCount="indefinite"
                          path="M5,0 L5,32"
                        />
                      </circle>
                    </svg>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function NodeCard({
  icon: Icon,
  label,
  title,
  text,
  className = '',
}: {
  icon: typeof Database
  label: string
  title: string
  text: string
  className?: string
}) {
  return (
    <div
      className={`rounded-[1.35rem] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_30px_rgba(11,18,32,0.06)] ${className}`}
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#e0f7fa] text-[#0d9488]">
        <Icon size={16} />
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0d9488]">
        {label}
      </p>
      <h3 className="mt-1 text-lg font-medium text-[#111111]">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-[#6b7280]">{text}</p>
    </div>
  )
}
