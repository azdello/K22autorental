"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
};

export default function Reveal({
  children,
  className = "",
  as = "div",
}: RevealProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const setRef = (node: HTMLElement | null) => {
    elRef.current = node;
  };
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = elRef.current;
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const combinedClassName = `reveal ${inView ? "is-in" : ""} ${className}`.trim();

  if (as === "section") {
    return (
      <section ref={setRef} className={combinedClassName}>
        {children}
      </section>
    );
  }

  return (
    <div ref={setRef} className={combinedClassName}>
      {children}
    </div>
  );
}
