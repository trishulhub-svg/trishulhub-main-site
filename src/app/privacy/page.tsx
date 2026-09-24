import Link from 'next/link'
import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { PageHero } from '@/components/trishulhub/page-hero'
import {
  ICO_CONTACT,
  ICO_REGISTRATION,
  LEGAL_ENTITY,
  LEGAL_ENTITY_REGISTERED,
  POLICY_LAST_UPDATED,
  POLICY_VERSION,
  PRIVACY_EMAIL,
  REGISTERED_ADDRESS,
} from '@/lib/legal'

export const metadata = {
  title: 'Privacy Notice',
  description:
    'How TrishulHub collects, uses, stores and protects personal data — your rights under the UK GDPR, who we share data with, how long we keep it, and how to complain.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Notice | TrishulHub',
    description:
      'What we collect through this website, why, how long we keep it, and the control you have over it.',
    url: '/privacy',
  },
}

/** Controller details, assembled from src/lib/legal.ts (owner-editable). */
const CONTROLLER = LEGAL_ENTITY_REGISTERED || LEGAL_ENTITY

type Basis = { purpose: string; data: string; basis: string; kept: string }

const LAW_FUL_BASIS: Basis[] = [
  {
    purpose: 'Replying to an enquiry you send us',
    data: 'Name, email, company, service of interest, budget range, message, and any phone number you add',
    basis:
      'Legitimate interests (Art. 6(1)(f)) — responding to a business enquiry you started. Where you go on to become a client, performance of a contract (Art. 6(1)(b))',
    kept: '24 months after the last contact',
  },
  {
    purpose: 'Keeping a record of what we discussed',
    data: 'The enquiry and the notes and correspondence that followed',
    basis: 'Legitimate interests — continuity and quality of service',
    kept: '24 months after the last contact',
  },
  {
    purpose: 'Running and securing the website',
    data: 'IP address, browser and device type, requested pages, timestamps, error logs',
    basis:
      'Legitimate interests (Art. 6(1)(f)) — keeping the site available, fast and secure. Consent is not needed for the security and preference storage described in our cookie policy',
    kept: 'Short-lived provider logs (typically up to 30 days)',
  },
  {
    purpose: 'Managing a project or contract with you',
    data: 'Contact details, project brief, correspondence, invoices and payment records',
    basis:
      'Performance of a contract (Art. 6(1)(b)) and legal obligation (Art. 6(1)(c)) for tax and accounting records',
    kept: '6 years after the end of the financial year (UK tax requirement)',
  },
  {
    purpose: 'Direct marketing to people who enquired or bought from us',
    data: 'Name, business email address, and what you asked about',
    basis:
      'Legitimate interests / soft opt-in (PECR reg 22) — only where you have not objected, with an unsubscribe in every message',
    kept: 'Until you object or unsubscribe',
  },
]

const RIGHTS = [
  'Be informed about how we use your data — this notice does that.',
  'Get a copy of the personal data we hold about you (a subject access request).',
  'Have inaccurate or incomplete data corrected.',
  'Have your data erased where there is no good reason for us to keep it.',
  'Restrict how we use your data, or object to processing based on legitimate interests.',
  'Receive your data in a portable, machine-readable format, or have it sent to another provider.',
  'Withdraw consent at any time, where we rely on consent (for example cookie choices).',
  'Not be subject to a decision made solely by automated means that has a legal or similarly significant effect on you.',
]

const SUBPROCESSORS = [
  {
    name: 'Vercel Inc.',
    role: 'Website hosting, edge network and CDN',
    location: 'United States, with regional edge locations',
  },
  {
    name: 'Turso (ChiselStrike, Inc.)',
    role: 'Encrypted database holding enquiry records',
    location: 'AWS eu-west-1 (Ireland, EEA)',
  },
  {
    name: 'Our email service provider',
    role: 'Sending and receiving enquiry and account emails over SMTP',
    location: 'Depends on the mailbox provider in use',
  },
]

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
    {children}
  </h2>
)

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
    {children}
  </p>
)

