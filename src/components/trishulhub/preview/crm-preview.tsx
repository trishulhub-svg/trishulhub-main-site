'use client'

import Link from 'next/link'
import { displayDomain } from '@/lib/preview'

export function CrmPreviewTemplate({
  domain,
  company,
}: {
  domain: string
  company: string
}) {
  const brand = company.trim() || 'Your CRM'
  const host = displayDomain(domain)

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080C12] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/60 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center text-[11px] text-white/50">
          https://{host}/crm
        </div>
      </div>

      <div className="border-b border-white/10 px-5 py-8">
        <div className="text-xs uppercase tracking-[0.25em] text-[#00DEFF]">
          CRM landing preview
        </div>
        <h3
          className="mt-3 text-3xl font-bold text-white"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {brand} — manage people & pipeline
        </h3>
        <p className="mt-3 max-w-xl text-sm text-white/55">
          A CRM-themed experience for tracking employees, customers, deals, and
          follow-ups in one calm workspace.
        </p>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-3">
        {[
          { t: 'Customers', v: '128', s: 'Active accounts' },
          { t: 'Employees', v: '24', s: 'Team members' },
          { t: 'Open deals', v: '17', s: 'This month' },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="text-[11px] uppercase tracking-wider text-white/40">
              {c.t}
            </div>
            <div className="mt-2 text-2xl font-bold text-white">{c.v}</div>
            <div className="mt-1 text-xs text-[#00DEFF]/80">{c.s}</div>
          </div>
        ))}
      </div>

      <div className="px-5 pb-5">
        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="mb-3 text-xs font-medium text-white/50">
            Pipeline snapshot
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['Lead', 'Qualified', 'Proposal', 'Won'].map((stage, i) => (
              <div
                key={stage}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="text-[10px] text-white/40">{stage}</div>
                <div className="mt-2 h-16 rounded-md bg-gradient-to-t from-[#00DEFF]/25 to-transparent" />
                <div className="mt-2 text-xs text-white/70">{3 + i * 2}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/50 px-4 py-3">
        <p className="text-[11px] text-white/40">
          CRM theme preview · TrishulHub
        </p>
        <Link
          href="/contact"
          className="rounded-full border border-[#00DEFF]/40 bg-[#00DEFF]/10 px-3 py-1.5 text-[11px] font-semibold text-[#00DEFF]"
        >
          Contact us
        </Link>
      </div>
    </div>
  )
}
