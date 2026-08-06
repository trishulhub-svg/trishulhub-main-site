'use client'

import {
  Activity,
  Bell,
  CheckCircle2,
  Globe,
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  Users,
  Zap,
} from 'lucide-react'

export function WebsiteOsPanel() {
  return (
    <div className="electric-card overflow-hidden rounded-[24px] border border-white/10 bg-neutral-900/80 ring-1 ring-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Globe size={14} className="text-[#00DEFF]" />
          Site Studio
        </div>
        <span className="rounded-full bg-[#00DEFF]/15 px-2.5 py-0.5 text-[10px] font-medium text-[#00DEFF]">
          Live mock
        </span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-[140px_1fr]">
        <div className="space-y-2 rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="text-[10px] uppercase tracking-wider text-white/35">
            Pages
          </div>
          {['Home', 'Services', 'Pricing', 'Contact'].map((p, i) => (
            <div
              key={p}
              className={`rounded-lg px-2 py-1.5 text-xs ${
                i === 0 ? 'bg-[#00DEFF]/15 text-[#00DEFF]' : 'text-white/45'
              }`}
            >
              {p}
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-white/50">Launch readiness</span>
              <span className="text-xs font-semibold text-[#00DEFF]">78%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#00DEFF] to-[#0088CC]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { t: 'Template fit', v: 'Ecommerce' },
              { t: 'Mobile score', v: '98' },
              { t: 'CTA clarity', v: 'Strong' },
              { t: 'Sections', v: '6' },
            ].map((m) => (
              <div
                key={m.t}
                className="rounded-xl border border-white/10 bg-black/20 p-3"
              >
                <div className="text-[10px] text-white/35">{m.t}</div>
                <div
                  className="mt-1 text-sm font-semibold text-white"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SoftwareOsPanel() {
  return (
    <div className="electric-card overflow-hidden rounded-[24px] border border-white/10 bg-neutral-900/80 ring-1 ring-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <LayoutDashboard size={14} className="text-[#00DEFF]" />
          Ops Console
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Syncing
        </span>
      </div>
      <div className="p-4">
        <div className="mb-3 flex gap-2 text-xs">
          {['Overview', 'Modules', 'Roles'].map((t, i) => (
            <span
              key={t}
              className={`border-b-2 px-2 pb-1 ${
                i === 0
                  ? 'border-[#00DEFF] text-[#00DEFF]'
                  : 'border-transparent text-white/40'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          {[
            {
              icon: ShoppingBag,
              title: 'Inventory pulse',
              desc: 'Stock thresholds mapped for warehouse SKUs',
            },
            {
              icon: Activity,
              title: 'Workflow draft',
              desc: 'Generating admin screens from your brief',
            },
            {
              icon: Bell,
              title: 'Access note',
              desc: 'Role matrix ready for manager + staff',
            },
          ].map((row) => (
            <div
              key={row.title}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00DEFF]/10 text-[#00DEFF]">
                <row.icon size={16} />
              </div>
              <div>
                <div className="text-sm font-medium text-white">{row.title}</div>
                <div className="text-xs text-white/45">{row.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {['Auto alerts', 'Smart roles', 'Export'].map((t, i) => (
            <div
              key={t}
              className="rounded-xl border border-white/10 bg-black/25 px-2 py-3 text-center"
            >
              <div
                className={`mx-auto mb-2 h-4 w-8 rounded-full ${
                  i < 2 ? 'bg-[#00DEFF]/40' : 'bg-white/15'
                }`}
              />
              <div className="text-[10px] text-white/45">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CrmOsPanel() {
  return (
    <div className="electric-card overflow-hidden rounded-[24px] border border-white/10 bg-neutral-900/80 ring-1 ring-white/10 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Users size={14} className="text-[#00DEFF]" />
          CRM Pulse
        </div>
        <span className="rounded-full bg-[#00DEFF]/15 px-2.5 py-0.5 text-[10px] font-medium text-[#00DEFF]">
          Pipeline live
        </span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-[10px] uppercase tracking-wider text-white/35">
            Relationship velocity
          </div>
          <div
            className="mt-2 text-3xl font-light text-white"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            +64%
          </div>
          <svg viewBox="0 0 280 55" className="mt-2 h-12 w-full">
            <defs>
              <linearGradient id="crmSpark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00DEFF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00DEFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 50 C 40 50, 60 30, 100 35 C 140 40, 160 10, 200 15 C 240 20, 260 5, 280 0 L 280 55 L 0 55 Z"
              fill="url(#crmSpark)"
            />
            <path
              d="M0 50 C 40 50, 60 30, 100 35 C 140 40, 160 10, 200 15 C 240 20, 260 5, 280 0"
              fill="none"
              stroke="#00DEFF"
              strokeWidth="2"
            />
            <circle cx="280" cy="0" r="3.5" fill="#00DEFF" />
          </svg>
        </div>
        <div className="space-y-2">
          {[
            { icon: Users, label: 'Customers synced', on: true },
            { icon: MessageSquare, label: 'Follow-up reminders', on: true },
            { icon: Zap, label: 'Deal watch', on: false },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3 py-2.5"
            >
              <div className="flex items-center gap-2 text-xs text-white/65">
                <row.icon size={14} className="text-[#00DEFF]" />
                {row.label}
              </div>
              <div
                className={`h-5 w-9 rounded-full p-0.5 ${
                  row.on ? 'bg-[#00DEFF]/40' : 'bg-white/15'
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                    row.on ? 'translate-x-4' : ''
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-white/45">
          <CheckCircle2 size={14} className="text-[#00DEFF]" />
          Employees + customers in one calm workspace
        </div>
      </div>
    </div>
  )
}
