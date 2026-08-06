'use client'

const SPLINE_SCENE =
  'https://my.spline.design/reactiveorb-s0GzgSco0uSVSXvwMHuJvPQs/'

/**
 * Fixed Spline orb — visible enough to feel present, soft wash so copy stays readable.
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
        className="h-full w-full scale-110 border-0 opacity-[0.42]"
        loading="eager"
        allow="autoplay"
      />
      <div className="absolute inset-0 bg-[#050505]/28" />
    </div>
  )
}
