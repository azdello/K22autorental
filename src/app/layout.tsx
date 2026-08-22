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
        <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur">
          <div className="container flex items-center justify-between gap-4 py-3">
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
                className="mono px-3 py-2 text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--ink)] transition"
              >
                Home
              </Link>
              <Link
                href="/fleet"
                className="mono px-3 py-2 text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--ink)] transition"
              >
                Fleet
              </Link>
              <Link
                href="/choose-us"
                className="mono px-3 py-2 text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--ink)] transition"
              >
                Choose Us
              </Link>
              <Link
                href="/enquiry"
                className="mono px-3 py-2 text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--ink)] transition"
              >
                Enquiry
              </Link>
            </nav>

            <a
              href="tel:0430277558"
              className="mono flex items-center gap-2 text-sm font-semibold text-[var(--ink)] border border-[var(--line)] rounded-[3px] px-3 py-2 hover:border-[var(--amber)] hover:text-[var(--amber)] transition shrink-0"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--amber)]"
                aria-hidden="true"
              />
              0430 277 558
            </a>
          </div>

          <nav
            aria-label="Primary mobile"
            className="flex sm:hidden container gap-4 pb-3 -mt-1"
          >
            <Link
              href="/"
              className="mono text-[11px] uppercase tracking-wider text-[var(--muted)]"
            >
              Home
            </Link>
            <Link
              href="/fleet"
              className="mono text-[11px] uppercase tracking-wider text-[var(--muted)]"
            >
              Fleet
            </Link>
            <Link
              href="/choose-us"
              className="mono text-[11px] uppercase tracking-wider text-[var(--muted)]"
            >
              Choose Us
            </Link>
            <Link
              href="/enquiry"
              className="mono text-[11px] uppercase tracking-wider text-[var(--muted)]"
            >
              Enquiry
            </Link>
          </nav>
        </header>

        {/* Page */}
        <main className="container py-10 sm:py-14">{children}</main>

        {/* Footer */}
        <footer className="hairline mt-16">
          <div className="container py-10">
            <div className="grid gap-8 sm:grid-cols-[1.3fr_1fr]">
              <div>
                <div className="display text-xl">K22 Auto Rentals</div>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed max-w-sm">
                  Personal rentals, delivery-ready vehicles, and taxi-ready
                  sedans &amp; SUVs, dispatched out of Cairnlea, VIC.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs text-[var(--muted2)]">
                  <span>Design by</span>
                  <Link
                    href="https://azdello.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Azdello"
                  >
                    <Image
                      src="/azdello-logo.png"
                      alt="Azdello"
                      width={110}
                      height={30}
                      className="h-6 w-auto opacity-80 hover:opacity-100 transition"
                    />
                  </Link>
                </div>
              </div>

              <div className="sm:text-right">
                <div className="eyebrow sm:justify-end">Call to book</div>
                <a
                  href="tel:0430277558"
                  className="mono mt-2 block text-2xl font-semibold text-[var(--ink)] hover:text-[var(--amber)] transition"
                >
                  0430 277 558
                </a>
                <div className="mt-4 flex flex-wrap gap-2 sm:justify-end">
                  <Link href="/fleet" className="btnOutline text-xs h-9 px-3">
                    Fleet
                  </Link>
                  <Link
                    href="/choose-us"
                    className="btnOutline text-xs h-9 px-3"
                  >
                    Choose Us
                  </Link>
                  <Link
                    href="/enquiry"
                    className="btnOutline text-xs h-9 px-3"
                  >
                    Enquiry
                  </Link>
                </div>
              </div>
            </div>

            <div className="hairline mt-8 pt-5 text-xs text-[var(--muted2)]">
              © {new Date().getFullYear()} K22 Auto Rentals. All rights
              reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
