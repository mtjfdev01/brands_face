import { PutObjectCommand, S3Client, type ObjectCannedACL } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";

let client: S3Client | null = null;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

export function isS3Configured(): boolean {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID?.trim() &&
      process.env.AWS_SECRET_ACCESS_KEY?.trim() &&
      process.env.AWS_S3_BUCKET?.trim() &&
      process.env.AWS_REGION?.trim(),
  );
}

function getS3Client(): S3Client {
  if (client) return client;
  client = new S3Client({
    region: requireEnv("AWS_REGION"),
    credentials: {
      accessKeyId: requireEnv("AWS_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("AWS_SECRET_ACCESS_KEY"),
    },
  });
  return client;
}

function publicUrlForKey(key: string): string {
  const base = process.env.AWS_S3_PUBLIC_BASE_URL?.replace(/\/$/, "").trim();
  if (base) return `${base}/${key}`;

  const bucket = requireEnv("AWS_S3_BUCKET");
  const region = requireEnv("AWS_REGION");
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

/** Folder for quote attachments; must match the public bucket policy path. */
export function getQuotesS3Folder(): string {
  return (process.env.AWS_S3_QUOTES_PREFIX?.trim() || "quotes_requests").replace(/^\/+|\/+$/g, "");
}

export type UploadToS3Input = {
  file: File;
  /** Folder prefix inside the bucket, e.g. `quotes_requests` */
  folder: string;
};

/** Upload a browser File to S3 and return its public HTTPS URL. */
export async function uploadFileToS3({ file, folder }: UploadToS3Input): Promise<string> {
  if (!isS3Configured()) {
    throw new Error(
      "S3 is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET.",
    );
  }

  const ext = path.extname(file.name).toLowerCase() || "";
  const safeFolder = folder.replace(/^\/+|\/+$/g, "") || "uploads";
  const key = `${safeFolder}/${Date.now()}-${randomUUID()}${ext}`;
  const body = Buffer.from(await file.arrayBuffer());
  const aclRaw = process.env.AWS_S3_OBJECT_ACL?.trim();
  const acl = aclRaw ? (aclRaw as ObjectCannedACL) : undefined;

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: requireEnv("AWS_S3_BUCKET"),
      Key: key,
      Body: body,
      ContentType: file.type || "application/octet-stream",
      ...(acl ? { ACL: acl } : {}),
    }),
  );

  return publicUrlForKey(key);
}
