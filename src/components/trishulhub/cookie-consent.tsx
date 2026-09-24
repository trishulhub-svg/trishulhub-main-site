'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cookie, ShieldCheck, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  clearConsent,
  readConsent,
  writeConsent,
  type ConsentRecord,
} from '@/lib/consent'

/**
 * Cookie & storage notice + preference centre.
 *
 * Nothing here is a "cookie wall": the page is fully usable with the notice
 * showing, and the two exceptions we rely on (appearance, and a possible
 * future statistical one) only require clear information plus an easy way to
 * object — which is what this gives. See src/lib/consent.ts for the rules.
 */

/** Pages where a compliance notice makes no sense (internal screens). */
const HIDDEN_PREFIXES = ['/admin', '/lead']

export const OPEN_CONSENT_EVENT = 'trishulhub:open-cookie-settings'

/** Footer / policy-page button that reopens the preference centre. */
export function CookieSettingsButton({
  className = '',
  children = 'Cookie settings',
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT))
      }
      className={className}
    >
      {children}
    </button>
  )
}

type Choice = { appearance: boolean; analytics: boolean }

export function CookieConsent() {
  const pathname = usePathname()
  const [record, setRecord] = useState<ConsentRecord | null>(null)
  const [ready, setReady] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [draft, setDraft] = useState<Choice>({ appearance: true, analytics: false })

  /* Read the stored choice once, after mount (localStorage is client-only). */
  useEffect(() => {
    const existing = readConsent()
    setRecord(existing)
    setDraft(
      existing
        ? { appearance: existing.appearance, analytics: existing.analytics }
        : { appearance: true, analytics: false },
    )
    setReady(true)
  }, [])

  /* The footer button (or the policy page) can reopen the panel. */
  useEffect(() => {
    const open = () => setPanelOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, open)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open)
  }, [])

  /* Escape closes the panel. */
  useEffect(() => {
    if (!panelOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPanelOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panelOpen])

  const save = useCallback((choice: Choice, source: string) => {
    setRecord(writeConsent(choice, source))
    setDraft(choice)
    setPanelOpen(false)
  }, [])

  if (!ready) return null
  if (HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p))) return null

  const showBanner = !record && !panelOpen

  return (
    <>
      <AnimatePresence>
        {showBanner ? (
          <motion.div
            key="banner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            /* bottom-24 on phones so it clears the chat button (bottom-5, 56px
               tall). From sm up the notice is left-aligned, well clear of the
               bottom-right chat button, so it can sit lower. The chat trigger
               keeps a higher z-index, so the notice never blocks it. */
            className="fixed inset-x-3 bottom-24 z-[60] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[27rem]"
            role="region"
            aria-label="Cookies and storage"
          >
            <div className="rounded-2xl border border-[#111111]/12 bg-white p-5 shadow-[0_18px_50px_rgba(6,43,22,0.16)]">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0D3C1F] text-white">
                  <Cookie size={16} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#111111]">
                    Cookies &amp; device storage
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#6b7280]">
                    We keep this simple. No advertising or tracking cookies, and
                    no analytics. We only store what the site needs — your
                    light/dark choice, your chat draft while you use it, and a
                    security cookie if you sign in to the admin area.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => save({ appearance: true, analytics: false }, 'banner-accept-all')}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0D3C1F] px-4 text-[13px] font-semibold text-white transition hover:bg-[#164a28]"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => save({ appearance: false, analytics: false }, 'banner-essential-only')}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-[#0D3C1F] bg-white px-4 text-[13px] font-medium text-[#0D3C1F] transition hover:bg-[#f4faf7]"
                >
                  Essential only
                </button>
                <button
                  type="button"
                  onClick={() => setPanelOpen(true)}
                  className="inline-flex h-10 items-center px-2 text-[13px] font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-4 transition hover:decoration-[#0D3C1F]"
                >
                  Choose
                </button>
              </div>

              <p className="mt-3 text-[11.5px] text-[#9ca3af]">
                Read the{' '}
                <Link
                  href="/cookies"
                  className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                >
                  cookie &amp; storage policy
                </Link>{' '}
                ·{' '}
                <Link
                  href="/privacy"
                  className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                >
                  privacy notice
                </Link>
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {panelOpen ? (
          <ConsentPanel
            draft={draft}
            setDraft={setDraft}
            onClose={() => setPanelOpen(false)}
            onSave={save}
            hasStoredChoice={!!record}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

function Row({
  title,
  status,
  children,
  checked,
  onChange,
}: {
  title: string
  status: string
  children: React.ReactNode
  checked?: boolean
  onChange?: (next: boolean) => void
}) {
  const toggleable = typeof checked === 'boolean' && !!onChange
  return (
    <div className="rounded-xl border border-[#111111]/12 bg-[#fafafa] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13.5px] font-bold text-[#111111]">{title}</p>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0d9488]">
            {status}
          </p>
        </div>
        {toggleable ? (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={`${title}: ${checked ? 'on' : 'off'}`}
            onClick={() => onChange?.(!checked)}
            className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
              checked ? 'bg-[#0D3C1F]' : 'bg-[#111111]/20'
            }`}
          >
            <span
              className={`ml-0.5 inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                checked ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        ) : (
          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#e8f5ef] px-2.5 py-1 text-[11px] font-semibold text-[#0D3C1F]">
            <ShieldCheck size={11} />
            Always on
          </span>
        )}
      </div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-[#6b7280]">{children}</p>
    </div>
  )
}

function ConsentPanel({
  draft,
  setDraft,
  onClose,
  onSave,
  hasStoredChoice,
}: {
  draft: Choice
  setDraft: (next: Choice) => void
  onClose: () => void
  onSave: (choice: Choice, source: string) => void
  hasStoredChoice: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      /* Above the chat widget's own (very high) z-index so the preference
         dialog is never overlapped by it. */
      className="fixed inset-0 z-[2147483600] flex items-end justify-center bg-[#111111]/45 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.99 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-panel-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-[#111111]/12 bg-white p-5 shadow-[0_24px_70px_rgba(6,43,22,0.28)] sm:max-w-lg sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="consent-panel-title"
              className="text-lg font-bold text-[#111111]"
            >
              Cookies &amp; storage
            </h2>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[#6b7280]">
              Choose what this site may keep on your device. Your choice is
              saved in this browser and you can change it at any time.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#111111]/12 text-[#6b7280] transition hover:text-[#111111]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <Row title="Strictly necessary" status="No choice needed">
            Required for the site to work: keeping you signed in to the admin
            area, protecting forms from abuse, and holding your enquiry draft
            while the chat is open. These are exempt from consent under PECR
            because the service cannot be provided without them.
          </Row>

          <Row
            title="Display preference"
            status="On by default · you can object"
            checked={draft.appearance}
            onChange={(next) => setDraft({ ...draft, appearance: next })}
          >
            Remembers whether you chose the light or dark theme, so it looks the
            same next time. Covered by the PECR “appearance” exception — turn
            this off and we stop storing it (the site then follows your device
            setting instead).
          </Row>

          <Row
            title="Analytics"
            status="Not used on this site"
            checked={draft.analytics}
            onChange={(next) => setDraft({ ...draft, analytics: next })}
          >
            We do not run any analytics or advertising tools today. This stays
            off by default; if we ever add privacy-friendly statistics, they
            will only load when you have allowed them here.
          </Row>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSave(draft, 'settings-save')}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0D3C1F] px-5 text-[13.5px] font-semibold text-white transition hover:bg-[#164a28]"
          >
            Save my choice
          </button>
          <button
            type="button"
            onClick={() => {
              setDraft({ appearance: true, analytics: true })
              onSave({ appearance: true, analytics: true }, 'settings-accept-all')
            }}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#0D3C1F] bg-white px-5 text-[13.5px] font-medium text-[#0D3C1F] transition hover:bg-[#f4faf7]"
          >
            Allow all
          </button>
          {hasStoredChoice ? (
            <button
              type="button"
              onClick={() => {
                clearConsent()
                onClose()
              }}
              className="ml-auto inline-flex h-11 items-center px-2 text-[13px] font-medium text-[#6b7280] underline decoration-[#6b7280]/30 underline-offset-4 transition hover:text-[#111111]"
            >
              Clear my choice
            </button>
          ) : null}
        </div>

        <p className="mt-4 text-[11.5px] leading-relaxed text-[#9ca3af]">
          Full detail, including how long each item lasts, is in the{' '}
          <Link
            href="/cookies"
            className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
          >
            cookie &amp; storage policy
          </Link>
          .
        </p>
      </motion.div>
    </motion.div>
  )
}
