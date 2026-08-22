"use client";

import { useEffect, useRef, useState } from "react";
import CarGlyph from "./CarGlyph";

type Step = {
  title: string;
  desc: string;
};

export default function RouteTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`routeTimeline mt-10 ${inView ? "is-in" : ""}`}>
      <div className="routeBar" aria-hidden="true">
        <div className="routeBarFill" />
        <div className="routeCar">
          <svg viewBox="0 0 24 14" width="26" height="15">
            <CarGlyph />
          </svg>
        </div>
      </div>
      <div className="grid gap-0 sm:grid-cols-3 sm:gap-8">
        {steps.map((step, i) => (
          <div key={step.title} className="routeStep flex gap-4 sm:block">
            {/* mobile: mark + connecting line, in normal flow */}
            <div className="flex flex-col items-center sm:hidden">
              <span className="routeMark shrink-0" />
              {i < steps.length - 1 ? (
                <div className="routeStepLine" aria-hidden="true" />
              ) : null}
            </div>

            {/* desktop: mark sits above the text */}
            <span className="routeMark hidden sm:inline-flex sm:mb-5" />

            <div className="pb-8 sm:pb-0">
              <div className="mono text-[11px] uppercase tracking-wider text-[var(--muted-2)]">
                Step {String(i + 1).padStart(2, "0")}
              </div>
              <div className="routeTitle mt-2">{step.title}</div>
              <div className="routeDesc">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
