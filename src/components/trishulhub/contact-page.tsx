'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/trishulhub/page-hero'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { HeroAccentWord } from '@/components/trishulhub/hero-accent-word'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'
import { HomeGetInTouch } from '@/components/trishulhub/home-get-in-touch'

export function ContactPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const formY = useTransform(scrollYProgress, [0, 1], [16, -16])
  const [sent, setSent] = useState(false)
  const { email, phoneDisplay, location, links, whatsappWithMessage } =
    useSiteContact()

  return (
    <div ref={ref} className="relative overflow-hidden pb-28">
      <PageHero
        label="Contact us"
        title={
          <>
            Let&apos;s work <HeroAccentWord words="together" animate={false} />
          </>
        }
        subtitle="Message us on WhatsApp, call, or email. We reply as soon as we can."
      />

      <div className="lt-container">
        <HomeGetInTouch />
      </div>

      <div className="lt-container mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="space-y-4">
          <a
            href={links.mailto}
            className="flex items-center gap-4 rounded-xl border border-[#111111] bg-white p-5 transition hover:-translate-y-0.5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#0D3C1F]">
              <Mail size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0a0a0a]">Email</p>
              <p className="text-sm text-[#6b7280]">{email}</p>
            </div>
          </a>
          <a
            href={links.tel}
            className="flex items-center gap-4 rounded-xl border border-[#111111] bg-white p-5 transition hover:-translate-y-0.5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#0D3C1F]">
              <Phone size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0a0a0a]">Phone</p>
              <p className="text-sm text-[#6b7280]">{phoneDisplay}</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-xl border border-[#111111] bg-white p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#0D3C1F]">
              <MapPin size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0a0a0a]">Location</p>
              <p className="text-sm text-[#6b7280]">{location}</p>
            </div>
          </div>
        </div>

        <motion.form
          id="contact-form"
          style={{ y: formY }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const name = String(fd.get('name') || '')
            const emailValue = String(fd.get('email') || '')
            const service = String(fd.get('service') || '')
            const message = String(fd.get('message') || '')
            const text = `Hi TrishulHub — I'm ${name}.\nEmail: ${emailValue}\nService: ${service}\n\n${message}`
            window.open(whatsappWithMessage(text), '_blank', 'noopener,noreferrer')
            setSent(true)
          }}
          className="scroll-mt-28 rounded-xl border border-[#111111] bg-white p-6 sm:p-8"
        >
          <h2 className="mb-6 text-2xl font-bold text-[#0a0a0a]">
            Send us a message
          </h2>
          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-medium text-[#6b7280]">
              Name
            </span>
            <input name="name" required className="field-input" placeholder="Your name" />
          </label>
          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-medium text-[#6b7280]">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              className="field-input"
              placeholder="you@company.com"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-medium text-[#6b7280]">
              Service
            </span>
            <select name="service" className="field-input" defaultValue="Website">
              <option>Website</option>
              <option>Custom Software</option>
              <option>Mobile Apps</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label className="mb-6 block">
            <span className="mb-2 block text-sm font-medium text-[#6b7280]">
              Message
            </span>
            <textarea
              name="message"
              required
              className="field-input min-h-[120px] resize-y"
              placeholder="Tell us what you want to build"
            />
          </label>
          {/* Native form fields + WhatsApp submit */}
          <NexusButton type="submit" fullWidth showArrow={!sent}>
            {sent ? 'Opening WhatsApp…' : 'Send on WhatsApp'}
          </NexusButton>
        </motion.form>
      </div>
    </div>
  )
}
