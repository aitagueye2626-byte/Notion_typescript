// indexOf() : renvoie la PREMIÈRE position d'un élément dans le tableau (ou -1)

let fruits = ["Mangue", "Banane", "Orange", "Mangue"];

// 1. Trouver la position d'un élément
console.log("Mangue :", fruits.indexOf("Mangue"));   // 0 (première occurrence)
console.log("Orange :", fruits.indexOf("Orange"));   // 2

// 2. Si l'élément n'existe pas -> -1
console.log("Ananas :", fruits.indexOf("Ananas"));   // -1

// 3. Recherche à partir d'un index donné (2e argument)
//    On retrouve la 2e occurrence de "Mangue" en repartant de l'index 1
console.log("2e Mangue :", fruits.indexOf("Mangue", 1)); // 3

// 4. Utiliser indexOf pour tester la présence d'un élément
if (fruits.indexOf("Banane") !== -1) {
    console.log("La banane est dans la liste");
}

// 5. ⚠️ Préférer includes() pour un simple test d'existence (plus lisible)
console.log("includes :", fruits.includes("Banane")); // true

// 6. Attention : indexOf utilise === (comparaison stricte)
let notes = [10, 20, 30];
console.log("20 (number) :", notes.indexOf(20));   // 1
// console.log(notes.indexOf("20"));               // ❌ erreur de type (string vs number)

// 7. Les objets sont comparés par RÉFÉRENCE, pas par contenu
type Eleve = { nom: string; note: number };
let eleves: Eleve[] = [
    { nom: "Aita", note: 18 },
    { nom: "Moussa", note: 15 }
];

let recherche = { nom: "Aita", note: 18 };
console.log("Même contenu :", eleves.indexOf(recherche)); // -1 ❌ ce n'est pas le même objet
console.log("Même objet  :", eleves.indexOf(eleves[0]));  // 0  ✅

// 8. Pour chercher un objet par une propriété, utiliser findIndex()
let index = eleves.findIndex((e) => e.nom === "Aita");
console.log("findIndex Aita :", index); // 0

// 9. indexOf vs findIndex vs includes
// indexOf(valeur)     -> position d'une valeur (primitif) ou -1
// findIndex(callback) -> position du premier élément qui respecte une condition, ou -1
// includes(valeur)    -> boolean (true/false)

// 10. NaN ne se trouve pas avec indexOf (car NaN !== NaN)
let valeurs = [1, NaN, 3];
console.log("indexOf(NaN) :", valeurs.indexOf(NaN)); // -1 ❌
console.log("findIndex(NaN) :", valeurs.findIndex((v) => Number.isNaN(v))); // 1 ✅

// 11. Supprimer un élément trouvé par indexOf
let prenoms = ["Aita", "Moussa", "Fatou"];
let position = prenoms.indexOf("Moussa");
if (position !== -1) {
    prenoms.splice(position, 1);
}
console.log("Après suppression :", prenoms); // ["Aita", "Fatou"]
