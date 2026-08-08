import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  name: "Maganur Basappa PU College",
  alternateName: "MBPU College",
  url: "https://mbpucollege.in",
  description:
    "Maganur Basappa Pre University College (MBPU College), Davangere - a top-rated Pre University College in Karnataka offering Science and Computer Science streams with integrated NEET, JEE, and KCET coaching.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Taralabalu Badavane, Vidyanagar",
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
  hasMap: "https://maps.google.com/?q=Taralabalu+Badavane+Davangere",
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
        </Providers>
      </body>
    </html>
  );
}
