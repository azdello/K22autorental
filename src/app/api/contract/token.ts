import crypto from "crypto";

const THIRTY_MIN_MS = 30 * 60 * 1000;

function getSecret() {
  const secret = process.env.CONTRACT_TOKEN_SECRET;
  if (!secret) {
    throw new Error("Missing environment variable: CONTRACT_TOKEN_SECRET");
  }
  return secret;
}

export function createContractToken(): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + THIRTY_MIN_MS;
  const hmac = crypto
    .createHmac("sha256", getSecret())
    .update(String(expiresAt))
    .digest("hex");
  return { token: `${expiresAt}.${hmac}`, expiresAt };
}

export function verifyContractToken(token: unknown): boolean {
  if (typeof token !== "string" || !token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [expiresAtStr, hmac] = parts;
  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(expiresAtStr)
    .digest("hex");

  const a = Buffer.from(hmac, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}
