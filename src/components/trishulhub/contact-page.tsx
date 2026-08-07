'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { HomeGetInTouch } from '@/components/trishulhub/home-get-in-touch'
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

  return (
    <div ref={ref} className="relative overflow-hidden pb-28 pt-28 sm:pt-32">
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute right-[-10%] top-24 h-[28rem] w-[28rem] rounded-full bg-[#00DEFF]/15 blur-[130px]"
      />

      {/* Get In Touch sits above the form */}
      <HomeGetInTouch />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <a
            href="mailto:trishulhub@gmail.com"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 backdrop-blur-md transition-colors hover:border-[#00DEFF]/40 hover:text-[#00DEFF]"
          >
            <Mail className="text-[#00DEFF]" size={16} />
            trishulhub@gmail.com
          </a>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 backdrop-blur-md">
            <MapPin className="text-[#00DEFF]" size={16} />
            India · Remote-friendly
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
            const email = String(fd.get('email') || '')
            const service = String(fd.get('service') || '')
            const message = String(fd.get('message') || '')
            const subject = encodeURIComponent(
              `TrishulHub inquiry — ${service || 'General'}`,
            )
            const body = encodeURIComponent(
              `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`,
            )
            window.location.href = `mailto:trishulhub@gmail.com?subject=${subject}&body=${body}`
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
              Service interest
            </span>
            <select
              name="service"
              className="field-input"
              defaultValue="Website Development"
            >
              <option>Website Development</option>
              <option>Custom Software</option>
              <option>CRM Solutions</option>
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
              placeholder="What do you want to build?"
            />
          </label>
          <button
            type="submit"
            className="btn-cyan btn-shine inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#00DEFF]/40 bg-[#00DEFF]/10 px-6 py-3.5 text-sm font-semibold text-[#00DEFF]"
          >
            <Send size={15} />
            {sent ? 'Opening email…' : 'Send message'}
          </button>
        </motion.form>
      </div>
    </div>
  )
}
