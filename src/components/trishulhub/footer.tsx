'use client'

const services = [
  'Software Development',
  'Web Development',
  'Digital Marketing',
  'CRM Solutions',
  'UI/UX Design',
  'E-commerce Solutions',
]

const company = ['About', 'Services', 'Portfolio', 'Contact']

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-[#0A0A0A]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00DEFF]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-xl font-bold tracking-[0.15em]">
              <span className="text-white">TRISHUL</span>
              <span className="gradient-text">HUB</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Premium digital solutions company helping businesses grow.
            </p>

            {/* Stay updated */}
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                Stay Updated
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-3 flex max-w-xs items-center gap-2"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="h-10 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:border-[#00DEFF]/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-10 shrink-0 rounded-full bg-[#00DEFF] px-4 text-sm font-semibold text-[#0A0A0A] transition-all hover:shadow-[0_0_20px_rgba(0,222,255,0.4)]"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Company
            </div>
            <ul className="mt-4 space-y-2.5">
              {company.map((c) => (
                <li key={c}>
                  <a
                    href={`#${c.toLowerCase()}`}
                    className="text-sm text-white/60 transition-colors hover:text-[#00DEFF]"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Services
            </div>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-white/60 transition-colors hover:text-[#00DEFF]"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Get in Touch
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <a
                  href="mailto:trishulhub@gmail.com"
                  className="transition-colors hover:text-[#00DEFF]"
                >
                  trishulhub@gmail.com
                </a>
              </li>
              <li>India</li>
              <li>trishulhub.in</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="text-xs text-white/40">
            © 2024 TrishulHub. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-white/40 transition-colors hover:text-[#00DEFF]"
            >
              Security &amp; Privacy
            </a>
            <a
              href="#"
              className="text-xs text-white/40 transition-colors hover:text-[#00DEFF]"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
