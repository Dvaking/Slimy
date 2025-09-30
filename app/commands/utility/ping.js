import { SlashCommandBuilder } from "discord.js";

const ping = () => {
  const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

  async function execute(interaction) {
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
    );
  }
  return {
    data,
    execute,
  };
}

export default ping();