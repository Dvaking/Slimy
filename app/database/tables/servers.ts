import { query } from "@/database";
import { Server } from "@/types";

// SQL pour créer la table servers
export const servers = `
CREATE TABLE IF NOT EXISTS servers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);`;

/**
 * Ajoute un serveur dans la table servers
 * @param serverId - ID du serveur Discord
 * @param serverName - Nom du serveur Discord
 */
export async function addServer(
  serverId: string,
  serverName: string
): Promise<void> {
  await query(
    "INSERT INTO servers (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING",
    [serverId, serverName]
  );
}

/**
 * Récupère un serveur par son server_id
 * @param serverId - ID du serveur Discord
 * @returns Server | undefined
 */
export async function getServer(serverId: string): Promise<Server | undefined> {
  const res = await query("SELECT * FROM servers WHERE id = $1", [
    serverId,
  ]);
  return res.rows[0] as Server | undefined;
}

/**
 * Récupère tous les id
 * @returns Tableau des id
 */
export async function getAllServers(): Promise<string[]> {
  const res = await query("SELECT name, id FROM servers");
  return res.rows.map((row) => row.server_name + " : " + row.server_id);
}
