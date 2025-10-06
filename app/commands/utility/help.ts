import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { SlashCommand } from "@/types";

const help = (): SlashCommand => {
  const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Command of Slimy");

  async function execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await interaction.reply(
      "[COMMAND] [ARGS]\n\tCOMMANDS:\n\t\tdice (nbr of faces) [nbr of dice]\n\t\tcoin\n\t\thelp"
    );
  }

  return { data, execute };
};

export default help();
