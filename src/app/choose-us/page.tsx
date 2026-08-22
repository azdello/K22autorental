import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Why choose K22 Auto Rentals: quality vehicles, unlimited kms, friendly service, and fast confirmations across Victoria.",
  alternates: { canonical: "/choose-us" },
};

const reasons = [
  { title: "Good quality vehicles", desc: "We keep our vehicles clean, reliable, and ready to drive." },
  { title: "Unlimited kms", desc: "Drive freely without worrying about mileage limits." },
  { title: "Friendly staff", desc: "Clear communication and support before and during your rental." },
  { title: "Convenient location", desc: "Easy pickup process and helpful guidance for a smooth start." },
  { title: "Customer focused", desc: "We prioritise satisfaction and a stress-free booking experience." },
  { title: "Fast confirmations", desc: "Call or enquire with your dates and vehicle type — we confirm fast." },
];

const steps = [
  { title: "Reach out", desc: "Call us or send an enquiry with your dates, vehicle type, and contact details." },
  { title: "Confirm", desc: "We confirm availability and next steps." },
  { title: "Pick up", desc: "We provide pickup details so you can drive away." },
];

export default function ChooseUsPage() {
  return (
    <div>
      <span className="eyebrow">Why K22</span>
      <h1 className="display mt-4 text-3xl sm:text-5xl max-w-lg">
        Service built around getting you moving.
      </h1>
      <p className="lead mt-4 max-w-md">
        We focus on a smooth booking experience, reliable vehicles, and
        service that puts the customer first.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a href="tel:0430277558" className="btnSignal">
          Call 0430 277 558
        </a>
        <Link href="/fleet" className="btnOutline">
          View fleet
        </Link>
      </div>

      {/* Reasons */}
      <section className="mt-14 sm:mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="eyebrow">What to expect</span>
          <h2 className="display mt-4 text-2xl sm:text-3xl">
            Six things we hold ourselves to.
          </h2>
        </div>
        <div>
          {reasons.map((x) => (
            <div key={x.title} className="benefitRow">
              <span className="benefitMark" aria-hidden="true" />
              <div>
                <div className="benefitTitle">{x.title}</div>
                <div className="benefitDesc">{x.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mt-14 sm:mt-16">
        <span className="eyebrow">The process</span>
        <h2 className="display mt-4 text-2xl sm:text-3xl">
          Three steps, start to finish.
        </h2>
        <div className="timeline mt-8 sm:grid-cols-3 sm:gap-8">
          {steps.map((x, i) => (
            <div key={x.title} className="timelineStep">
              <span className="timelineMark">{i + 1}</span>
              <div>
                <div className="timelineTitle">{x.title}</div>
                <div className="timelineDesc">{x.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hairline mt-14 sm:mt-16 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="eyebrow">Ready to book</span>
            <h2 className="display mt-4 text-2xl sm:text-3xl max-w-md">
              Call or send your dates and vehicle type
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="tel:0430277558" className="btnSignal">
              Call 0430 277 558
            </a>
            <Link href="/enquiry" className="btnOutline">
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
