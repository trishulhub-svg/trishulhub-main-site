'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Copy, Mail, X } from 'lucide-react'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import {
  emailDraftUrl,
  enquiryEmailDraft,
  gmailComposeUrl,
  outlookComposeUrl,
} from '@/lib/site-contact'

/**
 * "Send this by email" chooser.
 *
 * A bare `mailto:` does nothing useful for most visitors — if no desktop mail
 * client is configured the browser either shows an empty "choose an app" prompt
 * or nothing happens at all. So every email action on the site routes through
 * this: pick Gmail, Outlook, or the device's own mail app, with the message
 * already written.
 *
 * The address is always read from the live Site Contact settings, so whenever
 * the owner changes the contact email every one of these follows it.
 */

type Draft = { subject?: string; body?: string }
type OpenFn = (draft?: Draft) => void

const EmailOptionsContext = createContext<OpenFn | null>(null)

/** Opens the chooser from anywhere inside the site shell. */
export function useEmailOptions(): OpenFn {
  const ctx = useContext(EmailOptionsContext)
  return ctx ?? (() => {})
}

export function EmailOptionsProvider({ children }: { children: ReactNode }) {
  const contact = useSiteContact()
  const [draft, setDraft] = useState<Draft | null>(null)
  const [copied, setCopied] = useState(false)

  const open = useCallback<OpenFn>((next) => {
    setCopied(false)
    setDraft(next ?? {})
  }, [])

  useEffect(() => {
    if (!draft) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDraft(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [draft])

  const message = useMemo(() => {
    const fallback = enquiryEmailDraft()
    return {
      subject: draft?.subject ?? fallback.subject,
      body: draft?.body ?? fallback.body,
    }
  }, [draft])

  const value = useMemo(() => open, [open])

  return (
    <EmailOptionsContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {draft ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[2147483600] flex items-end justify-center bg-[#111111]/50 p-0 sm:items-center sm:p-6"
            onClick={() => setDraft(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="email-options-title"
              initial={{ opacity: 0, y: 24, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.99 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-t-2xl border border-[#111111]/12 bg-white p-6 shadow-[0_24px_70px_rgba(6,43,22,0.28)] sm:rounded-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="email-options-title"
                    className="text-lg font-bold text-[#111111]"
                  >
                    Send it by email
                  </h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#6b7280]">
                    Your message is written and addressed to{' '}
                    <span className="font-medium text-[#0D3C1F]">
                      {contact.email}
                    </span>
                    . Pick where you would like to send it from.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#111111]/12 text-[#6b7280] transition hover:text-[#111111]"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-5 space-y-2.5">
                <a
                  href={gmailComposeUrl(contact, message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDraft(null)}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0D3C1F] text-sm font-semibold text-white transition hover:bg-[#164a28]"
                >
                  <Mail size={16} />
                  Open in Gmail
                </a>
                <a
                  href={outlookComposeUrl(contact, message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDraft(null)}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#0D3C1F] bg-white text-sm font-semibold text-[#0D3C1F] transition hover:bg-[#f4faf7]"
                >
                  <Mail size={16} />
                  Open in Outlook
                </a>
                <a
                  href={emailDraftUrl(contact, message)}
                  onClick={() => setDraft(null)}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#d1d5db] bg-white text-sm font-medium text-[#374151] transition hover:border-[#0D3C1F]/40 hover:text-[#0D3C1F]"
                >
                  <Mail size={16} />
                  Use this device&apos;s mail app
                </a>
              </div>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(contact.email)
                    setCopied(true)
                  } catch {
                    setCopied(false)
                  }
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#6b7280] transition hover:text-[#111111]"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Address copied' : `Copy ${contact.email}`}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </EmailOptionsContext.Provider>
  )
}
