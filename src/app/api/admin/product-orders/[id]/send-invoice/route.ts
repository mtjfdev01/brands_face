import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";
import { sendInvoiceEmail } from "@/lib/email/invoiceEmail";
import { isResendConfigured } from "@/lib/email/resendClient";
import { buildPublicInvoiceUrl, ensureInvoicePublicKey } from "@/lib/invoiceLink";
import { INVOICE_CURRENCY_CODE } from "@/lib/invoiceCurrency";
import { resolvePayableTotal } from "@/lib/orderLineItems";
import { ensureProductOrderSchema } from "@/lib/productOrderSchema";
import { dbQuery } from "@/lib/postgres";
import { SITE_CONTACT_EMAIL } from "@/data/siteContact";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  to?: string;
};

type OrderRow = {
  id: number;
  full_name: string;
  email: string;
  due_date: string | null;
  grand_total: string | null;
  discounted_grand_total: string | null;
  line_total: string | null;
};

function formatMoney(amount: string | null): string {
  if (amount === null || amount === "") return "—";
  const n = Number(amount);
  if (!Number.isFinite(n)) return amount;
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: INVOICE_CURRENCY_CODE }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

function formatDueDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso.includes("T") ? iso : `${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/** Admin: email the public invoice link to the customer (Resend). */
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!isResendConfigured()) {
      return NextResponse.json(
        { message: "Email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL in the project root `.env.local` file (same folder as package.json), then restart the dev server." },
        { status: 503 },
      );
    }

    await ensureProductOrderSchema();
    const id = Number(params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ message: "Invalid id." }, { status: 400 });
    }

    const body = (await request.json().catch(() => ({}))) as Body;

    const result = await dbQuery<OrderRow>(
      `SELECT
        id,
        full_name,
        email,
        due_date::text,
        grand_total::text,
        discounted_grand_total::text,
        line_total::text
      FROM product_orders
      WHERE id = $1
      LIMIT 1`,
      [id],
    );

    const order = result.rows[0];
    if (!order) {
      return NextResponse.json({ message: "Order not found." }, { status: 404 });
    }

    const to = (body.to?.trim() || order.email).toLowerCase();
    if (!EMAIL_REGEX.test(to)) {
      return NextResponse.json({ message: "A valid recipient email is required." }, { status: 400 });
    }

    let key: string;
    try {
      key = await ensureInvoicePublicKey(id);
    } catch (err) {
      if (err instanceof Error && err.message === "Order not found.") {
        return NextResponse.json({ message: "Order not found." }, { status: 404 });
      }
      throw err;
    }

    const envOrigin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "").trim();
    const origin = envOrigin || new URL(request.url).origin;
    const invoiceUrl = buildPublicInvoiceUrl(id, key, origin);
    const payable = resolvePayableTotal(order);

    const sent = await sendInvoiceEmail({
      to,
      customerName: order.full_name,
      orderId: id,
      invoiceUrl,
      amountDue: formatMoney(String(payable)),
      dueDate: formatDueDate(order.due_date),
      supportEmail: SITE_CONTACT_EMAIL,
    });

    if (!sent.ok) {
      return NextResponse.json({ message: sent.error }, { status: 502 });
    }

    return NextResponse.json(
      { message: `Invoice sent to ${to}.`, to, invoiceUrl },
      { status: 200 },
    );
  } catch (error) {
    console.error("admin send-invoice POST:", error);
    return NextResponse.json({ message: "Unable to send invoice email." }, { status: 500 });
  }
}
