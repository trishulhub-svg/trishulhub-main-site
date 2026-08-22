export type LeadShareData = {
  id: string
  name: string
  email: string
  service: string
  message: string
  shareToken?: string
  createdAt: string
}

/** Full compact lead — used on the /lead page embed (not clipboard). */
export type CompactLead = {
  v: 1
  n: string
  e: string
  s: string
  m: string
  t: string
}

/**
 * Clipboard share payload — always short, even if the form message is huge.
 * Message is a short preview only; full text is on Open / Download.
 */
export type ShareLead = {
  v: 2
  n: string
  e: string
  s: string
  /** Short message preview (never the full long message). */
  m: string
  t: string
  /** Share token — Open uses /lead/{k} for the full lead. */
  k: string
  /** 1 = message was truncated; use Open or Download for full text. */
  x?: 1
}

const SHARE_NAME_MAX = 48
const SHARE_EMAIL_MAX = 64
const SHARE_SERVICE_MAX = 32
/** Keep Generate link tiny regardless of how long the visitor wrote. */
const SHARE_MSG_PREVIEW = 72

function clip(s: string, max: number): { text: string; cut: boolean } {
  const t = String(s || '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return { text: t, cut: false }
  return { text: `${t.slice(0, Math.max(0, max - 1)).trimEnd()}…`, cut: true }
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

export function toShareLead(lead: LeadShareData): ShareLead {
  const name = clip(lead.name, SHARE_NAME_MAX)
  const email = clip(lead.email, SHARE_EMAIL_MAX)
  const service = clip(lead.service, SHARE_SERVICE_MAX)
  const msg = clip(lead.message, SHARE_MSG_PREVIEW)
  const out: ShareLead = {
    v: 2,
    n: name.text,
    e: email.text,
    s: service.text,
    m: msg.text,
    t: new Date(lead.createdAt).toISOString(),
    k: lead.shareToken || lead.id,
  }
  if (msg.cut) out.x = 1
  return out
}

/**
 * Always-short paste string for Cursor / any AI.
 * Full message stays out of the clipboard when long — use Open or Download.
 * Example: {"v":2,"n":"Ada","e":"a@b.c","s":"Website","m":"Need a…","t":"…","k":"abc","x":1}
 */
export function buildUniversalLeadLink(lead: LeadShareData): string {
  return JSON.stringify(toShareLead(lead))
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

/** Word-compatible .doc (HTML) download — full message included. */
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
