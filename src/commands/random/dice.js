

function lancerDes(valeurDes: number, nombreDes) {
  const resultats = [];

  for (let i = 0; i < nombreDes; i++) {
      const resultat = Math.floor(Math.random() * valeurDes) + 1;
      resultats.push(resultat);
  }

  return resultats;
}