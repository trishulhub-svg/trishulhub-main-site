'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Eye,
  Mail,
  Sparkles,
  X,
} from 'lucide-react'
import { AnimatedHeading } from '@/components/trishulhub/animated-heading'
import {
  WebsiteOsPanel,
  SoftwareOsPanel,
  CrmOsPanel,
} from '@/components/trishulhub/service-os-panels'
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
    num: '01',
    title: 'Website Development',
    headline: 'Scale your presence instantly',
    desc: 'Custom websites for every customer need — ecommerce, business, portfolio, or local brand — designed to load fast and convert.',
    ctaLine: 'Ready to shape your site with us?',
    startLabel: 'Start building your site',
    previewHint: 'Describe your business and hit Preview',
    bullets: [
      'Brand-true layouts for any industry',
      'Mobile-first, conversion-ready structure',
      'Preview a template before you commit',
    ],
    Panel: WebsiteOsPanel,
  },
  {
    id: 'software' as const,
    num: '02',
    title: 'Custom Software',
    headline: 'Run operations on your terms',
    desc: 'Admin panels and app systems for inventory, healthcare, ecommerce ops, and any workflow your team needs day to day.',
    ctaLine: 'Need a panel built around your process?',
    startLabel: 'Start designing your software',
    previewHint: 'Describe your software and hit Preview',
    bullets: [
      'Role-based dashboards & controls',
      'Mapped to inventory, health, shop, HR, and more',
      'Brief → live admin-style preview',
    ],
    Panel: SoftwareOsPanel,
  },
  {
    id: 'crm' as const,
    num: '03',
    title: 'CRM Solutions',
    headline: 'Keep every relationship clear',
    desc: 'CRM software to manage employees, customers, pipelines, and follow-ups — so your team stays aligned without chaos.',
    ctaLine: 'Want a CRM that matches how you sell?',
    startLabel: 'Start organizing your CRM',
    previewHint: 'Add your domain and hit Preview',
    bullets: [
      'Customers + employees in one place',
      'Pipeline and follow-up visibility',
      'CRM-themed landing preview included',
    ],
    Panel: CrmOsPanel,
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
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.2] stars-bg" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]"
          >
            <Sparkles size={14} />
            Services
          </motion.span>
          <AnimatedHeading
            as="h1"
            variant="rise"
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Three systems. *One craft studio.*
          </AnimatedHeading>
          <p className="mt-5 text-base text-white/55 sm:text-lg">
            Each service uses the same high-fidelity card layout — Contact us to
            talk, or describe your business and Preview a tailored mock.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: STAGGER.normal } },
          }}
          className="space-y-10"
        >
          {services.map((s) => {
            const Panel = s.Panel
            return (
              <motion.section
                key={s.id}
                id={s.id}
                variants={{
                  hidden: { opacity: 0, y: 48 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                  },
                }}
                className="electric-card scroll-mt-28 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8 lg:p-10"
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                  {/* Left copy — Scale your reach pattern */}
                  <div className="lg:col-span-5">
                    <div
                      className="text-5xl font-light text-white/10 sm:text-6xl"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {s.num}
                    </div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#00DEFF]">
                      {s.title}
                    </div>
                    <h2
                      className="mt-3 text-3xl font-light leading-tight text-white sm:text-4xl"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {s.headline}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
                      {s.desc}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-white/65"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00DEFF]" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-7 text-sm text-white/70">{s.ctaLine}</p>
                    <Link
                      href="/contact"
                      className="btn-cyan btn-shine mt-3 inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/40 bg-gradient-to-b from-[#00DEFF]/25 to-[#0088CC]/20 px-5 py-2.5 text-sm font-semibold text-[#00DEFF] shadow-[0_0_24px_rgba(0,222,255,0.2)] backdrop-blur-md hover:from-[#00DEFF]/35"
                    >
                      <Mail size={15} />
                      Contact us
                    </Link>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                        {s.previewHint}
                      </div>
                      <button
                        type="button"
                        onClick={() => setMode(s.id)}
                        className="btn-ghost mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:border-[#00DEFF]/45 hover:text-[#00DEFF] sm:w-auto"
                      >
                        <Eye size={15} />
                        Hit Preview
                      </button>
                    </div>

                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-[#00DEFF]"
                    >
                      {s.startLabel}
                      <ArrowRight size={15} />
                    </Link>
                  </div>

                  {/* Right OS / creative panel */}
                  <div className="lg:col-span-7">
                    <Panel />
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
