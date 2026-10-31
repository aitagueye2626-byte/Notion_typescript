// splice() : AJOUTER et/ou SUPPRIMER des éléments EN PLACE (modifie le tableau)
// Signature : tableau.splice(debut, nombreASupprimer, ...elementsAInserer)
// Retour : un tableau contenant les éléments SUPPRIMÉS
// 1. Supprimer des éléments au milieu
let fruits = ["Mangue", "Banane", "Orange", "Papaye"];
let supprimes = fruits.splice(1, 2); // à partir de l'index 1, supprimer 2 éléments
console.log("Supprimés :", supprimes); // ["Banane", "Orange"]
console.log("Après splice :", fruits); // ["Mangue", "Papaye"]  <- tableau modifié !
// 2. Insérer sans supprimer (0 élément supprimé)
let langages = ["JavaScript", "Python"];
langages.splice(1, 0, "TypeScript");
console.log("Insertion :", langages); // ["JavaScript", "TypeScript", "Python"]
// 3. Remplacer un élément
let notes = [10, 12, 14];
notes.splice(1, 1, 20);
console.log("Remplacé :", notes); // [10, 20, 14]
// 4. Remplacer plusieurs éléments par plusieurs autres
let couleurs = ["rouge", "vert", "bleu"];
couleurs.splice(0, 2, "jaune", "orange");
console.log("Remplacement multiple :", couleurs); // ["jaune", "orange", "bleu"]
// 5. Supprimer jusqu'à la fin (index négatif : depuis la fin)
let chiffres = [1, 2, 3, 4, 5];
let fin = chiffres.splice(-2); // les 2 derniers
console.log("Fin supprimée :", fin); // [4, 5]
console.log("Reste :", chiffres); // [1, 2, 3]
// 6. Tout supprimer
let temporaire = ["a", "b", "c"];
temporaire.splice(0, temporaire.length);
console.log("Vidé :", temporaire); // []
// 7. Vider avec splice(0) : supprime tout à partir de l'index 0
let autre = ["x", "y", "z"];
autre.splice(0);
console.log("Autre vidé :", autre); // []
// 8. ⚠️ splice MODIFIE le tableau d'origine -> si le tableau est readonly, impossible
let fige = [1, 2, 3];
// fige.splice(0, 1); // ❌ Property 'splice' does not exist on type 'readonly number[]'
// 9. Version immuable (sans mutation) avec toSpliced (ES2023)
let original = ["a", "b", "c"];
let copieSansB = original.toSpliced(1, 1);
console.log("Original :", original); // ["a", "b", "c"]
console.log("Copie    :", copieSansB); // ["a", "c"]
let classe = [
    { nom: "Aita", note: 18 },
    { nom: "Moussa", note: 15 },
    { nom: "Fatou", note: 17 }
];
let index = classe.findIndex((eleve) => eleve.nom === "Moussa");
if (index !== -1) {
    let [supprime] = classe.splice(index, 1);
    console.log("Élève supprimé :", supprime?.nom);
}
console.log("Classe :", classe);
// 11. splice() vs slice()
// splice : modifie le tableau, renvoie les éléments supprimés
// slice  : ne modifie rien, renvoie une COPIE d'une portion
let nombres = [1, 2, 3, 4, 5];
let portion = nombres.slice(1, 3); // indices 1 et 2
console.log("slice :", portion); // [2, 3]
console.log("nombres intact :", nombres);
export {};
