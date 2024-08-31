import { Client, IntentsBitField, Partials } from "discord.js";
import { help } from "./commands/help.js"
import "dotenv/config";

const prefix = "slimy "

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.DirectMessages,
  ],
  partials: [
    Partials.Channel
  ],
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
  if (msg.content.toLowerCase().startsWith(prefix) && msg.content.includes("help"))
    msg.reply(help);
  if (msg.type === 7)
    msg.reply(
      `Bienvenue ${msg.author.globalName} ! J'espère que tu t'amuseras bien parmi nous :)`
    );
});

bot.login(process.env.TOKEN);