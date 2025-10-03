import { SlashCommandBuilder } from "discord.js";
import { diceGenerator } from "#components";

const coin = () => {
  const data = new SlashCommandBuilder()
    .setName("coin")
    .setDescription("/coin to toss a coin");

  async function execute(interaction) {
    const result = diceGenerator(2, 1);

    if (result[0] === 1) return await interaction.reply("Face !");
    if (result[0] === 2) return await interaction.reply("Pile !");
    return await interaction.reply("I lost the coin x)");
  }

  return {
    data,
    execute,
  };
};

export default coin();
