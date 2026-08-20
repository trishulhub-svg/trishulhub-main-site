'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { HomeGetInTouch } from '@/components/trishulhub/home-get-in-touch'
import { PageHero } from '@/components/trishulhub/page-hero'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'

export function ContactPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const formY = useTransform(scrollYProgress, [0, 1], [24, -24])
  const [sent, setSent] = useState(false)
  const { email, phoneDisplay, location, links, whatsappWithMessage } =
    useSiteContact()

  return (
    <div ref={ref} className="relative overflow-hidden pb-28">
      <PageHero
        label="Contact us"
        title="Get in touch"
        subtitle="Message us on WhatsApp, call, or fill in the form below. We reply as soon as we can."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeGetInTouch />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <a
            href={links.mailto}
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 text-sm text-muted-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
          >
            <Mail className="text-primary" size={16} />
            {email}
          </a>
          <a
            href={links.tel}
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 text-sm text-muted-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
          >
            <Phone className="text-primary" size={16} />
            {phoneDisplay}
          </a>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 text-sm text-muted-foreground shadow-sm">
            <MapPin className="text-primary" size={16} />
            {location}
          </div>
        </div>

        <motion.form
          id="contact-form"
          style={{ y: formY }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
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
          className="scroll-mt-28 surface-card p-6 sm:p-8"
        >
          <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
            Send us a message
          </h2>
          <label className="mb-4 block">
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Name
            </span>
            <input
              name="name"
              required
              className="field-input"
              placeholder="Your name"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
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
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
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
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Message
            </span>
            <textarea
              name="message"
              required
              className="field-input min-h-[140px] resize-y"
              placeholder="Tell us what you want to build"
            />
          </label>
          <NexusButton type="submit" fullWidth showArrow={!sent}>
            {sent ? 'Opening WhatsApp…' : 'Send message'}
          </NexusButton>
        </motion.form>
      </div>
    </div>
  )
}
