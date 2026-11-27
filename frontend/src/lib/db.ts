import { Pool } from "pg";

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString =
      process.env.DIRECT_URL ||
      process.env.DATABASE_URL ||
      "postgresql://postgres.cooginxoutisgokvjckf:Chirag%40mbpu@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?connect_timeout=10";

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected error on idle pg client:", err);
    });
  }
  return pool;
}
