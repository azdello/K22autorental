"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function EnquiryClient() {
  const params = useSearchParams();
  const router = useRouter();

  const prefillType = useMemo(() => params.get("type") ?? "", [params]);

  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      vehicleType: String(formData.get("vehicleType") || "").trim(),
      startDate: String(formData.get("startDate") || "").trim(),
      endDate: String(formData.get("endDate") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        return;
      }

      const type = encodeURIComponent(payload.vehicleType || prefillType || "");
      router.push(`/enquiry/confirmation${type ? `?type=${type}` : ""}`);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    } finally {
      if (status !== "error") setStatus("idle");
    }
  }

  return (
    <div>
      <span className="eyebrow">Booking enquiry</span>
      <h1 className="display mt-4 text-3xl sm:text-5xl">Send it through</h1>
      <p className="lead mt-4 max-w-md">
        Enter your details and preferred dates. We&rsquo;ll confirm
        availability fast — or call{" "}
        <a
          href="tel:0430277558"
          className="text-[var(--signal)] hover:underline"
        >
          0430 277 558
        </a>{" "}
        directly.
      </p>

      <section className="mt-10 grid gap-6 lg:grid-cols-5">
        {/* FORM */}
        <div className="lg:col-span-3">
          <div className="panel p-6 sm:p-8">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name">
                  <input
                    className="formInput"
                    placeholder="Your name"
                    name="name"
                    autoComplete="name"
                    required
                  />
                </Field>

                <Field label="Phone Number">
                  <input
                    className="formInput"
                    placeholder="04xx xxx xxx"
                    name="phone"
                    autoComplete="tel"
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email (optional)">
                  <input
                    className="formInput"
                    placeholder="you@email.com"
                    name="email"
                    autoComplete="email"
                  />
                </Field>

                <Field label="Vehicle Type">
                  <select
                    defaultValue={prefillType || ""}
                    name="vehicleType"
                    className="formInput"
                    required
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    <option>Delivery-Ready Vehicles</option>
                    <option>Personal Use Vehicles</option>
                    <option>Taxi Sedans</option>
                    <option>Taxi SUVs</option>
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Start Date">
                  <input
                    type="date"
                    name="startDate"
                    className="formInput"
                    required
                  />
                </Field>

                <Field label="End Date">
                  <input
                    type="date"
                    name="endDate"
                    className="formInput"
                    required
                  />
                </Field>
              </div>

              <Field label="Notes (optional)">
                <textarea
                  name="notes"
                  rows={4}
                  className="formInput resize-none"
                  placeholder="Anything we should know? (e.g. taxi use, preferred vehicle, pickup suburb)"
                />
              </Field>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btnSignal w-full disabled:opacity-60"
              >
                {status === "sending" ? "Submitting…" : "Submit enquiry"}
              </button>

              {status === "error" ? (
                <p className="text-sm font-semibold text-red-400">
                  {errorMsg}
                </p>
              ) : null}

              <p className="text-xs text-[var(--muted-2)]">
                By submitting, you agree we can contact you about
                availability and booking details.
              </p>
            </form>
          </div>
        </div>

        {/* INFO / SIDEBAR */}
        <div className="lg:col-span-2">
          <div className="panel p-6 sm:p-8">
            <h2 className="display text-lg">What happens next</h2>
            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden="true" />
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  We review your dates and vehicle type.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden="true" />
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  We confirm availability fast.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden="true" />
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  We share pickup details and next steps.
                </p>
              </div>
            </div>

            <div className="mt-6 hairline pt-5">
              <div className="eyebrow">Tip</div>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                If you&rsquo;re applying for taxi use, mention it in notes so
                we can guide requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}
