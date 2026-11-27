import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TalentTestSideTab from "@/components/TalentTestSideTab";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maganur Basappa PU College Davangere | Best PU College",
  description:
    "Maganur Basappa PU College (MBPU College), Davangere - a top-rated Pre University College in Karnataka offering Science and Computer Science with expert faculty.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/icon-32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png?v=3", sizes: "192x192", type: "image/png" },
      { url: "/icon.png?v=3", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: [
      { url: "/apple-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: [
    "Maganur Basappa PU College",
    "MBPU College",
    "best PU college in Davangere",
    "PU college in Karnataka",
    "Pre University College Davangere",
    "Science PU college Davangere",
    "NEET JEE KCET coaching Davangere",
    "Taralabalu Badavane college",
    "top PU colleges Karnataka",
    "PCMB College Davangere",
    "PCMCs College Davangere",
  ],
  openGraph: {
    title: "Maganur Basappa PU College Davangere | Best PU College",
    description:
      "Maganur Basappa PU College (MBPU College), Davangere - a top-rated Pre University College in Karnataka offering Science and Computer Science with expert faculty.",
    type: "website",
    locale: "en_IN",
  },
};

// EducationalOrganization schema for local SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  name: "Maganur Basappa P.U. Science College",
  alternateName: "MBPU Science College",
  url: "https://mbpucollege.in",
  description:
    "Maganur Basappa P.U. Science College, Davangere - a top-rated Pre University College in Karnataka offering Science and Computer Science streams with integrated NEET, JEE, and KCET coaching.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Basavamantapa, Taralabalu Extension, Badavana, Vidyanagar",
    addressLocality: "Davangere",
    addressRegion: "Karnataka",
    postalCode: "577005",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "14.4644",
    longitude: "75.9218",
  },
  hasMap: "https://maps.app.goo.gl/2qpUQhqkBBpWAQnh6",
  foundingDate: "2005",
  numberOfStudents: "5000",
  knowsAbout: ["Pre University Education", "NEET Coaching", "JEE Coaching", "KCET Coaching", "Science Education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png?v=3" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=3" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png?v=3" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=3" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans">
        <Providers>
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <TalentTestSideTab />
        </Providers>
      </body>
    </html>
  );
}
