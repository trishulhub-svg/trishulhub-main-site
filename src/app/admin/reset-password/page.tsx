import { ResetPasswordClient } from './reset-password-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Reset admin password',
  robots: { index: false, follow: false, nocache: true },
}

export default function ResetPasswordPage() {
  return <ResetPasswordClient />
}
