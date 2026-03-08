import { Pool, type QueryResultRow } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __brandscafePgPool: Pool | undefined;
}

function buildPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  const sslOverride = process.env.DATABASE_SSL;
  const isLocal = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");
  const isRailwayProxy = connectionString.includes("proxy.rlwy.net");
  const useSsl =
    sslOverride === "true" ? true : sslOverride === "false" ? false : !isLocal && !isRailwayProxy;

  return new Pool({
    connectionString,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
    max: 10,
  });
}

export function getPool() {
  if (!global.__brandscafePgPool) {
    global.__brandscafePgPool = buildPool();
  }
  return global.__brandscafePgPool;
}

export async function dbQuery<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  const pool = getPool();
  return pool.query<T>(text, params);
}
