'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_SITE_CONTACT,
  contactLinks,
  mergeSiteContact,
  whatsappUrl,
  type SiteContact,
} from '@/lib/site-contact'

type SiteContactContextValue = SiteContact & {
  links: ReturnType<typeof contactLinks>
  whatsappWithMessage: (message: string) => string
  ready: boolean
}

const SiteContactContext = createContext<SiteContactContextValue | null>(null)

export function SiteContactProvider({
  children,
  initial,
}: {
  children: ReactNode
  initial?: Partial<SiteContact> | null
}) {
  const [contact, setContact] = useState<SiteContact>(() =>
    mergeSiteContact(initial),
  )
  const [ready, setReady] = useState(Boolean(initial))

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch('/site-contact.json', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to load site contact')
        const data = (await res.json()) as Partial<SiteContact>
        if (!cancelled) {
          setContact(mergeSiteContact(data))
          setReady(true)
        }
      } catch {
        if (!cancelled) setReady(true)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<SiteContactContextValue>(() => {
    const links = contactLinks(contact)
    return {
      ...contact,
      links,
      whatsappWithMessage: (message: string) => whatsappUrl(contact, message),
      ready,
    }
  }, [contact, ready])

  return (
    <SiteContactContext.Provider value={value}>
      {children}
    </SiteContactContext.Provider>
  )
}

export function useSiteContact(): SiteContactContextValue {
  const ctx = useContext(SiteContactContext)
  if (!ctx) {
    const links = contactLinks(DEFAULT_SITE_CONTACT)
    return {
      ...DEFAULT_SITE_CONTACT,
      links,
      whatsappWithMessage: (message: string) =>
        whatsappUrl(DEFAULT_SITE_CONTACT, message),
      ready: false,
    }
  }
  return ctx
}
