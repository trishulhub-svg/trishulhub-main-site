import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AgentationLive } from "@/components/agentation";

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
  themeColor: "#0d3c1f",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "TrishulHub",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/images/trishulhub-logo.png`,
  image: `${SITE_URL}/images/trishulhub-logo.png`,
  email: "info@trishulhub.in",
  areaServed: ["United Kingdom", "European Union", "Worldwide"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
    addressLocality: "London",
  },
  knowsAbout: [
    "Website development",
    "Custom software development",
    "Mobile app development",
    "Cloud engineering",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Website Development" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Custom Software" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Mobile App Development" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground selection:bg-[#75B4B1]/35 selection:text-[#111111]`}
      >
        {children}
        <Toaster />
        <AgentationLive />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
