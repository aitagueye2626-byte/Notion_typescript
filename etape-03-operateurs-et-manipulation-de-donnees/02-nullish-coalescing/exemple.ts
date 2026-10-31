// Cas 1 : La variable est null -> "??" prend la valeur de secours à droite
let pseudoRecu: string | null = null;
let nomAffiche: string = pseudoRecu ?? "Invité";

console.log("Utilisateur 1 :", nomAffiche); // Affiche "Invité"

// Cas 2 : La variable contient une valeur -> "??" garde cette valeur
let pseudoConnecte: string | null = "Aita";
let nomConnecte: string = pseudoConnecte ?? "Invité";

console.log("Utilisateur 2 :", nomConnecte); // Affiche "Aita"
