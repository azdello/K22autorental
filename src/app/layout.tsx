import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const siteUrl = "https://k22autorentals.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "K22 Auto Rentals | Vehicle Rentals in Victoria",
    template: "%s | K22 Auto Rentals",
  },
  description:
    "K22 Auto Rentals — reliable vehicle rentals for personal use, delivery work, and taxi-ready sedans & SUVs across Victoria. Pickup in Cairnlea. Call 0430 277 558.",
  keywords: [
    "car rental Victoria",
    "vehicle hire Cairnlea",
    "taxi rental Melbourne",
    "delivery vehicle rental",
    "K22 Auto Rentals",
    "car hire Melbourne west",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "K22 Auto Rentals",
    title: "K22 Auto Rentals | Vehicle Rentals in Victoria",
    description:
      "Personal use, delivery-ready, and taxi-ready vehicle rentals across Victoria. Pickup in Cairnlea. Call 0430 277 558.",
    images: [
      {
        url: "/k22-logo.png",
        width: 1200,
        height: 630,
        alt: "K22 Auto Rentals",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "K22 Auto Rentals | Vehicle Rentals in Victoria",
    description:
      "Personal use, delivery-ready, and taxi-ready vehicle rentals across Victoria. Call 0430 277 558.",
    images: ["/k22-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "oPFxWbx7TUUwc75ypXrAq-M03nkSdVVLv9D-s2Ne_XM",
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "K22 Auto Rentals",
  image: `${siteUrl}/k22-logo.png`,
  url: siteUrl,
  telephone: "+61430277558",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairnlea",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  areaServed: "Victoria, Australia",
  priceRange: "$$",
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Personal use vehicle rental" } },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Delivery-ready vehicle rental" } },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Taxi-ready sedan rental" } },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Taxi-ready SUV rental" } },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-[var(--hairline)] bg-[var(--bg)]/90 backdrop-blur-md">
          <div className="container flex items-center justify-between gap-4 py-4">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/k22-logo.png"
                alt="K22 Auto Rentals logo"
                width={130}
                height={48}
                priority
                className="h-9 w-auto sm:h-10"
              />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden sm:flex items-center gap-1"
            >
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/fleet"
                className="px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-300"
              >
                Fleet
              </Link>
              <Link
                href="/choose-us"
                className="px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-300"
              >
                Choose Us
              </Link>
              <Link
                href="/enquiry"
                className="px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-300"
              >
                Enquiry
              </Link>
            </nav>

            <a
              href="tel:0430277558"
              className="mono flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--ink)] border border-[var(--hairline-strong)] rounded-full px-3 py-2 sm:px-4 sm:py-2.5 hover:border-[var(--signal)] hover:text-[var(--signal)] transition-colors duration-300 shrink-0"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--signal)]"
                aria-hidden="true"
              />
              0430 277 558
            </a>
          </div>

          <nav
            aria-label="Primary mobile"
            className="flex flex-wrap sm:hidden container gap-x-6 gap-y-1 pb-4 -mt-1"
          >
            <Link
              href="/"
              className="text-sm font-semibold text-[var(--muted)] py-1"
            >
              Home
            </Link>
            <Link
              href="/fleet"
              className="text-sm font-semibold text-[var(--muted)] py-1"
            >
              Fleet
            </Link>
            <Link
              href="/choose-us"
              className="text-sm font-semibold text-[var(--muted)] py-1"
            >
              Choose Us
            </Link>
            <Link
              href="/enquiry"
              className="text-sm font-semibold text-[var(--muted)] py-1"
            >
              Enquiry
            </Link>
          </nav>
        </header>

        {/* Page */}
        <main className="container py-14 sm:py-20">{children}</main>

        {/* Footer */}
        <footer className="hairline mt-20">
          <div className="container py-14">
            <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr]">
              <div>
                <div className="display text-xl">K22 Auto Rentals</div>
                <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed max-w-sm">
                  Personal rentals, delivery-ready vehicles, and taxi-ready
                  sedans &amp; SUVs, dispatched out of Cairnlea, VIC.
                </p>
              </div>

              <div className="sm:text-right">
                <div className="eyebrow sm:justify-end">Call to book</div>
                <a
                  href="tel:0430277558"
                  className="mono mt-3 block text-2xl font-semibold text-[var(--ink)] hover:text-[var(--signal)] transition-colors duration-300"
                >
                  0430 277 558
                </a>
                <div className="mt-5 flex flex-wrap gap-2.5 sm:justify-end">
                  <Link href="/fleet" className="btnOutline text-xs h-10 px-4">
                    Fleet
                  </Link>
                  <Link
                    href="/choose-us"
                    className="btnOutline text-xs h-10 px-4"
                  >
                    Choose Us
                  </Link>
                  <Link
                    href="/enquiry"
                    className="btnOutline text-xs h-10 px-4"
                  >
                    Enquiry
                  </Link>
                </div>
              </div>
            </div>

            <div className="hairline mt-10 pt-6 text-xs text-[var(--muted-2)]">
              © {new Date().getFullYear()} K22 Auto Rentals. All rights
              reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
