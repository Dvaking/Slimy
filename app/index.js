import {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
  MessageFlags,
} from "discord.js";
import { DeployCommand } from "./deployCommands.js";
import { loadCommands, getDirname } from "./utils/commandLoader.js";

import "dotenv/config";

DeployCommand();

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

bot.commands = new Collection();

const __dirname = getDirname(import.meta.url);

// Charge toutes les commandes en utilisant l'utilitaire centralisé
const loadedCommands = await loadCommands(__dirname);

// Ajoute chaque commande à la collection du bot
for (const command of loadedCommands) {
  bot.commands.set(command.data.name, command);
}

bot.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

bot.login(process.env.DEVTOKEN);
