import { SlashCommandBuilder } from "discord.js";
import { diceGenerator } from "#components";

const dice = () => {
  const data = new SlashCommandBuilder()
    .setName("dice")
    .setDescription("/dice nbr of faces [nbr of dice]")
    .addIntegerOption((option) =>
      option
        .setName("nbr_of_faces")
        .setDescription("Number of faces of the dice [max 999]")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("nbr_of_dice")
        .setDescription("Number of dice to roll [max 100]")
        .setRequired(true)
    );

  async function execute(interaction) {
    const nbrOfFaces = interaction.options.getInteger("nbr_of_faces");
    const nbrOfDice = interaction.options.getInteger("nbr_of_dice") || 1;

    if (nbrOfDice > 100) {
      return interaction.reply("Man you abuse it's 100 dices max !! :(");
    }
    if (nbrOfFaces > 999) {
      return interaction.reply("Man you abuse it's 999 faces max !! :(");
    }
    if (nbrOfFaces < 1 || nbrOfDice < 1) {
      return interaction.reply("I can't roll this type of dices !! :(");
    }

    const result = diceGenerator(nbrOfFaces, nbrOfDice);

    let reply;
    if (result.length === 1) {
      reply = trolling(result);
    } else {
      reply = `Les résultats des dés sont ${result.join(", ")} !`;
    }

    await interaction.reply(reply);
  }

  return {
    data,
    execute,
  };
};

function trolling(result) {
  const rdm = diceGenerator(2, 1)[0]; // juste la valeur au lieu du tableau
  switch (result[0]) {
    case 1:
      return rdm === 1
        ? `J'espère que tu es prêt à échouer car tu as eu un ${result[0]} !`
        : `Et c'est un échec critique pour le joueur français : ${result[0]} !`;
    case 20:
      return rdm === 2
        ? `Regardez-moi ce magnifique bg qui fait un ${result[0]} exceptionnel !`
        : `Full luck, le mec lâche un ${result[0]} tranquille !`;
    default:
      return `Le résultat du dé est ${result[0]} !`;
  }
}

export default dice();
