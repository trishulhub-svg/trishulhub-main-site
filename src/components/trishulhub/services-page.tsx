'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  LayoutDashboard,
  Users,
  X,
  Eye,
  Mail,
} from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import { WebsitePreviewTemplate } from '@/components/trishulhub/preview/website-preview'
import { SoftwarePreviewTemplate } from '@/components/trishulhub/preview/software-preview'
import { CrmPreviewTemplate } from '@/components/trishulhub/preview/crm-preview'
import {
  WEBSITE_TYPES,
  type WebsiteType,
  displayDomain,
} from '@/lib/preview'
import { EASE_OUT_EXPO, STAGGER } from '@/lib/animations'

type ServiceId = 'website' | 'software' | 'crm'
type PreviewMode = ServiceId | null

const services = [
  {
    id: 'website' as const,
    icon: Globe,
    title: 'Website Development',
    desc: 'We build websites for every kind of customer need — ecommerce, business sites, portfolios, local brands, and more.',
    points: [
      'Custom design matched to your brand',
      'Mobile-first, fast, conversion-ready',
      'Preview a template before you talk to us',
    ],
  },
  {
    id: 'software' as const,
    icon: LayoutDashboard,
    title: 'Custom Software Development',
    desc: 'Admin panels and app systems so customers can manage inventory, healthcare, ecommerce ops, or any workflow they need.',
    points: [
      'Built around your real operations',
      'Role-based access & dashboards',
      'Describe your need → see a software preview',
    ],
  },
  {
    id: 'crm' as const,
    icon: Users,
    title: 'CRM Solutions',
    desc: 'CRM software to manage employees, customers, pipelines, and follow-ups — so your team stays aligned.',
    points: [
      'Customers + employees in one place',
      'Pipeline and follow-up visibility',
      'CRM-themed landing preview included',
    ],
  },
]

export function ServicesPage() {
  const [mode, setMode] = useState<PreviewMode>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.replace('#', '') as ServiceId
    if (hash === 'website' || hash === 'software' || hash === 'crm') {
      const el = document.getElementById(hash)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div className="relative pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            Services
          </motion.span>
          <AnimatedHeading
            as="h1"
            variant="rise"
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Three ways we help your *business run*
          </AnimatedHeading>
          <p className="mt-5 text-base text-white/55 sm:text-lg">
            Pick a service, contact us, or open Preview to generate a tailored
            landing / admin mock from your details.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: STAGGER.normal } },
          }}
          className="space-y-8"
        >
          {services.map((s) => {
            const Icon = s.icon
            return (
              <motion.section
                key={s.id}
                id={s.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
                  },
                }}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-10"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-[#00DEFF]/35 bg-[#00DEFF]/10">
                      <Icon className="h-7 w-7 text-[#00DEFF]" />
                    </div>
                    <h2
                      className="text-2xl font-bold text-white sm:text-3xl"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
                      {s.desc}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2 text-sm text-white/65"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00DEFF]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[220px]">
                    <Link
                      href="/contact"
                      className="btn-cyan btn-shine inline-flex items-center justify-center gap-2 rounded-full border border-[#00DEFF]/40 bg-[#00DEFF]/10 px-6 py-3 text-sm font-semibold text-[#00DEFF] backdrop-blur-md hover:bg-[#00DEFF]/20"
                    >
                      <Mail size={15} />
                      Contact us
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMode(s.id)}
                      className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md hover:border-[#00DEFF]/40 hover:text-[#00DEFF]"
                    >
                      <Eye size={15} />
                      Preview
                    </button>
                  </div>
                </div>
              </motion.section>
            )
          })}
        </motion.div>
      </div>

      <PreviewModal mode={mode} onClose={() => setMode(null)} />
    </div>
  )
}

function PreviewModal({
  mode,
  onClose,
}: {
  mode: PreviewMode
  onClose: () => void
}) {
  if (!mode) return null
  return <PreviewModalContent key={mode} mode={mode} onClose={onClose} />
}

