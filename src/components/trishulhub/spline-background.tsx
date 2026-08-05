'use client'

const SPLINE_SCENE =
  'https://my.spline.design/reactiveorb-s0GzgSco0uSVSXvwMHuJvPQs/'

/**
 * Fixed full-viewport Spline scene. Lives at z-0 under site content.
 * pointer-events-none keeps page interactions (nav, CTAs, scroll) usable.
 */
export function SplineBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <iframe
        src={SPLINE_SCENE}
        title="TrishulHub reactive orb background"
        frameBorder={0}
        width="100%"
        height="100%"
        className="h-full w-full border-0"
        loading="eager"
        allow="autoplay"
      />
      {/* Soft brand wash so the orb sits in TrishulHub’s near-black + cyan world */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(10,10,10,0.35) 55%, rgba(10,10,10,0.75) 100%)',
        }}
      />
    </div>
  )
}
