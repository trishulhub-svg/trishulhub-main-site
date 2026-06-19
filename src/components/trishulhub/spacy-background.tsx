'use client'

/**
 * SpacyBackground — fixed-position animated background that sits behind ALL
 * sections of the homepage. Renders:
 *  - A star field (160 stars across two layers, twinkling)
 *  - Two drifting nebula glow blobs (cyan + blue)
 *  - Two occasional shooting stars
 *
 * All pure CSS animations (no JS), all `pointer-events: none`, all on a
 * fixed full-viewport layer at z-index 0. Reduced-motion users see nothing.
 *
 * Mounted once in app/page.tsx so it spans the entire scroll height.
 */

export function SpacyBackground() {
  return (
    <>
      <div className="spacy-stars" aria-hidden="true" />
      <div className="spacy-nebula" aria-hidden="true" />
      <div className="spacy-shooting-star" aria-hidden="true" />
      <div className="spacy-shooting-star-2" aria-hidden="true" />
    </>
  )
}
