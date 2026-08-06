export type WebsiteType = 'ecommerce' | 'business' | 'portfolio' | 'restaurant'

export const WEBSITE_TYPES: { value: WebsiteType; label: string }[] = [
  { value: 'ecommerce', label: 'Ecommerce' },
  { value: 'business', label: 'General / Business' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'restaurant', label: 'Restaurant / Local' },
]

export type SoftwareTheme =
  | 'inventory'
  | 'healthcare'
  | 'ecommerce'
  | 'hr'
  | 'general'

export function analyzeSoftwareDescription(description: string): {
  theme: SoftwareTheme
  title: string
  modules: string[]
  accent: string
} {
  const d = description.toLowerCase()

  if (
    /health|clinic|hospital|patient|medical|pharma|doctor|appoint/.test(d)
  ) {
    return {
      theme: 'healthcare',
      title: 'Healthcare Admin',
      modules: ['Patients', 'Appointments', 'Records', 'Billing', 'Staff'],
      accent: '#00DEFF',
    }
  }
  if (/inventor|stock|warehouse|sku|supply|product catalog/.test(d)) {
    return {
      theme: 'inventory',
      title: 'Inventory Control',
      modules: ['Stock', 'Suppliers', 'Orders', 'Reports', 'Alerts'],
      accent: '#00DEFF',
    }
  }
  if (/e-?commerce|shop|store|order|cart|retail|catalog/.test(d)) {
    return {
      theme: 'ecommerce',
      title: 'Ecommerce Ops Panel',
      modules: ['Orders', 'Catalog', 'Customers', 'Fulfillment', 'Analytics'],
      accent: '#00DEFF',
    }
  }
  if (/employee|hr|payroll|attendance|staff|team|leave/.test(d)) {
    return {
      theme: 'hr',
      title: 'People & Ops Admin',
      modules: ['Employees', 'Attendance', 'Payroll', 'Leave', 'Docs'],
      accent: '#00DEFF',
    }
  }
  return {
    theme: 'general',
    title: 'Custom Business Admin',
    modules: ['Dashboard', 'Records', 'Users', 'Reports', 'Settings'],
    accent: '#00DEFF',
  }
}

export function displayDomain(name: string) {
  const cleaned = name
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .replace(/[^a-z0-9.-]+/g, '')
  if (!cleaned) return 'yourbrand.com'
  if (cleaned.includes('.')) return cleaned
  return `${cleaned}.com`
}
