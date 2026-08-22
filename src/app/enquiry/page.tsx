import { Suspense } from "react";
import type { Metadata } from "next";
import EnquiryClient from "./EnquiryClient";

export const metadata: Metadata = {
  title: "Booking Enquiry | K22 Auto Rentals",
  description:
    "Send your dates and vehicle type to K22 Auto Rentals and we'll confirm availability fast. Personal, delivery-ready, and taxi-ready vehicles across Victoria.",
};

export default function EnquiryPage() {
  return (
    <Suspense fallback={<div className="text-[var(--muted)]">Loading…</div>}>
      <EnquiryClient />
    </Suspense>
  );
}
