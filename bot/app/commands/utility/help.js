import { SlashCommandBuilder } from "discord.js";

const ping = () => {
  const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Command of slimy");

  async function execute(interaction) {
    await interaction.reply(
      "[COMMAND] [ARGS]\n\tCOMMANDS:\n\t\tdice (nbr of faces) [nbr of dice]\n\t\ttossCoin\n\t\thelp"
    );
  }
  return {
    data,
    execute,
  };
};

export default ping();
