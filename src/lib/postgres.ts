import { Pool, type QueryResultRow } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __brandscafePgPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __brandscafePgPoolUrl: string | undefined;
}

/** Postgres connection (Railway). Credentials in repo are a security risk — rotate if exposed. */
const DATABASE_URL =
  "postgresql://postgres:ImKqbcEqHARjoOvCmXidXuzfqlrcpjXN@crossover.proxy.rlwy.net:49268/railway";

function buildPool() {
  const connectionString = DATABASE_URL;

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
  // Recreate pool if the connection string changed (avoids stale DB after env → hardcoded URL edits without restarting dev).
  if (global.__brandscafePgPool && global.__brandscafePgPoolUrl !== DATABASE_URL) {
    void global.__brandscafePgPool.end().catch(() => {});
    global.__brandscafePgPool = undefined;
    global.__brandscafePgPoolUrl = undefined;
  }
  if (!global.__brandscafePgPool) {
    global.__brandscafePgPool = buildPool();
    global.__brandscafePgPoolUrl = DATABASE_URL;
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
