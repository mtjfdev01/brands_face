import path from "path";
import { NextResponse } from "next/server";
import { upsertCustomerFromLead } from "@/lib/customerSchema";
import { dbQuery } from "@/lib/postgres";
import { ensureQuoteSchema } from "@/lib/quoteSchema";
import { getQuotesS3Folder, isS3Configured, uploadFileToS3 } from "@/lib/s3";

export const dynamic = "force-dynamic";

const ACCEPTED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/jpg"]);
const ACCEPTED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export async function POST(request: Request) {
  try {
    await ensureQuoteSchema();

    const contentType = request.headers.get("content-type") || "";
    let phone = "";
    let email = "";
    let requirement = "";
    let attachment: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      phone = getString(formData, "phone");
      email = getString(formData, "email").toLowerCase();
      requirement = getString(formData, "requirement");
      const raw = formData.get("attachment");
      if (raw instanceof File && raw.size > 0) attachment = raw;
    } else {
      const body = (await request.json()) as {
        phone?: string;
        requirement?: string;
        fullName?: string;
        email?: string;
      };
      phone = body.phone?.trim() ?? "";
      email = body.email?.trim().toLowerCase() ?? "";
      requirement = body.requirement?.trim() ?? "";
    }

    const phoneDigits = digitsOnly(phone);
    const hasPhone = phoneDigits.length >= 7;
    const hasEmail = EMAIL_RE.test(email);

    if (!phone && !email) {
      return NextResponse.json(
        { message: "Please provide an email or a contact number." },
        { status: 400 },
      );
    }
    if (phone && !hasPhone) {
      return NextResponse.json({ message: "Please provide a valid contact number." }, { status: 400 });
    }
    if (email && !hasEmail) {
      return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
    }
    if (!hasPhone && !hasEmail) {
      return NextResponse.json(
        { message: "Please provide an email or a contact number." },
        { status: 400 },
      );
    }

    const attachmentPaths: string[] = [];
    if (attachment) {
      if (!isS3Configured()) {
        return NextResponse.json(
          {
            message:
              "File upload is not available yet. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET.",
          },
          { status: 503 },
        );
      }

      const ext = path.extname(attachment.name).toLowerCase();
      if (!ACCEPTED_MIME.has(attachment.type) || !ACCEPTED_EXT.has(ext)) {
        return NextResponse.json(
          { message: "Only JPG, PNG, or WEBP images are allowed." },
          { status: 400 },
        );
      }
      if (attachment.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json({ message: "Image must be 8 MB or smaller." }, { status: 400 });
      }

      try {
        const url = await uploadFileToS3({ file: attachment, folder: getQuotesS3Folder() });
        attachmentPaths.push(url);
      } catch (uploadError) {
        console.error("Quote S3 upload error:", uploadError);
        return NextResponse.json(
          { message: "Unable to upload image right now. Please try again." },
          { status: 502 },
        );
      }
    }

    const storedPhone = hasPhone ? phone : null;
    const customerEmail = hasEmail
      ? email
      : `quote.${phoneDigits}@leads.brandsface.local`;
    const quoteEmail = hasEmail ? email : "";

    const customerId = await upsertCustomerFromLead({
      email: customerEmail,
      fullName: "Quote Lead",
      phone: storedPhone,
      company: null,
    });

    const inserted = await dbQuery<{ id: number }>(
      `INSERT INTO quote_requests (
        full_name,
        email,
        phone,
        company,
        width,
        height,
        depth,
        material,
        thickness,
        addons,
        finish,
        extra_finishes,
        unboxing,
        quantity,
        requirement,
        attachment_paths,
        customer_id
      )
      VALUES (
        $1, $2, $3, NULL, 0, 0, 0, NULL, NULL, '{}'::text[], NULL, '{}'::text[], NULL, 1, $4, $5::text[], $6
      )
      RETURNING id`,
      ["Quote Lead", quoteEmail, storedPhone, requirement, attachmentPaths, customerId],
    );

    return NextResponse.json(
      {
        message: "Thank you! Your quote request has been received. We will contact you soon.",
        quoteId: inserted.rows[0]?.id ?? null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create quote error:", error);
    return NextResponse.json({ message: "Unable to submit quote right now." }, { status: 500 });
  }
}
