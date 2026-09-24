import Link from 'next/link'
import { ServerSiteShell } from '@/components/trishulhub/server-site-shell'
import { PageHero } from '@/components/trishulhub/page-hero'
import { CookieSettingsButton } from '@/components/trishulhub/cookie-consent'
import {
  ICO_CONTACT,
  LEGAL_ENTITY,
  LEGAL_ENTITY_REGISTERED,
  POLICY_LAST_UPDATED,
  POLICY_VERSION,
  PRIVACY_EMAIL,
} from '@/lib/legal'

export const metadata = {
  title: 'Cookie & Storage Policy',
  description:
    'Every cookie and piece of device storage trishulhub.com uses, why it is there, how long it lasts, and how to change or withdraw your choice.',
  alternates: { canonical: '/cookies' },
  openGraph: {
    title: 'Cookie & Storage Policy | TrishulHub',
    description:
      'What trishulhub.com stores on your device, the UK rules behind it, and how to object.',
    url: '/cookies',
  },
}

type StorageRow = {
  name: string
  kind: string
  purpose: string
  basis: string
  duration: string
}

const ROWS: StorageRow[] = [
  {
    name: 'trishulhub-theme',
    kind: 'localStorage',
    purpose:
      'Remembers whether you chose the light or dark theme so the site looks the same next time.',
    basis: 'Appearance exception — you can object',
    duration: 'Until you clear it, or object',
  },
  {
    name: 'trishulhub:consent',
    kind: 'localStorage',
    purpose:
      'A record of the choice you made on this notice (and when you made it), so we do not ask again on every page.',
    basis: 'Strictly necessary — proof of your choice',
    duration: 'Until you clear your choice',
  },
  {
    name: 'trishulhub-chat-v1 · :seen',
    kind: 'sessionStorage',
    purpose:
      'Keeps your enquiry chat open and holds the draft answers while you work through it, so a page change does not lose them.',
    basis: 'Strictly necessary — the service you asked for',
    duration: 'Deleted when you close the tab',
  },
]

export default function CookiesPage() {
  return (
    <ServerSiteShell>
      <PageHero
        label="Legal"
        title={
          <>
            Cookie &amp; storage{' '}
            <span className="font-playfair italic text-[#0D3C1F]">policy</span>
          </>
        }
        subtitle="What this site keeps on your device, what it is for, how long it lasts — and how to say no."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="lt-container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-[0.14em] text-[#9ca3af]">
              Last updated: {POLICY_LAST_UPDATED} · Version {POLICY_VERSION}
            </p>

            {/* Plain-English summary — the thing most people actually read */}
            <div className="mt-8 rounded-2xl border border-[#0d3c1f]/15 bg-[#f4faf7] p-6">
              <h2 className="text-base font-bold text-[#111111]">
                The short version
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#4b5563]">
                <li>• No advertising, no tracking, no profiling cookies.</li>
                <li>• No analytics tools are running on this site.</li>
                <li>• No third-party cookies are set by this website.</li>
                <li>
                  • We store only what is needed to run the site and remember
                  your display preference — and you can object to either.
                </li>
              </ul>
              <div className="mt-4">
                <CookieSettingsButton className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0D3C1F] px-5 text-[13.5px] font-semibold text-white transition hover:bg-[#164a28]">
                  Change or withdraw your choice
                </CookieSettingsButton>
              </div>
            </div>

            <div className="mt-10 space-y-10">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
                  What the law requires
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                  The UK rules come from regulation 6 of the Privacy and
                  Electronic Communications Regulations 2003 (PECR), updated by
                  the Data (Use and Access) Act 2025. In short: a website must
                  tell you what it stores on your device, and must not store or
                  read anything without your consent unless a limited exception
                  applies.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                  Two of those exceptions cover what we use. The{' '}
                  <strong className="font-semibold text-[#111111]">
                    appearance exception
                  </strong>{' '}
                  covers storage whose only purpose is adapting how the site
                  looks to your own preference (our light/dark choice). The{' '}
                  <strong className="font-semibold text-[#111111]">
                    statistical purposes exception
                  </strong>{' '}
                  covers storage whose only purpose is counting how a site is
                  used so it can be improved — we do not use this today. For
                  both, we must give you clear information and an easy, free way
                  to object. That is exactly what this page and the settings
                  button above do.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
                  Everything we store, and why
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                  “localStorage” and “sessionStorage” are places a browser can
                  keep small pieces of text on your device. PECR treats them the
                  same as cookies, which is why they are listed here.
                </p>

                <div className="mt-5 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                  <table className="w-full min-w-[46rem] border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-[#111111]/15">
                        <th className="py-3 pr-4 font-semibold text-[#111111]">
                          Name
                        </th>
                        <th className="py-3 pr-4 font-semibold text-[#111111]">
                          Type
                        </th>
                        <th className="py-3 pr-4 font-semibold text-[#111111]">
                          What it does
                        </th>
                        <th className="py-3 pr-4 font-semibold text-[#111111]">
                          Why we may use it
                        </th>
                        <th className="py-3 font-semibold text-[#111111]">
                          Lasts
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ROWS.map((r) => (
                        <tr
                          key={r.name}
                          className="border-b border-[#111111]/8 align-top"
                        >
                          <td className="py-3 pr-4 font-mono text-[12px] text-[#0D3C1F]">
                            {r.name}
                          </td>
                          <td className="py-3 pr-4 text-[#6b7280]">{r.kind}</td>
                          <td className="py-3 pr-4 leading-relaxed text-[#4b5563]">
                            {r.purpose}
                          </td>
                          <td className="py-3 pr-4 leading-relaxed text-[#4b5563]">
                            {r.basis}
                          </td>
                          <td className="py-3 leading-relaxed text-[#6b7280]">
                            {r.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
                  Third parties
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                  None of the items above are shared with, or set by, third
                  parties for advertising or tracking, and we do not sell any
                  information about your visit. Our hosting and database
                  providers do keep standard server logs (such as IP address and
                  browser type) as part of serving the site securely — that is
                  covered in the{' '}
                  <Link
                    href="/privacy"
                    className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                  >
                    privacy notice
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
                  Your choices
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                  You can accept, change or withdraw your choice at any time
                  using the button at the top of this page or the “Cookie
                  settings” link in the footer of every page. Withdrawing takes
                  the same number of clicks as giving it in the first place. If
                  you object to the display preference, we remove it immediately
                  and the site follows your device’s own colour setting.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                  You can also clear everything yourself: in most browsers,
                  Settings → Privacy → Clear browsing data, and choose “Cookies
                  and site data”. Blocking storage entirely will not stop you
                  using the site — only the light/dark memory and chat drafts
                  are lost.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#111111] sm:text-2xl">
                  Questions or concerns
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                  Contact {LEGAL_ENTITY_REGISTERED || LEGAL_ENTITY} at{' '}
                  <a
                    href={`mailto:${PRIVACY_EMAIL}`}
                    className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                  >
                    {PRIVACY_EMAIL}
                  </a>{' '}
                  and we will respond within 30 days. If you are not satisfied
                  with our response, you can complain to the {ICO_CONTACT.name}{' '}
                  at{' '}
                  <a
                    href={ICO_CONTACT.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#0D3C1F] underline decoration-[#0D3C1F]/30 underline-offset-2"
                  >
                    ico.org.uk
                  </a>{' '}
                  or on {ICO_CONTACT.helpline}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServerSiteShell>
  )
}
