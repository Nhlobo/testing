import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/data";

// Use Geist (bundled with create-next-app) as the primary sans font
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Mapengo Innovations",
    default: "Mapengo Innovations — South African Digital Agency",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Mapengo Innovations — South African Digital Agency",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapengo Innovations",
    description: siteConfig.description,
  },
  keywords: [
    "South African digital agency",
    "web development South Africa",
    "Next.js agency Johannesburg",
    "mobile app development South Africa",
    "Mapengo Innovations",
  ],
  authors: [{ name: "Mapengo Innovations", url: siteConfig.url }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Mapengo Innovations",
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.phone,
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Johannesburg",
                addressRegion: "Gauteng",
                addressCountry: "ZA",
              },
              sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
              priceRange: "R15,000 — Custom",
              areaServed: "South Africa",
            }),
          }}
        />
        {/* Inline script to apply theme before first paint, avoiding flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased bg-navy-900 text-slate-100`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

