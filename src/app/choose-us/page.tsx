import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import RouteTimeline from "../components/RouteTimeline";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Why choose K22 Auto Rentals: quality vehicles, unlimited kms, friendly service, and fast confirmations across Victoria.",
  alternates: { canonical: "/choose-us" },
};

const reasons = [
  { title: "Good quality vehicles", desc: "We keep our vehicles clean and mechanically sound, so they're genuinely ready to drive when you arrive." },
  { title: "Unlimited kms", desc: "Drive as far as the trip or the job takes you, without watching a mileage limit." },
  { title: "Friendly staff", desc: "Clear, straightforward communication before, during, and after your rental — no runaround." },
  { title: "Convenient location", desc: "An easy pickup process out of Cairnlea, with guidance if it's your first time hiring with us." },
  { title: "Customer focused", desc: "We'd rather solve something on the call than have you chasing us about it later." },
  { title: "Fast confirmations", desc: "Call or enquire with your dates and vehicle type, and we confirm availability there and then." },
];

const steps = [
  { title: "Reach out", desc: "Call us or send an enquiry with your dates, vehicle type, and contact details — whichever's easier." },
  { title: "Confirm", desc: "We confirm availability and next steps on the same call, not with a delayed follow-up." },
  { title: "Pick up", desc: "We provide pickup details so you can collect the vehicle and drive away." },
];

export default function ChooseUsPage() {
  return (
    <div>
      <div className="max-w-2xl">
        <span className="eyebrow">Why K22</span>
        <h1 className="display mt-6 text-4xl sm:text-6xl">
          Service built around getting you moving.
        </h1>
        <p className="lead mt-6 max-w-md">
          We focus on a smooth booking experience, reliable vehicles, and
          service that puts the customer first.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-4">
          <a href="tel:0430277558" className="btnSignal">
            Call 0430 277 558
          </a>
          <Link href="/fleet" className="btnOutline">
            View fleet
          </Link>
        </div>
      </div>

      {/* Reasons */}
      <Reveal as="section" className="mt-28 sm:mt-36">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">What to expect</span>
            <h2 className="display mt-5 text-3xl sm:text-4xl">
              Six things we hold ourselves to.
            </h2>
          </div>
          <div>
            {reasons.map((x, i) => (
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

      {/* Process */}
      <Reveal as="section" className="mt-28 sm:mt-36">
        <span className="eyebrow">The process</span>
        <h2 className="display mt-5 text-3xl sm:text-4xl">
          Three steps, start to finish.
        </h2>
        <RouteTimeline steps={steps} />
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
