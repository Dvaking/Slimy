import { SlashCommandBuilder, InteractionType } from "discord.js";
import { diceGenerator } from "#components";

const addServer = () => {
  const data = new SlashCommandBuilder()
    .setName("addServer")
    .setDescription("/addServer commands only able by Dvaking")
    .addIntegerOption((option) =>
      option
        .setName("server_id")
        .setDescription("Id of the server that you want to add")
        .setRequired(true)
    );

  async function execute(interaction: InteractionType) {
    const serverId = interaction.options.getInteger("server_id");

    if (interaction.)

    if (result[0] === 1) return await interaction.reply("Face !");
    if (result[0] === 2) return await interaction.reply("Pile !");
    return await interaction.reply("I lost the coin x)");
  }

  return {
    data,
    execute,
  };
};

export default addServer();
