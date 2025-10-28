import { query } from "@/database";
import { GetUserOfSM, SocialMediaWatcher, SocialMWInsert } from "@/types";

export const socialMedia = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS social_media_watcher (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  services_name TEXT NOT NULL,
  username TEXT NOT NULL,
  message TEXT,
  channel_id TEXT NOT NULL,
  last_video TEXT,
  server_id TEXT REFERENCES servers(id) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`;

/**
 * Ajoute un utilisateur réseau social
 */
export async function addSocialMW(
  service: SocialMWInsert
): Promise<string | null> {
  const res = await query(
    `
    INSERT INTO social_media_watcher (username, message, services_name, server_id, channel_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING uuid
    `,
    [
      service.username,
      service.message,
      service.services_name,
      service.server_id,
      service.channel_id,
    ]
  );
  return res.rows[0]?.uuid ?? null;
}

/**
 * Supprime un utilisateur réseau social
 */
export async function deleteSocialUser(
  user_name: string,
  services_name: string
): Promise<void> {
  await query(
    `DELETE FROM social_media_watcher
     WHERE user_name = $1 AND services_name = $2`,
    [user_name, services_name]
  );
}

/**
 * Modifie un utilisateur réseau social
 */
export async function updateSocialUser(
  user_name: string,
  services_name: string,
  newMessage: string
): Promise<void> {
  await query(
    `UPDATE social_media_watcher
     SET message = $1
     WHERE user_name = $2 AND services_name = $3`,
    [newMessage, user_name, services_name]
  );
}

/**
 * Récupère les utilisateurs réseau social d'un server
 */
export async function getAllSMByServerId(
  server_id: string
): Promise<GetUserOfSM[]> {
  const res = await query(
    `SELECT services_name, username, message, channel_id
     FROM social_media_watcher
     WHERE server_id = $1`,
    [server_id]
  );

  return res.rows as GetUserOfSM[];
}

/**
 * Récupère les utilisateurs réseau social
 */
export async function getAllSM(): Promise<GetUserOfSM[]> {
  const res = await query(
    `SELECT services_name, username, message, channel_id
     FROM social_media_watcher`
  );

  return res.rows as GetUserOfSM[];
}

/**
 * Récupère tous les utilisateurs d'un type de réseau social
 */
export async function getAllSocialUsers(
  services_name?: string
): Promise<SocialMediaWatcher[]> {
  let res;
  if (services_name) {
    res = await query(
      `SELECT * FROM social_media_watcher WHERE services_name = $1`,
      [services_name]
    );
  } else {
    res = await query(`SELECT * FROM social_media_watcher`);
  }
  return res.rows as SocialMediaWatcher[];
}
