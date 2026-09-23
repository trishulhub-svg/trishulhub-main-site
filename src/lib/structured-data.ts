/**
 * Structured data (schema.org) builders.
 *
 * Kept in one place so the organisation node is defined once and every page's
 * breadcrumbs / FAQ / person nodes reference the same identifier. Values come
 * from the live contact config where possible, so the markup can't drift from
 * what the admin has entered.
 */

import type { SiteContact } from '@/lib/site-contact'

export const SITE_URL = 'https://trishulhub.com'

export const SITE_DESCRIPTION =
  'TrishulHub is a UK-based digital engineering studio building high-performance websites, bespoke business software and mobile apps for growing companies.'

type Faq = { q: string; a: string }
type Crumb = { name: string; path: string }

export function organizationSchema(contact: SiteContact) {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Organization'],
    '@id': `${SITE_URL}/#organization`,
    name: 'TrishulHub',
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/trishulhub-logo.png`,
    },
    image: `${SITE_URL}/opengraph-image.png`,
    email: contact.email,
    telephone: contact.phone,
    priceRange: '££',
    currenciesAccepted: 'GBP',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressLocality: 'London',
    },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Place', name: 'European Union' },
      'Worldwide',
    ],
    knowsAbout: [
      'Website development',
      'Bespoke software development',
      'Mobile app development',
      'Cloud engineering',
      'Web performance',
    ],
    makesOffer: [
      'Website Development',
      'Custom Software',
      'Mobile App Development',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name, provider: { '@id': `${SITE_URL}/#organization` } },
    })),
  }
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  }
}

export function faqSchema(faqs: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

export function personSchema(founder: {
  name: string
  role: string
  bio: string
  slug: string
  image?: string | null
  email?: string | null
  linkedin?: string | null
}) {
  const sameAs = [founder.linkedin].filter(
    (url): url is string => typeof url === 'string' && url.startsWith('http'),
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: founder.name,
    jobTitle: founder.role,
    description: founder.bio,
    url: `${SITE_URL}/founders/${founder.slug}`,
    ...(founder.image && founder.image.startsWith('http')
      ? { image: founder.image }
      : {}),
    ...(founder.email ? { email: founder.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    worksFor: { '@id': `${SITE_URL}/#organization` },
  }
}
