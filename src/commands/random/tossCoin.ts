import { DiceGenerator } from "./random";

export function TossCoin()
{
  const result = DiceGenerator(2, 1)
  if (result[0] === 1)
    return "Face !";
  if (result[0] === 2)
    return "Pile !";
}