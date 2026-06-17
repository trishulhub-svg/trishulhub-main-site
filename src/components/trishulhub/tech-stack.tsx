'use client'

const techs = [
  { abbr: 'Re', name: 'React' },
  { abbr: 'Ne', name: 'Next.js' },
  { abbr: 'TS', name: 'TypeScript' },
  { abbr: 'No', name: 'Node.js' },
  { abbr: 'Tw', name: 'Tailwind CSS' },
  { abbr: 'Pr', name: 'Prisma' },
  { abbr: 'Mo', name: 'MongoDB' },
  { abbr: 'Pg', name: 'PostgreSQL' },
  { abbr: 'Aw', name: 'AWS' },
  { abbr: 'Do', name: 'Docker' },
  { abbr: 'Py', name: 'Python' },
  { abbr: 'Gq', name: 'GraphQL' },
  { abbr: 'Rd', name: 'Redis' },
  { abbr: 'Ve', name: 'Vercel' },
  { abbr: 'Gi', name: 'Git' },
  { abbr: 'Fi', name: 'Figma' },
  { abbr: 'Gs', name: 'GSAP' },
  { abbr: 'Fm', name: 'Framer Motion' },
  { abbr: 'Li', name: 'Linux' },
  { abbr: 'Ng', name: 'Nginx' },
]

function TechPill({ abbr, name }: { abbr: string; name: string }) {
  return (
    <div className="group/pill flex shrink-0 items-center gap-3 rounded-full border border-white/10 px-5 py-3 transition-all duration-300 hover:scale-110 hover:border-[#00DEFF]">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-bold uppercase tracking-tight grayscale transition-all duration-300 group-hover/pill:grayscale-0"
        style={{
          borderColor: 'rgba(0,222,255,0.35)',
          backgroundColor: 'rgba(0,222,255,0.05)',
          color: '#A0A0A0',
        }}
      >
        <span className="transition-colors duration-300 group-hover/pill:text-[#00DEFF]">
          {abbr}
        </span>
      </span>
      <span
        className="whitespace-nowrap text-sm font-medium text-white"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {name}
      </span>
    </div>
  )
}

export function TechStack() {
  // duplicate for seamless loop
  const row = [...techs, ...techs]

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Heading */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00DEFF]">
            Technologies
          </span>
          <h2
            className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Our Tech Stack
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: '#A0A0A0' }}
          >
            We leverage the industry&apos;s most powerful tools and frameworks to
            build fast, scalable, and future-proof digital products.
          </p>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="relative flex flex-col gap-5">
        {/* fade edges */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 sm:w-40"
          style={{
            background:
              'linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 sm:w-40"
          style={{
            background:
              'linear-gradient(to left, #0A0A0A 0%, rgba(10,10,10,0) 100%)',
          }}
        />

        {/* Row 1 - scrolls left */}
        <div className="flex w-max animate-marquee gap-4">
          {row.map((t, i) => (
            <TechPill key={`r1-${t.name}-${i}`} abbr={t.abbr} name={t.name} />
          ))}
        </div>

        {/* Row 2 - scrolls right (reverse) */}
        <div className="flex w-max animate-marquee-slow gap-4 [animation-direction:reverse]">
          {row.map((t, i) => (
            <TechPill key={`r2-${t.name}-${i}`} abbr={t.abbr} name={t.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
