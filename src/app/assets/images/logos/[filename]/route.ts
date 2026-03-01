import { promises as fs } from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

export async function GET(
  _request: Request,
  { params }: { params: { filename: string } },
) {
  const requested = params.filename || "";
  const ext = path.extname(requested).toLowerCase();
  const contentType = MIME_TYPES[ext];

  if (!contentType) {
    return new Response("Unsupported file type", { status: 400 });
  }

  const filePath = path.join(
    process.cwd(),
    "assets",
    "images",
    "logos",
    path.basename(requested),
  );

  try {
    const file = await fs.readFile(filePath);
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
