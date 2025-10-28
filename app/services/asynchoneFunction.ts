import { getAllSM } from "@/database";
import { SocialType } from "@/types";
import { Client } from "discord.js";
import { tiktokScrapper } from "@/services";

export async function asyncFunction(bot: Client) {
  const res = await getAllSM();

  res.map((rs) => {
    switch (rs.services_name) {
      case SocialType.YOUTUBE:
        console.log("Youtube");
        break;
      case SocialType.INSTAGRAM:
        console.log("Instagram");
        break;
      case SocialType.TWITCH:
        console.log("Twitch");
        break;
      case SocialType.TIKTOK:
        console.log("Tiktok");
        tiktokScrapper(bot, rs);
        break;
      default:
        console.log("Unmatch type!");
        break;
    }
  });
}
