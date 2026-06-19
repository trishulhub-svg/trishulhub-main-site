'use client'

/**
 * Reusable animation components built on framer-motion.
 *
 * - <FadeIn>           — scroll-triggered fade + slide-up
 * - <StaggerContainer> — wraps a list, staggers children
 * - <StaggerItem>      — child of <StaggerContainer>
 * - <AnimatedText>     — splits text into words/chars, animates each
 * - <HoverCard>        — 3D tilt / lift on hover wrapper
 *
 * All respect prefers-reduced-motion automatically (framer-motion checks
 * the user's motion preference and shortens animations accordingly).
 */

import {
  motion,
  useReducedMotion,
  type Variants,
  type HTMLMotionProps,
} from 'framer-motion'
import { type ReactNode, type ElementType } from 'react'
import {
  EASE_OUT_EXPO,
  DURATION,
  STAGGER,
  VIEWPORT,
  fadeInUp,
  staggerContainer,
} from '@/lib/animations'

/* ------------------------------------------------------------------ */
/* FadeIn                                                              */
/* ------------------------------------------------------------------ */

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  /** Delay in seconds before the animation starts. */
  delay?: number
  /** Direction to slide in from. Default 'up'. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Distance to travel in pixels. Default 60. */
  distance?: number
  /** Duration in seconds. Default 0.5. */
  duration?: number
  /** Use whileInView (true, default) or animate on mount (false). */
  whenInView?: boolean
  /** Render as a different element. */
  as?: ElementType
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 60,
  duration = DURATION.normal,
  whenInView = true,
  as = 'div',
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }[direction]

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0.01 : duration,
        delay,
        ease: EASE_OUT_EXPO,
      },
    },
  }

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      animate={whenInView ? undefined : 'visible'}
      whileInView={whenInView ? 'visible' : undefined}
      viewport={whenInView ? VIEWPORT : undefined}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ */
/* StaggerContainer                                                    */
/* ------------------------------------------------------------------ */

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  /** Stagger between each child. Default 0.1s. */
  stagger?: number
  /** Delay before the first child starts. Default 0. */
  delayChildren?: number
  /** Use whileInView (true, default) or animate on mount (false). */
  whenInView?: boolean
  as?: ElementType
}

export function StaggerContainer({
  children,
  stagger = STAGGER.normal,
  delayChildren = 0,
  whenInView = true,
  as = 'div',
  ...rest
}: StaggerContainerProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      animate={whenInView ? undefined : 'visible'}
      whileInView={whenInView ? 'visible' : undefined}
      viewport={whenInView ? VIEWPORT : undefined}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ */
/* StaggerItem                                                         */
/* ------------------------------------------------------------------ */

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  /** Animation variant to use. Default fadeInUp. */
  variants?: Variants
  as?: ElementType
}

export function StaggerItem({
  children,
  variants = fadeInUp,
  as = 'div',
  ...rest
}: StaggerItemProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag variants={variants} {...rest}>
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ */
/* AnimatedText                                                        */
/* ------------------------------------------------------------------ */

interface AnimatedTextProps {
  /** Text to animate. Words wrapped in *asterisks* get the highlight color. */
  children: string
  /** Split into words (default) or characters. */
  splitBy?: 'words' | 'chars'
  /** Stagger between each unit. Default 0.05s. */
  stagger?: number
  /** Per-unit animation duration. Default 0.8s. */
  duration?: number
  /** Tailwind className for the wrapper. */
  className?: string
  /** Inline style passthrough. */
  style?: React.CSSProperties
  /** Render as a different heading level. Default h2. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  /** Highlight color for *wrapped* words. Default #00DEFF. */
  highlightColor?: string
  /** Use whileInView (true, default) or animate on mount (false). */
  whenInView?: boolean
  /** Animation variant: rise, blur, or 3d-flip. */
  variant?: 'rise' | 'blur' | 'flip3d'
}

export function AnimatedText({
  children,
  splitBy = 'words',
  stagger = STAGGER.fast,
  duration = DURATION.slow,
  className = '',
  style,
  as = 'h2',
  highlightColor = '#00DEFF',
  whenInView = true,
  variant = 'rise',
}: AnimatedTextProps) {
  const reduce = useReducedMotion()
  const Tag = as

  // Split text into units. Words preserve spaces; chars split everything.
  const units: string[] =
    splitBy === 'words'
      ? children.split(/\s+/).filter(Boolean)
      : children.split('')

  const unitVariants: Variants = {
    hidden: {
      opacity: 0,
      y: variant === 'rise' ? 50 : 8,
      rotateX: variant === 'flip3d' ? -90 : 0,
      filter: variant === 'blur' ? 'blur(10px)' : 'blur(0px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: reduce ? 0.01 : duration,
        delay: i * stagger,
        ease: EASE_OUT_EXPO,
      },
    }),
  }

  const viewport = whenInView ? VIEWPORT : undefined

  return (
    <Tag
      className={className}
      style={{ ...style, perspective: variant === 'flip3d' ? '1000px' : undefined }}
    >
      <motion.span
        initial="hidden"
        animate={whenInView ? undefined : 'visible'}
        whileInView={whenInView ? 'visible' : undefined}
        viewport={viewport}
        style={{ display: 'inline-block' }}
        aria-label={children}
      >
        {units.map((unit, i) => {
          // Word-mode highlight: *word* syntax
          const isHighlight =
            splitBy === 'words' && unit.startsWith('*') && unit.endsWith('*')
          const clean = isHighlight ? unit.slice(1, -1) : unit
          const trailingPunct = clean.match(/[.,!?;:]+$/)?.[0] || ''
          const core = trailingPunct ? clean.slice(0, -trailingPunct.length) : clean

          return (
            <span
              key={`${unit}-${i}`}
              style={{ display: 'inline-block', overflow: 'hidden', whiteSpace: 'pre' }}
            >
              <motion.span
                custom={i}
                variants={unitVariants}
                style={{
                  display: 'inline-block',
                  willChange: 'transform, opacity, filter',
                  transformStyle: 'preserve-3d',
                }}
              >
                {isHighlight ? (
                  <span style={{ color: highlightColor }}>
                    {core}
                    {trailingPunct && <span style={{ color: 'inherit' }}>{trailingPunct}</span>}
                  </span>
                ) : (
                  unit
                )}
                {splitBy === 'words' && i < units.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/* HoverCard                                                           */
/* ------------------------------------------------------------------ */

interface HoverCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  /** Lift distance on hover (px). Default 12. */
  lift?: number
  /** Scale on hover. Default 1.02. */
  scale?: number
  /** Add a 3D rotateY on hover. Default 0. */
  rotateY?: number
  /** Glow color (rgba). Default rgba(0,222,255,0.35). */
  glowColor?: string
  className?: string
}

export function HoverCard({
  children,
  lift = 12,
  scale = 1.02,
  rotateY = 0,
  glowColor = 'rgba(0,222,255,0.35)',
  className = '',
  ...rest
}: HoverCardProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      whileHover={
        reduce
          ? undefined
          : {
              y: -lift,
              scale,
              rotateY,
              boxShadow: `0 25px 50px -12px ${glowColor}`,
            }
      }
      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
