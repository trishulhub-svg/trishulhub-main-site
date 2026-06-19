'use client'

/**
 * FloatingVideo — small decorative looping video that sits in a section corner.
 *
 * Why this works for "transparent background" without an alpha-channel video:
 * All the decorative clips we use here were rendered on a SOLID BLACK background.
 * CSS `mix-blend-mode: screen` makes pure black (0,0,0) a no-op — black pixels
 * become fully transparent, while bright pixels (the actual subject) show through
 * and additively blend with whatever is behind them. This is the classic trick
 * for compositing black-background footage onto a dark UI without needing an
 * alpha-channel WebM.
 *
 * All videos are:
 *  - Infinite looping (autoPlay + loop + muted + playsInline)
 *  - Small (controlled by `size` prop, default 140px)
 *  - Speed-matched (all re-encoded at 24fps, ~8s loop)
 *  - Color-tinted toward the site theme (#00DEFF cyan) via hue-rotate filter
 *  - Non-interactive (pointer-events: none)
 *  - Subtly floating (gentle keyframe animation)
 *  - Hidden on very small screens (< 640px) to keep mobile clean & fast
 */

import { useEffect, useRef, useState } from 'react'

export type FloatCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface FloatingVideoProps {
  /** Path under /public, e.g. "/videos/decor/logo-th-rotate.mp4" */
  src: string
  /** Which corner of the parent (parent MUST be position: relative) */
  corner?: FloatCorner
  /** Box width in px. Height auto-scales to video aspect ratio. */
  size?: number
  /** Hue rotation in degrees. 0 = no shift. Use to nudge colors toward brand cyan. */
  hueRotate?: number
  /** Extra saturation boost. 1 = no change, 1.4 = punchier colors. */
  saturate?: number
  /** Brightness multiplier. 1 = no change, 1.2 = brighter. */
  brightness?: number
  /** Extra opacity (0-1). Default 1. */
  opacity?: number
  /** Inset from the edge, in px. Default 24. */
  inset?: number
  /** Float animation amplitude in px (vertical bob). 0 = no animation. Default 8. */
  floatAmplitude?: number
  /** Float animation duration in seconds. Default 6. */
  floatDuration?: number
  /** Optional z-index override. Default 5 (sits above section bg, below content). */
  zIndex?: number
  /** Hide on screens narrower than this (px). Default 640 (hide on mobile). */
  hideBelow?: number
  /** Optional className passthrough. */
  className?: string
}

export function FloatingVideo({
  src,
  corner = 'top-right',
  size = 140,
  hueRotate = 0,
  saturate = 1.15,
  brightness = 1.1,
  opacity = 1,
  inset = 24,
  floatAmplitude = 8,
  floatDuration = 6,
  zIndex = 5,
  hideBelow = 640,
  className = '',
}: FloatingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)

  // SSR safety — only render the <video> after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Responsive: hide on small screens to save bandwidth + avoid clutter
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(`(max-width: ${hideBelow - 1}px)`)
    const update = () => setVisible(!mq.matches)
    update()
    if (mq.addEventListener) mq.addEventListener('change', update)
    else mq.addListener(update)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update)
      else mq.removeListener(update)
    }
  }, [hideBelow])

  // Aggressive autoplay recovery — kicks the video if the browser pauses it
  useEffect(() => {
    if (!mounted || !visible) return
    const v = videoRef.current
    if (!v) return

    const tryPlay = () => {
      try {
        v.muted = true
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      } catch {
        /* ignore */
      }
    }

    const onError = () => {
      try {
        v.currentTime = 0
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      } catch {
        /* ignore */
      }
    }

    v.addEventListener('error', onError)
    tryPlay()

    // Health-check: if video is paused (e.g. battery saver), restart
    const healthCheck = setInterval(() => {
      if (v.paused && !v.ended) tryPlay()
    }, 2500)

    // Kick on first interaction (mobile Safari autoplay unlock)
    const onFirstInteraction = () => {
      tryPlay()
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
    }
    window.addEventListener('click', onFirstInteraction)
    window.addEventListener('touchstart', onFirstInteraction)

    return () => {
      clearInterval(healthCheck)
      v.removeEventListener('error', onError)
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
    }
  }, [mounted, visible])

  if (!mounted || !visible) return null

  const positionStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex,
    pointerEvents: 'none',
    width: `${size}px`,
    height: 'auto',
    opacity,
    mixBlendMode: 'screen',
    filter: `hue-rotate(${hueRotate}deg) saturate(${saturate}) brightness(${brightness})`,
    willChange: 'transform, opacity',
  }

  // Corner placement
  switch (corner) {
    case 'top-left':
      positionStyles.top = `${inset}px`
      positionStyles.left = `${inset}px`
      break
    case 'top-right':
      positionStyles.top = `${inset}px`
      positionStyles.right = `${inset}px`
      break
    case 'bottom-left':
      positionStyles.bottom = `${inset}px`
      positionStyles.left = `${inset}px`
      break
    case 'bottom-right':
      positionStyles.bottom = `${inset}px`
      positionStyles.right = `${inset}px`
      break
  }

  // Inline keyframes for the subtle float animation. Using a unique animation
  // name per-instance to avoid clashes when multiple FloatingVideos share a page.
  const animName = `floatY_${corner.replace('-', '_')}_${size}`
  const floatKeyframes = `
    @keyframes ${animName} {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-${floatAmplitude}px); }
    }
  `

  return (
    <>
      <style>{floatKeyframes}</style>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className={className}
        style={{
          ...positionStyles,
          animation: `${animName} ${floatDuration}s ease-in-out infinite`,
        }}
      />
    </>
  )
}
