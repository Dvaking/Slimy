import { DiceGenerator } from "./random"
import { helpDice } from "../help";


export function Dice(str: string[])
{
  let nbrOfDice = 0;
  let diceValue = 0;
  let reply = "";
  let result: number[] = [];

  diceValue = parseInt(str[2]);
  nbrOfDice = parseInt(str[3]);

  if (isNaN(diceValue))
    return helpDice;
  if (isNaN(nbrOfDice))
    nbrOfDice = 1;

  result = DiceGenerator(diceValue, nbrOfDice);

  if (result.length === 1) {
    reply = "Le résultat du dé est " + result[0] + " !";
  } else {
    reply = "Les résultats des dés sont ";
    for (let i = 0; i < result.length; i++) {
      reply += result[i] + (i < result.length - 1 ? ", " : " !");
    }
  }
  return reply;
}
