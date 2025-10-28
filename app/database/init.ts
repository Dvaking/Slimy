import { createTables, servers, socialMedia, updateTables } from "@/database";

export async function initTables(): Promise<void> {
  console.log("Start init tables");
  let tables: string[] = [servers, socialMedia];
  try {
    await createTables(tables);
    console.log("✅ Tables created!");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  }
}


export async function modifyTables(): Promise<void> {
  console.log("Start init tables");
  let tables: string[] = [servers, socialMedia];
  try {
    await updateTables(tables);
    console.log("✅ Tables created!");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  }
}