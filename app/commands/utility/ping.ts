import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { SlashCommand } from "@/types";

const ping = (): SlashCommand => {
  const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

  async function execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const member =
      interaction.member && "joinedAt" in interaction.member
        ? (interaction.member as import("discord.js").GuildMember)
        : null;
    const memberJoinDate = member?.joinedAt
      ? member.joinedAt.toDateString()
      : "Unknown date";

    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${memberJoinDate}.`
    );
  }

  return { data, execute };
};

export default ping();
