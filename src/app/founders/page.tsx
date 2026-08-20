import { redirect } from 'next/navigation'

export default function FoundersIndexPage() {
  redirect('/about#founders')
}
