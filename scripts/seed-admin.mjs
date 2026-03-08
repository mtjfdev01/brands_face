import bcrypt from "bcryptjs";
import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(projectRoot, ".env.local") });
dotenv.config({ path: path.join(projectRoot, ".env") });
dotenv.config({ path: path.join(projectRoot, "src", "components", ".env") });

const databaseUrl = process.env.DATABASE_URL;
const sslOverride = process.env.DATABASE_SSL;
const email = (process.env.ADMIN_SEED_EMAIL || "admin@brandscafe.com").trim().toLowerCase();
const password = process.env.ADMIN_SEED_PASSWORD;
const name = (process.env.ADMIN_SEED_NAME || "Admin User").trim();

if (!databaseUrl) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

if (!password || password.length < 6) {
  console.error("Missing ADMIN_SEED_PASSWORD (min 6 chars)");
  process.exit(1);
}

const isLocal = databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");
const isRailwayProxy = databaseUrl.includes("proxy.rlwy.net");
const useSsl =
  sslOverride === "true" ? true : sslOverride === "false" ? false : !isLocal && !isRailwayProxy;
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});

try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      password_hash TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS admins_email_idx ON admins (email);`);

  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO admins (email, name, password_hash, is_active)
     VALUES ($1, $2, $3, TRUE)
     ON CONFLICT (email) DO UPDATE
       SET name = EXCLUDED.name,
           password_hash = EXCLUDED.password_hash,
           is_active = TRUE,
           updated_at = NOW()`,
    [email, name, hash],
  );

  console.log(`Admin seed complete for ${email}`);
} catch (error) {
  console.error("Failed to seed admin:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
