import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "admin_session";
const DEFAULT_TTL_SECONDS = 60 * 60 * 24;

type AdminSessionPayload = {
  id: number;
  email: string;
  exp: number;
};

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || "brandscafe-dev-secret";
}

function signPayload(payloadBase64: string) {
  return createHmac("sha256", getSessionSecret()).update(payloadBase64).digest("base64url");
}

export function createAdminSessionToken(id: number, email: string, rememberMe = false) {
  const ttl = rememberMe ? 60 * 60 * 24 * 30 : DEFAULT_TTL_SECONDS;
  const payload: AdminSessionPayload = {
    id,
    email,
    exp: Math.floor(Date.now() / 1000) + ttl,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = signPayload(payloadBase64);
  return `${payloadBase64}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): AdminSessionPayload | null {
  if (!token) return null;
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return null;

  const expectedSig = signPayload(payloadBase64);
  const provided = Buffer.from(signature, "utf8");
  const expected = Buffer.from(expectedSig, "utf8");
  if (provided.length !== expected.length) return null;
  if (!timingSafeEqual(provided, expected)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf8")) as AdminSessionPayload;
    if (!parsed?.id || !parsed?.email || !parsed?.exp) return null;
    if (parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getAdminSessionFromRequest(request: Request | NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const target = cookieHeader
    .split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  const token = target ? decodeURIComponent(target.split("=")[1] || "") : null;
  return verifyAdminSessionToken(token);
}

export function getAdminSessionFromCookies() {
  const store = cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}
