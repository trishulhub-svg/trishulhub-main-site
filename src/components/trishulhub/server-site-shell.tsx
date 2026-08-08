import { SiteShell } from '@/components/trishulhub/site-shell'
import { readSiteContactFile } from '@/lib/site-contact-io'

export async function ServerSiteShell({
  children,
  showLoader = false,
}: {
  children: React.ReactNode
  showLoader?: boolean
}) {
  const initialContact = await readSiteContactFile()
  return (
    <SiteShell showLoader={showLoader} initialContact={initialContact}>
      {children}
    </SiteShell>
  )
}
