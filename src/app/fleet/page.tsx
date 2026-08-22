import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import RouteTimeline from "../components/RouteTimeline";

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
    desc: "Reliable options suited to delivery work, kept in good condition and ready to go, subject to availability.",
    status: "Call to confirm",
  },
  {
    code: "PU·02",
    title: "Personal Use",
    enquiryType: "Personal Use Vehicles",
    desc: "Comfortable daily drivers for commuting, errands, and personal travel, with nothing complicated attached.",
    status: "Call to confirm",
  },
  {
    code: "TS·03",
    title: "Taxi Sedan",
    enquiryType: "Taxi Sedans",
    desc: "Taxi-ready sedans set up to meet requirements, with guidance available if you're getting started.",
    status: "Call to confirm",
  },
  {
    code: "TV·04",
    title: "Taxi SUV",
    enquiryType: "Taxi SUVs",
    desc: "Taxi-ready SUVs for extra space and comfort on longer shifts or larger fares.",
    status: "Limited spots",
  },
];

const included = [
  { title: "Good quality vehicles", desc: "Clean, mechanically sound vehicles that are actually ready to drive when you pick them up." },
  { title: "Unlimited kms", desc: "Drive as much as the job or the trip needs, without watching a mileage cap." },
  { title: "Friendly staff", desc: "Straightforward answers over the phone, from the first call through to pickup." },
  { title: "Convenient location", desc: "A simple pickup process out of Cairnlea, with clear guidance if it's your first time." },
  { title: "Customer focused", desc: "We'd rather sort a problem on the call than leave you chasing us afterwards." },
  { title: "Easy booking", desc: "Sort dates and vehicle type in one call or a short enquiry — that's the whole process." },
];

const tips = [
  { title: "Have dates ready", desc: "Sharing start and end dates upfront lets us confirm the right vehicle faster." },
  { title: "Mention the purpose", desc: "Delivery, personal use, or taxi work — telling us early means fewer questions later." },
  { title: "Taxi requirements", desc: "If it's for taxi use, flag it early so we can guide you through what's needed before pickup." },
];

export default function FleetPage() {
  return (
    <div>
      <div className="max-w-2xl">
        <span className="eyebrow">Fleet manifest</span>
        <h1 className="display mt-6 text-4xl sm:text-6xl">The fleet</h1>
        <p className="lead mt-6 max-w-md">
          Four categories. Pick what fits and call or send an enquiry with
          your dates — we&rsquo;ll confirm availability fast.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-4">
          <a href="tel:0430277558" className="btnSignal">
            Call 0430 277 558
          </a>
          <Link href="/choose-us" className="btnOutline">
            Why choose us
          </Link>
        </div>
      </div>

      {/* Fleet list — full */}
      <Reveal as="div" className="mt-16 sm:mt-20">
        <div className="fleetList">
          {fleet.map((v) => (
            <Link
              key={v.code}
              href={`/enquiry?type=${encodeURIComponent(v.enquiryType)}`}
              className="fleetRow"
            >
              <div className="fleetMain flex-1 min-w-0">
                <span className="fleetCode">{v.code}</span>
                <div className="fleetText">
                  <div className="fleetName">{v.title}</div>
                  <div className="fleetDesc">{v.desc}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="fleetStatus">
                  <span className="dot" aria-hidden="true" />
                  <span className="hidden sm:inline">{v.status}</span>
                </span>
                <svg
                  className="fleetArrow"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10h11M10 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-xs text-[var(--muted-2)]">
          Tap a category to start an enquiry, or call directly.
        </p>
      </Reveal>

      {/* What's included */}
      <Reveal as="section" className="mt-28 sm:mt-36">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Included</span>
            <h2 className="display mt-5 text-3xl sm:text-4xl">
              What comes with every hire.
            </h2>
          </div>
          <div>
            {included.map((x, i) => (
              <div key={x.title} className="reasonRow">
                <span className="reasonNum">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="reasonTitle">{x.title}</div>
                  <div className="reasonDesc">{x.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Booking tips */}
      <Reveal as="section" className="mt-28 sm:mt-36">
        <span className="eyebrow">Booking tips</span>
        <h2 className="display mt-5 text-3xl sm:text-4xl">
          Make the enquiry count.
        </h2>
        <RouteTimeline steps={tips} />
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="hairline mt-28 sm:mt-36 pt-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <span className="eyebrow">Ready to book</span>
            <h2 className="display mt-5 text-3xl sm:text-4xl max-w-md">
              Call or send your dates and vehicle type
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a href="tel:0430277558" className="btnSignal">
              Call 0430 277 558
            </a>
            <Link href="/enquiry" className="btnOutline">
              Send an enquiry
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
