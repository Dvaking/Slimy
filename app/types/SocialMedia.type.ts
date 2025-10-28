export enum SocialType {
  TIKTOK = "Tiktok",
  INSTAGRAM = "Instagram",
  YOUTUBE = "Youtube",
  TWITCH = "Twitch",
}

export interface SocialMediaWatcher {
  uuid: string;
  services_name: string;
  username: string;
  message?: string;
  channel_id: string;
  last_video?: string;
  server_id: string;
  created_at: Date;
}

export type SocialMWInsert = Omit<SocialMediaWatcher, "uuid" | "created_at">;

export type GetUserOfSM = Omit<
  SocialMediaWatcher,
  "uuid" | "server_id" | "created_at"
>;
