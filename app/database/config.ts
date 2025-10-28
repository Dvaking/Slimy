import pkg from "pg";
const { Pool } = pkg;

// Create PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function query<
  T extends import("pg").QueryResultRow = import("pg").QueryResultRow
>(text: string, params?: any[]): Promise<import("pg").QueryResult<T>> {
  return pool.query<T>(text, params);
}

/**
 * Executes an update or insert
 * @param text - The SQL query
 * @param params - Query parameters
 */
export async function update(
  text: string,
  params?: any[]
): Promise<import("pg").QueryResult> {
  return pool.query(text, params);
}

/**
 * Creates the tables provided as parameter
 * @param tables - SQL string or array of SQL strings
 */
export async function createTables(tables: string | string[]): Promise<void> {
  if (Array.isArray(tables)) {
    for (const table of tables) {
      if (!(await query(table)))
        console.log(`❌ Deployment of ${table} failed!`);
    }
  } else {
    await query(tables);
  }
}

/**
 * Applique des mises à jour de schéma (ALTER / CREATE ... IF NOT EXISTS) sans supprimer les données.
 * Exécute un ou plusieurs statements dans une transaction.
 */
export async function updateTables(
  statements: string | string[]
): Promise<void> {
  const stmts = Array.isArray(statements) ? statements : [statements];
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const sql of stmts) {
      try {
        await client.query(sql);
        console.log(`✅ Executed: ${sql.split("\n")[0].slice(0, 120)}`);
      } catch (err) {
        console.error(`❌ Failed executing statement: ${sql}\n`, err);
        throw err; // provoque ROLLBACK global
      }
    }
    await client.query("COMMIT");
    console.log("✅ Schema updates applied");
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}
