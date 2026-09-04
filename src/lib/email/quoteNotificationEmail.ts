import { getAdminNotifyEmails } from "@/lib/email/adminNotify";
import { isResendConfigured, sendDynamicEmail } from "@/lib/email/resendClient";
import { siteOrigin } from "@/lib/seo";

const SUBJECT = "New quote request #{{quote_id}} — Brands Face";

const BODY = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New quote request</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f3;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f3;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr>
              <td style="background:#103a2a;padding:24px 28px;">
                <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#1dd1a1;">Quote request</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#ffffff;">New lead #{{quote_id}}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#334155;">
                  A quote request was submitted on brandsface.com.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;border:1px solid #e2e8f0;border-radius:12px;">
                  <tr>
                    <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;">
                      <p style="margin:0 0 4px;font-size:12px;color:#64748b;">Email</p>
                      <p style="margin:0;font-size:15px;color:#103a2a;">{{customer_email}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;">
                      <p style="margin:0 0 4px;font-size:12px;color:#64748b;">Phone</p>
                      <p style="margin:0;font-size:15px;color:#103a2a;">{{customer_phone}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;">
                      <p style="margin:0 0 4px;font-size:12px;color:#64748b;">Requirement</p>
                      <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;white-space:pre-wrap;">{{requirement}}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;">
                      <p style="margin:0 0 4px;font-size:12px;color:#64748b;">Attachment</p>
                      <p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">{{attachment_html}}</p>
                    </td>
                  </tr>
                </table>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                  <tr>
                    <td style="border-radius:999px;background:#103a2a;">
                      <a href="{{admin_url}}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">
                        Open in admin
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0;font-size:12px;line-height:1.5;word-break:break-all;color:#64748b;">{{admin_url}}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function displayEmail(email: string): string {
  const value = email.trim();
  if (!value || value.endsWith("@leads.brandsface.local")) return "Not provided";
  return value;
}

export type NotifyAdminOfQuoteParams = {
  quoteId: number;
  email: string;
  phone: string | null;
  requirement: string;
  attachmentPaths: string[];
};

export async function notifyAdminOfQuoteRequest(
  params: NotifyAdminOfQuoteParams,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isResendConfigured()) {
    return { ok: false, error: "Email service is not configured." };
  }

  const to = await getAdminNotifyEmails();
  if (!to.length) {
    return { ok: false, error: "No admin notification email is configured." };
  }

  const customerEmail = displayEmail(params.email);
  const replyTo = EMAIL_RE.test(customerEmail) ? customerEmail : undefined;
  const requirement = params.requirement.trim() || "No additional details provided.";
  const attachmentHtml = params.attachmentPaths.length
    ? params.attachmentPaths
        .map((url, index) => {
          const safe = escapeHtml(url);
          return `<a href="${safe}" style="color:#103a2a;">Attachment ${index + 1}</a>`;
        })
        .join("<br />")
    : "None";

  return sendDynamicEmail({
    to,
    subject: SUBJECT,
    body: BODY,
    replyTo,
    data: {
      quote_id: params.quoteId,
      customer_email: escapeHtml(customerEmail),
      customer_phone: escapeHtml(params.phone?.trim() || "Not provided"),
      requirement: escapeHtml(requirement).replace(/\n/g, "<br />"),
      attachment_html: attachmentHtml,
      admin_url: `${siteOrigin()}/admin/quotes/${params.quoteId}`,
    },
  });
}