'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User as UserIcon,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  LogOut,
  Eye,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  ExternalLink,
} from 'lucide-react'

type Skill = { name: string; level: number }
type Education = { degree: string; school: string; year: string; description: string }
type Experience = { role: string; company: string; period: string; description: string }
type Project = { name: string; description: string; link: string; year: string }

type Founder = {
  id: string
  slug: string
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
  skills: Skill[]
  education: Education[]
  experience: Experience[]
  projectsList: Project[]
  username: string
}

type Tab = 'profile' | 'about' | 'skills' | 'education' | 'experience' | 'projects' | 'security'

export function AdminDashboardClient({ founder: initialFounder }: { founder: Founder }) {
  const router = useRouter()
  const [founder, setFounder] = useState<Founder>(initialFounder)
  const [tab, setTab] = useState<Tab>('profile')
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [uploading, setUploading] = useState(false)

  // Auto-clear save notice
  useEffect(() => {
    if (!savedAt) return
    const t = setTimeout(() => setSavedAt(null), 3000)
    return () => clearTimeout(t)
  }, [savedAt])

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      const body: Record<string, unknown> = {
        name: founder.name,
        role: founder.role,
        bio: founder.bio,
        projects: founder.projects,
        image: founder.image,
        dateOfBirth: founder.dateOfBirth,
        address: founder.address,
        zipCode: founder.zipCode,
        email: founder.email,
        phone: founder.phone,
        origin: founder.origin,
        github: founder.github,
        linkedin: founder.linkedin,
        twitter: founder.twitter,
        website: founder.website,
        skills: founder.skills,
        education: founder.education,
        experience: founder.experience,
        projectsList: founder.projectsList,
      }
      if (newPassword.trim()) body.password = newPassword.trim()

      const res = await fetch('/admin/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data?.error || 'Save failed')
        return
      }
      setSavedAt(Date.now())
      setNewPassword('')
    } catch {
      setError('Network error while saving')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await fetch('/admin/api/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  async function handleImageUpload(file: File) {
    setUploading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/admin/api/upload-image', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setError(data?.error || 'Upload failed')
        return
      }
      setFounder((f) => ({ ...f, image: data.url }))
    } catch {
      setError('Network error during upload')
    } finally {
      setUploading(false)
    }
  }

  /* ----- helpers for editing arrays ----- */
  function updateSkill(i: number, key: keyof Skill, value: string | number) {
    setFounder((f) => {
      const skills = [...f.skills]
      skills[i] = { ...skills[i], [key]: value }
      return { ...f, skills }
    })
  }
  function addSkill() {
    setFounder((f) => ({ ...f, skills: [...f.skills, { name: '', level: 50 }] }))
  }
  function removeSkill(i: number) {
    setFounder((f) => ({ ...f, skills: f.skills.filter((_, idx) => idx !== i) }))
  }

  function updateEducation(i: number, key: keyof Education, value: string) {
    setFounder((f) => {
      const education = [...f.education]
      education[i] = { ...education[i], [key]: value }
      return { ...f, education }
    })
  }
  function addEducation() {
    setFounder((f) => ({
      ...f,
      education: [...f.education, { degree: '', school: '', year: '', description: '' }],
    }))
  }
  function removeEducation(i: number) {
    setFounder((f) => ({ ...f, education: f.education.filter((_, idx) => idx !== i) }))
  }

  function updateExperience(i: number, key: keyof Experience, value: string) {
    setFounder((f) => {
      const experience = [...f.experience]
      experience[i] = { ...experience[i], [key]: value }
      return { ...f, experience }
    })
  }
  function addExperience() {
    setFounder((f) => ({
      ...f,
      experience: [...f.experience, { role: '', company: '', period: '', description: '' }],
    }))
  }
  function removeExperience(i: number) {
    setFounder((f) => ({ ...f, experience: f.experience.filter((_, idx) => idx !== i) }))
  }

  function updateProject(i: number, key: keyof Project, value: string) {
    setFounder((f) => {
      const projectsList = [...f.projectsList]
      projectsList[i] = { ...projectsList[i], [key]: value }
      return { ...f, projectsList }
    })
  }
  function addProject() {
    setFounder((f) => ({
      ...f,
      projectsList: [...f.projectsList, { name: '', description: '', link: '', year: '' }],
    }))
  }
  function removeProject(i: number) {
    setFounder((f) => ({ ...f, projectsList: f.projectsList.filter((_, idx) => idx !== i) }))
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <UserIcon size={15} /> },
    { id: 'about', label: 'About & Contact', icon: <Mail size={15} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={15} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={15} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={15} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={15} /> },
    { id: 'security', label: 'Security', icon: <Lock size={15} /> },
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a
              href={`/founders/${founder.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-[#00DEFF]/40 hover:text-[#00DEFF]"
              title="View my public portfolio"
            >
              <Eye size={13} />
              <span className="hidden sm:inline">View Portfolio</span>
            </a>
            <span className="hidden text-xs text-white/40 sm:inline">·</span>
            <span className="hidden text-xs text-white/60 sm:inline">
              Signed in as <span className="font-semibold text-[#00DEFF]">{founder.username}</span>
            </span>
          </div>

          {/* Top-right TrishulHub logo → links to main site */}
          <a
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md transition-all hover:border-[#00DEFF]/40 hover:bg-[#00DEFF]/5"
            title="Back to TrishulHub"
          >
            <span className="text-sm font-bold tracking-[0.15em] sm:text-base">
              <span className="text-white">TRISHUL</span>
              <span className="gradient-text">HUB</span>
            </span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-3xl font-bold sm:text-4xl"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              <span className="text-white">Edit </span>
              <span className="gradient-text">{founder.name}&apos;s Portfolio</span>
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Changes save instantly to your public portfolio page at{' '}
              <a
                href={`/founders/${founder.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#00DEFF] hover:underline"
              >
                /founders/{founder.slug}
                <ExternalLink size={11} className="ml-1 inline" />
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {savedAt && (
                <motion.span
                  key={savedAt}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-sm font-medium text-green-400"
                >
                  <CheckCircle2 size={15} />
                  Saved
                </motion.span>
              )}
              {error && (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-sm font-medium text-red-400"
                >
                  <AlertCircle size={15} />
                  {error}
                </motion.span>
              )}
            </AnimatePresence>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-[#00DEFF] px-5 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:shadow-[0_0_20px_rgba(0,222,255,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-1.5 border-b border-white/10 pb-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                tab === t.id
                  ? 'bg-[#00DEFF] text-[#0A0A0A]'
                  : 'border border-white/10 text-white/70 hover:border-[#00DEFF]/40 hover:text-[#00DEFF]'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="space-y-6">
          {tab === 'profile' && (
            <Card title="Profile Photo" icon={<UserIcon size={16} />}>
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                {/* Preview */}
                <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-[#00DEFF]/30 bg-[#0A0A0A]">
                  {founder.image ? (
                     
                    <img src={founder.image} alt={founder.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0a2a35] to-[#0A0A0A]">
                      <span
                        className="text-5xl font-bold"
                        style={{ color: '#00DEFF', fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {founder.initial}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#00DEFF]/40 px-4 py-2 text-sm font-medium text-[#00DEFF] transition-all hover:bg-[#00DEFF] hover:text-[#0A0A0A]">
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file)
                        e.target.value = ''
                      }}
                    />
                  </label>
                  <p className="mt-2 text-xs text-white/40">
                    PNG, JPEG, WebP, or GIF · Max 5MB · Square aspect recommended
                  </p>
                  {founder.image && (
                    <button
                      onClick={() => setFounder((f) => ({ ...f, image: null }))}
                      className="mt-3 block text-xs text-red-400 hover:underline"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>
            </Card>
          )}

          {tab === 'profile' && (
            <Card title="Basic Info" icon={<UserIcon size={16} />}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <Input
                    value={founder.name}
                    onChange={(v) => setFounder((f) => ({ ...f, name: v }))}
                    placeholder="Full name"
                  />
                </Field>
                <Field label="Role / Title">
                  <Input
                    value={founder.role}
                    onChange={(v) => setFounder((f) => ({ ...f, role: v }))}
                    placeholder="e.g. Fullstack Developer"
                  />
                </Field>
                <Field label="Projects Count (short text)">
                  <Input
                    value={founder.projects}
                    onChange={(v) => setFounder((f) => ({ ...f, projects: v }))}
                    placeholder="e.g. 50+"
                  />
                </Field>
                <Field label="Bio">
                  <Textarea
                    value={founder.bio}
                    onChange={(v) => setFounder((f) => ({ ...f, bio: v }))}
                    placeholder="A short professional bio..."
                    rows={4}
                  />
                </Field>
              </div>
            </Card>
          )}

          {tab === 'about' && (
            <Card title="Personal Details" icon={<Mail size={16} />}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Date of Birth">
                  <Input
                    value={founder.dateOfBirth ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, dateOfBirth: v || null }))}
                    placeholder="e.g. January 15, 1998"
                  />
                </Field>
                <Field label="Origin / Hometown">
                  <Input
                    value={founder.origin ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, origin: v || null }))}
                    placeholder="e.g. Rajkot, Gujarat, India"
                  />
                </Field>
                <Field label="Address">
                  <Input
                    value={founder.address ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, address: v || null }))}
                    placeholder="City, State, Country"
                  />
                </Field>
                <Field label="Zip Code">
                  <Input
                    value={founder.zipCode ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, zipCode: v || null }))}
                    placeholder="e.g. 360001"
                  />
                </Field>
                <Field label="Email">
                  <Input
                    value={founder.email ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, email: v || null }))}
                    placeholder="you@trishulhub.com"
                    type="email"
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    value={founder.phone ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, phone: v || null }))}
                    placeholder="+91 ..."
                  />
                </Field>
              </div>
            </Card>
          )}

          {tab === 'about' && (
            <Card title="Social Links" icon={<Globe size={16} />}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="GitHub URL">
                  <Input
                    value={founder.github ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, github: v || null }))}
                    placeholder="https://github.com/..."
                  />
                </Field>
                <Field label="LinkedIn URL">
                  <Input
                    value={founder.linkedin ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, linkedin: v || null }))}
                    placeholder="https://linkedin.com/in/..."
                  />
                </Field>
                <Field label="Twitter / X URL">
                  <Input
                    value={founder.twitter ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, twitter: v || null }))}
                    placeholder="https://twitter.com/..."
                  />
                </Field>
                <Field label="Website">
                  <Input
                    value={founder.website ?? ''}
                    onChange={(v) => setFounder((f) => ({ ...f, website: v || null }))}
                    placeholder="https://..."
                  />
                </Field>
              </div>
            </Card>
          )}

          {tab === 'skills' && (
            <Card
              title="Skills"
              icon={<Code size={16} />}
              action={
                <button
                  onClick={addSkill}
                  className="flex items-center gap-1.5 rounded-full border border-[#00DEFF]/40 px-3 py-1.5 text-xs font-medium text-[#00DEFF] transition-all hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                >
                  <Plus size={13} />
                  Add Skill
                </button>
              }
            >
              {founder.skills.length === 0 ? (
                <EmptyState text="No skills yet. Click 'Add Skill' to begin." />
              ) : (
                <div className="space-y-3">
                  {founder.skills.map((s, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:flex-row sm:items-center"
                    >
                      <Input
                        value={s.name}
                        onChange={(v) => updateSkill(i, 'name', v)}
                        placeholder="Skill name (e.g. React / Next.js)"
                        className="flex-1"
                      />
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={s.level}
                          onChange={(e) => updateSkill(i, 'level', Number(e.target.value))}
                          className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-[#00DEFF] sm:w-40"
                        />
                        <span className="w-12 text-right text-sm font-semibold text-[#00DEFF]">
                          {s.level}%
                        </span>
                        <button
                          onClick={() => removeSkill(i)}
                          aria-label="Remove skill"
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {tab === 'education' && (
            <Card
              title="Education"
              icon={<GraduationCap size={16} />}
              action={
                <button
                  onClick={addEducation}
                  className="flex items-center gap-1.5 rounded-full border border-[#00DEFF]/40 px-3 py-1.5 text-xs font-medium text-[#00DEFF] transition-all hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                >
                  <Plus size={13} />
                  Add Education
                </button>
              }
            >
              {founder.education.length === 0 ? (
                <EmptyState text="No education entries yet." />
              ) : (
                <div className="space-y-4">
                  {founder.education.map((e, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#00DEFF]">
                          Entry {i + 1}
                        </span>
                        <button
                          onClick={() => removeEducation(i)}
                          aria-label="Remove education"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Field label="Degree">
                          <Input
                            value={e.degree}
                            onChange={(v) => updateEducation(i, 'degree', v)}
                            placeholder="B.E. Computer Engineering"
                          />
                        </Field>
                        <Field label="School / Institution">
                          <Input
                            value={e.school}
                            onChange={(v) => updateEducation(i, 'school', v)}
                            placeholder="Atmiya University"
                          />
                        </Field>
                        <Field label="Year / Period">
                          <Input
                            value={e.year}
                            onChange={(v) => updateEducation(i, 'year', v)}
                            placeholder="2016 - 2020"
                          />
                        </Field>
                        <div className="sm:col-span-2">
                          <Field label="Description">
                            <Textarea
                              value={e.description}
                              onChange={(v) => updateEducation(i, 'description', v)}
                              placeholder="What you specialised in, achievements, etc."
                              rows={3}
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {tab === 'experience' && (
            <Card
              title="Experience"
              icon={<Briefcase size={16} />}
              action={
                <button
                  onClick={addExperience}
                  className="flex items-center gap-1.5 rounded-full border border-[#00DEFF]/40 px-3 py-1.5 text-xs font-medium text-[#00DEFF] transition-all hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                >
                  <Plus size={13} />
                  Add Experience
                </button>
              }
            >
              {founder.experience.length === 0 ? (
                <EmptyState text="No experience entries yet." />
              ) : (
                <div className="space-y-4">
                  {founder.experience.map((e, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#00DEFF]">
                          Entry {i + 1}
                        </span>
                        <button
                          onClick={() => removeExperience(i)}
                          aria-label="Remove experience"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Field label="Role">
                          <Input
                            value={e.role}
                            onChange={(v) => updateExperience(i, 'role', v)}
                            placeholder="Fullstack Developer"
                          />
                        </Field>
                        <Field label="Company">
                          <Input
                            value={e.company}
                            onChange={(v) => updateExperience(i, 'company', v)}
                            placeholder="TrishulHub"
                          />
                        </Field>
                        <Field label="Period">
                          <Input
                            value={e.period}
                            onChange={(v) => updateExperience(i, 'period', v)}
                            placeholder="2022 - Present"
                          />
                        </Field>
                        <div className="sm:col-span-2">
                          <Field label="Description">
                            <Textarea
                              value={e.description}
                              onChange={(v) => updateExperience(i, 'description', v)}
                              placeholder="What you did, achievements, etc."
                              rows={3}
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {tab === 'projects' && (
            <Card
              title="Projects"
              icon={<FolderGit2 size={16} />}
              action={
                <button
                  onClick={addProject}
                  className="flex items-center gap-1.5 rounded-full border border-[#00DEFF]/40 px-3 py-1.5 text-xs font-medium text-[#00DEFF] transition-all hover:bg-[#00DEFF] hover:text-[#0A0A0A]"
                >
                  <Plus size={13} />
                  Add Project
                </button>
              }
            >
              {founder.projectsList.length === 0 ? (
                <EmptyState text="No projects yet." />
              ) : (
                <div className="space-y-4">
                  {founder.projectsList.map((p, i) => (
                    <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wider text-[#00DEFF]">
                          Project {i + 1}
                        </span>
                        <button
                          onClick={() => removeProject(i)}
                          aria-label="Remove project"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Field label="Project Name">
                          <Input
                            value={p.name}
                            onChange={(v) => updateProject(i, 'name', v)}
                            placeholder="TrishulHub CRM"
                          />
                        </Field>
                        <Field label="Year">
                          <Input
                            value={p.year}
                            onChange={(v) => updateProject(i, 'year', v)}
                            placeholder="2024"
                          />
                        </Field>
                        <Field label="Link (use # for none)">
                          <Input
                            value={p.link}
                            onChange={(v) => updateProject(i, 'link', v)}
                            placeholder="https://..."
                          />
                        </Field>
                        <div className="sm:col-span-2">
                          <Field label="Description">
                            <Textarea
                              value={p.description}
                              onChange={(v) => updateProject(i, 'description', v)}
                              placeholder="What the project does, your role, impact..."
                              rows={2}
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {tab === 'security' && (
            <Card title="Change Password" icon={<Lock size={16} />}>
              <div className="max-w-md space-y-4">
                <p className="text-sm text-white/60">
                  Set a new password for your account (<span className="font-mono text-[#00DEFF]">{founder.username}</span>).
                  Leave blank to keep current password. Min 4 characters.
                </p>
                <Field label="New Password">
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="Enter new password"
                  />
                </Field>
                <p className="text-xs text-white/40">
                  Click <span className="font-semibold text-[#00DEFF]">Save Changes</span> at the top right to apply.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Bottom save bar (mobile-friendly) */}
        <div className="mt-10 flex items-center justify-end gap-3 border-t border-white/10 pt-6">
          <AnimatePresence mode="wait">
            {savedAt && (
              <motion.span
                key={savedAt}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-sm font-medium text-green-400"
              >
                <CheckCircle2 size={15} />
                Saved
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-full bg-[#00DEFF] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition-all hover:shadow-[0_0_30px_rgba(0,222,255,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ============ Reusable UI bits ============ */

function Card({
  title,
  icon,
  action,
  children,
}: {
  title: string
  icon: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#00DEFF]/30 bg-[#00DEFF]/5 text-[#00DEFF]">
            {icon}
          </span>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </label>
      {children}
    </div>
  )
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  className?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-lg border border-white/10 bg-[#0A0A0A]/60 px-3 py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:border-[#00DEFF]/60 focus:outline-none focus:ring-1 focus:ring-[#00DEFF]/30 ${className}`}
    />
  )
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-y rounded-lg border border-white/10 bg-[#0A0A0A]/60 px-3 py-2.5 text-sm text-white placeholder-white/30 transition-colors focus:border-[#00DEFF]/60 focus:outline-none focus:ring-1 focus:ring-[#00DEFF]/30"
    />
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.01] py-10 text-center text-sm text-white/40">
      {text}
    </div>
  )
}
