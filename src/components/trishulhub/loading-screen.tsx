'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  // `mounted` ensures we only render the actual UI on the client, eliminating
  // any chance of SSR/client hydration mismatch (the server renders nothing,
  // the client renders the loader once mounted).
  const [mounted, setMounted] = useState(false)
  const cleanupRef = useRef<() => void>(() => {})

  useEffect(() => {
    // Defer the mount flag + animation setup to next tick so we don't call
    // setState synchronously inside the effect body (avoids the React 19
    // "set-state-in-effect" warning while preserving identical behaviour).
    const kickoff = () => {
      setMounted(true)
      let raf = 0
      let finishTimer: ReturnType<typeof setTimeout> | undefined
      const start = performance.now()
      // FAST LOAD — 900ms total (down from 1500ms). Snappy feel without
      // feeling jarring. The user explicitly asked for "fully smooth and fast".
      const duration = 900
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3)
        setProgress(Math.round(eased * 100))
        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          finishTimer = setTimeout(() => setDone(true), 250)
        }
      }
      raf = requestAnimationFrame(tick)
      // HARD FALLBACK: ensure the loading screen ALWAYS hides, even if RAF
      // is throttled (backgrounded tab, low-power mode, slow device) or
      // the tick loop stalls for any reason. 2s = 0.9s anim + 250ms delay
      // + generous buffer.
      const hardFallback = setTimeout(() => setDone(true), 2000)
      cleanupRef.current = () => {
        cancelAnimationFrame(raf)
        if (finishTimer) clearTimeout(finishTimer)
        clearTimeout(hardFallback)
      }
    }
    const t = setTimeout(kickoff, 0)
    return () => {
      clearTimeout(t)
      cleanupRef.current?.()
    }
  }, [])

  // Render nothing on the server; mount on client only.
  if (!mounted) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-40 blur-3xl animate-glow-pulse"
            style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
          />

          {/* Logo + wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo image with intro animation */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Rotating glow ring behind logo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                className="pointer-events-none absolute -inset-6 rounded-full opacity-60"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, #00DEFF 90deg, transparent 180deg, #0088CC 270deg, transparent 360deg)',
                  filter: 'blur(14px)',
                }}
              />
              <img
                src="/images/trishulhub-logo.png"
                alt="TrishulHub logo"
                className="relative h-28 w-28 object-contain sm:h-36 sm:w-36"
                style={{
                  filter:
                    'drop-shadow(0 0 18px rgba(0,222,255,0.6)) drop-shadow(0 0 36px rgba(0,136,204,0.35))',
                }}
              />
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex items-center gap-2"
            >
              <span
                className="text-3xl font-bold tracking-[0.2em] sm:text-5xl"
                style={{
                  filter:
                    'drop-shadow(0 0 16px #00DEFF99) drop-shadow(0 0 32px #0088CC55)',
                }}
              >
                <span className="text-white">TRISHUL</span>
                <span className="gradient-text">HUB</span>
              </span>
            </motion.div>

            {/* Percentage */}
            <div className="mt-8 font-mono text-5xl font-bold tabular-nums text-white sm:text-7xl">
              {progress}
              <span className="text-[#00DEFF]">%</span>
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-[3px] w-56 overflow-hidden rounded-full bg-white/10 sm:w-72">
              <div
                className="h-full rounded-full transition-[width] duration-75 ease-out"
                style={{
                  width: `${progress}%`,
                  background:
                    'linear-gradient(90deg, #00DEFF 0%, #0088CC 100%)',
                  boxShadow: '0 0 12px rgba(0,222,255,0.6)',
                }}
              />
            </div>

            <div className="mt-4 text-xs uppercase tracking-[0.3em] text-white/40">
              Loading
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
