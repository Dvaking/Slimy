export function diceGenerator(diceValue, nbrOfDice) {
  const diceResult = new Array(nbrOfDice);
  for (let i = 0; i < nbrOfDice; i++) {
    diceResult[i] = ((Math.random() * diceValue) | 0) + 1;
  }
  return diceResult;
}
