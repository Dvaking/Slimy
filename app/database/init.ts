import { createTables, servers } from "@/database";

export async function initTables(): Promise<void> {
  console.log("Start init tables");

  try {
    await createTables(servers);
    console.log("Tables server created!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}
