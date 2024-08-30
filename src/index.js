require("dotenv").config();
const { Client, IntentsBitField, DMChannel } = require("discord.js");

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.DirectMessages,
  ],
});

bot.on("ready", () => {
  console.log(`${bot.user.username} is ready`);
});

bot.on("messageCreate", (msg) => {
  console.log(msg.channel);
  if (msg.channel.type === "DM") console.log("bite");
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes("salut slimy")) {
    msg.reply(`Salut ${msg.author.globalName}`);
  }

  if (msg.type === 7)
    msg.reply(
      `Bienvenue ${msg.author.globalName} ! J'espère que tu t'amuseras bien parmi nous :)`
    );
});

bot.login(process.env.TOKEN);