export default function PrivacyPage() {
  return (
    <ServerSiteShell>
      <PageHero
        label="Legal"
        title={
          <>
            Privacy{' '}
            <span className="font-playfair italic text-[#0D3C1F]">Notice</span>
          </>
        }
        subtitle="Plain-English detail on what we collect through this website, why we collect it, how long we keep it, and the control you have over it."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="lt-container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.14em] text-[#9ca3af]">
              Last updated: {POLICY_LAST_UPDATED} · Version {POLICY_VERSION}
            </p>

            <div className="mt-10 space-y-10">
              <div>
                <H>Who we are</H>
                <P>
                  {CONTROLLER} (“we”, “us”, “TrishulHub”) is the data controller
                  for the personal data described in this notice. Our website is
                  trishulhub.com, and we are based in the United Kingdom.
                </P>
                <P>
                  Privacy questions, requests and complaints:{' '}
                  <a
                    href={`mailto:${PRIVACY_EMAIL}`}
                    className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                  >
                    {PRIVACY_EMAIL}
                  </a>
                  {REGISTERED_ADDRESS ? ` · ${REGISTERED_ADDRESS}` : ''}
                  {ICO_REGISTRATION ? ` · ICO registration ${ICO_REGISTRATION}` : ''}
                </P>
                <P>
                  We are not required to appoint a Data Protection Officer. If
                  you are unsure who to contact, use the email address above and
                  your message will reach the people responsible.
                </P>
              </div>

              <div>
                <H>What we collect</H>
                <P>
                  <strong className="font-semibold text-[#111111]">
                    Enquiries.
                  </strong>{' '}
                  When you use the contact form or the project planner, we
                  collect what you type: your name, email address, the service
                  you are interested in, optional company name, budget range and
                  phone number, and your message or planner answers. Please do
                  not send us special category data (for example health,
                  religious or biometric information) through these forms.
                </P>
                <P>
                  <strong className="font-semibold text-[#111111]">
                    Technical information.
                  </strong>{' '}
                  Our hosting provider records standard information such as IP
                  address, browser and device type, the pages requested and
                  timestamps, as part of serving the site securely and reliably.
                </P>
                <P>
                  <strong className="font-semibold text-[#111111]">
                    Staff accounts.
                  </strong>{' '}
                  If a team member signs in to our internal admin area, we
                  process the account credentials and a session cookie to keep
                  that area secure. This is not used for visitors.
                </P>
                <P>
                  <strong className="font-semibold text-[#111111]">
                    Clients and suppliers.
                  </strong>{' '}
                  Once an enquiry becomes a project, we process contact details,
                  project information, correspondence and invoices in the normal
                  course of doing business together.
                </P>
              </div>

              <div>
                <H>Why we use it, and our lawful basis</H>
                <P>
                  We always need a lawful basis under the UK GDPR. These are the
                  purposes we process data for:
                </P>
                <div className="mt-5 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                  <table className="w-full min-w-[44rem] border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-[#111111]/15">
                        <th className="py-3 pr-4 font-semibold text-[#111111]">
                          Purpose
                        </th>
                        <th className="py-3 pr-4 font-semibold text-[#111111]">
                          Data used
                        </th>
                        <th className="py-3 pr-4 font-semibold text-[#111111]">
                          Lawful basis
                        </th>
                        <th className="py-3 font-semibold text-[#111111]">
                          Kept for
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {LAW_FUL_BASIS.map((row) => (
                        <tr
                          key={row.purpose}
                          className="border-b border-[#111111]/8 align-top"
                        >
                          <td className="py-3 pr-4 font-medium leading-relaxed text-[#111111]">
                            {row.purpose}
                          </td>
                          <td className="py-3 pr-4 leading-relaxed text-[#4b5563]">
                            {row.data}
                          </td>
                          <td className="py-3 pr-4 leading-relaxed text-[#4b5563]">
                            {row.basis}
                          </td>
                          <td className="py-3 leading-relaxed text-[#6b7280]">
                            {row.kept}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <P>
                  Where we rely on legitimate interests, we have balanced our
                  interest (answering people who asked us a question, keeping
                  the site secure, and running our business) against your rights
                  and expectations. An enquiry you chose to send us does not
                  come as a surprise to you, we use it for that purpose and no
                  other, and you can object at any time.
                </P>
              </div>

              <div>
                <H>Who we share it with</H>
                <P>
                  We never sell your data, and we do not use it for advertising,
                  profiling or automated decision-making. We share it only with
                  the service providers that make the site and our email work,
                  plus professional advisers where necessary (for example our
                  accountant, under a duty of confidence):
                </P>
                <div className="mt-5 space-y-3">
                  {SUBPROCESSORS.map((s) => (
                    <div
                      key={s.name}
                      className="rounded-xl border border-[#111111]/12 bg-[#fafafa] p-4"
                    >
                      <p className="text-[13.5px] font-bold text-[#111111]">
                        {s.name}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-[#6b7280]">
                        {s.role} · {s.location}
                      </p>
                    </div>
                  ))}
                </div>
                <P>
                  We may also disclose data where the law requires it (for
                  example to HMRC, a court, or the ICO), or to establish or
                  defend legal claims.
                </P>
              </div>

              <div>
                <H>Transfers outside the UK</H>
                <P>
                  Enquiry records are held in an encrypted database hosted in
                  the EEA (AWS eu-west-1, Ireland). Some providers we use are
                  based in the United States, so data may be transferred there
                  for hosting and email delivery.
                </P>
                <P>
                  Where personal data leaves the UK, we rely on the UK
                  International Data Transfer Agreement (IDTA), the International
                  Data Transfer Addendum to the EU Standard Contractual Clauses,
                  or a provider holding an adequate certification — together
                  with an assessment of the risks involved. You can ask us for
                  details of the safeguards we rely on.
                </P>
              </div>

              <div>
                <H>How long we keep it</H>
                <P>
                  The retention periods for each purpose are in the table above:
                  enquiry records are kept while the conversation is active and
                  for up to 24 months afterwards, so we can pick up previous
                  context if you return. Contract and financial records are kept
                  for six years, as UK tax law requires. You can ask us to
                  delete enquiry data sooner.
                </P>
              </div>

              <div>
                <H>How we protect it</H>
                <P>
                  Everything is served over HTTPS. Admin credentials are stored
                  as salted hashes rather than plain text, sessions are
                  HTTP-only and same-site cookies, access to enquiry records is
                  limited to the directors who need it, and we do not put
                  secrets in the browser bundle. If a breach ever put your rights
                  at risk, we would notify you and the ICO without undue delay.
                </P>
              </div>

              <div>
                <H>Children</H>
                <P>
                  This site is aimed at businesses and is not intended for
                  children. We do not knowingly collect data from anyone under
                  13, and we do not use personal data for targeted advertising to
                  children.
                </P>
              </div>

              <div>
                <H>Your rights</H>
                <P>Under the UK GDPR you have the right to:</P>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                  {RIGHTS.map((r) => (
                    <li key={r} className="flex gap-2.5">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <P>
                  To exercise any of these, email{' '}
                  <a
                    href={`mailto:${PRIVACY_EMAIL}`}
                    className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                  >
                    {PRIVACY_EMAIL}
                  </a>
                  . We respond within one month, and it is free. We may ask you
                  to confirm your identity so we do not disclose data to the
                  wrong person.
                </P>
              </div>

              <div>
                <H>Cookies and device storage</H>
                <P>
                  This website sets no advertising or tracking cookies, no
                  analytics, and no third-party cookies. It stores your
                  light/dark display preference and your enquiry draft, which
                  the law treats as device storage rather than cookies. Every
                  item is listed, with its purpose and duration, in the{' '}
                  <Link
                    href="/cookies"
                    className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                  >
                    cookie &amp; storage policy
                  </Link>
                  , where you can also change or withdraw your choice.
                </P>
              </div>

              <div>
                <H>Do you have to give us your data?</H>
                <P>
                  No. Providing personal data through this website is entirely
                  voluntary — it is not a statutory or contractual requirement.
                  If you choose not to give us the details the form asks for, we
                  will not be able to reply to your enquiry or prepare a plan for
                  you. Once you become a client, we will need some information to
                  deliver the work and to meet our legal record-keeping duties.
                </P>
              </div>

              <div>
                <H>How to complain</H>
                <P>
                  If something about the way we have handled your information
                  concerns you, please tell us first — email{' '}
                  <a
                    href={`mailto:${PRIVACY_EMAIL}`}
                    className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                  >
                    {PRIVACY_EMAIL}
                  </a>{' '}
                  with “Data protection complaint” in the subject line. We will
                  acknowledge it, investigate, and respond within 30 days, and we
                  will tell you what we found and what we are changing.
                </P>
                <P>
                  You can complain to the {ICO_CONTACT.name} at any time,
                  including before contacting us:{' '}
                  <a
                    href={ICO_CONTACT.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                  >
                    ico.org.uk/make-a-complaint
                  </a>
                  , {ICO_CONTACT.helpline}, or by post to {ICO_CONTACT.address}.
                </P>
              </div>

              <div>
                <H>Changes to this notice</H>
                <P>
                  If we change what we do with personal data, we will update this
                  notice and the version number above, and — where the change is
                  significant — tell active clients directly.
                </P>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServerSiteShell>
  )
}
