import { Dice } from "./random/dice"
import { help } from "./help"


export function CommandFinders(str: string[])
{
    if (str[1].toLowerCase().includes("help"))
        return help;
    if (str[1].toLowerCase().includes("dice")){
        return Dice(str);
    }
}