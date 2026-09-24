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
