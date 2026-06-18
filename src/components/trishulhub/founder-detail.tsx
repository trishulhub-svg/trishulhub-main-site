'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Home,
  Calendar,
  User as UserIcon,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  Send,
} from 'lucide-react'

type Founder = {
  name: string
  initial: string
  role: string
  bio: string
  projects: string
  image: string | null
  dateOfBirth: string | null
  address: string | null
  zipCode: string | null
  email: string | null
  phone: string | null
  origin: string | null
  github: string | null
  linkedin: string | null
  twitter: string | null
  website: string | null
  skills: { name: string; level: number }[]
  education: {
    degree: string
    school: string
    year: string
    description: string
  }[]
  experience: {
    role: string
    company: string
    period: string
    description: string
  }[]
  projectsList: {
    name: string
    description: string
    link: string
    year: string
  }[]
}

/*
 * Founder intro videos — same clips used on the team section cards, shown
 * here on the portfolio hero so visitors see the same looping video when
 * they click a founder's image. Kiran and Taroon have custom videos; other
 * founders fall back to the existing image / initial-letter design.
 */
const FOUNDER_VIDEOS: Record<string, string> = {
  kiran: '/videos/founder-kiran.mp4',
  taroon: '/videos/founder-taroon.mp4',
}

export function FounderDetailClient({
  slug,
  founder: f,
}: {
  slug: string
  founder: Founder
}) {
  /* Looping founder intro video (kiran + taroon only) */
  const founderVideo = FOUNDER_VIDEOS[slug]
  const videoRef = useRef<HTMLVideoElement>(null)

  // Explicit .play() kick — some browsers block autoplay until the user
  // has interacted with the page. Retry on first interaction.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const tryPlay = () => {
      v.muted = true
      v.play().catch(() => {})
    }
    tryPlay()
    const onFirstInteraction = () => {
      tryPlay()
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }
    window.addEventListener('click', onFirstInteraction)
    window.addEventListener('touchstart', onFirstInteraction)
    window.addEventListener('keydown', onFirstInteraction)
    return () => {
      window.removeEventListener('click', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* ===== Top nav ===== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="group flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-[#00DEFF]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to TrishulHub
          </a>
          <a href="/" className="text-lg font-bold tracking-[0.15em] sm:text-xl">
            <span className="text-white">TRISHUL</span>
            <span className="gradient-text">HUB</span>
          </a>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Background effects */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,222,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,222,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #0088CC 0%, transparent 70%)' }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#00DEFF]">
              HELLO!
            </p>
            <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              <span className="text-white">I&apos;m </span>
              <span className="gradient-text">{f.name}</span>
            </h1>
            <p className="mt-4 text-lg font-medium text-white/80 sm:text-xl">{f.role}</p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              {f.bio}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href={`mailto:${f.email ?? '#'}`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#00DEFF] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:shadow-[0_0_30px_rgba(0,222,255,0.5)]"
              >
                <Send size={15} />
                Hire Me
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#00DEFF]/60 hover:bg-[#00DEFF]/5 hover:text-[#00DEFF]"
              >
                My Works
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            {/* Social row */}
            <div className="mt-8 flex items-center gap-3">
              {f.github && (
                <a
                  href={f.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#00DEFF] hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                >
                  <Github size={16} />
                </a>
              )}
              {f.linkedin && (
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#00DEFF] hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {f.twitter && (
                <a
                  href={f.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#00DEFF] hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                >
                  <Twitter size={16} />
                </a>
              )}
              {f.website && (
                <a
                  href={f.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#00DEFF] hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                >
                  <Globe size={16} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: photo / initial card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            {/* Right: photo / initial card
             * Video is 858x1072 (4:5 portrait). Previously this container
             * used aspect-square (1:1), which cropped the top of the head/
             * hair when the 4:5 portrait video was object-cover'd into it.
             * Switching to aspect-[4/5] makes the container match the video
             * exactly, so nothing is cropped. object-position: center top
             * is a belt-and-suspenders guard for any rounding.
             */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-[#00DEFF]/20">
              {/* Background gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, #0a2a35 0%, #0A0A0A 50%, #061218 100%)',
                }}
              />
              {/* Radial glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,222,255,0.35) 0%, transparent 70%)',
                }}
              />
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,222,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,222,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              {founderVideo ? (
                <video
                  ref={videoRef}
                  src={founderVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              ) : f.image ? (
                <img
                  src={f.image}
                  alt={f.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="select-none text-[180px] font-bold leading-none sm:text-[240px]"
                    style={{
                      color: '#00DEFF',
                      fontFamily: 'var(--font-space-grotesk)',
                      textShadow: 'rgba(0,222,255,0.45) 0px 0px 40px',
                    }}
                  >
                    {f.initial}
                  </span>
                </div>
              )}

              {/* Projects badge */}
              <div className="absolute bottom-4 left-4 rounded-full bg-[#00DEFF] px-4 py-1.5 text-sm font-bold text-[#0A0A0A] backdrop-blur-sm">
                {f.projects} Project Complete
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT ME SECTION ===== */}
      <section className="relative overflow-hidden border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading white="About" cyan="Me" />

          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
            {f.bio}
          </p>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-[#00DEFF]/20">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, #0a2a35 0%, #0A0A0A 60%, #061218 100%)',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,222,255,0.3) 0%, transparent 70%)',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,222,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,222,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                {f.image ? (
                   
                  <img
                    src={f.image}
                    alt={f.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="select-none text-[160px] font-bold leading-none"
                      style={{
                        color: '#00DEFF',
                        fontFamily: 'var(--font-space-grotesk)',
                        textShadow: 'rgba(0,222,255,0.45) 0px 0px 36px',
                      }}
                    >
                      {f.initial}
                    </span>
                  </div>
                )}
                {/* Project count badge */}
                <div className="absolute bottom-4 left-4 rounded-full bg-[#00DEFF] px-4 py-1.5 text-sm font-bold text-[#0A0A0A]">
                  {f.projects} Project complete
                </div>
              </div>
            </motion.div>

            {/* Right: details list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ul className="space-y-4">
                <DetailRow icon={<UserIcon size={16} />} label="Name" value={f.name} />
                {f.dateOfBirth && (
                  <DetailRow
                    icon={<Calendar size={16} />}
                    label="Date of birth"
                    value={f.dateOfBirth}
                  />
                )}
                {f.address && (
                  <DetailRow
                    icon={<MapPin size={16} />}
                    label="Address"
                    value={f.address}
                  />
                )}
                {f.origin && (
                  <DetailRow
                    icon={<Home size={16} />}
                    label="Origin"
                    value={f.origin}
                  />
                )}
                {f.zipCode && (
                  <DetailRow
                    icon={<MapPin size={16} />}
                    label="Zip code"
                    value={f.zipCode}
                  />
                )}
                {f.email && (
                  <DetailRow
                    icon={<Mail size={16} />}
                    label="Email"
                    value={f.email}
                  />
                )}
                {f.phone && (
                  <DetailRow
                    icon={<Phone size={16} />}
                    label="Phone"
                    value={f.phone}
                  />
                )}
              </ul>

              {/* CV / contact button */}
              <a
                href={`mailto:${f.email ?? '#'}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#00DEFF] px-7 py-3 text-sm font-semibold text-[#0A0A0A] transition-all hover:shadow-[0_0_30px_rgba(0,222,255,0.5)]"
              >
                <Download size={15} />
                Get In Touch
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== MY SKILLS SECTION ===== */}
      <section className="relative overflow-hidden border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-10 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #00DEFF 0%, transparent 70%)' }}
        />

        <div className="relative z-10 mx-auto max-w-5xl">
          <SectionHeading white="My" cyan="Skills" />
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
            A blend of technical and soft skills honed over years of delivering real client work at TrishulHub.
          </p>

          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {f.skills.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDUCATION SECTION ===== */}
      <section className="relative overflow-hidden border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading white="My" cyan="Education" />
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
            Formal education and certifications that built the foundation of my career.
          </p>

          <div className="space-y-6">
            {f.education.map((e, i) => (
              <TimelineCard
                key={i}
                icon={<GraduationCap size={18} />}
                title={e.degree}
                org={e.school}
                period={e.year}
                description={e.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE SECTION ===== */}
      <section className="relative overflow-hidden border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #0088CC 0%, transparent 70%)' }}
        />

        <div className="relative z-10 mx-auto max-w-5xl">
          <SectionHeading white="My" cyan="Experience" />
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
            Professional journey across companies and roles.
          </p>

          <div className="space-y-6">
            {f.experience.map((e, i) => (
              <TimelineCard
                key={i}
                icon={<Briefcase size={18} />}
                title={e.role}
                org={e.company}
                period={e.period}
                description={e.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section
        id="projects"
        className="relative overflow-hidden border-t border-white/10 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading white="My" cyan="Projects" />
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/60 sm:text-base">
            Selected work shipped at TrishulHub and beyond.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {f.projectsList.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT / FOOTER ===== */}
      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#0A0A0A] to-[#061218] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading white="Get In" cyan="Touch" />
          <p className="mx-auto mb-8 mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
            Have a project in mind or just want to say hi? Drop a message — I usually reply within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {f.email && (
              <a
                href={`mailto:${f.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#00DEFF]/40 px-6 py-3 text-sm font-semibold text-[#00DEFF] transition-all hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
              >
                <Mail size={15} />
                {f.email}
              </a>
            )}
            {f.phone && (
              <a
                href={`tel:${f.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-[#00DEFF]/60 hover:text-[#00DEFF]"
              >
                <Phone size={15} />
                {f.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer line */}
      <footer className="border-t border-white/10 px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {f.name} · TrishulHub · Built with Next.js + Tailwind CSS
        </p>
      </footer>
    </div>
  )
}

/* ============ Sub-components ============ */

function SectionHeading({ white, cyan }: { white: string; cyan: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center text-3xl font-bold sm:text-4xl lg:text-5xl"
      style={{ fontFamily: 'var(--font-space-grotesk)' }}
    >
      <span className="text-white">{white} </span>
      <span className="gradient-text">{cyan}</span>
    </motion.h2>
  )
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <li className="flex items-center gap-4 border-b border-white/5 pb-3">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#00DEFF]/30 bg-[#00DEFF]/5 text-[#00DEFF]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wider text-white/40">{label}</p>
        <p className="truncate text-sm font-medium text-white">{value}</p>
      </div>
    </li>
  )
}

function SkillBar({
  name,
  level,
  index,
}: {
  name: string
  level: number
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-white/90">{name}</span>
        <span className="text-sm font-semibold text-[#00DEFF]">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(to right, #0088CC 0%, #00DEFF 100%)',
            boxShadow: '0 0 12px rgba(0,222,255,0.5)',
          }}
        />
      </div>
    </motion.div>
  )
}

function TimelineCard({
  icon,
  title,
  org,
  period,
  description,
  index,
}: {
  icon: React.ReactNode
  title: string
  org: string
  period: string
  description: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#00DEFF]/40 hover:bg-[#00DEFF]/[0.03] sm:p-7"
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: '0 0 0 1px #00DEFF, 0 0 24px rgba(0,222,255,0.2)' }}
      />

      <div className="relative flex items-start gap-4">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/5 text-[#00DEFF]">
          {icon}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {title}
            </h3>
            <span className="text-xs font-medium text-[#00DEFF]">{period}</span>
          </div>
          <p className="mt-0.5 text-sm font-medium text-white/60">{org}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({
  project: p,
  index,
}: {
  project: { name: string; description: string; link: string; year: string }
  index: number
}) {
  return (
    <motion.a
      href={p.link === '#' ? undefined : p.link}
      target={p.link === '#' ? undefined : '_blank'}
      rel={p.link === '#' ? undefined : 'noopener noreferrer'}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-[#00DEFF]/40 hover:shadow-[0_20px_60px_-15px_rgba(0,222,255,0.3)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00DEFF]/30 bg-[#00DEFF]/5 text-[#00DEFF]">
          <FolderGit2 size={18} />
        </span>
        <span className="text-xs font-medium text-[#00DEFF]">{p.year}</span>
      </div>
      <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        {p.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{p.description}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[#00DEFF] opacity-70 transition-all group-hover:gap-2.5 group-hover:opacity-100">
        <Code size={12} />
        View Project
        <ArrowUpRight size={12} />
      </div>
    </motion.a>
  )
}
