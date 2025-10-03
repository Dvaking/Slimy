import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { diceGenerator } from "@/components";
import { SlashCommand } from "@/types";

const coin = (): SlashCommand => {
  const data = new SlashCommandBuilder()
    .setName("coin")
    .setDescription("/coin to toss a coin");

  async function execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const result = diceGenerator(2, 1);

    if (result[0] === 1) {
      await interaction.reply("Face !");
      return;
    }

    if (result[0] === 2) {
      await interaction.reply("Pile !");
      return;
    }

    await interaction.reply("I lost the coin x)");
  }

  return { data, execute };
};

export default coin();
