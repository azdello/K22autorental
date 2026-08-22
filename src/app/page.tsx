import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "./components/Reveal";
import RouteTimeline from "./components/RouteTimeline";
import CarGlyph from "./components/CarGlyph";

export const metadata: Metadata = {
  title: "K22 Auto Rentals | Vehicle Rentals in Victoria",
  description:
    "Personal use, delivery-ready, and taxi-ready sedan & SUV rentals across Victoria. Pickup in Cairnlea. Call or send an enquiry and we'll confirm availability fast.",
  alternates: { canonical: "/" },
};

const fleetPreview = [
  { code: "HB·01", name: "Hatchback", desc: "Daily driving, commuting, errands.", status: "Call to confirm" },
  { code: "SD·02", name: "Sedan", desc: "Longer trips, extra boot space.", status: "Call to confirm" },
  { code: "TX·03", name: "Taxi-ready", desc: "Sedan & SUV, taxi requirements.", status: "Call to confirm" },
  { code: "SV·04", name: "SUV / 7-seat", desc: "Families, long-term hire.", status: "Limited spots" },
];

const reasons = [
  {
    title: "All-inclusive approach",
    desc: "Straightforward hire options designed to keep you on the road with minimal hassle.",
  },
  {
    title: "Flexible terms",
    desc: "Short-term and long-term hire, depending on your needs and availability.",
  },
  {
    title: "Category match",
    desc: "Personal use, delivery-ready, or taxi-ready — we match you to the right vehicle.",
  },
  {
    title: "Fast response",
    desc: "Call with your dates and we confirm availability right away.",
  },
];

const steps = [
  { title: "Call with your dates", desc: "Tell us the vehicle type and dates you need." },
  { title: "We confirm availability", desc: "We confirm the best option and next steps on the call." },
  { title: "Pickup in Cairnlea", desc: "Collect the vehicle and you're ready to go." },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative pt-6 pb-10 sm:pt-10">
        <div className="heroRoute" aria-hidden="true">
          <svg viewBox="0 0 700 500" fill="none">
            <path
              className="drawPath"
              d="M40 460 C 220 460, 180 300, 340 280 S 560 140, 520 40"
              stroke="var(--hairline-strong)"
              strokeWidth="1.5"
            />
            <g className="glowCar">
              <animateMotion
                dur="9s"
                repeatCount="indefinite"
                rotate="auto"
                path="M40 460 C 220 460, 180 300, 340 280 S 560 140, 520 40"
              />
              <g transform="translate(-11,-7) scale(0.85)">
                <CarGlyph />
              </g>
            </g>
          </svg>
        </div>

        <div className="relative max-w-2xl">
          <span className="eyebrow">Victoria · Vehicle hire</span>
          <h1 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
            Rentals that
            <br />
            show up ready.
          </h1>
          <p className="lead mt-7 max-w-md">
            Personal use, delivery work, and taxi-ready sedans &amp; SUVs
            across Victoria. Call with your dates and vehicle type — we
            confirm availability on the spot.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="tel:0430277558" className="btnSignal">
              Call 0430 277 558
            </a>
            <Link href="/enquiry" className="btnOutline">
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* STAT TRIO */}
      <Reveal as="section" className="mt-28 sm:mt-36">
        <div className="statRow sm:grid-cols-3">
          <div>
            <div className="statNum">Cairnlea</div>
            <div className="statLabel">Pickup point, convenient for Melbourne&rsquo;s west.</div>
          </div>
          <div>
            <div className="statNum">On the call</div>
            <div className="statLabel">We confirm availability while you&rsquo;re on the phone.</div>
          </div>
          <div>
            <div className="statNum">Four categories</div>
            <div className="statLabel">Personal, delivery-ready, and taxi-ready sedans &amp; SUVs.</div>
          </div>
        </div>
      </Reveal>

      {/* WHY K22 — flowing rows, ghost numerals */}
      <Reveal as="section" className="mt-28 sm:mt-36">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Why K22</span>
            <h2 className="display mt-5 text-3xl sm:text-4xl">
              Built around a fast, straightforward call.
            </h2>
            <p className="lead mt-5 max-w-sm">
              Call or send a quick enquiry — tell us what you need and we
              sort the rest.
            </p>
          </div>

          <div>
            {reasons.map((r, i) => (
              <div key={r.title} className="reasonRow">
                <span className="reasonNum">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="reasonTitle">{r.title}</div>
                  <div className="reasonDesc">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* FLEET PREVIEW — flowing list */}
      <Reveal as="section" className="mt-28 sm:mt-36">
        <span className="eyebrow">On the fleet</span>
        <h2 className="display mt-5 text-3xl sm:text-4xl">
          Four categories, one call away.
        </h2>

        <div className="fleetList mt-10">
          {fleetPreview.map((v) => (
            <Link
              key={v.code}
              href={`/enquiry?type=${encodeURIComponent(v.name)}`}
              className="fleetRow"
            >
              <div className="fleetMain">
                <span className="fleetCode">{v.code}</span>
                <div className="fleetText">
                  <div className="fleetName">{v.name}</div>
                  <div className="fleetDesc">{v.desc}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="fleetStatus">
                  <span className="dot" aria-hidden="true" />
                  {v.status}
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
      </Reveal>

      {/* HOW IT WORKS — route timeline */}
      <Reveal as="section" className="mt-28 sm:mt-36">
        <span className="eyebrow">How it works</span>
        <h2 className="display mt-5 text-3xl sm:text-4xl">
          Three steps, one call.
        </h2>
        <RouteTimeline steps={steps} />
      </Reveal>

      {/* FINAL CTA */}
      <Reveal as="section" className="hairline mt-28 sm:mt-36 pt-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <span className="eyebrow">Booking</span>
            <h2 className="display mt-5 text-3xl sm:text-4xl max-w-md">
              Call us — we confirm availability
            </h2>
            <p className="lead mt-4 max-w-sm">
              Have your dates, vehicle type, and contact details ready.
            </p>
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
