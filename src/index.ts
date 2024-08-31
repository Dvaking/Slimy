import { Client, IntentsBitField, Partials } from "discord.js";
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
    console.log("je suis là");
    const reply = CommandFinders(msg.content.split(" "));
    if (reply) {
      msg.reply(reply);
    }
  }
});

bot.login(process.env.TOKEN);
