import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { PageHero } from '@/components/trishulhub/page-hero'

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How TrishulHub collects, uses and protects personal data submitted through this website.',
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    heading: 'What we collect',
    body: [
      'When you submit a contact form we collect the details you provide: your name, email address, the service you are interested in, an optional company name and budget range, and your message.',
      'Our hosting provider records standard technical information (such as IP address, browser type and request timestamps) as part of serving the site securely.',
    ],
  },
  {
    heading: 'Why we use it',
    body: [
      'We use your enquiry details solely to respond to your request, prepare a proposal, and keep a record of the conversation.',
      'We do not sell your data, and we do not use enquiry details for advertising or profiling.',
    ],
  },
  {
    heading: 'Lawful basis',
    body: [
      'Under the UK GDPR we process enquiry data on the basis of legitimate interests — replying to a business enquiry you initiated — and, where a contract follows, for the performance of that contract.',
    ],
  },
  {
    heading: 'Where your data is stored',
    body: [
      'Enquiry records are stored in an encrypted database hosted in an EU region. Application hosting runs on a global edge network with compute located in the region nearest to the request.',
      'Where a sub-processor is located outside the UK or EEA, transfers rely on the UK International Data Transfer Addendum or Standard Contractual Clauses.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Enquiry records are retained while the conversation is active and for up to 24 months afterwards, so we can pick up previous context if you return. You can ask us to delete them sooner.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'You have the right to access, correct, or erase the personal data we hold about you, to restrict or object to processing, and to request portability.',
      'To exercise any of these rights, email hello@trishulhub.com. We aim to respond within 30 days.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'This website does not use advertising or tracking cookies. Any cookies set are strictly necessary for security, session handling in the admin area, or anonymous aggregate analytics.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'If this policy changes materially we will update the date below and, where appropriate, notify active clients directly.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <ServerSiteShell>
      <PageHero
        label="Legal"
        title={
          <>
            Privacy{' '}
            <span className="font-playfair italic text-[#0D3C1F]">Policy</span>
          </>
        }
        subtitle="Plain-English detail on what we collect through this website, why we collect it, and the control you have over it."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="lt-container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.14em] text-[#9ca3af]">
              Last updated: 20 September 2026
            </p>

            <div className="mt-10 space-y-10">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
                    {s.heading}
                  </h2>
                  {s.body.map((p) => (
                    <p
                      key={p}
                      className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-[#111111]/12 bg-[#fafafa] p-6">
              <h2 className="text-base font-bold text-[#111111]">
                Questions about your data?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                Email{' '}
                <a
                  className="th-link font-medium text-[#0D3C1F]"
                  href="mailto:hello@trishulhub.com"
                >
                  hello@trishulhub.com
                </a>{' '}
                and we will respond within 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ServerSiteShell>
  )
}
