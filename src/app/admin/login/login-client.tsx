'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, User as UserIcon, ArrowRight, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'

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
      // Success — redirect to admin dashboard
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background effects */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,222,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,222,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #0088CC 0%, transparent 70%)' }}
      />

      {/* Top-right TrishulHub logo → links to main site */}
      <a
        href="/"
        className="absolute right-5 top-5 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-md transition-all hover:border-[#00DEFF]/40 hover:bg-[#00DEFF]/5"
        title="Back to TrishulHub"
      >
        <span className="text-sm font-bold tracking-[0.15em] sm:text-base">
          <span className="text-white">TRISHUL</span>
          <span className="gradient-text">HUB</span>
        </span>
      </a>

      {/* Back link */}
      <a
        href="/"
        className="absolute left-5 top-5 z-50 flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-[#00DEFF]"
      >
        ← Home
      </a>

      {/* Centered login card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl sm:p-10">
            {/* Hover glow border */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-2xl"
              style={{ boxShadow: '0 0 0 1px rgba(0,222,255,0.15), 0 0 60px rgba(0,222,255,0.1)' }}
            />

            {/* TrishulHub branding at top of login (above Founder Login) */}
            <div className="relative mb-7 flex flex-col items-center gap-2">
              <a
                href="/"
                className="group flex items-center gap-2.5"
                title="Back to TrishulHub"
              >
                <img
                  src="/images/trishulhub-logo.png"
                  alt="TrishulHub logo"
                  width={44}
                  height={44}
                  className="h-11 w-11 transition-transform duration-300 group-hover:scale-110"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(0,222,255,0.45))' }}
                />
                <span
                  className="text-2xl font-bold tracking-[0.12em] sm:text-3xl"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  <span className="text-white">TRISHUL</span>
                  <span className="gradient-text">HUB</span>
                </span>
              </a>
            </div>

            {/* Logo / Heading */}
            <div className="relative mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <span className="text-white">Founder </span>
                <span className="gradient-text">Login</span>
              </h1>
              <p className="mt-2 text-sm text-white/50">
                Sign in to edit your TrishulHub portfolio
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative space-y-5">
              {/* Username */}
              <div>
                <label htmlFor="username" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
                  Username
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                    <UserIcon size={16} />
                  </span>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. kiran"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0A]/60 py-3 pl-10 pr-3 text-sm text-white placeholder-white/30 transition-colors focus:border-[#00DEFF]/60 focus:outline-none focus:ring-1 focus:ring-[#00DEFF]/30 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/60">
                  Password
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                    <Lock size={16} />
                  </span>
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0A]/60 py-3 pl-10 pr-10 text-sm text-white placeholder-white/30 transition-colors focus:border-[#00DEFF]/60 focus:outline-none focus:ring-1 focus:ring-[#00DEFF]/30 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300"
                >
                  <AlertCircle size={15} className="flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#00DEFF] py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:shadow-[0_0_30px_rgba(0,222,255,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Security note (credentials are private — founders set their own) */}
            <div className="relative mt-6 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
              <p className="text-xs text-white/40">
                Authorized founder access only · credentials are private
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-white/40">
            TrishulHub Founder Panel · v1.0
          </p>
        </motion.div>
      </div>
    </div>
  )
}
