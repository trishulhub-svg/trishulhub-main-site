'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { PageHero } from '@/components/trishulhub/page-hero'
import { NexusButton } from '@/components/trishulhub/nexus-button'
import { HeroAccentWord } from '@/components/trishulhub/hero-accent-word'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import { EASE_OUT_EXPO } from '@/lib/animations'
import { HomeGetInTouch } from '@/components/trishulhub/home-get-in-touch'
import { AboutProtocol } from '@/components/trishulhub/about-protocol'

const STEPS = [
  {
    n: '01',
    title: 'You send the brief',
    text: 'Two minutes on the form — or message us directly on WhatsApp.',
  },
  {
    n: '02',
    title: 'We reply with questions',
    text: 'Usually within one business day, plus a short call if it helps.',
  },
  {
    n: '03',
    title: 'You get a written plan',
    text: 'Scope, milestones, timeline and a fixed price before anything starts.',
  },
] as const

const HELPFUL = [
  'What the product needs to do',
  'Who will use it (customers, staff, both)',
  'Any deadline you are working towards',
  'Links to a current site or reference',
] as const

export function ContactPage() {
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
    <div className="pb-24">
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

      {/* Form + guidance */}
      <section className="lt-container mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
        {/* ---- Form ---- */}
        <motion.form
          ref={formRef}
          id="contact-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          onSubmit={handleSubmit}
          className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-[#0d3c1f]/12 bg-white shadow-[0_18px_50px_rgba(6,43,22,0.07)]"
        >
          <div className="flex items-center gap-3 border-b border-[#0d3c1f]/8 bg-gradient-to-r from-[#f4faf7] to-white px-6 py-5 sm:px-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D3C1F] text-white">
              <Send size={17} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-[#0a0a0a]">
                Send us a message
              </h2>
              <p className="text-xs text-[#6b7280]">
                No sales sequence. One human reply.
              </p>
            </div>
          </div>

          <div className="px-6 py-6 sm:px-8 sm:py-7">
            {error ? (
              <p className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[13px] font-medium text-[#374151]">
                  Name
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="field-input"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[13px] font-medium text-[#374151]">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field-input"
                  placeholder="you@company.com"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[13px] font-medium text-[#374151]">
                  Company{' '}
                  <span className="font-normal text-[#9ca3af]">(optional)</span>
                </span>
                <input
                  name="company"
                  autoComplete="organization"
                  className="field-input"
                  placeholder="Company or organisation"
                />
              </label>
              <label className="relative block">
                <span className="mb-2 block text-[13px] font-medium text-[#374151]">
                  Service
                </span>
                <select
                  name="service"
                  className="field-input appearance-none pr-10"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option>Website</option>
                  <option>Custom Software</option>
                  <option>Mobile Apps</option>
                  <option>Performance / SEO audit</option>
                  <option>Not sure yet</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute bottom-4 right-4 text-[#9ca3af]"
                />
              </label>
              <label className="relative block sm:col-span-2">
                <span className="mb-2 block text-[13px] font-medium text-[#374151]">
                  Budget range{' '}
                  <span className="font-normal text-[#9ca3af]">(optional)</span>
                </span>
                <select
                  name="budget"
                  className="field-input appearance-none pr-10"
                  defaultValue="£900 – £2,000"
                >
                  <option>Under £900</option>
                  <option>£900 – £2,000</option>
                  <option>£2,000 – £5,000</option>
                  <option>£5,000+</option>
                  <option>Not decided yet</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute bottom-4 right-4 text-[#9ca3af]"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-[13px] font-medium text-[#374151]">
                Message
              </span>
              <textarea
                name="message"
                required
                className="field-input min-h-[130px] resize-y"
                placeholder="Tell us what you want to build, the problem it solves, and any deadline you are working towards."
              />
            </label>

            {/* Honeypot — hidden from humans, catches naive bots */}
            <div className="hidden" aria-hidden>
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="mt-6">
              <NexusButton
                type="submit"
                fullWidth
                showArrow={!sending}
                disabled={sending}
              >
                {sending ? 'Sending…' : 'Send message'}
              </NexusButton>
            </div>
            <p className="mt-3 text-center text-xs text-[#9ca3af]">
              We only use your details to reply to this enquiry.
            </p>
          </div>
        </motion.form>

        {/* ---- Guidance column ---- */}
        <div className="space-y-5">
          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="rounded-[1.75rem] border border-[#0d3c1f]/12 bg-[#f7fbf9] p-6 sm:p-7"
          >
            <span className="th-eyebrow">
              <Sparkles size={13} className="text-[#0d9488]" />
              What happens next
            </span>
            <ol className="mt-6 space-y-5">
              {STEPS.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="flex gap-4"
                >
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[11px] font-bold text-[#0D3C1F] shadow-[0_6px_18px_rgba(6,43,22,0.08)] ring-1 ring-[#0d3c1f]/10">
                    {s.n}
                    {i < STEPS.length - 1 ? (
                      <span className="absolute left-1/2 top-full h-5 w-px -translate-x-1/2 bg-[#0d3c1f]/15" />
                    ) : null}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#111111]">
                      {s.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#6b7280]">
                      {s.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* What to include */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="rounded-[1.75rem] border border-[#0d3c1f]/12 bg-white p-6 sm:p-7"
          >
            <h3 className="text-sm font-bold text-[#0a0a0a]">
              Helpful to include
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {HELPFUL.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-[13px] leading-relaxed text-[#6b7280]"
                >
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#0d9488]"
                  />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Animated channel network */}
      <section className="lt-container mt-14 lg:mt-20">
        <HomeGetInTouch />
      </section>

      {/* Project planner — same wizard as the home page, so visitors can send a
          structured brief instead of typing one out. */}
      <div className="lt-container mt-4">
        <AboutProtocol className="mt-14 lg:mt-20" />
      </div>

      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
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
              className="relative w-full max-w-sm rounded-2xl border border-[#0d3c1f]/12 bg-white p-7 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowSuccess(false)}
                className="absolute right-3 top-3 rounded-full p-1.5 text-[#9ca3af] transition hover:bg-[#f3f4f6] hover:text-[#111111]"
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
                Message received
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                Thanks — your enquiry is with us. Expect a reply within one
                business day. Need it sooner? Ping us on WhatsApp.
              </p>
              <div className="mt-6 space-y-2.5">
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0D3C1F] text-sm font-semibold text-white transition hover:bg-[#164a28]"
                >
                  <MessageCircle size={15} />
                  Continue on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setShowSuccess(false)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#d1d5db] text-sm font-semibold text-[#111111] transition hover:border-[#0D3C1F]/40 hover:text-[#0D3C1F]"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
