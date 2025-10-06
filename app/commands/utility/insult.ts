import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { diceGenerator, getFromFiles } from "@/components";
import { SlashCommand } from "@/types";

const insult = (): SlashCommand => {
  const data = (
    new SlashCommandBuilder()
      .setName("insulte")
      .setDescription("Command to insult a user with old French language")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("The user you want to insult")
          .setRequired(true)
      )
  ) as SlashCommandBuilder;

  async function execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const victim = interaction.options.getUser("user", true);

    const insults = await getFromFiles("insult.txt");
    const rdm = diceGenerator(insults.length, 1);

    // Sécurité : s'assurer que l'index existe
    const selectedInsult = insults[rdm[0]] ?? "…";
    const reply = `${selectedInsult} ${victim}`;

    await interaction.reply(reply);
  }

  return { data, execute };
};

export default insult();
