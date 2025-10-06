import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { SlashCommand } from "@/types";

export function addServer(): SlashCommand {
  const data = new SlashCommandBuilder()
    .setName("add_server")
    .setDescription(
      "/addServer to add a server can be executed only by dvaking"
    )
    .addStringOption((option) =>
      option
        .setName("guild_id")
        .setDescription("Id of the server")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("server_name")
        .setDescription("name of the server")
        .setRequired(true)
    );

  async function execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const serverId = interaction.options.getString("guild_ID");
    const serverName = interaction.options.getString("server_name");

    if (interaction.user.id != "418692593816436746") {
      await interaction.reply("Ur not Dvaking :eyes:");
      return;
    }

    
    await interaction.reply("Hey Dvaking!");
  }

  return { data: data as SlashCommandBuilder, execute };
}

export default addServer();
