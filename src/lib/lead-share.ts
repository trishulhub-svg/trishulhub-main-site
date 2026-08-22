export type LeadShareData = {
  id: string
  name: string
  email: string
  service: string
  message: string
  shareToken?: string
  createdAt: string
}

export type LeadSharePayload = {
  schema: 'trishulhub.contact_lead.v1'
  lead: {
    id: string
    name: string
    email: string
    service: string
    message: string
    submittedAt: string
  }
}

/** Unicode-safe base64 for browser + Node. */
export function utf8ToBase64(text: string): string {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(unescape(encodeURIComponent(text)))
  }
  return Buffer.from(text, 'utf8').toString('base64')
}

export function buildLeadPayload(lead: LeadShareData): LeadSharePayload {
  return {
    schema: 'trishulhub.contact_lead.v1',
    lead: {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      service: lead.service,
      message: lead.message,
      submittedAt: new Date(lead.createdAt).toISOString(),
    },
  }
}

/**
 * Self-contained universal link — embeds the full lead JSON in a data URI.
 * No website fetch required (works when domain access is blocked).
 */
export function buildUniversalLeadLink(lead: LeadShareData): string {
  const json = JSON.stringify(buildLeadPayload(lead))
  return `data:application/json;charset=utf-8;base64,${utf8ToBase64(json)}`
}

/** Self-contained HTML preview for the Open button (no domain required). */
export function buildUniversalLeadHtmlLink(lead: LeadShareData): string {
  const submitted = new Date(lead.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const esc = (s: string) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Lead — ${esc(lead.name)}</title>
<style>
  body{margin:0;font-family:system-ui,sans-serif;background:#fafafa;color:#111;line-height:1.5}
  .card{max-width:560px;margin:32px auto;padding:28px 24px;background:#fff;border:1px solid #111;border-radius:16px}
  .eyebrow{font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#0D3C1F;margin:0 0 8px}
  h1{margin:0 0 6px;font-size:28px}
  .meta{color:#6b7280;font-size:14px;margin-bottom:22px}
  .label{display:block;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#9ca3af;margin:0 0 4px}
  .row{margin-bottom:16px}
  .value{font-size:15px;white-space:pre-wrap;word-break:break-word}
  a{color:#0D3C1F}
</style>
</head>
<body>
  <div class="card">
    <p class="eyebrow">TrishulHub contact lead</p>
    <h1>${esc(lead.name)}</h1>
    <p class="meta">Submitted ${esc(submitted)}</p>
    <div class="row"><span class="label">Email</span><div class="value"><a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a></div></div>
    <div class="row"><span class="label">Service</span><div class="value">${esc(lead.service)}</div></div>
    <div class="row"><span class="label">Message</span><div class="value">${esc(lead.message)}</div></div>
  </div>
</body>
</html>`

  return `data:text/html;charset=utf-8;base64,${utf8ToBase64(html)}`
}
