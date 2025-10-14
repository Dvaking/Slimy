import { query } from "@/database";
import { v4 as uuidv4 } from "uuid";
import { Server } from "@/types";

// SQL pour créer la table servers
export const servers = `
CREATE TABLE IF NOT EXISTS servers (
    uuid UUID PRIMARY KEY,
    server_id VARCHAR(50) UNIQUE NOT NULL,
    server_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)`;

/**
 * Ajoute un serveur dans la table servers
 * @param serverId - ID du serveur Discord
 * @param serverName - Nom du serveur Discord
 */
export async function addServer(
  serverId: string,
  serverName: string
): Promise<void> {
  const uuid = uuidv4();
  await query(
    "INSERT INTO servers (uuid, server_id, server_name) VALUES ($1, $2, $3) ON CONFLICT (server_id) DO NOTHING",
    [uuid, serverId, serverName]
  );
}

/**
 * Récupère un serveur par son server_id
 * @param serverId - ID du serveur Discord
 * @returns Server | undefined
 */
export async function getServer(serverId: string): Promise<Server | undefined> {
  const res = await query("SELECT * FROM servers WHERE server_id = $1", [
    serverId,
  ]);
  return res.rows[0] as Server | undefined;
}

/**
 * Récupère tous les server_id
 * @returns Tableau des server_id
 */
export async function getAllServers(): Promise<string[]> {
  const res = await query("SELECT server_name, server_id FROM servers");
  return res.rows.map((row) => row.server_name + " : " + row.server_id);
}
