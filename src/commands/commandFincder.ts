import { Dice } from "./random/dice"
import { TossCoin } from "./random/tossCoin";
import { help } from "./help"


export function CommandFinders(str: string[])
{
    if (str[1].toLowerCase().includes("help"))
        return help;
    if (str[1].toLowerCase().includes("dice"))
        return Dice(str);
    if (str[1].toLowerCase().includes("tosscoin"))
        return TossCoin();
    return "Command not found";
}