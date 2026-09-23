/**
 * Renders one JSON-LD block. Exists so pages don't each repeat the
 * dangerouslySetInnerHTML + escape-hatch comment.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Schema JSON is generated server-side from our own values.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
