'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock } from 'lucide-react'
import { BrandLogo } from '@/components/trishulhub/brand-logo'
import { EASE_OUT_EXPO } from '@/lib/animations'

export function ResetPasswordClient() {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get('token') ?? '')
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Use at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Both passwords must match.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/admin/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data?.error || 'Could not reset the password.')
        return
      }
      setDone(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] px-4 py-12 text-[#111111]">
      <div className="lt-glow pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-[#111111]/15 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <BrandLogo size="xl" href="/" showWordmark={false} className="justify-center" />
            <h1 className="mt-2 text-2xl font-bold uppercase tracking-[0.06em] text-[#0a0a0a]">
              New password
            </h1>
            <p className="mt-2 text-sm text-[#6b7280]">
              Choose a new password for your admin login.
            </p>
          </div>

          {done ? (
            <div className="space-y-5 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5ef] text-[#0D3C1F]">
                <CheckCircle2 size={26} />
              </span>
              <p className="text-sm leading-relaxed text-[#374151]">
                Your password has been updated. You can sign in with it now.
              </p>
              <Link
                href="/admin"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#0D3C1F] text-sm font-semibold text-white transition hover:bg-[#164a28]"
              >
                Go to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!token ? (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  This page needs the link from your reset email.
                </div>
              ) : null}

              {error ? (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              ) : null}

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  New password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                  />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="field-input pl-10 pr-10"
                    placeholder="At least 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] transition hover:text-[#374151]"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Confirm password
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="field-input"
                  placeholder="Repeat the password"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !token}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#0D3C1F] text-sm font-semibold text-white transition hover:bg-[#164a28] disabled:opacity-50"
              >
                {loading ? 'Saving…' : 'Set new password'}
              </button>

              <p className="pt-1 text-center text-xs text-[#9ca3af]">
                <Link href="/admin" className="th-link hover:text-[#0D3C1F]">
                  Back to login
                </Link>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
