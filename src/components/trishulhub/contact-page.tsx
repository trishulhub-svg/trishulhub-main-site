'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { HomeGetInTouch } from '@/components/trishulhub/home-get-in-touch'
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
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const [sent, setSent] = useState(false)
  const { email, phoneDisplay, location, links, whatsappWithMessage } =
    useSiteContact()

  return (
    <div ref={ref} className="relative overflow-hidden pb-28 pt-28 sm:pt-32">
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute right-[-10%] top-24 h-[28rem] w-[28rem] rounded-full bg-[#00DEFF]/15 blur-[130px]"
      />

      <HomeGetInTouch />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <a
            href={links.mailto}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 backdrop-blur-md transition-colors hover:border-[#00DEFF]/40 hover:text-[#00DEFF]"
          >
            <Mail className="text-[#00DEFF]" size={16} />
            {email}
          </a>
          <a
            href={links.tel}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 backdrop-blur-md transition-colors hover:border-[#00DEFF]/40 hover:text-[#00DEFF]"
          >
            <Phone className="text-[#00DEFF]" size={16} />
            {phoneDisplay}
          </a>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 backdrop-blur-md">
            <MapPin className="text-[#00DEFF]" size={16} />
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
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8"
        >
          <label className="mb-4 block">
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
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
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
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
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
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
            <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
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
