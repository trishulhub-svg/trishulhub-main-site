import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { PageHero } from '@/components/trishulhub/page-hero'

export const metadata = {
  title: 'Terms of Service',
  description:
    'The terms that apply to using this website and to engaging TrishulHub for design and development work.',
  alternates: { canonical: '/terms' },
}

const sections = [
  {
    heading: 'Using this website',
    body: [
      'You may browse this site and use its contact features for lawful business enquiries. You agree not to attempt to disrupt the service, access restricted areas without permission, or scrape content at a rate that degrades the site for others.',
    ],
  },
  {
    heading: 'Quotes and proposals',
    body: [
      'Prices shown on this website are indicative starting points, not binding offers. A binding quote is issued in writing after a discovery conversation and sets out scope, deliverables, milestones and payment terms.',
      'Anything not explicitly listed in a written proposal is out of scope. Additional work is quoted separately before it begins.',
    ],
  },
  {
    heading: 'Project terms',
    body: [
      'Client engagements are governed by a separate written agreement covering deposits, milestone payments, revision rounds, timelines, acceptance criteria and termination.',
      'Timelines assume timely feedback and access to required content, accounts and approvals from the client.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      'On full payment of the agreed fees, ownership of bespoke code, designs and content created specifically for your project transfers to you.',
      'Pre-existing tools, libraries, frameworks and internal utilities remain the property of their respective owners and are used under their open-source or commercial licences.',
    ],
  },
  {
    heading: 'Third-party services',
    body: [
      'Projects often rely on third-party platforms such as hosting, database, email, payment or analytics providers. Those services are governed by their own terms, and we are not responsible for outages or policy changes outside our control.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'We deliver work with reasonable skill and care, but we do not warrant that a product will be uninterrupted or error-free. Our total liability for any engagement is limited to the fees paid for that engagement.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction over any dispute.',
    ],
  },
]

export default function TermsPage() {
  return (
    <ServerSiteShell>
      <PageHero
        label="Legal"
        title={
          <>
            Terms of{' '}
            <span className="font-playfair italic text-[#0D3C1F]">Service</span>
          </>
        }
        subtitle="The ground rules for using this website and for working with TrishulHub on a project."
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
                Need a specific agreement?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                We are happy to work from your MSA or SOW. Email{' '}
                <a
                  className="th-link font-medium text-[#0D3C1F]"
                  href="mailto:info@trishulhub.in"
                >
                  info@trishulhub.in
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </ServerSiteShell>
  )
}
