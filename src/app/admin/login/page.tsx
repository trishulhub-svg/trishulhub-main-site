import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { LoginClient } from './login-client'

export const dynamic = 'force-dynamic'

export default async function AdminLoginPage() {
  const session = await getSession()
  if (session) {
    redirect('/admin')
  }
  return <LoginClient />
}
