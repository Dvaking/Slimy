import { query } from "#database";
import { v4 as uuidv4 } from "uuid";

export const servers = `
CREATE TABLE IF NOT EXISTS servers (
    uuid UUID PRIMARY KEY,
    server_id VARCHAR(50) UNIQUE NOT NULL,
    server_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)`;

export async function addServer(serverId, serverName) {
  const uuid = uuidv4();
  await query(
    "INSERT INTO servers (uuid, id, name) VALUES ($1, $2, $3) ON CONFLICT (server_id) DO NOTHING",
    [uuid, serverId, serverName]
  );
}

export async function geServer(serverId) {
  const res = await query("SELECT * FROM servers WHERE server_id = $1", [
    serverId,
  ]);
  return res.rows[0];
}

export async function getAllServer() {
  const res = await query("SELECT server_id FROM servers");

  return res;
}
