import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { SlashCommand } from "@/types";
import { getAllServers } from "@/database";

export function serverRegister(): SlashCommand {
  const data = new SlashCommandBuilder()
    .setName("server_register")
    .setDescription(
      "/serverRegister to get the register a server can be executed only by dvaking"
    );

  async function execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    if (interaction.user.id != "418692593816436746") {
      await interaction.reply("Ur not Dvaking :eyes:");
      return;
    }
    const servers = await getAllServers();

    await interaction.reply(
      "This's the registered servers :\n" + servers.join("\n")
    );
  }

  return { data: data as SlashCommandBuilder, execute };
}

export default serverRegister();
