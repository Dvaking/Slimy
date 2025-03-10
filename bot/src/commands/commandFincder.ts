import { Dice } from "./random/dice";
import { TossCoin } from "./random/tossCoin";
import { help } from "./help";
import { tryDatabase, tryDiscordDatabase } from "./db";

async function DatabaseInteraction(str: string[])
{
  console.log(str);
  if (str[2].toLowerCase().includes("home")) {
    return await tryDatabase();
  }
  if (str[2].toLowerCase().includes("discord")) {
    return tryDiscordDatabase();
  }
  return 'Error: database';
}

export async function CommandFinders(str: string[]) {
  if (str[1].toLowerCase().includes("help")) return help;
  if (str[1].toLowerCase().includes("dice")) return Dice(str);
  if (str[1].toLowerCase().includes("tosscoin")) return TossCoin();
  if (str[1].toLowerCase().includes("db")) return await DatabaseInteraction(str);
  return "Command not found";
}
