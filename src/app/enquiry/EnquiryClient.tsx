"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Reveal from "../components/Reveal";

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

type DateErrors = { startDate?: string; endDate?: string };

function validateDates(
  startDate: string,
  endDate: string,
  todayISO: string
): DateErrors {
  const errors: DateErrors = {};

  if (startDate && startDate < todayISO) {
    errors.startDate = "Start date can't be in the past.";
  }

  if (endDate) {
    if (startDate && endDate < startDate) {
      errors.endDate = "End date can't be before the start date.";
    } else if (endDate < todayISO) {
      errors.endDate = "End date can't be in the past.";
    }
  }

  return errors;
}

export default function EnquiryClient() {
  const params = useSearchParams();
  const router = useRouter();

  const prefillType = useMemo(() => params.get("type") ?? "", [params]);
  const todayISO = useMemo(() => toISODate(new Date()), []);

  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [dateErrors, setDateErrors] = useState<DateErrors>({});
  const [shake, setShake] = useState(false);

  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  function handleDateChange(field: "startDate" | "endDate", value: string) {
    const next = { ...dates, [field]: value };
    setDates(next);
    setDateErrors(validateDates(next.startDate, next.endDate, todayISO));
  }

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validateDates(dates.startDate, dates.endDate, todayISO);
    setDateErrors(errors);

    if (errors.startDate || errors.endDate) {
      triggerShake();
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      vehicleType: String(formData.get("vehicleType") || "").trim(),
      startDate: dates.startDate,
      endDate: dates.endDate,
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
        triggerShake();
        return;
      }

      const type = encodeURIComponent(payload.vehicleType || prefillType || "");
      router.push(`/enquiry/confirmation${type ? `?type=${type}` : ""}`);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
      triggerShake();
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
        availability fast - or call{" "}
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
        <Reveal as="div" className="lg:col-span-3">
          <div className={`panel p-6 sm:p-8 ${shake ? "shakeOnError" : ""}`}>
            <form className="space-y-5" onSubmit={onSubmit} noValidate>
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
                <Field label="Start Date" error={dateErrors.startDate}>
                  <input
                    type="date"
                    name="startDate"
                    min={todayISO}
                    value={dates.startDate}
                    onChange={(e) =>
                      handleDateChange("startDate", e.target.value)
                    }
                    className={`formInput ${
                      dateErrors.startDate ? "hasError" : ""
                    }`}
                    aria-invalid={Boolean(dateErrors.startDate)}
                    required
                  />
                </Field>

                <Field label="End Date" error={dateErrors.endDate}>
                  <input
                    type="date"
                    name="endDate"
                    min={dates.startDate || todayISO}
                    value={dates.endDate}
                    onChange={(e) =>
                      handleDateChange("endDate", e.target.value)
                    }
                    className={`formInput ${
                      dateErrors.endDate ? "hasError" : ""
                    }`}
                    aria-invalid={Boolean(dateErrors.endDate)}
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
                {status === "sending" ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  "Submit enquiry"
                )}
              </button>

              {status === "error" ? (
                <p className="fieldError text-sm font-semibold">
                  {errorMsg}
                </p>
              ) : null}

              <p className="text-xs text-[var(--muted-2)]">
                By submitting, you agree we can contact you about
                availability and booking details.
              </p>
            </form>
          </div>
        </Reveal>

        {/* INFO / SIDEBAR */}
        <Reveal as="div" className="lg:col-span-2">
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
        </Reveal>
      </section>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      {children}
      {error ? (
        <span className="fieldError" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
