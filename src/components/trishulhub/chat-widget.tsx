'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  ArrowLeft,
  Check,
  Mail,
  MessageCircle,
  Send,
  X,
} from 'lucide-react'
import { useSiteContact } from '@/components/trishulhub/site-contact-provider'
import {
  emailDraftUrl,
  enquiryEmailDraft,
  enquiryWhatsAppDraft,
} from '@/lib/site-contact'
import { EASE_OUT_EXPO } from '@/lib/animations'

/**
 * Site chat assistant.
 *
 * Asks the same questions as the project planner, adds the name / email the
 * planner never captured, and stores the enquiry through /api/contact-leads so
 * it lands in the admin leads list. WhatsApp + email stay available at the end,
 * reusing the same professional drafts as the contact page.
 *
 * Deliberate choices:
 *  - Plain React + Tailwind (no animation library): the panel opens instantly
 *    and never contributes to a hydration mismatch.
 *  - Progress is kept in sessionStorage, so a reload or a page change does not
 *    throw away what the visitor already typed.
 *  - Hidden on /admin and /lead — internal screens should not carry a customer
 *    chat button over the top of them.
 */

const SERVICES = ['Custom Software', 'Websites', 'Mobile Apps'] as const
const BUDGETS = ['£1,500', '£2,500', '£5,000', '£10,000', 'Custom'] as const
const TIMINGS = [
  'As soon as possible',
  'Within 1 month',
  '1–3 months',
  'Just exploring',
] as const

type Stage =
  | 'service'
  | 'budget'
  | 'timing'
  | 'name'
  | 'email'
  | 'phone'
  | 'review'
  | 'done'

const ORDER: Stage[] = [
  'service',
  'budget',
  'timing',
  'name',
  'email',
  'phone',
  'review',
]

type Answers = {
  service: string
  budget: string
  timing: string
  name: string
  email: string
  phone: string
}

const EMPTY: Answers = {
  service: '',
  budget: '',
  timing: '',
  name: '',
  email: '',
  phone: '',
}

const STORAGE_KEY = 'trishulhub-chat-v1'
const HIDDEN_PREFIXES = ['/admin', '/lead']

const QUESTIONS: Record<Stage, string> = {
  service: 'Which service do you need?',
  budget: 'What budget range are you working with?',
  timing: 'When would you like to start?',
  name: 'Great — what is your name?',
  email: 'And the best email to reach you on?',
  phone: 'Add a phone number? Totally optional.',
  review: 'Here is what I will send the team.',
  done: '',
}

