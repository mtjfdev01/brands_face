import { Resend } from "resend";

let resendClient: Resend | null | undefined;

function getResendClient(): Resend | null {
  if (resendClient !== undefined) return resendClient;

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    resendClient = null;
    return null;
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && getFromEmail());
}

export function getFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "info@brandsface.com"
  );
}

export function getSenderName(): string {
  return process.env.SENDER_NAME?.trim() || "Brands Face";
}

export function getFromAddress(): string {
  return `${getSenderName()} <${getFromEmail()}>`;
}

function replacePlaceholders(text: string, data: Record<string, string | number | null | undefined>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    const value = data[key];
    return value !== undefined && value !== null ? String(value) : match;
  });
}

/** Send HTML email with {{placeholder}} substitution (Resend). */
export async function sendDynamicEmail(params: {
  to: string | string[];
  subject: string;
  body: string;
  data: Record<string, string | number | null | undefined>;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getResendClient();
  if (!resend) {
    return { ok: false, error: "Email service is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL in the project root `.env.local` file, then restart the dev server." };
  }

  const recipients = (Array.isArray(params.to) ? params.to : [params.to])
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  if (!recipients.length) {
    return { ok: false, error: "Recipient email is required." };
  }

  const renderedSubject = replacePlaceholders(params.subject, params.data);
  const renderedBody = replacePlaceholders(params.body, params.data);
  const fromEmail = getFromEmail();
  const replyTo = params.replyTo?.trim() || fromEmail;

  const result = await resend.emails.send({
    from: getFromAddress(),
    to: recipients,
    subject: renderedSubject,
    html: renderedBody,
    replyTo,
    headers: {
      "X-Mailer": "Brands Face",
    },
  });

  if (result.error) {
    return { ok: false, error: result.error.message || "Failed to send email." };
  }

  return { ok: true };
}
