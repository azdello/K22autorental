import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fleet",
  description:
    "Browse K22 Auto Rentals' fleet: delivery-ready vehicles, personal use cars, and taxi-ready sedans & SUVs. Pickup in Cairnlea, Victoria.",
  alternates: { canonical: "/fleet" },
};

const fleet = [
  {
    code: "DL·01",
    title: "Delivery-Ready",
    enquiryType: "Delivery-Ready Vehicles",
    desc: "Reliable options suitable for delivery work, subject to availability.",
    status: "Call to confirm",
  },
  {
    code: "PU·02",
    title: "Personal Use",
    enquiryType: "Personal Use Vehicles",
    desc: "Daily drivers for commuting, errands, and personal travel.",
    status: "Call to confirm",
  },
  {
    code: "TS·03",
    title: "Taxi Sedan",
    enquiryType: "Taxi Sedans",
    desc: "Taxi-ready sedans, subject to requirements and availability.",
    status: "Call to confirm",
  },
  {
    code: "TV·04",
    title: "Taxi SUV",
    enquiryType: "Taxi SUVs",
    desc: "Taxi-ready SUVs for extra space and comfort.",
    status: "Limited spots",
  },
];

const included = [
  { title: "Good quality vehicles", desc: "Clean, reliable vehicles ready to drive." },
  { title: "Unlimited kms", desc: "Drive without worrying about mileage." },
  { title: "Friendly staff", desc: "Clear support and fast responses." },
  { title: "Convenient location", desc: "Simple pickup process and helpful guidance." },
  { title: "Customer focused", desc: "We prioritise satisfaction and smooth bookings." },
  { title: "Easy booking", desc: "Sort dates and vehicle type by call or enquiry." },
];

const tips = [
  { title: "Have dates ready", desc: "Sharing start/end dates helps us confirm faster." },
  { title: "Mention the purpose", desc: "Delivery, personal use, or taxi — let us know." },
  { title: "Taxi requirements", desc: "If taxi use, tell us early so we can guide requirements." },
];

export default function FleetPage() {
  return (
    <div>
      <span className="eyebrow">Fleet manifest</span>
      <h1 className="display mt-4 text-3xl sm:text-5xl">The board</h1>
      <p className="lead mt-4 max-w-md">
        Four categories. Pick what fits and call or send an enquiry with
        your dates — we&rsquo;ll confirm availability fast.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a href="tel:0430277558" className="btnSignal">
          Call 0430 277 558
        </a>
        <Link href="/choose-us" className="btnOutline">
          Why choose us
        </Link>
      </div>

      {/* Dispatch board — full */}
      <div className="board mt-10">
        <div className="boardHead">
          <span>Code</span>
          <span>Category</span>
          <span className="text-right">Status</span>
        </div>
        {fleet.map((v) => (
          <Link
            key={v.code}
            href={`/enquiry?type=${encodeURIComponent(v.enquiryType)}`}
            className="boardRow"
          >
            <span className="boardCode">{v.code}</span>
            <div>
              <div className="boardName">{v.title}</div>
              <div className="boardDesc">{v.desc}</div>
            </div>
            <span className="boardStatus justify-self-end">
              <span className="dot" aria-hidden="true" />
              {v.status}
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--muted2)]">
        Tap a category to start an enquiry, or call directly.
      </p>

      {/* What's included */}
      <section className="mt-14 sm:mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="eyebrow">Included</span>
          <h2 className="display mt-4 text-2xl sm:text-3xl">
            What comes with every hire.
          </h2>
        </div>
        <div>
          {included.map((x) => (
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

      {/* Booking tips */}
      <section className="mt-14 sm:mt-16">
        <span className="eyebrow">Booking tips</span>
        <h2 className="display mt-4 text-2xl sm:text-3xl">
          Make the enquiry count.
        </h2>
        <div className="timeline mt-8 sm:grid-cols-3 sm:gap-8">
          {tips.map((x, i) => (
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
