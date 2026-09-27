import { SiteShell } from '@/components/trishulhub/site-shell'
import { getSiteContact } from '@/lib/site-contact-io'

export async function ServerSiteShell({
  children,
  showLoader = false,
}: {
  children: React.ReactNode
  showLoader?: boolean
}) {
  /* Database-backed, so the values are current rather than a build artefact. */
  const initialContact = await getSiteContact()
  return (
    <SiteShell showLoader={showLoader} initialContact={initialContact}>
      {children}
    </SiteShell>
  )
}
