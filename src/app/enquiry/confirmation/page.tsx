import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquiry Sent | K22 Auto Rentals",
  description: "Your booking enquiry has been received by K22 Auto Rentals.",
  robots: { index: false, follow: true },
};

export default async function EnquiryConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;

  return (
    <div>
      <svg
        className="successCheck mb-6"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="26"
          cy="26"
          r="23"
          stroke="var(--signal)"
          strokeWidth="2.5"
        />
        <path
          d="M16 27l7 7 13-15"
          stroke="var(--signal)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="eyebrow">Confirmed</span>
      <h1 className="display mt-4 text-3xl sm:text-5xl">Enquiry sent</h1>
      <p className="lead mt-4 max-w-md">
        Thanks — we&rsquo;ve received your booking enquiry
        {type ? ` for ${type}` : ""}. We&rsquo;ll be in touch fast to confirm
        availability and next steps.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link href="/fleet" className="btnSignal">
          View fleet
        </Link>
        <Link href="/enquiry" className="btnOutline">
          Submit another enquiry
        </Link>
        <Link href="/" className="btnOutline">
          Back home
        </Link>
      </div>
    </div>
  );
}
