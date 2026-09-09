import { NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyContractToken } from "../token";
import {
  CONTRACT_INTRO,
  CONTRACT_TERMS_SECTIONS,
  CONTRACT_ACKNOWLEDGMENT,
} from "../../../contract/terms";

export const runtime = "nodejs";

function required(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function formatDateAU(iso: string) {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  return `${d}/${m}/${y.slice(2)}`;
}

function dataUrlToBuffer(dataUrl: string): { buffer: Buffer; ext: string } | null {
  const match = /^data:image\/(png|jpeg|jpg);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  const ext = match[1] === "jpeg" ? "jpg" : match[1];
  return { buffer: Buffer.from(match[2], "base64"), ext };
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bodyLineHtml(line: string) {
  if (line.startsWith("IMPORTANT:")) {
    const text = line.replace("IMPORTANT:", "").trim();
    return `<p style="margin:0 0 8px;color:#b3261e;font-weight:600">${escapeHtml(text)}</p>`;
  }
  return `<p style="margin:0 0 8px">${escapeHtml(line)}</p>`;
}

function bodyLineText(line: string) {
  if (line.startsWith("IMPORTANT:")) {
    return `** IMPORTANT: ${line.replace("IMPORTANT:", "").trim()} **`;
  }
  return line;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    if (!verifyContractToken(body?.token)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Session expired. Please re-enter the access code.",
        },
        { status: 401 }
      );
    }

    const resend = new Resend(
      required("RESEND_API_KEY", process.env.RESEND_API_KEY)
    );
    const FROM = required("ENQUIRY_FROM_EMAIL", process.env.ENQUIRY_FROM_EMAIL);
    const OWNER_TO =
      process.env.CONTRACT_TO_EMAIL ||
      required("ENQUIRY_TO_EMAIL", process.env.ENQUIRY_TO_EMAIL);

    const renterName = String(body.renterName ?? "").trim();
    const renterPhone = String(body.renterPhone ?? "").trim();
    const renterSecondaryPhone = String(body.renterSecondaryPhone ?? "").trim();
    const renterEmail = String(body.renterEmail ?? "").trim();
    const renterAddress = String(body.renterAddress ?? "").trim();
    const renterLicense = String(body.renterLicense ?? "").trim();
    const vehicleType = String(body.vehicleType ?? "").trim();
    const vehicleMakeModel = String(body.vehicleMakeModel ?? "").trim();
    const vehicleYear = String(body.vehicleYear ?? "").trim();
    const vehiclePlate = String(body.vehiclePlate ?? "").trim();
    const startDate = String(body.startDate ?? "").trim();
    const endDate = String(body.endDate ?? "").trim();
    const rentDueDay = String(body.rentDueDay ?? "").trim();
    const rentalRate = String(body.rentalRate ?? "").trim();
    const bondAmount = String(body.bondAmount ?? "").trim();
    const insuranceExcess = String(body.insuranceExcess ?? "").trim();
    const staffName = String(body.staffName ?? "").trim();
    const agreeTerms = Boolean(body.agreeTerms);
    const signatureDataUrl = String(body.signatureDataUrl ?? "");
    const staffSignatureDataUrl = String(body.staffSignatureDataUrl ?? "");
    const licenceFrontUrl = String(body.licenceFrontUrl ?? "");
    const licenceBackUrl = String(body.licenceBackUrl ?? "");

    if (
      !renterName ||
      !renterPhone ||
      !renterSecondaryPhone ||
      !renterEmail ||
      !renterAddress ||
      !renterLicense ||
      !vehicleType ||
      !vehicleMakeModel ||
      !vehicleYear ||
      !vehiclePlate ||
      !startDate ||
      !endDate ||
      !rentDueDay ||
      !rentalRate ||
      !bondAmount ||
      !insuranceExcess ||
      !staffName ||
      !agreeTerms ||
      !signatureDataUrl.startsWith("data:image/png;base64,") ||
      !staffSignatureDataUrl.startsWith("data:image/png;base64,") ||
      !licenceFrontUrl.startsWith("data:image/") ||
      !licenceBackUrl.startsWith("data:image/")
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields, photos, or signatures." },
        { status: 400 }
      );
    }

    const todayISO = new Date().toISOString().slice(0, 10);
    if (startDate < todayISO) {
      return NextResponse.json(
        { ok: false, error: "Start date can't be in the past." },
        { status: 400 }
      );
    }
    if (endDate < startDate) {
      return NextResponse.json(
        { ok: false, error: "End date can't be before the start date." },
        { status: 400 }
      );
    }

    const startDateAU = formatDateAU(startDate);
    const endDateAU = formatDateAU(endDate);
    const signedDateAU = formatDateAU(todayISO);

    const termsSectionsHtml = CONTRACT_TERMS_SECTIONS.map(
      (section) => `
        <h4 style="margin:16px 0 6px;font-size:17px;font-weight:700">${escapeHtml(section.heading)}</h4>
        ${section.body.map(bodyLineHtml).join("")}
      `
    ).join("");

    const termsTextLines = CONTRACT_TERMS_SECTIONS.flatMap((section) => [
      section.heading.toUpperCase(),
      ...section.body.map(bodyLineText),
      "",
    ]);

    const detailsHtml = `
      <h3>Renter</h3>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        <tr><td><b>Full Name</b></td><td>${escapeHtml(renterName)}</td></tr>
        <tr><td><b>Phone</b></td><td>${escapeHtml(renterPhone)}</td></tr>
        <tr><td><b>Secondary Phone</b></td><td>${escapeHtml(renterSecondaryPhone)}</td></tr>
        <tr><td><b>Email</b></td><td>${escapeHtml(renterEmail)}</td></tr>
        <tr><td><b>Address</b></td><td>${escapeHtml(renterAddress)}</td></tr>
        <tr><td><b>Licence Number</b></td><td>${escapeHtml(renterLicense)}</td></tr>
      </table>

      <h3 style="margin-top:20px">Vehicle</h3>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        <tr><td><b>Category</b></td><td>${escapeHtml(vehicleType)}</td></tr>
        <tr><td><b>Make and Model</b></td><td>${escapeHtml(vehicleMakeModel)}</td></tr>
        <tr><td><b>Year</b></td><td>${escapeHtml(vehicleYear)}</td></tr>
        <tr><td><b>License Plate</b></td><td>${escapeHtml(vehiclePlate)}</td></tr>
        <tr><td><b>Rental Start Date</b></td><td>${escapeHtml(startDateAU)}</td></tr>
        <tr><td><b>Rental End Date</b></td><td>${escapeHtml(endDateAU)}</td></tr>
        <tr><td><b>Rent Due Weekly On</b></td><td>${escapeHtml(rentDueDay)}</td></tr>
        <tr><td><b>Rental Rate</b></td><td>${escapeHtml(rentalRate)}</td></tr>
        <tr><td><b>Bond Amount</b></td><td>${escapeHtml(bondAmount)}</td></tr>
        <tr><td><b>Insurance Excess</b></td><td>${escapeHtml(insuranceExcess)}</td></tr>
      </table>
    `;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.5; max-width:640px; background:#ffffff; color:#17181a">
        <h2>K22 Auto Rentals - Vehicle Rental Contract</h2>
        <p>${escapeHtml(CONTRACT_INTRO)}</p>
        ${detailsHtml}
        <h3 style="margin-top:20px">Terms</h3>
        ${termsSectionsHtml}
        <p style="margin-top:16px;color:#b3261e;font-weight:600">${CONTRACT_ACKNOWLEDGMENT.map(escapeHtml).join("</p><p style=\"margin-top:8px;color:#b3261e;font-weight:600\">")}</p>
        <h3 style="margin-top:20px">Signatures</h3>
        <p style="margin-bottom:4px"><b>Renter Signature</b> (${escapeHtml(renterName)})</p>
        <img src="${signatureDataUrl}" alt="Renter signature" style="max-width:320px;border:1px solid #ddd;padding:8px;background:#fff" />
        <p style="margin:6px 0 16px;color:#666">Date signed: ${escapeHtml(signedDateAU)}</p>
        <p style="margin-bottom:4px"><b>Rental Provider Representative Signature</b> (${escapeHtml(staffName)})</p>
        <img src="${staffSignatureDataUrl}" alt="Staff signature" style="max-width:320px;border:1px solid #ddd;padding:8px;background:#fff" />
        <p style="margin:6px 0 0;color:#666">Date signed: ${escapeHtml(signedDateAU)}</p>
        <p style="margin-top:16px;color:#666">Licence photos are attached to this email.</p>
      </div>
    `;

    const text = [
      "K22 Auto Rentals - Vehicle Rental Contract",
      "-----------------------",
      CONTRACT_INTRO,
      "",
      "RENTER",
      `Full Name: ${renterName}`,
      `Phone: ${renterPhone}`,
      `Secondary Phone: ${renterSecondaryPhone}`,
      `Email: ${renterEmail}`,
      `Address: ${renterAddress}`,
      `Licence Number: ${renterLicense}`,
      "",
      "VEHICLE",
      `Category: ${vehicleType}`,
      `Make and Model: ${vehicleMakeModel}`,
      `Year: ${vehicleYear}`,
      `License Plate: ${vehiclePlate}`,
      `Rental Start Date: ${startDateAU}`,
      `Rental End Date: ${endDateAU}`,
      `Rent Due Weekly On: ${rentDueDay}`,
      `Rental Rate: ${rentalRate}`,
      `Bond Amount: ${bondAmount}`,
      `Insurance Excess: ${insuranceExcess}`,
      "",
      "TERMS",
      ...termsTextLines,
      ...CONTRACT_ACKNOWLEDGMENT.map((line) => bodyLineText(`IMPORTANT: ${line}`)),
      "",
      "SIGNATURES",
      `Renter Signature: ${renterName} (image attached / embedded in HTML email)`,
      `Date signed: ${signedDateAU}`,
      `Rental Provider Representative: ${staffName} (image attached / embedded in HTML email)`,
      `Date signed: ${signedDateAU}`,
    ].join("\n");

    const subject = `Vehicle Rental Contract - ${renterName} - ${vehicleMakeModel}`;

    const attachments: { filename: string; content: Buffer }[] = [];
    const front = dataUrlToBuffer(licenceFrontUrl);
    if (front) {
      attachments.push({
        filename: `licence-front.${front.ext}`,
        content: front.buffer,
      });
    }
    const back = dataUrlToBuffer(licenceBackUrl);
    if (back) {
      attachments.push({
        filename: `licence-back.${back.ext}`,
        content: back.buffer,
      });
    }

    const [ownerResult, renterResult] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: OWNER_TO,
        subject,
        text,
        html,
        attachments,
      }),
      resend.emails.send({
        from: FROM,
        to: renterEmail,
        subject,
        text,
        html,
        attachments,
      }),
    ]);

    if (ownerResult.error || renterResult.error) {
      return NextResponse.json(
        {
          ok: false,
          error:
            ownerResult.error?.message ||
            renterResult.error?.message ||
            "Failed to send one or both emails.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
