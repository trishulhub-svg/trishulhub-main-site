'use client'

const techs = [
  { slug: 'react', name: 'React', color: '#61DAFB' },
  { slug: 'nextdotjs', name: 'Next.js', color: '#FFFFFF' },
  { slug: 'typescript', name: 'TypeScript', color: '#3178C6' },
  { slug: 'nodedotjs', name: 'Node.js', color: '#5FA04E' },
  { slug: 'tailwindcss', name: 'Tailwind CSS', color: '#06B6D4' },
  { slug: 'prisma', name: 'Prisma', color: '#2D3748' },
  { slug: 'mongodb', name: 'MongoDB', color: '#47A248' },
  { slug: 'postgresql', name: 'PostgreSQL', color: '#4169E1' },
  { slug: 'amazonwebservices', name: 'AWS', color: '#FF9900' },
  { slug: 'docker', name: 'Docker', color: '#2496ED' },
  { slug: 'python', name: 'Python', color: '#3776AB' },
  { slug: 'graphql', name: 'GraphQL', color: '#E10098' },
  { slug: 'redis', name: 'Redis', color: '#FF4438' },
  { slug: 'vercel', name: 'Vercel', color: '#FFFFFF' },
  { slug: 'git', name: 'Git', color: '#F05032' },
  { slug: 'figma', name: 'Figma', color: '#F24E1E' },
  { slug: 'greensock', name: 'GSAP', color: '#88CE02' },
  { slug: 'framer', name: 'Framer Motion', color: '#0055FF' },
  { slug: 'linux', name: 'Linux', color: '#FCC624' },
  { slug: 'nginx', name: 'Nginx', color: '#009639' },
]

function TechPill({ slug, name, color }: { slug: string; name: string; color: string }) {
  return (
    <div className="group/pill flex shrink-0 items-center gap-3 rounded-full border border-white/10 px-5 py-3 transition-all duration-300 hover:scale-110 hover:border-[#00DEFF]">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300"
        style={{
          borderColor: 'rgba(0,222,255,0.35)',
          backgroundColor: 'rgba(0,222,255,0.05)',
        }}
      >
        {/* Real company logo (SVG, inherits color via currentColor) */}
        <img
          src={`/images/logos/${slug}.svg`}
          alt={`${name} logo`}
          width={20}
          height={20}
          className="h-5 w-5 transition-all duration-300"
          style={{
            // Theme blue so logos are visible on the dark background —
            // SVGs use fill="currentColor", so this `color` cascades to them.
            color: '#00DEFF',
            opacity: 0.95,
          }}
          loading="lazy"
        />
      </span>
      <span
        className="whitespace-nowrap text-sm font-medium text-white transition-colors duration-300 group-hover/pill:text-[#00DEFF]"
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
            <TechPill key={`r1-${t.slug}-${i}`} slug={t.slug} name={t.name} color={t.color} />
          ))}
        </div>

        {/* Row 2 - scrolls right (reverse) */}
        <div className="flex w-max animate-marquee-slow gap-4 [animation-direction:reverse]">
          {row.map((t, i) => (
            <TechPill key={`r2-${t.slug}-${i}`} slug={t.slug} name={t.name} color={t.color} />
          ))}
        </div>
      </div>
    </section>
  )
}
