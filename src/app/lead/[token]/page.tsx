import { notFound } from 'next/navigation'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  try {
    const lead = await db.contactLead.findUnique({
      where: { shareToken: token },
      select: { name: true },
    })
    if (!lead) return { title: 'Lead not found | TrishulHub' }
    return {
      title: `Lead — ${lead.name} | TrishulHub`,
      robots: { index: false, follow: false },
    }
  } catch {
    return { title: 'Lead | TrishulHub' }
  }
}

/** Universal HTML view of a contact lead — loadable from any site via this URL. */
export default async function LeadSharePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const lead = await db.contactLead.findUnique({
    where: { shareToken: token },
  })
  if (!lead) notFound()

  const submitted = new Date(lead.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const jsonUrl = `/api/leads/${lead.shareToken}`

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-12 text-[#111111]">
      <div className="mx-auto max-w-xl rounded-2xl border border-[#111111] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0D3C1F]">
          TrishulHub contact lead
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em]">{lead.name}</h1>
        <p className="mt-1 text-sm text-[#6b7280]">Submitted {submitted}</p>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ca3af]">
              Email
            </p>
            <a
              href={`mailto:${lead.email}`}
              className="mt-1 block text-[15px] text-[#0D3C1F] hover:underline"
            >
              {lead.email}
            </a>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ca3af]">
              Service
            </p>
            <p className="mt-1 text-[15px]">{lead.service}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ca3af]">
              Message
            </p>
            <p className="mt-1 whitespace-pre-wrap text-[15px] leading-relaxed">
              {lead.message}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-[#e5e7eb] pt-5 text-sm text-[#6b7280]">
          <p>Machine-readable JSON for other sites / admin panels:</p>
          <a
            href={jsonUrl}
            className="mt-2 block break-all rounded-lg bg-[#f3f4f6] px-3 py-2.5 font-mono text-xs text-[#0D3C1F] hover:underline"
          >
            {jsonUrl}
          </a>
        </div>
      </div>
    </main>
  )
}
