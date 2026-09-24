import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AgentationLive } from "@/components/agentation";
import { ChatWidgetLazy } from "@/components/trishulhub/chat-widget-lazy";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema } from "@/lib/structured-data";
import { readSiteContactFile } from "@/lib/site-contact-io";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://trishulhub.com";
const SITE_DESCRIPTION =
  "TrishulHub is a UK-based digital engineering studio building high-performance websites, bespoke business software and mobile apps for growing companies.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TrishulHub | Websites, Software & Mobile Apps",
    template: "%s | TrishulHub",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "TrishulHub",
    "web development UK",
    "website development London",
    "custom software",
    "bespoke software development",
    "mobile apps",
    "admin panel",
    "Next.js agency",
    "Next.js",
    "React",
    "Turso",
    "Vercel",
  ],
  authors: [{ name: "TrishulHub", url: SITE_URL }],
  creator: "TrishulHub",
  publisher: "TrishulHub",
  applicationName: "TrishulHub",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  openGraph: {
    type: "website",
    siteName: "TrishulHub",
    url: SITE_URL,
    locale: "en_GB",
    title: "TrishulHub | Websites, Software & Mobile Apps",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "TrishulHub — digital engineering studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrishulHub | Websites, Software & Mobile Apps",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d3c1f" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f11" },
  ],
  width: "device-width",
  initialScale: 1,
  /**
   * Zoom is deliberately NOT locked. `user-scalable=no` / `maximum-scale=1`
   * fails WCAG 2.2 SC 1.4.4 (Resize text) — a real barrier for anyone with low
   * vision, and the kind of thing an accessibility complaint or a client audit
   * will pick up. axe-core flags it as critical.
   *
   * The original annoyance (accidental zoom while using the chat or planner)
   * is handled properly instead, in globals.css:
   *   - `touch-action: manipulation` on interactive elements, which kills
   *     double-tap-to-zoom while leaving pinch-zoom available;
   *   - 16px form fields, so iOS never zooms when a field takes focus.
   */
  colorScheme: "light dark",
};

/**
 * Runs before first paint so a dark-mode visitor never sees a white flash.
 * Kept inline (not a module) on purpose — it must execute before React.
 */
const themeScript = `(function(){try{var s=localStorage.getItem('trishulhub-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s?s==='dark':m;var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organisation markup reads the live contact config so the phone number and
  // email in the schema always match what the admin has entered.
  const contact = await readSiteContactFile()

  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground selection:bg-[#75B4B1]/35 selection:text-[#111111]`}
      >
        {children}
        <Toaster />
        <AgentationLive />
        <ChatWidgetLazy />

        <JsonLd data={organizationSchema(contact)} />
      </body>
    </html>
  );
}

