import { Dice } from "./random/dice";
import { TossCoin } from "./random/tossCoin";
import { help } from "./help";
import { tryDatabase } from "./db/tryDatabase";

function DatabaseInteraction(str: string[])
{
  let value = 'Error: database';
  if (str[1].toLowerCase().includes("db")) {
    const message = tryDatabase();
    message.then((rep) => { value = rep; console.log('toto', value); });
    console.log(value);
  }
  return value;
}

export function CommandFinders(str: string[]) {
  if (str[1].toLowerCase().includes("help")) return help;
  if (str[1].toLowerCase().includes("dice")) return Dice(str);
  if (str[1].toLowerCase().includes("tosscoin")) return TossCoin();
  if (str[1].toLowerCase().includes("db")) return DatabaseInteraction(str);
  return "Command not found";
}
