'use client'

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User as UserIcon,
  Linkedin,
  Instagram,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
} from 'lucide-react'
import { HeroAccentWord } from '@/components/trishulhub/hero-accent-word'
import { EASE_OUT_EXPO } from '@/lib/animations'
import {
  externalHref,
  mailtoHref,
  whatsappHref,
} from '@/lib/social-links'

type Founder = {
  name: string
  initial: string
  role: string
  bio: string
  projects: string
  image: string | null
  image2: string | null
  dateOfBirth: string | null
  address: string | null
  zipCode: string | null
  email: string | null
  phone: string | null
  github: string | null
  linkedin: string | null
  twitter: string | null
  website: string | null
  whatsapp: string | null
  instagram: string | null
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

const socialBtn =
  'flex h-10 w-10 items-center justify-center rounded-full border border-[#111111]/20 text-[#6b7280] transition-all hover:border-[#0D3C1F] hover:bg-[#0D3C1F] hover:text-white'

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function FounderDetailClient({
  founder: f,
}: {
  slug: string
  founder: Founder
}) {
  const aboutImage = f.image2 || f.image

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111]">
      {/* Hero — padded for shared site navbar */}
      <section className="relative overflow-hidden border-b border-[#e5e7eb] px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8">
        <div className="lt-glow pointer-events-none absolute -right-20 top-0 h-[28rem] w-[28rem] opacity-60" />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            className="order-2 lg:order-1"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#6b7280]">
              Portfolio
            </p>
            <h1 className="text-4xl font-bold uppercase leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              I&apos;m <HeroAccentWord words={f.name} />
            </h1>
            <p className="mt-4 text-lg font-medium text-[#0D3C1F] sm:text-xl">
              {f.role}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#6b7280] sm:text-base">
              {f.bio}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {f.email ? (
                <a
                  href={`mailto:${f.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D3C1F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#164a28]"
                >
                  <Mail size={15} />
                  Contact me
                </a>
              ) : null}
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111111] bg-white px-7 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#0D3C1F] hover:text-white"
              >
                My Works
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {whatsappHref(f.whatsapp) && (
                <a
                  href={whatsappHref(f.whatsapp)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className={socialBtn}
                >
                  <WhatsAppIcon size={16} />
                </a>
              )}
              {externalHref(f.linkedin) && (
                <a
                  href={externalHref(f.linkedin)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={socialBtn}
                >
                  <Linkedin size={16} />
                </a>
              )}
              {externalHref(f.instagram) && (
                <a
                  href={externalHref(f.instagram)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={socialBtn}
                >
                  <Instagram size={16} />
                </a>
              )}
              {mailtoHref(f.email) && (
                <a
                  href={mailtoHref(f.email)!}
                  aria-label="Email"
                  className={socialBtn}
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="order-1 lg:order-2"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-[#111111] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8f5ef] to-[#fafafa]" />
              {f.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={f.image}
                  alt={f.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="select-none text-[160px] font-bold leading-none text-[#0D3C1F]/20 sm:text-[200px]">
                    {f.initial}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="border-b border-[#e5e7eb] bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading lead="About" accent="me" />
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-[#6b7280] sm:text-base">
            {f.bio}
          </p>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-[#111111] bg-[#fafafa]">
                {aboutImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={aboutImage}
                    alt={f.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#e8f5ef] to-[#fafafa]">
                    <span className="select-none text-[140px] font-bold leading-none text-[#0D3C1F]/25">
                      {f.initial}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
            >
              <ul className="space-y-4">
                <DetailRow icon={<UserIcon size={16} />} label="Name" value={f.name} />
                {f.dateOfBirth && (
                  <DetailRow icon={<Calendar size={16} />} label="Date of birth" value={f.dateOfBirth} />
                )}
                {f.address && (
                  <DetailRow icon={<MapPin size={16} />} label="Address" value={f.address} />
                )}
                {f.zipCode && (
                  <DetailRow icon={<MapPin size={16} />} label="Zip code" value={f.zipCode} />
                )}
                {f.email && (
                  <DetailRow icon={<Mail size={16} />} label="Email" value={f.email} />
                )}
                {f.phone && (
                  <DetailRow icon={<Phone size={16} />} label="Phone" value={f.phone} />
                )}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-b border-[#e5e7eb] bg-[#fafafa] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading lead="My" accent="skills" />
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-[#6b7280] sm:text-base">
            Technical and soft skills from shipping real client work at TrishulHub.
          </p>
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {f.skills.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-b border-[#e5e7eb] bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading lead="My" accent="education" />
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-[#6b7280] sm:text-base">
            Formal education and certifications that built the foundation of my career.
          </p>
          <div className="space-y-5">
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

      {/* Experience */}
      <section className="border-b border-[#e5e7eb] bg-[#fafafa] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading lead="My" accent="experience" />
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-[#6b7280] sm:text-base">
            Professional journey across companies and roles.
          </p>
          <div className="space-y-5">
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

      {/* Projects */}
      <section
        id="projects"
        className="border-b border-[#e5e7eb] bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading lead="My" accent="projects" />
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-center text-sm leading-relaxed text-[#6b7280] sm:text-base">
            Selected work shipped at TrishulHub and beyond.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {f.projectsList.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#fafafa] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#111111] bg-white px-8 py-12 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:px-12">
          <SectionHeading lead="Get in" accent="touch" />
          <p className="mx-auto mb-8 mt-4 max-w-xl text-sm leading-relaxed text-[#6b7280] sm:text-base">
            Have a project in mind? Drop a message — replies usually within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {f.email && (
              <a
                href={`mailto:${f.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#0D3C1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#164a28]"
              >
                <Mail size={15} />
                {f.email}
              </a>
            )}
            {f.phone && (
              <a
                href={`tel:${f.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#111111] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#0D3C1F] hover:text-white"
              >
                <Phone size={15} />
                {f.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function SectionHeading({ lead, accent }: { lead: string; accent: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      className="text-center text-3xl font-bold uppercase tracking-[-0.03em] text-[#111111] sm:text-4xl"
    >
      {lead} <span className="text-[#0D3C1F]">{accent}</span>
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
    <li className="flex items-center gap-4 border-b border-[#e5e7eb] pb-3">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#111111]/15 bg-[#e8f5ef] text-[#0D3C1F]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wider text-[#9ca3af]">{label}</p>
        <p className="truncate text-sm font-medium text-[#111111]">{value}</p>
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
      transition={{ duration: 0.4, delay: index * 0.05, ease: EASE_OUT_EXPO }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-[#111111]">{name}</span>
        <span className="text-sm font-semibold text-[#0D3C1F]">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 + index * 0.05, ease: 'easeOut' }}
          className="h-full rounded-full bg-[#0D3C1F]"
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: EASE_OUT_EXPO }}
      className="rounded-xl border border-[#111111] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] sm:p-7"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#0D3C1F]">
          {icon}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-[#111111]">{title}</h3>
            <span className="text-xs font-semibold text-[#0D3C1F]">{period}</span>
          </div>
          <p className="mt-0.5 text-sm font-medium text-[#6b7280]">{org}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">{description}</p>
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: EASE_OUT_EXPO }}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#111111] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#0D3C1F]">
          <FolderGit2 size={18} />
        </span>
        <span className="text-xs font-semibold text-[#0D3C1F]">{p.year}</span>
      </div>
      <h3 className="text-lg font-bold text-[#111111]">{p.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b7280]">{p.description}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#0D3C1F] transition-all group-hover:gap-2.5">
        <Code size={12} />
        View project
        <ArrowUpRight size={12} />
      </div>
    </motion.a>
  )
}
