import { sendDynamicEmail } from "@/lib/email/resendClient";

const INVOICE_SUBJECT = "Your invoice from {{company_name}} — Order #{{order_id}}";

const INVOICE_BODY = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Invoice</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f3;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f3;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr>
              <td style="background:#103a2a;padding:24px 28px;">
                <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#1dd1a1;">Invoice</p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#ffffff;">{{company_name}}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                  Hi {{customer_name}},
                </p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                  Your invoice for order <strong>#{{order_id}}</strong> is ready.
                  {{due_date_line}}
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#64748b;">Amount due</p>
                <p style="margin:0 0 24px;font-size:28px;font-weight:700;color:#103a2a;">{{amount_due}}</p>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                  <tr>
                    <td style="border-radius:999px;background:#103a2a;">
                      <a href="{{invoice_url}}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">
                        View &amp; pay invoice
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 8px;font-size:12px;color:#64748b;">Or copy this link:</p>
                <p style="margin:0 0 24px;font-size:12px;line-height:1.5;word-break:break-all;color:#475569;">{{invoice_url}}</p>
                <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
                  Questions? Reply to this email or contact us at {{support_email}}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();

export type SendInvoiceEmailParams = {
  to: string;
  customerName: string;
  orderId: number;
  invoiceUrl: string;
  amountDue: string;
  dueDate: string | null;
  supportEmail?: string;
  companyName?: string;
};

export async function sendInvoiceEmail(
  params: SendInvoiceEmailParams,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const companyName = params.companyName?.trim() || "Brands Face";
  const supportEmail = params.supportEmail?.trim() || process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@brandsface.com";
  const dueDateLine = params.dueDate
    ? `Payment is due by <strong>${params.dueDate}</strong>.`
    : "Please review the details and complete payment at your earliest convenience.";

  return sendDynamicEmail({
    to: params.to,
    subject: INVOICE_SUBJECT,
    body: INVOICE_BODY,
    data: {
      company_name: companyName,
      customer_name: params.customerName,
      order_id: params.orderId,
      invoice_url: params.invoiceUrl,
      amount_due: params.amountDue,
      due_date: params.dueDate ?? "",
      due_date_line: dueDateLine,
      support_email: supportEmail,
    },
  });
}
