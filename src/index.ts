import {
  Client,
  GatewayIntentBits,
  IntentsBitField,
  Partials,
} from "discord.js";
import { CommandFinders } from "./commands/commandFincder";
import "dotenv/config";

const prefix = "slimy ";

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Channel],
});

bot.on("ready", () => {
  if (!bot) return;
  console.log(`\n${bot.user?.username} is ready`);
});

bot.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (msg.content.toLowerCase().includes("salut slimy")) {
    msg.reply(`Salut ${msg.author.globalName}`);
  }
  if (msg.type === 7) {
    msg.reply(
      `Bienvenue ${msg.author.globalName} ! J'espère que tu t'amuseras bien parmi nous :)`
    );
  }
  if (msg.content.toLowerCase().startsWith(prefix)) {
    msg.reply(CommandFinders(msg.content.split(" ")));
  }
});

bot.login(process.env.DEVTOKEN);
