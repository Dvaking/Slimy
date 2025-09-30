import { Client, GatewayIntentBits, Events } from "discord.js";
import "dotenv/config";

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

console.log(process.env.DEVTOKEN);

bot.login(process.env.DEVTOKEN);
