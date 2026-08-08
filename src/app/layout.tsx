import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AgentationLive } from "@/components/agentation";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-[#0A0A0A] text-white selection:bg-[#00DEFF]/30 selection:text-white`}
      >
        {children}
        <Toaster />
        <AgentationLive />
      </body>
    </html>
  );
}
