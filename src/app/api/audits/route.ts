import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/postgres";
import { ensureAuditSchema } from "@/lib/auditSchema";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ACCEPTED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const ACCEPTED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".pdf"]);
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const MAX_FILES = 8;
const MAX_TOTAL_SIZE_BYTES = 25 * 1024 * 1024;

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeWebsiteUrl(input: string) {
  if (!input) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;
    const url = new URL(withProtocol);
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    await ensureAuditSchema();

    const formData = await request.formData();
    const companyName = getString(formData, "companyName");
    const websiteUrlRaw = getString(formData, "websiteUrl");
    const websiteUrl = sanitizeWebsiteUrl(websiteUrlRaw);
    const country = getString(formData, "country");
    const productCategory = getString(formData, "productCategory");
    const fullName = getString(formData, "fullName");
    const email = getString(formData, "email").toLowerCase();
    const phone = getString(formData, "phone") || null;
    const brandStage = getString(formData, "brandStage") || null;
    const monthlyOrderVolume = getString(formData, "monthlyOrderVolume") || null;
    const primaryGoal = getString(formData, "primaryGoal") || null;
    const currentPackagingType = getString(formData, "currentPackagingType") || null;
    const timeline = getString(formData, "timeline") || null;
    const budgetRange = getString(formData, "budgetRange") || null;
    const notes = getString(formData, "notes") || null;
    const challenges = formData
      .getAll("challenges")
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!companyName || !country || !productCategory) {
      return NextResponse.json(
        { message: "Please provide company name, country, and product category." },
        { status: 400 },
      );
    }

    if (!fullName || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Please provide valid contact details." },
        { status: 400 },
      );
    }

    if (websiteUrlRaw && !websiteUrl) {
      return NextResponse.json({ message: "Please provide a valid website URL." }, { status: 400 });
    }

    const files = formData
      .getAll("attachments")
      .filter((item): item is File => item instanceof File && item.size > 0);

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { message: `You can upload up to ${MAX_FILES} files.` },
        { status: 400 },
      );
    }

    let totalSize = 0;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "audit-requests");
    const attachmentPaths: string[] = [];
    await mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      const ext = path.extname(file.name).toLowerCase();
      if (!ACCEPTED_MIME.has(file.type) || !ACCEPTED_EXT.has(ext)) {
        return NextResponse.json(
          { message: "Only JPG, JPEG, PNG, WEBP, and PDF files are allowed." },
          { status: 400 },
        );
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { message: "Each file must be 8 MB or smaller." },
          { status: 400 },
        );
      }

      totalSize += file.size;
      if (totalSize > MAX_TOTAL_SIZE_BYTES) {
        return NextResponse.json(
          { message: "Total attachment size must be 25 MB or less." },
          { status: 400 },
        );
      }

      const filename = `${Date.now()}-${randomUUID()}${ext}`;
      const diskPath = path.join(uploadDir, filename);
      const publicPath = `/uploads/audit-requests/${filename}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(diskPath, buffer);
      attachmentPaths.push(publicPath);
    }

    const inserted = await dbQuery<{ id: number }>(
      `INSERT INTO audit_requests (
        company_name,
        website_url,
        country,
        product_category,
        full_name,
        email,
        phone,
        brand_stage,
        monthly_order_volume,
        primary_goal,
        current_packaging_type,
        timeline,
        budget_range,
        challenges,
        notes,
        attachment_paths
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14::text[], $15, $16::text[]
      )
      RETURNING id`,
      [
        companyName,
        websiteUrl,
        country,
        productCategory,
        fullName,
        email,
        phone,
        brandStage,
        monthlyOrderVolume,
        primaryGoal,
        currentPackagingType,
        timeline,
        budgetRange,
        challenges,
        notes,
        attachmentPaths,
      ],
    );

    return NextResponse.json(
      {
        message: "Audit request submitted successfully.",
        auditId: inserted.rows[0]?.id ?? null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create audit request error:", error);
    return NextResponse.json(
      { message: "Unable to submit audit request right now." },
      { status: 500 },
    );
  }
}