function PreviewModalContent({
  mode,
  onClose,
}: {
  mode: NonNullable<PreviewMode>
  onClose: () => void
}) {
  const [websiteName, setWebsiteName] = useState('')
  const [websiteType, setWebsiteType] = useState<WebsiteType>('business')
  const [softwareDomain, setSoftwareDomain] = useState('')
  const [softwareDesc, setSoftwareDesc] = useState('')
  const [crmDomain, setCrmDomain] = useState('')
  const [crmName, setCrmName] = useState('')
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const brandFromName = useMemo(() => {
    const raw = websiteName.trim()
    if (!raw) return 'Your Brand'
    return raw
      .replace(/\.(com|in|io|net|org|co).*$/i, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }, [websiteName])

  const title =
    mode === 'website'
      ? 'Website preview'
      : mode === 'software'
        ? 'Custom software preview'
        : 'CRM preview'

  const canGenerate =
    mode === 'website'
      ? websiteName.trim().length > 1
      : mode === 'software'
        ? softwareDomain.trim().length > 1 && softwareDesc.trim().length > 8
        : crmDomain.trim().length > 1

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canGenerate) return
    setShowResult(true)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label="Close preview"
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0A0A0A] p-5 shadow-2xl sm:rounded-3xl sm:p-7"
        >
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#00DEFF]">
                Interactive preview
              </div>
              <h3
                className="mt-1 text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 p-2 text-white/70 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {!showResult ? (
            <form onSubmit={onSubmit} className="space-y-4">
              {mode === 'website' && (
                <>
                  <Field label="Website / brand name">
                    <input
                      value={websiteName}
                      onChange={(e) => setWebsiteName(e.target.value)}
                      placeholder="e.g. NovaMart or novamart.com"
                      className="field-input"
                      required
                    />
                  </Field>
                  <Field label="Website type">
                    <select
                      value={websiteType}
                      onChange={(e) =>
                        setWebsiteType(e.target.value as WebsiteType)
                      }
                      className="field-input"
                    >
                      {WEBSITE_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              )}

              {mode === 'software' && (
                <>
                  <Field label="Domain / product name">
                    <input
                      value={softwareDomain}
                      onChange={(e) => setSoftwareDomain(e.target.value)}
                      placeholder="e.g. stockflow.com"
                      className="field-input"
                      required
                    />
                  </Field>
                  <Field label="Describe your software">
                    <textarea
                      value={softwareDesc}
                      onChange={(e) => setSoftwareDesc(e.target.value)}
                      placeholder="e.g. We need an admin panel to manage warehouse inventory, suppliers, and low-stock alerts..."
                      className="field-input min-h-[120px] resize-y"
                      required
                    />
                  </Field>
                </>
              )}

              {mode === 'crm' && (
                <>
                  <Field label="Domain name">
                    <input
                      value={crmDomain}
                      onChange={(e) => setCrmDomain(e.target.value)}
                      placeholder="e.g. teamreach.com"
                      className="field-input"
                      required
                    />
                  </Field>
                  <Field label="Company / CRM name (optional)">
                    <input
                      value={crmName}
                      onChange={(e) => setCrmName(e.target.value)}
                      placeholder="e.g. TeamReach CRM"
                      className="field-input"
                    />
                  </Field>
                </>
              )}

              <button
                type="submit"
                disabled={!canGenerate}
                className="btn-cyan btn-shine inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#00DEFF]/40 bg-[#00DEFF]/10 px-6 py-3 text-sm font-semibold text-[#00DEFF] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate preview
                <ArrowRight size={15} />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowResult(false)}
                className="text-xs text-white/45 hover:text-[#00DEFF]"
              >
                ← Edit details
              </button>

              {mode === 'website' && (
                <WebsitePreviewTemplate
                  brand={brandFromName}
                  domain={displayDomain(websiteName)}
                  type={websiteType}
                />
              )}
              {mode === 'software' && (
                <SoftwarePreviewTemplate
                  domain={softwareDomain}
                  description={softwareDesc}
                />
              )}
              {mode === 'crm' && (
                <CrmPreviewTemplate
                  domain={crmDomain}
                  company={crmName || brandFromDomain(crmDomain)}
                />
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
      {children}
    </label>
  )
}

function brandFromDomain(domain: string) {
  return displayDomain(domain)
    .split('.')[0]
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
