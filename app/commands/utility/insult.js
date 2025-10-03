import { SlashCommandBuilder } from "discord.js";
import { diceGenerator, getFromFiles } from "#components";

const insult = () => {
  const data = new SlashCommandBuilder()
    .setName("insulte")
    .setDescription("Command to insulte a user with old french language")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want insult")
        .setRequired(true)
    );

  async function execute(interaction) {
    const victim = interaction.options.getUser("user");

    const insult = await getFromFiles("insult.txt");
    const rdm = diceGenerator(insult.length, 1);

    const reply = `${insult[rdm[0]]} ${victim}`;

    await interaction.reply(reply);
  }

  return {
    data,
    execute,
  };
};

export default insult();
