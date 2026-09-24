'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Mail, Loader2, AlertCircle } from 'lucide-react'

type SmtpView = {
  host: string
  port: number
  secure: boolean
  user: string
  fromName: string
  fromEmail: string
  hasPassword: boolean
}

/**
 * SMTP credentials for password-reset email. Rendered only for Taroon; the API
 * enforces the same rule server-side, so hiding it here is convenience, not
 * security.
 */
export function SmtpSettingsCard() {
  const [settings, setSettings] = useState<SmtpView | null>(null)
  const [configured, setConfigured] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [ok, setOk] = useState(false)

  const [host, setHost] = useState('')
  const [port, setPort] = useState('587')
  const [secure, setSecure] = useState(false)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [fromName, setFromName] = useState('TrishulHub')
  const [fromEmail, setFromEmail] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/admin/api/smtp')
        const data = await res.json()
        if (cancelled || !data?.ok) return
        setConfigured(Boolean(data.configured))
        if (data.settings) {
          const s = data.settings as SmtpView
          setSettings(s)
          setHost(s.host)
          setPort(String(s.port))
          setSecure(s.secure)
          setUser(s.user)
          setFromName(s.fromName)
          setFromEmail(s.fromEmail)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  async function save() {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/admin/api/smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host,
          port: Number(port),
          secure,
          user,
          pass,
          fromName,
          fromEmail,
        }),
      })
      const data = await res.json()
      setOk(Boolean(data?.ok))
      setMessage(data?.ok ? 'SMTP settings saved.' : (data?.error ?? 'Could not save.'))
      if (data?.ok) {
        setConfigured(true)
        setPass('')
        setSettings((s) => (s ? { ...s, hasPassword: s.hasPassword || Boolean(pass) } : s))
      }
    } catch {
      setOk(false)
      setMessage('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function sendTest() {
    setTesting(true)
    setMessage(null)
    try {
      const res = await fetch('/admin/api/smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true, to: fromEmail }),
      })
      const data = await res.json()
      setOk(Boolean(data?.ok))
      setMessage(
        data?.ok
          ? `Test email sent to ${data.sentTo}.`
          : (data?.error ?? 'Test failed.'),
      )
    } catch {
      setOk(false)
      setMessage('Network error. Please try again.')
    } finally {
      setTesting(false)
    }
  }

  return (
    <section className="rounded-2xl border border-[#111111]/12 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0D3C1F] text-white">
          <Mail size={17} />
        </span>
        <div>
          <h2 className="text-base font-bold text-[#111111]">SMTP settings</h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Used to send “forgot password” links from the admin login. Only
            Taroon sees this card.
          </p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold">
            {configured ? (
              <>
                <CheckCircle2 size={13} className="text-[#0D3C1F]" />
                <span className="text-[#0D3C1F]">Configured</span>
              </>
            ) : (
              <>
                <AlertCircle size={13} className="text-amber-600" />
                <span className="text-amber-700">Not configured yet</span>
              </>
            )}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-[#6b7280]">Loading…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
              SMTP host
            </span>
            <input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="smtp.gmail.com"
              className="field-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
              Port
            </span>
            <input
              value={port}
              onChange={(e) => setPort(e.target.value.replace(/\D/g, ''))}
              placeholder="587"
              inputMode="numeric"
              className="field-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
              Username
            </span>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="you@trishulhub.com"
              autoComplete="off"
              className="field-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
              Password / app password
            </span>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder={settings?.hasPassword ? '•••••••• (saved)' : 'App password'}
              autoComplete="new-password"
              className="field-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
              From name
            </span>
            <input
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              placeholder="TrishulHub"
              className="field-input"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
              From email
            </span>
            <input
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="info@trishulhub.in"
              type="email"
              className="field-input"
            />
          </label>

          <label className="flex items-center gap-2.5 sm:col-span-2">
            <input
              type="checkbox"
              checked={secure}
              onChange={(e) => setSecure(e.target.checked)}
              className="h-4 w-4 rounded border-[#111111]/20"
            />
            <span className="text-sm text-[#374151]">
              Use implicit TLS (tick for port 465; leave off for 587/STARTTLS)
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0D3C1F] px-6 text-sm font-semibold text-white transition hover:bg-[#164a28] disabled:opacity-50"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : null}
              {saving ? 'Saving…' : 'Save SMTP settings'}
            </button>
            <button
              type="button"
              onClick={sendTest}
              disabled={testing || !configured}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#0D3C1F]/40 px-6 text-sm font-semibold text-[#0D3C1F] transition hover:bg-[#0D3C1F]/10 disabled:opacity-40"
            >
              {testing ? <Loader2 size={15} className="animate-spin" /> : null}
              Send test email
            </button>
          </div>

          {message ? (
            <p
              className={`sm:col-span-2 text-sm ${
                ok ? 'text-[#0D3C1F]' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          ) : null}
        </div>
      )}
    </section>
  )
}