export function ChatWidget() {
  const pathname = usePathname()
  const contact = useSiteContact()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(true)
  /**
   * Hydration-safe hiding: we cannot branch on `usePathname()` during the very
   * first render without risking a server/client mismatch, so the trigger is
   * always server-rendered and simply removed once we know we are on an
   * internal screen (/admin, /lead).
   */
  const [hidden, setHidden] = useState(false)
  const [stage, setStage] = useState<Stage>('service')
  const [answers, setAnswers] = useState<Answers>(EMPTY)
  const [text, setText] = useState('')
  const [customBudget, setCustomBudget] = useState(false)
  const [typing, setTyping] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shareToken, setShareToken] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const logRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setHidden(HIDDEN_PREFIXES.some((p) => (pathname ?? '').startsWith(p)))
  }, [pathname])

  /* ---------- restore / persist progress ---------- */
  useEffect(() => {
    setMounted(true)
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      const opened = sessionStorage.getItem(`${STORAGE_KEY}:seen`)
      if (opened === '1') setSeen(true)
      else setSeen(false)
      if (!raw) return
      const saved = JSON.parse(raw) as {
        stage?: Stage
        answers?: Answers
      }
      if (saved.answers) setAnswers({ ...EMPTY, ...saved.answers })
      if (saved.stage && ORDER.includes(saved.stage)) setStage(saved.stage)
    } catch {
      /* ignore malformed storage */
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ stage, answers }),
      )
    } catch {
      /* storage full / blocked */
    }
  }, [mounted, stage, answers])

  /* ---------- open / focus / typing ---------- */
  useEffect(() => {
    if (!open) return
    try {
      sessionStorage.setItem(`${STORAGE_KEY}:seen`, '1')
    } catch {
      /* ignore */
    }
    setSeen(true)
  }, [open])

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(id)
  }, [open, stage])

  useEffect(() => {
    if (!open || stage === 'review' || stage === 'done') return
    setTyping(true)
    const id = window.setTimeout(() => setTyping(false), 520)
    return () => window.clearTimeout(id)
  }, [open, stage])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    logRef.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [open, stage, typing, error, shareToken])

  /* ---------- flow ---------- */
  const stepIndex = ORDER.indexOf(stage)
  const progress =
    stage === 'done'
      ? 100
      : Math.round((Math.max(stepIndex, 0) / (ORDER.length - 1)) * 100)

  function go(next: Stage) {
    setText('')
    setError(null)
    setStage(next)
  }

  function choose(patch: Partial<Answers>) {
    setAnswers((current) => ({ ...current, ...patch }))
  }

  function goBack() {
    if (stage === 'service' || stage === 'done') return
    const previous = ORDER[Math.max(stepIndex - 1, 0)]
    if (stage === 'budget') setCustomBudget(false)
    go(previous)
  }

  async function submit() {
    setSending(true)
    setError(null)
    try {
      const response = await fetch('/api/contact-leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: answers.name,
          email: answers.email,
          service: answers.service || 'Not sure yet',
          // Budget goes in its own field; the API appends it to the stored
          // message, so it must NOT be repeated here.
          budget: answers.budget,
          message: [
            'Planned with the site assistant.',
            '',
            `Service: ${answers.service || 'Not sure yet'}`,
            `Start: ${answers.timing || 'Flexible'}`,
            answers.phone ? `Phone: ${answers.phone}` : '',
          ]
            .filter((line) => line !== '')
            .join('\n'),
          website: '',
        }),
      })
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; lead?: { shareToken?: string } }
        | null
      if (!response.ok || !payload?.ok) {
        throw new Error(
          payload?.error ?? 'Could not send that. Please try again.',
        )
      }
      setShareToken(payload.lead?.shareToken ?? null)
      setStage('done')
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Could not send that.',
      )
    } finally {
      setSending(false)
    }
  }

  function restart() {
    setAnswers(EMPTY)
    setText('')
    setCustomBudget(false)
    setShareToken(null)
    setError(null)
    setStage('service')
  }

  const details = {
    service: answers.service,
    budget: answers.budget,
    timing: answers.timing,
    name: answers.name,
    email: answers.email,
    phone: answers.phone,
  }

  const waHref = contact.whatsappWithMessage(enquiryWhatsAppDraft(details))
  const mailHref = emailDraftUrl(contact, enquiryEmailDraft(details))

  const summaryLines = [
    `Service: ${answers.service || 'Not sure yet'}`,
    `Budget: ${answers.budget || 'Not decided'}`,
    `Start: ${answers.timing || 'Flexible'}`,
    `Name: ${answers.name}`,
    `Email: ${answers.email}`,
    answers.phone ? `Phone: ${answers.phone}` : '',
  ].filter(Boolean)

  // The trigger is rendered on the server so the button is present in the
  // initial HTML; `mounted` only gates session-scoped extras (unread dot).
  if (hidden) return null

  const optionClass =
    'w-full rounded-xl border border-[#0d3c1f]/15 bg-white px-4 py-2.5 text-left text-[13.5px] font-medium text-[#111111] transition hover:-translate-y-px hover:border-[#0D3C1F]/40 hover:bg-[#f4faf7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0d9488]'
  const primaryClass =
    'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0D3C1F] px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-[#164a28] disabled:pointer-events-none disabled:opacity-50'
  const ghostClass =
    'inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#d1d5db] px-3 py-2.5 text-[12.5px] font-semibold text-[#111111] transition hover:border-[#0D3C1F]/40 hover:text-[#0D3C1F]'
  const bubble =
    'max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#374151] shadow-sm'

  return (
    <>
      {/* Trigger */}
      <button
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-5 right-5 z-[2147483000] flex h-14 w-14 items-center justify-center rounded-full bg-[#0D3C1F] text-white shadow-[0_14px_34px_rgba(6,43,22,0.32)] transition hover:scale-[1.04] hover:bg-[#164a28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d9488]"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? (
          <X aria-hidden size={22} />
        ) : (
          <MessageCircle aria-hidden size={23} />
        )}
        {!open && !seen ? (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5eead4] text-[10px] font-bold text-[#0b3b22] ring-2 ring-white"
          >
            1
          </span>
        ) : null}
      </button>

      {open ? (
        <section
          aria-label="Chat with TrishulHub"
          role="dialog"
          className="fixed bottom-24 right-5 z-[2147483000] flex max-h-[min(76vh,600px)] w-[min(92vw,384px)] flex-col overflow-hidden rounded-2xl border border-[#0d3c1f]/15 bg-[#f7fbf9] shadow-[0_28px_70px_rgba(6,43,22,0.28)]"
        >
          {/* Header */}
          <header className="relative bg-[#0D3C1F] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-[12px] font-bold"
              >
                TH
              </span>
              <div className="min-w-0 leading-tight">
                <p className="text-sm font-semibold">TrishulHub</p>
                <p className="flex items-center gap-1.5 text-[11.5px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5eead4]" />
                  Replies within one business day
                </p>
              </div>
              <button
                aria-label="Close chat"
                className="ml-auto rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X aria-hidden size={16} />
              </button>
            </div>

            {/* Progress */}
            <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
              <span
                className="block h-full rounded-full bg-[#5eead4] transition-[width] duration-500"
                style={{ width: `${progress}%`, transitionTimingFunction: `cubic-bezier(${EASE_OUT_EXPO.join(',')})` }}
              />
            </div>
          </header>

          {/* Conversation */}
          <div
            ref={logRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            <p className={bubble}>
              Hi — I am the TrishulHub assistant. Four quick questions and the
              team gets a proper brief.
            </p>

            {answers.service ? (
              <p className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#0D3C1F] px-3.5 py-2 text-[13.5px] text-white">
                {answers.service}
              </p>
            ) : null}
            {stage !== 'service' && answers.budget ? (
              <p className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#0D3C1F] px-3.5 py-2 text-[13.5px] text-white">
                {answers.budget}
              </p>
            ) : null}
            {ORDER.indexOf(stage) > ORDER.indexOf('timing') && answers.timing ? (
              <p className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#0D3C1F] px-3.5 py-2 text-[13.5px] text-white">
                {answers.timing}
              </p>
            ) : null}
            {ORDER.indexOf(stage) > ORDER.indexOf('name') && answers.name ? (
              <p className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#0D3C1F] px-3.5 py-2 text-[13.5px] text-white">
                {answers.name}
              </p>
            ) : null}
            {ORDER.indexOf(stage) > ORDER.indexOf('email') && answers.email ? (
              <p className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#0D3C1F] px-3.5 py-2 text-[13.5px] text-white">
                {answers.email}
              </p>
            ) : null}
            {stage !== 'phone' && answers.phone ? (
              <p className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#0D3C1F] px-3.5 py-2 text-[13.5px] text-white">
                {answers.phone}
              </p>
            ) : null}

            {typing ? (
              <span
                aria-hidden
                className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm"
              >
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0d3c1f]/35"
                    style={{ animationDelay: `${dot * 120}ms` }}
                  />
                ))}
              </span>
            ) : stage !== 'done' ? (
              <p className={bubble}>{QUESTIONS[stage]}</p>
            ) : null}

            {/* ---- answers ---- */}
            {!typing && stage === 'service' ? (
              <div className="space-y-2 pt-1">
                {SERVICES.map((service) => (
                  <button
                    key={service}
                    className={optionClass}
                    onClick={() => {
                      choose({ service })
                      go('budget')
                    }}
                    type="button"
                  >
                    {service}
                  </button>
                ))}
                <button
                  className={optionClass}
                  onClick={() => {
                    choose({ service: 'Not sure yet' })
                    go('timing')
                  }}
                  type="button"
                >
                  Not sure yet
                </button>
              </div>
            ) : null}

            {!typing && stage === 'budget' ? (
              customBudget ? (
                <div className="flex gap-2 pt-1">
                  <input
                    autoComplete="off"
                    className="w-full rounded-xl border border-[#0d3c1f]/15 px-3 py-2.5 text-sm outline-none focus:border-[#0d9488]"
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter' || !text.trim()) return
                      choose({ budget: text.trim() })
                      go('timing')
                    }}
                    placeholder="e.g. £3,500 — or “not sure yet”"
                    ref={inputRef}
                    value={text}
                  />
                  <button
                    className="rounded-xl bg-[#0D3C1F] px-4 text-sm font-semibold text-white disabled:opacity-40"
                    disabled={!text.trim()}
                    onClick={() => {
                      choose({ budget: text.trim() })
                      go('timing')
                    }}
                    type="button"
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  {BUDGETS.map((budget) => (
                    <button
                      key={budget}
                      className={optionClass}
                      onClick={() => {
                        if (budget === 'Custom') {
                          setCustomBudget(true)
                          setText('')
                          return
                        }
                        choose({ budget })
                        go('timing')
                      }}
                      type="button"
                    >
                      {budget === 'Custom'
                        ? 'Custom — I will type it'
                        : budget}
                    </button>
                  ))}
                </div>
              )
            ) : null}

            {!typing && stage === 'timing' ? (
              <div className="space-y-2 pt-1">
                {TIMINGS.map((timing) => (
                  <button
                    key={timing}
                    className={optionClass}
                    onClick={() => {
                      choose({ timing })
                      go('name')
                    }}
                    type="button"
                  >
                    {timing}
                  </button>
                ))}
              </div>
            ) : null}

            {!typing && (stage === 'name' || stage === 'email' || stage === 'phone') ? (
              <div className="space-y-2 pt-1">
                <div className="flex gap-2">
                  <input
                    autoComplete={
                      stage === 'name'
                        ? 'name'
                        : stage === 'email'
                          ? 'email'
                          : 'tel'
                    }
                    aria-label={
                      stage === 'name'
                        ? 'Your name'
                        : stage === 'email'
                          ? 'Your email'
                          : 'Your phone number'
                    }
                    className="w-full rounded-xl border border-[#0d3c1f]/15 px-3 py-2.5 text-sm outline-none focus:border-[#0d9488]"
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter') return
                      const value = text.trim()
                      if (stage === 'name' && value) {
                        choose({ name: value })
                        go('email')
                      } else if (stage === 'email' && value.includes('@')) {
                        choose({ email: value })
                        go('phone')
                      } else if (stage === 'phone') {
                        choose({ phone: value })
                        go('review')
                      }
                    }}
                    placeholder={
                      stage === 'name'
                        ? 'Your name'
                        : stage === 'email'
                          ? 'you@company.com'
                          : '+44 7000 000000'
                    }
                    ref={inputRef}
                    type={stage === 'email' ? 'email' : 'text'}
                    value={text}
                  />
                  <button
                    className="rounded-xl bg-[#0D3C1F] px-4 text-sm font-semibold text-white disabled:opacity-40"
                    disabled={
                      (stage !== 'phone' && !text.trim()) ||
                      (stage === 'email' && !text.includes('@'))
                    }
                    onClick={() => {
                      const value = text.trim()
                      if (stage === 'name') {
                        choose({ name: value })
                        go('email')
                      } else if (stage === 'email') {
                        choose({ email: value })
                        go('phone')
                      } else {
                        choose({ phone: value })
                        go('review')
                      }
                    }}
                    type="button"
                  >
                    Next
                  </button>
                </div>
                {stage === 'phone' ? (
                  <button
                    className="text-[12px] font-semibold text-[#6b7280] underline-offset-2 hover:text-[#0D3C1F] hover:underline"
                    onClick={() => {
                      choose({ phone: '' })
                      go('review')
                    }}
                    type="button"
                  >
                    Skip — email is fine
                  </button>
                ) : null}
              </div>
            ) : null}

            {stage === 'review' ? (
              <div className="space-y-3 pt-1">
                <pre className="whitespace-pre-wrap break-words rounded-xl border border-[#0d3c1f]/12 bg-white p-3 text-[12.5px] leading-relaxed text-[#374151]">
                  {summaryLines.join('\n')}
                </pre>
                {error ? (
                  <p className="text-[12.5px] font-medium text-red-600">
                    {error}
                  </p>
                ) : null}
                <button
                  className={primaryClass}
                  disabled={sending}
                  onClick={() => void submit()}
                  type="button"
                >
                  {sending ? (
                    'Sending…'
                  ) : (
                    <>
                      <Send aria-hidden size={15} />
                      Send to TrishulHub
                    </>
                  )}
                </button>
                <div className="flex gap-2">
                  <a
                    className={ghostClass}
                    href={waHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <MessageCircle aria-hidden size={13} />
                    WhatsApp
                  </a>
                  <a className={ghostClass} href={mailHref}>
                    <Mail aria-hidden size={13} />
                    Email
                  </a>
                </div>
              </div>
            ) : null}

            {stage === 'done' ? (
              <div className="space-y-3 pt-1">
                <p className="flex items-start gap-2 rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#374151] shadow-sm">
                  <Check
                    aria-hidden
                    className="mt-0.5 shrink-0 text-[#0d9488]"
                    size={16}
                  />
                  <span>
                    Thanks {answers.name.split(' ')[0] || 'there'} — your brief
                    is with the team. We reply within one business day, usually
                    with a few questions and a fixed-price plan.
                  </span>
                </p>
                {shareToken ? (
                  <a className={primaryClass} href={`/lead/${shareToken}`}>
                    View your brief
                  </a>
                ) : null}
                <button
                  className="w-full rounded-xl border border-[#d1d5db] px-4 py-2.5 text-[13px] font-semibold text-[#111111] transition hover:border-[#0D3C1F]/40"
                  onClick={restart}
                  type="button"
                >
                  Start another enquiry
                </button>
              </div>
            ) : null}
          </div>

          {/* Footer: back + note */}
          <div className="flex items-center justify-between gap-3 border-t border-[#0d3c1f]/10 bg-white px-4 py-2">
            {stage !== 'service' && stage !== 'done' ? (
              <button
                className="inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-[12px] font-semibold text-[#6b7280] transition hover:text-[#0D3C1F]"
                onClick={goBack}
                type="button"
              >
                <ArrowLeft aria-hidden size={13} />
                Back
              </button>
            ) : (
              <span className="text-[11px] text-[#9ca3af]">
                {progress}% complete
              </span>
            )}
            <span className="text-[11px] text-[#9ca3af]">
              We only use this to reply.
            </span>
          </div>
        </section>
      ) : null}
    </>
  )
}
