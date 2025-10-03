/**
 * Génère un tableau de résultats de dés
 * @param diceValue - Nombre de faces du dé
 * @param nbrOfDice - Nombre de dés à lancer
 * @returns Un tableau de nombres représentant le résultat de chaque dé
 */
export function diceGenerator(diceValue: number, nbrOfDice: number): number[] {
  const diceResult: number[] = new Array(nbrOfDice);

  for (let i = 0; i < nbrOfDice; i++) {
    diceResult[i] = Math.floor(Math.random() * diceValue) + 1;
  }

  return diceResult;
}
