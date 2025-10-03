import { query } from "#database";

export async function createTables(tables) {
  await query(tables);
}
