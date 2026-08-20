import type { Metadata } from "next";
import { Almarai, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AgentationLive } from "@/components/agentation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrishulHub | Websites. Software. Mobile Apps.",
  description:
    "TrishulHub builds websites, business software, and mobile apps that help your company work better.",
  keywords: [
    "TrishulHub",
    "website development",
    "custom software",
    "mobile apps",
    "admin panel",
    "Next.js",
    "React",
  ],
  authors: [{ name: "TrishulHub" }],
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
    title: "TrishulHub | Websites. Software. Mobile Apps.",
    description:
      "Websites, business software, and mobile apps built for your business.",
    siteName: "TrishulHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrishulHub | Websites. Software. Mobile Apps.",
    description:
      "Websites, business software, and mobile apps built for your business.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${almarai.variable} ${instrumentSerif.variable} font-sans antialiased bg-background text-foreground selection:bg-[#75B4B1]/35 selection:text-[#111111]`}
      >
        {children}
        <Toaster />
        <AgentationLive />
      </body>
    </html>
  );
}
