import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  title: "TrishulHub | Digital Solutions. Real Growth.",
  description:
    "TrishulHub delivers premium software development, web development, digital marketing, CRM solutions, UI/UX design, and e-commerce solutions that transform ideas into powerful digital experiences.",
  keywords: [
    "TrishulHub",
    "software development",
    "web development",
    "digital marketing",
    "CRM solutions",
    "UI/UX design",
    "e-commerce solutions",
    "Next.js",
    "React",
  ],
  authors: [{ name: "TrishulHub" }],
  openGraph: {
    title: "TrishulHub | Digital Solutions. Real Growth.",
    description:
      "Premium software development, web development, digital marketing, CRM solutions, UI/UX design, and e-commerce solutions.",
    siteName: "TrishulHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrishulHub | Digital Solutions. Real Growth.",
    description:
      "Premium digital solutions that transform ideas into powerful digital experiences.",
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
      </body>
    </html>
  );
}
