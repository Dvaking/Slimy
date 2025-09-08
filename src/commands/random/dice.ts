import { DiceGenerator } from "./random";
import { helpDice } from "../help";

export function Dice(str: string[]) {
  let nbrOfDice = 0;
  let diceValue = 0;
  let reply = "";
  let result: number[] = [];

  diceValue = parseInt(str[2]);
  nbrOfDice = parseInt(str[3]);

  if (isNaN(diceValue)) return helpDice;
  if (isNaN(nbrOfDice)) nbrOfDice = 1;

  result = DiceGenerator(diceValue, nbrOfDice);

  if (result.length === 1) {
    reply = trolling(result);
  } else {
    reply = "Les résultats des dés sont ";
    for (let i = 0; i < result.length; i++) {
      reply += result[i] + (i < result.length - 1 ? ", " : " !");
    }
  }
  return reply;
}

function trolling(result: number[]) {
  const rdm = DiceGenerator(2, 1);
  switch (result[0]) {
    case 1:
      if (rdm[0] < 2) {
        return (
          "J'espère que tu es prêt à échouer car tu as eu un " +
          result[0] +
          " !"
        );
      } else {
        return (
          "Et c'est un echec critique pour le joueur français : " +
          result[0] +
          " !"
        );
      }
    case 20:
      if (rdm[0] > 2) {
        return (
          "Regardez-moi ce magnifique bg qui fait un " +
          result[0] +
          " exeptionnel !"
        );
      } else {
        return "Full luck, le mec lâche un " + result[0] + " tranquille !";
      }
    default:
      return "Le résultat du dé est " + result[0] + " !";
  }
}
