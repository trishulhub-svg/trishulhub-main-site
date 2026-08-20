'use client'

const logos = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Vercel',
  'Tailwind',
  'Prisma',
]

export function TrustStrip() {
  const row = [...logos, ...logos]
  return (
    <section className="border-y border-[#e5e7eb] bg-[#f3f4f6]/60 py-10">
      <div className="lt-container mb-6 text-center">
        <p className="text-sm font-medium text-[#6b7280]">
          Built with modern, trusted technology
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex w-max gap-12 px-6">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-sm font-semibold tracking-wide text-[#9ca3af] grayscale"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
