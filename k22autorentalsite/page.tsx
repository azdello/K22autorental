import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "K22 Auto Rentals | Vehicle Rentals in Victoria",
  description:
    "Personal use, delivery-ready, and taxi-ready sedan & SUV rentals across Victoria. Pickup in Cairnlea. Call or send an enquiry and we'll confirm availability fast.",
  alternates: { canonical: "/" },
};

const boardPreview = [
  { code: "HB·01", name: "Hatchback", desc: "Daily driving, commuting, errands.", status: "Call to confirm" },
  { code: "SD·02", name: "Sedan", desc: "Longer trips, extra boot space.", status: "Call to confirm" },
  { code: "TX·03", name: "Taxi-ready", desc: "Sedan & SUV, taxi requirements.", status: "Call to confirm" },
  { code: "SV·04", name: "SUV / 7-seat", desc: "Families, long-term hire.", status: "Limited spots" },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO — split layout */}
      <section className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">Victoria · Vehicle hire</span>
          <h1 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
            Rentals that
            <br />
            show up ready.
          </h1>
          <p className="lead mt-5 max-w-md">
            Personal use, delivery work, and taxi-ready sedans &amp; SUVs across
            Victoria. Call with your dates and vehicle type — we confirm
            availability on the spot.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="tel:0430277558" className="btnSignal">
              Call 0430 277 558
            </a>
            <Link href="/enquiry" className="btnOutline">
              Send an enquiry
            </Link>
          </div>
        </div>

        {/* Signature: dispatch board preview */}
        <div className="board">
          <div className="boardHead">
            <span>Code</span>
            <span>Category</span>
            <span className="text-right">Status</span>
          </div>
          {boardPreview.map((v) => (
            <Link
              key={v.code}
              href={`/enquiry?type=${encodeURIComponent(v.name)}`}
              className="boardRow"
            >
              <span className="boardCode">{v.code}</span>
              <div>
                <div className="boardName">{v.name}</div>
                <div className="boardDesc">{v.desc}</div>
              </div>
              <span className="boardStatus justify-self-end">
                <span className="dot" aria-hidden="true" />
                {v.status}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* MANIFEST STRIP */}
      <section className="mt-14 sm:mt-16">
        <div className="manifest sm:grid-cols-3">
          <div className="manifestCell sm:border-r sm:border-b-0">
            <div className="manifestLabel">Pickup</div>
            <div className="manifestValue">Cairnlea, VIC</div>
            <div className="manifestNote">Convenient location for Melbourne&rsquo;s west.</div>
          </div>
          <div className="manifestCell sm:border-r sm:border-b-0">
            <div className="manifestLabel">Response</div>
            <div className="manifestValue">Fast confirmation</div>
            <div className="manifestNote">We confirm availability on the call.</div>
          </div>
          <div className="manifestCell">
            <div className="manifestLabel">Categories</div>
            <div className="manifestValue">Four on the board</div>
            <div className="manifestNote">Personal, delivery-ready, taxi-ready.</div>
          </div>
        </div>
      </section>

      {/* WHY US — list, not cards */}
      <section className="mt-14 sm:mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="eyebrow">Why K22</span>
          <h2 className="display mt-4 text-2xl sm:text-3xl">
            Built around a fast, straightforward call.
          </h2>
          <p className="lead mt-4 max-w-sm">
            Call or send a quick enquiry — tell us what you need and we sort
            the rest.
          </p>
        </div>

        <div>
          <div className="benefitRow">
            <span className="benefitMark" aria-hidden="true" />
            <div>
              <div className="benefitTitle">All-inclusive approach</div>
              <div className="benefitDesc">
                Straightforward hire options designed to keep you on the road
                with minimal hassle.
              </div>
            </div>
          </div>
          <div className="benefitRow">
            <span className="benefitMark" aria-hidden="true" />
            <div>
              <div className="benefitTitle">Flexible terms</div>
              <div className="benefitDesc">
                Short-term and long-term hire, depending on your needs and
                availability.
              </div>
            </div>
          </div>
          <div className="benefitRow">
            <span className="benefitMark" aria-hidden="true" />
            <div>
              <div className="benefitTitle">Category match</div>
              <div className="benefitDesc">
                Personal use, delivery-ready, or taxi-ready — we match you to
                the right vehicle.
              </div>
            </div>
          </div>
          <div className="benefitRow">
            <span className="benefitMark" aria-hidden="true" />
            <div>
              <div className="benefitTitle">Fast response</div>
              <div className="benefitDesc">
                Call with your dates and we confirm availability right away.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — real sequence, timeline */}
      <section className="mt-14 sm:mt-16">
        <span className="eyebrow">How it works</span>
        <h2 className="display mt-4 text-2xl sm:text-3xl">
          Three steps, one call.
        </h2>

        <div className="timeline mt-8 sm:grid-cols-3 sm:gap-8">
          <div className="timelineStep">
            <span className="timelineMark">1</span>
            <div>
              <div className="timelineTitle">Call with your dates</div>
              <div className="timelineDesc">
                Tell us the vehicle type and dates you need.
              </div>
            </div>
          </div>
          <div className="timelineStep">
            <span className="timelineMark">2</span>
            <div>
              <div className="timelineTitle">We confirm availability</div>
              <div className="timelineDesc">
                We confirm the best option and next steps on the call.
              </div>
            </div>
          </div>
          <div className="timelineStep">
            <span className="timelineMark">3</span>
            <div>
              <div className="timelineTitle">Pickup in Cairnlea</div>
              <div className="timelineDesc">
                Collect the vehicle and you&rsquo;re ready to go.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hairline mt-14 sm:mt-16 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="eyebrow">Booking</span>
            <h2 className="display mt-4 text-2xl sm:text-3xl max-w-md">
              Call us — we confirm availability
            </h2>
            <p className="lead mt-3 max-w-sm">
              Have your dates, vehicle type, and contact details ready.
            </p>
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
