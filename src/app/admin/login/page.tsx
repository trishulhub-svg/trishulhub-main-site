import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

/** Legacy URL — portfolio login lives at /admin */
export default function AdminLoginRedirectPage() {
  redirect('/admin')
}
