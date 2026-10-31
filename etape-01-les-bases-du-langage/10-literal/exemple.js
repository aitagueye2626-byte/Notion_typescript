// 1. Literal de texte : seules ces 3 valeurs exactes sont autorisées
let tailleVetement;
tailleVetement = "M"; // ✅ Autorisé
// tailleVetement = "XL"; // ❌ Erreur TS : "XL" n'est pas dans la liste !
// 2. Literal de nombre : uniquement 10 ou 20
let baremeNote = 20;
console.log("Taille choisie :", tailleVetement);
console.log("Barème de la note :", baremeNote);
export {};
