'use client'

/**
 * AnimatedHeading — splits a heading into words and reveals each one with a
 * staggered motion animation when it scrolls into view.
 *
 * Why word-by-word instead of letter-by-letter: words read more naturally and
 * the animation feels intentional rather than gimmicky. Letters animate too
 * fast and can feel chaotic on longer headings.
 *
 * Variants:
 *  - "rise":  words rise from below with a fade (default, good for headlines)
 *  - "blur":  words unblur + fade in (cinematic feel, good for big hero text)
 *  - "shine": words get a left-to-right shine sweep after appearing (premium)
 */

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

type Variant = 'rise' | 'blur' | 'shine'

interface AnimatedHeadingProps {
  children: string
  variant?: Variant
  /** Stagger between words in seconds. Default 0.08. */
  stagger?: number
  /** Per-word animation duration. Default 0.6. */
  duration?: number
  /** Tailwind class for the wrapper (controls font size, weight, etc). */
  className?: string
  /** Inline style passthrough (for fontFamily, textShadow, etc). */
  style?: React.CSSProperties
  /** Render as a different heading level. Default h2. */
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  /** Custom highlight color for words wrapped in *asterisks*. Default #00DEFF. */
  highlightColor?: string
  /** Whether to start animation only when scrolled into view. Default true. */
  whenInView?: boolean
}

export function AnimatedHeading({
  children,
  variant = 'rise',
  stagger = 0.08,
  duration = 0.6,
  className = '',
  style,
  as = 'h2',
  highlightColor = '#00DEFF',
  whenInView = true,
}: AnimatedHeadingProps) {
  const Tag = as

  // Split into words while preserving spaces. Words wrapped in *asterisks*
  // get the highlight color treatment.
  // e.g. "REAL *GROWTH*" → ["REAL", "*GROWTH*"] (GROWTH becomes cyan)
  const tokens = children.split(/\s+/).filter(Boolean)

  // Per-word animation variants
  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: variant === 'rise' ? 30 : 8,
      filter: variant === 'blur' ? 'blur(12px)' : 'blur(0px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay: i * stagger,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  }

  // Viewport config — fire once when 30% of the heading is visible
  const viewport = whenInView
    ? { once: true, margin: '-15% 0px -15% 0px' }
    : undefined

  return (
    <Tag className={className} style={style}>
      <motion.span
        initial="hidden"
        animate={whenInView ? undefined : 'visible'}
        whileInView={whenInView ? 'visible' : undefined}
        viewport={viewport}
        style={{ display: 'inline-block' }}
        aria-label={children}
      >
        {tokens.map((word, i) => {
          // Check for highlight syntax *word*
          const isHighlight = word.startsWith('*') && word.endsWith('*')
          const cleanWord = isHighlight ? word.slice(1, -1) : word
          // Preserve trailing punctuation on highlighted words
          const trailingPunct = cleanWord.match(/[.,!?;:]+$/)?.[0] || ''
          const coreWord = trailingPunct
            ? cleanWord.slice(0, -trailingPunct.length)
            : cleanWord

          return (
            <span
              key={`${word}-${i}`}
              style={{ display: 'inline-block', overflow: 'hidden' }}
            >
              <motion.span
                custom={i}
                variants={wordVariants}
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity, filter',
                }}
              >
                {isHighlight ? (
                  <span className="gradient-text-animated">
                    {coreWord}
                    {trailingPunct && (
                      <span style={{ color: 'inherit' }}>{trailingPunct}</span>
                    )}
                  </span>
                ) : (
                  word
                )}
                {i < tokens.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          )
        })}
      </motion.span>
      {variant === 'shine' && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ delay: tokens.length * stagger + 0.2, duration: 0.5 }}
          style={{
            background:
              'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '200% 0',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'shineSweep 2.4s ease-in-out 0.4s 1',
          }}
        >
          {children}
        </motion.span>
      )}
    </Tag>
  )
}
