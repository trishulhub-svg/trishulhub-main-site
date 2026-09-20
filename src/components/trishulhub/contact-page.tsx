'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react'
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
  const [sending, setSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { email, phoneDisplay, location, links } = useSiteContact()
  const formRef = useRef<HTMLFormElement>(null)
  const [service, setService] = useState('Website')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSending(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      company: String(fd.get('company') || ''),
      budget: String(fd.get('budget') || ''),
      service: String(fd.get('service') || ''),
      message: String(fd.get('message') || ''),
      /** Honeypot — real users never fill this in. */
      website: String(fd.get('website') || ''),
    }
    try {
      const res = await fetch('/api/contact-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data?.error || 'Submission failed. Please try again.')
        return
      }
      formRef.current?.reset()
      setService('Website')
      setShowSuccess(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div ref={ref} className="relative overflow-hidden pb-28">
      <PageHero
        label="Contact us"
        title={
          <>
            Let&apos;s work <HeroAccentWord words="together" animate={false} />
          </>
        }
        subtitle="Tell us what you are trying to build or fix. You will get a clear, honest response — usually within one business day."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-[#4b5563]">
          <span className="inline-flex items-center gap-2">
            <Clock size={14} className="text-[#0d9488]" />
            Replies within 1 business day
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#0d9488]" />
            NDA-friendly
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} className="text-[#0d9488]" />
            {location}
          </span>
        </div>
      </PageHero>

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
          ref={formRef}
          id="contact-form"
          style={{ y: formY }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          onSubmit={handleSubmit}
          className="scroll-mt-28 rounded-xl border border-[#111111] bg-white p-6 sm:p-8"
        >
          <h2 className="mb-6 text-2xl font-bold text-[#0a0a0a]">
            Send us a message
          </h2>
          {error ? (
            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}
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
              Company <span className="font-normal text-[#9ca3af]">(optional)</span>
            </span>
            <input
              name="company"
              className="field-input"
              placeholder="Company or organisation"
              autoComplete="organization"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-medium text-[#6b7280]">
              Service
            </span>
            <select
              name="service"
              className="field-input"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option>Website</option>
              <option>Custom Software</option>
              <option>Mobile Apps</option>
              <option>Performance / SEO audit</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-medium text-[#6b7280]">
              Budget range <span className="font-normal text-[#9ca3af]">(optional)</span>
            </span>
            <select name="budget" className="field-input" defaultValue="£900 – £2,000">
              <option>Under £900</option>
              <option>£900 – £2,000</option>
              <option>£2,000 – £5,000</option>
              <option>£5,000+</option>
              <option>Not decided yet</option>
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
              placeholder="Tell us what you want to build, the problem it solves, and any deadline you are working towards."
            />
          </label>

          {/* Honeypot field — hidden from humans, catches naive bots */}
          <div className="hidden" aria-hidden>
            <label>
              Website
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </label>
          </div>

          <NexusButton type="submit" fullWidth showArrow={!sending} disabled={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </NexusButton>
          <p className="mt-3 text-center text-xs text-[#9ca3af]">
            We only use your details to reply to this enquiry.
          </p>
        </motion.form>
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-success-title"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
              className="relative w-full max-w-sm rounded-2xl border border-[#111111] bg-white p-7 text-center shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowSuccess(false)}
                className="absolute right-3 top-3 rounded-full p-1.5 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#111111]"
              >
                <X size={16} />
              </button>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5ef] text-[#0D3C1F]">
                <CheckCircle2 size={28} />
              </span>
              <h3
                id="contact-success-title"
                className="mt-4 text-xl font-bold text-[#111111]"
              >
                Form submitted successfully
              </h3>
              <p className="mt-2 text-sm text-[#6b7280]">
                Thanks — we received your message and will get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0D3C1F] text-sm font-semibold text-white hover:bg-[#164a28]"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
