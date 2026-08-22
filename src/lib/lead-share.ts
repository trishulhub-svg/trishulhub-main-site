export type LeadShareData = {
  id: string
  name: string
  email: string
  service: string
  message: string
  shareToken?: string
  createdAt: string
}

/** Compact lead object — short keys, easy for any AI to parse from paste. */
export type CompactLead = {
  v: 1
  n: string
  e: string
  s: string
  m: string
  t: string
}

export function toCompactLead(lead: LeadShareData): CompactLead {
  return {
    v: 1,
    n: lead.name,
    e: lead.email,
    s: lead.service,
    m: lead.message,
    t: new Date(lead.createdAt).toISOString(),
  }
}

/**
 * Short self-contained share string (not a website URL).
 * Paste into Cursor / any AI — it can read name, email, service, message directly.
 * Example: {"v":1,"n":"Ada","e":"a@b.c","s":"Website","m":"Hi","t":"2026-08-22T…"}
 */
export function buildUniversalLeadLink(lead: LeadShareData): string {
  return JSON.stringify(toCompactLead(lead))
}

export function leadPageUrl(lead: LeadShareData): string {
  const token = lead.shareToken || lead.id
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/lead/${token}`
  }
  return `/lead/${token}`
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Word-compatible .doc (HTML) download — opens in Microsoft Word / Google Docs. */
export function downloadLeadDoc(lead: LeadShareData): void {
  const submitted = new Date(lead.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>Lead — ${escapeHtml(lead.name)}</title></head>
<body>
  <h1>TrishulHub contact lead</h1>
  <p><b>Name:</b> ${escapeHtml(lead.name)}</p>
  <p><b>Email:</b> ${escapeHtml(lead.email)}</p>
  <p><b>Service:</b> ${escapeHtml(lead.service)}</p>
  <p><b>Submitted:</b> ${escapeHtml(submitted)}</p>
  <p><b>Message:</b></p>
  <p>${escapeHtml(lead.message).replace(/\n/g, '<br/>')}</p>
</body>
</html>`

  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const safe = lead.name.replace(/[^\w\-]+/g, '_').slice(0, 40) || 'lead'
  a.href = url
  a.download = `lead-${safe}.doc`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
