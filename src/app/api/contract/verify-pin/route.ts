import { NextResponse } from "next/server";
import { createContractToken } from "../token";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const pin = process.env.CONTRACT_ACCESS_PIN;
    if (!pin) {
      return NextResponse.json(
        { ok: false, error: "Contract access is not configured yet." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const submitted = String(body?.pin ?? "").trim();

    if (!submitted || submitted !== pin) {
      return NextResponse.json(
        { ok: false, error: "Incorrect code." },
        { status: 401 }
      );
    }

    const { token, expiresAt } = createContractToken();
    return NextResponse.json({ ok: true, token, expiresAt });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}
