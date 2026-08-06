'use client'

import Link from 'next/link'
import { analyzeSoftwareDescription, displayDomain } from '@/lib/preview'

export function SoftwarePreviewTemplate({
  domain,
  description,
}: {
  domain: string
  description: string
}) {
  const analysis = analyzeSoftwareDescription(description)
  const host = displayDomain(domain)

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F14] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/60 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center text-[11px] text-white/50">
          https://{host}/admin
        </div>
      </div>

      <div className="grid min-h-[320px] sm:grid-cols-[180px_1fr]">
        <aside className="border-b border-white/10 bg-black/40 p-4 sm:border-b-0 sm:border-r">
          <div className="mb-5 text-xs font-bold tracking-wide text-[#00DEFF]">
            {analysis.title}
          </div>
          <ul className="space-y-1.5">
            {analysis.modules.map((m, i) => (
              <li
                key={m}
                className={`rounded-lg px-3 py-2 text-xs ${
                  i === 0
                    ? 'bg-[#00DEFF]/15 text-[#00DEFF]'
                    : 'text-white/50 hover:bg-white/5'
                }`}
              >
                {m}
              </li>
            ))}
          </ul>
        </aside>

        <div className="p-4 sm:p-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Live preview
              </div>
              <h3
                className="mt-1 text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {analysis.title}
              </h3>
            </div>
            <div className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/45">
              Theme: {analysis.theme}
            </div>
          </div>

          <p className="mb-4 line-clamp-2 text-xs text-white/45">
            {description.trim() ||
              'Describe your software needs to personalize this admin preview.'}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {analysis.modules.slice(0, 3).map((m) => (
              <div
                key={m}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="text-[10px] uppercase tracking-wider text-white/35">
                  {m}
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  {Math.floor(12 + m.length * 3)}
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#00DEFF]"
                    style={{ width: `${40 + m.length * 4}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="mb-2 text-[11px] text-white/40">Recent activity</div>
            {['New record created', 'User role updated', 'Export completed'].map(
              (row) => (
                <div
                  key={row}
                  className="flex items-center justify-between border-t border-white/5 py-2 text-xs text-white/60 first:border-t-0"
                >
                  <span>{row}</span>
                  <span className="text-white/30">just now</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/50 px-4 py-3">
        <p className="text-[11px] text-white/40">
          Custom software mock · based on your description
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
