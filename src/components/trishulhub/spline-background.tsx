'use client'

const SPLINE_SCENE =
  'https://my.spline.design/reactiveorb-s0GzgSco0uSVSXvwMHuJvPQs/'

/**
 * Fixed full-viewport Spline scene. Lives at z-0 under site content.
 * Low opacity so the orb stays atmospheric, not distracting.
 */
export function SplineBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]"
    >
      <iframe
        src={SPLINE_SCENE}
        title="TrishulHub reactive orb background"
        frameBorder={0}
        width="100%"
        height="100%"
        className="h-full w-full border-0 opacity-[0.28]"
        loading="eager"
        allow="autoplay"
      />
      <div className="absolute inset-0 bg-[#050505]/45" />
    </div>
  )
}
