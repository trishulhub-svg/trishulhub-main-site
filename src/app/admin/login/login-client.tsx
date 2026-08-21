'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, User as UserIcon, ArrowRight, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'
import { BrandLogo } from '@/components/trishulhub/brand-logo'
import { EASE_OUT_EXPO } from '@/lib/animations'

export function LoginClient() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/admin/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data?.error || 'Login failed')
        setLoading(false)
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafa] text-[#111111]">
      <div className="lt-glow pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-70" />

      {/* Header — matches main site floating navbar */}
      <header className="relative z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mt-3 flex items-center justify-between gap-3 rounded-2xl border border-[#111111]/15 bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-md sm:px-5">
            <div className="relative z-10 shrink-0">
              <span className="md:hidden">
                <BrandLogo size="mdPlus" showWordmark={false} href="/" />
              </span>
              <span className="hidden md:inline-flex">
                <BrandLogo size="md" href="/" />
              </span>
            </div>

            <Link
              href="/"
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-bold uppercase tracking-[0.06em] text-[#0a0a0a] md:hidden"
            >
              TrishulHub
            </Link>

            <Link
              href="/"
              className="relative z-10 inline-flex h-10 items-center rounded-full bg-[#0D3C1F] px-5 text-sm font-semibold text-white transition hover:bg-[#164a28]"
            >
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="w-full max-w-md"
        >
          <div className="overflow-hidden rounded-2xl border border-[#111111] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-10">
            <div className="mb-8 flex flex-col items-center gap-2 text-center">
              <BrandLogo size="md" href="/" />
              <h1 className="mt-4 text-2xl font-bold uppercase tracking-[-0.03em] text-[#111111]">
                Founder login
              </h1>
              <p className="text-sm text-[#6b7280]">
                Sign in to manage your portfolio
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Username
                </label>
                <div className="relative">
                  <UserIcon
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    autoComplete="username"
                    placeholder="your username"
                    className="w-full rounded-xl border border-[#111111]/15 bg-[#fafafa] py-3 pl-10 pr-3 text-sm text-[#111111] placeholder-[#9ca3af] transition focus:border-[#0D3C1F] focus:outline-none focus:ring-1 focus:ring-[#0D3C1F]/30 disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Password
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
                    disabled={loading}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#111111]/15 bg-[#fafafa] py-3 pl-10 pr-10 text-sm text-[#111111] placeholder-[#9ca3af] transition focus:border-[#0D3C1F] focus:outline-none focus:ring-1 focus:ring-[#0D3C1F]/30 disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#0D3C1F]"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#0D3C1F] py-3.5 text-sm font-semibold text-white transition hover:bg-[#164a28] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-[#9ca3af]">
              Credentials are private — founders set their own passwords.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
