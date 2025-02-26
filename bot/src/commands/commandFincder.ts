import { Dice } from "./random/dice"
import { TossCoin } from "./random/tossCoin";
import { help } from "./help";
import { saveOnFiles } from "./memorie/saveOnFile";


export function CommandFinders(str: string[])
{
    if (str[1].toLowerCase().includes("help"))
        return help;
    if (str[1].toLowerCase().includes("dice"))
        return Dice(str);
    if (str[1].toLowerCase().includes("tosscoin"))
        return TossCoin();
    if (str[1].toLowerCase().includes("db"))
        return saveOnFiles(str[2]).then((data) => data);
    return "Command not found";
}