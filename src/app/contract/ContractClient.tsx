"use client";

import { useMemo, useState } from "react";
import Reveal from "../components/Reveal";
import SignaturePad from "../components/SignaturePad";
import {
  CONTRACT_INTRO,
  CONTRACT_TERMS_SECTIONS,
  CONTRACT_ACKNOWLEDGMENT,
} from "./terms";

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function formatDateAU(iso: string) {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  return `${d}/${m}/${y.slice(2)}`;
}

function compressImageFile(
  file: File,
  maxDim = 1400,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not read image"));
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not supported"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
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

function renderBodyLine(line: string, key: string) {
  if (line.startsWith("IMPORTANT:")) {
    return (
      <p key={key} className="mb-1.5 last:mb-0 termsImportant">
        {line.replace("IMPORTANT:", "").trim()}
      </p>
    );
  }
  return (
    <p key={key} className="mb-1.5 last:mb-0">
      {line}
    </p>
  );
}

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const emptyForm = {
  renterName: "",
  renterPhone: "",
  renterSecondaryPhone: "",
  renterEmail: "",
  renterAddress: "",
  renterLicense: "",
  vehicleType: "",
  vehicleMakeModel: "",
  vehicleYear: "",
  vehiclePlate: "",
  startDate: "",
  endDate: "",
  rentDueDay: "",
  rentalRate: "",
  bondAmount: "",
  insuranceExcess: "",
  pickupOdometer: "",
  notes: "",
  staffName: "",
  agreeTerms: false,
};

const REQUIRED_TEXT_FIELDS: { key: keyof typeof emptyForm; label: string }[] = [
  { key: "renterName", label: "Renter full name" },
  { key: "renterPhone", label: "Renter phone number" },
  { key: "renterSecondaryPhone", label: "Secondary phone number" },
  { key: "renterEmail", label: "Renter email" },
  { key: "renterAddress", label: "Renter address" },
  { key: "renterLicense", label: "Licence number" },
  { key: "vehicleType", label: "Vehicle category" },
  { key: "vehicleMakeModel", label: "Vehicle make and model" },
  { key: "vehicleYear", label: "Vehicle year" },
  { key: "vehiclePlate", label: "License plate number" },
  { key: "rentDueDay", label: "Rent due day" },
  { key: "rentalRate", label: "Rental rate" },
  { key: "bondAmount", label: "Bond amount" },
  { key: "insuranceExcess", label: "Insurance excess" },
  { key: "pickupOdometer", label: "Pickup odometer" },
  { key: "notes", label: "Notes" },
  { key: "staffName", label: "Rental provider representative name" },
];

export default function ContractClient() {
  const todayISO = useMemo(() => toISODate(new Date()), []);

  // --- PIN gate ---
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // --- form state ---
  const [form, setForm] = useState(emptyForm);
  const [dateErrors, setDateErrors] = useState<DateErrors>({});
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(
    null
  );
  const [staffSignatureDataUrl, setStaffSignatureDataUrl] = useState<
    string | null
  >(null);
  const [renterPadKey, setRenterPadKey] = useState(0);
  const [staffPadKey, setStaffPadKey] = useState(0);

  const [licenceFrontUrl, setLicenceFrontUrl] = useState<string | null>(null);
  const [licenceBackUrl, setLicenceBackUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");

  const [shake, setShake] = useState(false);
  const [formError, setFormError] = useState("");

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  function updateField<K extends keyof typeof emptyForm>(
    key: K,
    value: (typeof emptyForm)[K]
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleDateChange(field: "startDate" | "endDate", value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    setDateErrors(validateDates(next.startDate, next.endDate, todayISO));
  }

  function triggerShake() {
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
  }

  async function handlePhotoChange(
    e: React.ChangeEvent<HTMLInputElement>,
    which: "front" | "back"
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError("");
    try {
      const dataUrl = await compressImageFile(file);
      if (which === "front") setLicenceFrontUrl(dataUrl);
      else setLicenceBackUrl(dataUrl);
    } catch {
      setPhotoError("Could not read that photo. Please try another.");
    }
  }

  async function onSubmitPin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPinLoading(true);
    setPinError("");

    try {
      const res = await fetch("/api/contract/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setPinError(data?.error || "Incorrect code.");
        return;
      }

      setToken(data.token);
    } catch {
      setPinError("Network error. Please try again.");
    } finally {
      setPinLoading(false);
    }
  }

  function getMissingFieldLabels(): string[] {
    const missing: string[] = [];

    for (const field of REQUIRED_TEXT_FIELDS) {
      const value = form[field.key];
      if (typeof value === "string" && !value.trim()) {
        missing.push(field.label);
      }
    }

    if (!form.startDate) missing.push("Rental start date");
    if (!form.endDate) missing.push("Rental end date");
    if (!licenceFrontUrl) missing.push("Licence front photo");
    if (!licenceBackUrl) missing.push("Licence back photo");
    if (!form.agreeTerms) missing.push("Agreement to terms");
    if (!signatureDataUrl) missing.push("Renter signature");
    if (!staffSignatureDataUrl) missing.push("Representative signature");

    return missing;
  }

  async function onSubmitContract(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const errors = validateDates(form.startDate, form.endDate, todayISO);
    setDateErrors(errors);

    const missing = getMissingFieldLabels();

    if (errors.startDate || errors.endDate || missing.length > 0) {
      if (missing.length > 0) {
        setFormError(`Please fill in: ${missing.join(", ")}.`);
      }
      triggerShake();
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contract/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          ...form,
          signatureDataUrl,
          staffSignatureDataUrl,
          licenceFrontUrl,
          licenceBackUrl,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setFormError(data?.error || "Something went wrong. Please try again.");
        triggerShake();
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setFormError("Network error. Please try again.");
      triggerShake();
    }
  }

  function startNewContract() {
    setForm(emptyForm);
    setDateErrors({});
    setSignatureDataUrl(null);
    setStaffSignatureDataUrl(null);
    setRenterPadKey((k) => k + 1);
    setStaffPadKey((k) => k + 1);
    setLicenceFrontUrl(null);
    setLicenceBackUrl(null);
    setFormError("");
    setPhotoError("");
    setStatus("idle");
  }

  // --- PIN gate view ---
  if (!token) {
    return (
      <div className="max-w-sm">
        <span className="eyebrow">Staff access</span>
        <h1 className="display mt-4 text-3xl sm:text-4xl">
          Contract access code
        </h1>
        <p className="lead mt-4">
          This page is only meant to be opened while you're with the
          renter. Enter the access code to continue.
        </p>

        <Reveal as="div" className="mt-8">
          <div className={`panel p-6 ${shake ? "shakeOnError" : ""}`}>
            <form onSubmit={onSubmitPin} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  Access code
                </span>
                <input
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  className="formInput"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </label>

              {pinError ? (
                <p className="fieldError" role="alert">
                  {pinError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={pinLoading}
                className="btnSignal w-full disabled:opacity-60"
              >
                {pinLoading ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Checking...
                  </>
                ) : (
                  "Unlock"
                )}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    );
  }

  // --- Success view ---
  if (status === "success") {
    return (
      <div className="max-w-md">
        <svg
          className="successCheck mb-6"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="26"
            cy="26"
            r="23"
            stroke="var(--signal)"
            strokeWidth="2.5"
          />
          <path
            d="M16 27l7 7 13-15"
            stroke="var(--signal)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="eyebrow">Sent</span>
        <h1 className="display mt-4 text-3xl sm:text-4xl">
          Contract sent to both parties
        </h1>
        <p className="lead mt-4">
          A copy has been emailed to {form.renterEmail} and to the business
          inbox.
        </p>
        <button onClick={startNewContract} className="btnSignal mt-8">
          Start new contract
        </button>
      </div>
    );
  }

  // --- Contract form ---
  return (
    <div>
      <span className="eyebrow">Vehicle hire agreement</span>
      <h1 className="display mt-4 text-3xl sm:text-5xl">New contract</h1>
      <p className="lead mt-4 max-w-md">
        Fill this in together with the renter, have both of you sign at the
        end, and a copy is emailed to you both immediately.
      </p>

      <Reveal as="div" className="mt-10 max-w-2xl">
        <div
          className={`contractLight panel p-6 sm:p-8 ${
            shake ? "shakeOnError" : ""
          }`}
        >
          <form className="space-y-8" onSubmit={onSubmitContract} noValidate>
            {/* RENTER */}
            <div>
              <div className="eyebrow mb-4">Renter</div>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Full Name
                    </span>
                    <input
                      className="formInput"
                      value={form.renterName}
                      onChange={(e) =>
                        updateField("renterName", e.target.value)
                      }
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Phone Number
                    </span>
                    <input
                      className="formInput"
                      value={form.renterPhone}
                      onChange={(e) =>
                        updateField("renterPhone", e.target.value)
                      }
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Secondary Phone (friend/emergency contact)
                    </span>
                    <input
                      className="formInput"
                      value={form.renterSecondaryPhone}
                      onChange={(e) =>
                        updateField("renterSecondaryPhone", e.target.value)
                      }
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Email Address
                    </span>
                    <input
                      type="email"
                      className="formInput"
                      placeholder="A copy is sent here"
                      value={form.renterEmail}
                      onChange={(e) =>
                        updateField("renterEmail", e.target.value)
                      }
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Address
                  </span>
                  <input
                    className="formInput"
                    value={form.renterAddress}
                    onChange={(e) =>
                      updateField("renterAddress", e.target.value)
                    }
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Licence Number
                  </span>
                  <input
                    className="formInput"
                    value={form.renterLicense}
                    onChange={(e) =>
                      updateField("renterLicense", e.target.value)
                    }
                    required
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Licence Front
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => handlePhotoChange(e, "front")}
                      className="formInput"
                      required
                    />
                    {licenceFrontUrl ? (
                      <img
                        src={licenceFrontUrl}
                        alt="Licence front preview"
                        className="mt-2 h-20 w-auto rounded-lg border border-[var(--hairline)]"
                      />
                    ) : null}
                  </div>

                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Licence Back
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => handlePhotoChange(e, "back")}
                      className="formInput"
                      required
                    />
                    {licenceBackUrl ? (
                      <img
                        src={licenceBackUrl}
                        alt="Licence back preview"
                        className="mt-2 h-20 w-auto rounded-lg border border-[var(--hairline)]"
                      />
                    ) : null}
                  </div>
                </div>
                {photoError ? (
                  <p className="fieldError" role="alert">
                    {photoError}
                  </p>
                ) : null}
              </div>
            </div>

            {/* VEHICLE */}
            <div className="hairline pt-8">
              <div className="eyebrow mb-4">Vehicle</div>
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Vehicle Category
                  </span>
                  <select
                    className="formInput"
                    value={form.vehicleType}
                    onChange={(e) =>
                      updateField("vehicleType", e.target.value)
                    }
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
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Make and Model
                    </span>
                    <input
                      className="formInput"
                      placeholder="e.g. Toyota Yaris"
                      value={form.vehicleMakeModel}
                      onChange={(e) =>
                        updateField("vehicleMakeModel", e.target.value)
                      }
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Year
                    </span>
                    <input
                      className="formInput"
                      placeholder="e.g. 2006"
                      value={form.vehicleYear}
                      onChange={(e) =>
                        updateField("vehicleYear", e.target.value)
                      }
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    License Plate Number
                  </span>
                  <input
                    className="formInput"
                    value={form.vehiclePlate}
                    onChange={(e) =>
                      updateField("vehiclePlate", e.target.value)
                    }
                    required
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Rental Start Date
                    </span>
                    <input
                      type="date"
                      min={todayISO}
                      value={form.startDate}
                      onChange={(e) =>
                        handleDateChange("startDate", e.target.value)
                      }
                      className={`formInput ${
                        dateErrors.startDate ? "hasError" : ""
                      }`}
                      required
                    />
                    {form.startDate ? (
                      <span className="mt-1.5 block text-xs text-[var(--muted-2)]">
                        {formatDateAU(form.startDate)}
                      </span>
                    ) : null}
                    {dateErrors.startDate ? (
                      <span className="fieldError" role="alert">
                        {dateErrors.startDate}
                      </span>
                    ) : null}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Rental End Date
                    </span>
                    <input
                      type="date"
                      min={form.startDate || todayISO}
                      value={form.endDate}
                      onChange={(e) =>
                        handleDateChange("endDate", e.target.value)
                      }
                      className={`formInput ${
                        dateErrors.endDate ? "hasError" : ""
                      }`}
                      required
                    />
                    {form.endDate ? (
                      <span className="mt-1.5 block text-xs text-[var(--muted-2)]">
                        {formatDateAU(form.endDate)}
                      </span>
                    ) : null}
                    {dateErrors.endDate ? (
                      <span className="fieldError" role="alert">
                        {dateErrors.endDate}
                      </span>
                    ) : null}
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Rent Due Weekly On
                  </span>
                  <select
                    className="formInput"
                    value={form.rentDueDay}
                    onChange={(e) =>
                      updateField("rentDueDay", e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      Select a day
                    </option>
                    <option>Not applicable</option>
                    {WEEKDAYS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Rental Rate
                    </span>
                    <input
                      className="formInput"
                      placeholder="e.g. $160/week"
                      value={form.rentalRate}
                      onChange={(e) =>
                        updateField("rentalRate", e.target.value)
                      }
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Bond Amount
                    </span>
                    <input
                      className="formInput"
                      value={form.bondAmount}
                      onChange={(e) =>
                        updateField("bondAmount", e.target.value)
                      }
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Insurance Excess
                    </span>
                    <input
                      className="formInput"
                      value={form.insuranceExcess}
                      onChange={(e) =>
                        updateField("insuranceExcess", e.target.value)
                      }
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Pickup Odometer
                  </span>
                  <input
                    className="formInput"
                    placeholder="e.g. 84213 km"
                    value={form.pickupOdometer}
                    onChange={(e) =>
                      updateField("pickupOdometer", e.target.value)
                    }
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Notes
                  </span>
                  <textarea
                    rows={3}
                    className="formInput resize-none"
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>

            {/* TERMS */}
            <div className="hairline pt-8">
              <div className="eyebrow mb-4">Terms</div>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                {CONTRACT_INTRO}
              </p>
              <div className="termsBox">
                {CONTRACT_TERMS_SECTIONS.map((section) => (
                  <div key={section.heading} className="mb-4 last:mb-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                      {section.heading}
                    </div>
                    {section.body.map((line, i) =>
                      renderBodyLine(line, `${section.heading}-${i}`)
                    )}
                  </div>
                ))}
              </div>

              <label className="mt-4 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) =>
                    updateField("agreeTerms", e.target.checked)
                  }
                  className="mt-1"
                />
                <span className="text-sm text-[var(--muted)] leading-relaxed">
                  The renter has read and agrees to the terms above.
                </span>
              </label>
            </div>

            {/* SIGNATURES */}
            <div className="hairline pt-8">
              <div className="eyebrow mb-4">Signatures</div>

              <p className="termsImportant text-sm leading-relaxed mb-6">
                {CONTRACT_ACKNOWLEDGMENT}
              </p>

              <div className="space-y-6">
                <div>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Renter Signature
                  </span>
                  <SignaturePad
                    key={renterPadKey}
                    onChange={(dataUrl) => setSignatureDataUrl(dataUrl)}
                  />
                </div>

                <div>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Rental Provider Representative Name
                  </span>
                  <input
                    className="formInput"
                    value={form.staffName}
                    onChange={(e) =>
                      updateField("staffName", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Rental Provider Representative Signature
                  </span>
                  <SignaturePad
                    key={staffPadKey}
                    onChange={(dataUrl) => setStaffSignatureDataUrl(dataUrl)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btnSignal w-full disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                "Generate & send contract"
              )}
            </button>

            {formError ? (
              <p className="fieldError text-sm font-semibold">{formError}</p>
            ) : null}
          </form>
        </div>
      </Reveal>
    </div>
  );
}
