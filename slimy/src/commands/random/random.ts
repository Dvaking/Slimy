export function DiceGenerator(diceValue: number, nbrOfDice: number): number[] {
    let diceResult: number[] = new Array(nbrOfDice);

    for (let i = 0; i < nbrOfDice; i++) {
      diceResult[i] = Math.floor(Math.random() * diceValue) + 1;
    }
    return diceResult;
}