// Cas 1 : La variable est null -> "??" prend la valeur de secours à droite
let pseudoRecu = null;
let nomAffiche = pseudoRecu ?? "Invité";
console.log("Utilisateur 1 :", nomAffiche); // Affiche "Invité"
// Cas 2 : La variable contient une valeur -> "??" garde cette valeur
let pseudoConnecte = "Aita";
let nomConnecte = pseudoConnecte ?? "Invité";
console.log("Utilisateur 2 :", nomConnecte); // Affiche "Aita"
export {};
