// join() : transformer un tableau en chaîne de caractères
let fruits = ["Mangue", "Banane", "Orange"];
// 1. Sans argument : séparateur par défaut = virgule
console.log(fruits.join()); // "Mangue,Banane,Orange"
// 2. Avec un séparateur
console.log(fruits.join(" - ")); // "Mangue - Banane - Orange"
console.log(fruits.join("")); // "MangueBananeOrange"
console.log(fruits.join(" et ")); // "Mangue et Banane et Orange"
// 3. Les nombres sont convertis automatiquement
let notes = [18, 15, 17];
console.log(notes.join(" / ")); // "18 / 15 / 17"
// 4. null et undefined deviennent des chaînes vides
let avecTrous = ["Aita", null, "Dakar", undefined];
console.log(avecTrous.join(", ")); // "Aita, , Dakar, "
// 5. Tableau vide -> chaîne vide
console.log([].join(", ") === ""); // true
// 6. Tableau à un seul élément -> pas de séparateur
console.log(["Aita"].join(", ")); // "Aita"
// 7. Cas concrets
// a) Construire une phrase à partir d'une liste
let invites = ["Aita", "Moussa", "Fatou"];
console.log("Invités :", invites.join(", "));
// b) Générer du HTML / du SQL à partir d'un tableau
let colonnes = ["nom", "age", "ville"];
let requete = `SELECT ${colonnes.join(", ")} FROM eleves`;
console.log(requete);
// c) Créer un chemin de fichier
let morceaux = ["cours", "typescript", "etape-04"];
console.log(morceaux.join("/")); // "cours/typescript/etape-04"
// d) Afficher une liste à puces
let puces = invites.map((nom) => `- ${nom}`).join("\n");
console.log(puces);
// 8. join() ne modifie pas le tableau
console.log("Tableau original :", fruits);
export {};
