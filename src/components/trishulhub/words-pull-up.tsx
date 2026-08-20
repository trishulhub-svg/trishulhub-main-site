'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_OUT_EXPO } from '@/lib/animations'

type WordsPullUpProps = {
  text: string
  className?: string
  style?: React.CSSProperties
  /** Optional mark rendered after the final character (e.g. asterisk) */
  endMark?: React.ReactNode
  stagger?: number
}

/** Pull-up word reveal — each word slides from y:20 with staggered delay. */
export function WordsPullUp({
  text,
  className = '',
  style,
  endMark,
  stagger = 0.08,
}: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <span key={`${word}-${i}`} className="relative mr-[0.18em] inline-block overflow-hidden pb-[0.08em]">
            <motion.span
              className="inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: i * stagger,
                ease: EASE_OUT_EXPO,
              }}
            >
              {word}
              {isLast && endMark ? (
                <span className="relative inline-block">{endMark}</span>
              ) : null}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
