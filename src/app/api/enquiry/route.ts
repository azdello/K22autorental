import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs"; // important for email sending

function required(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(required("RESEND_API_KEY", process.env.RESEND_API_KEY));

    const TO = required("ENQUIRY_TO_EMAIL", process.env.ENQUIRY_TO_EMAIL);
    const FROM = required("ENQUIRY_FROM_EMAIL", process.env.ENQUIRY_FROM_EMAIL);

    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const vehicleType = String(body.vehicleType ?? "").trim();
    const startDate = String(body.startDate ?? "").trim();
    const endDate = String(body.endDate ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    if (!name || !phone || !vehicleType || !startDate || !endDate) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const subject = `New Booking Enquiry — ${vehicleType}`;

    const text = [
      "New K22 Auto Rentals booking enquiry",
      "-----------------------",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "(not provided)"}`,
      `Vehicle Type: ${vehicleType}`,
      `Start Date: ${startDate}`,
      `End Date: ${endDate}`,
      `Notes: ${notes || "(none)"}`,
      "",
      `Submitted: ${new Date().toISOString()}`,
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.5">
        <h2>New K22 Auto Rentals booking enquiry</h2>
        <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
          <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><b>Phone</b></td><td>${escapeHtml(phone)}</td></tr>
          <tr><td><b>Email</b></td><td>${escapeHtml(email || "(not provided)")}</td></tr>
          <tr><td><b>Vehicle Type</b></td><td>${escapeHtml(vehicleType)}</td></tr>
          <tr><td><b>Start Date</b></td><td>${escapeHtml(startDate)}</td></tr>
          <tr><td><b>End Date</b></td><td>${escapeHtml(endDate)}</td></tr>
          <tr><td><b>Notes</b></td><td>${escapeHtml(notes || "(none)")}</td></tr>
        </table>
        <p style="color:#666;margin-top:14px">Submitted: ${new Date().toISOString()}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      text,
      html,
      replyTo: email ? email : undefined,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}