// filter() : garder UNIQUEMENT les éléments qui respectent une condition
// Renvoie un NOUVEAU tableau (ne modifie pas l'original)

let notes = [18, 9, 15, 12, 7, 17];

// 1. Garder les notes suffisantes
let admis = notes.filter((note) => note >= 10);
console.log("Notes >= 10 :", admis);      // [18, 15, 12, 17]
console.log("Original :", notes);         // inchangé

// 2. Si aucun élément ne correspond -> tableau vide
let parfaits = notes.filter((note) => note === 20);
console.log("Notes parfaites :", parfaits); // []

// 3. Le callback reçoit aussi l'index
let positionsImpaires = notes.filter((note, index) => index % 2 === 1);
console.log("Index impairs :", positionsImpaires); // [9, 12, 7]

// 4. Filtrer un tableau d'objets
type Eleve = { nom: string; note: number; classe: string };
let classe: Eleve[] = [
    { nom: "Aita", note: 18, classe: "Terminale" },
    { nom: "Moussa", note: 9, classe: "Première" },
    { nom: "Fatou", note: 15, classe: "Terminale" },
    { nom: "Ousmane", note: 12, classe: "Seconde" }
];

let terminale = classe.filter((eleve) => eleve.classe === "Terminale");
console.log("Terminale :", terminale.map((e) => e.nom));

let majors = classe.filter((eleve) => eleve.note >= 16);
console.log("Majors :", majors.map((e) => `${e.nom} (${e.note})`));

// 5. Combiner plusieurs conditions
let terminaleAdmise = classe.filter((e) => e.classe === "Terminale" && e.note >= 10);
console.log("Terminale admise :", terminaleAdmise.map((e) => e.nom));

// 6. Enchaîner filter + map + reduce
let moyenneAdmis = classe
    .filter((e) => e.note >= 10)
    .map((e) => e.note)
    .reduce((somme, note) => somme + note, 0);
console.log("Somme des notes des admis :", moyenneAdmis);

// 7. Filtrer des valeurs "falsy" (0, "", null, undefined, false, NaN)
let valeurs: (number | string | null | undefined | false)[] = [0, "Aita", "", null, 5, undefined, false, "Dakar"];
let nonVides = valeurs.filter(Boolean);
console.log("Valeurs non vides :", nonVides); // ["Aita", 5, "Dakar"]

// 8. Type guard : filter avec un prédicat typé
function estString(v: unknown): v is string {
    return typeof v === "string";
}
let seulementTextes = valeurs.filter(estString);
console.log("Textes :", seulementTextes); // ["Aita", "Dakar"]

// 9. Filtrer les doublons (via indexOf)
let doublons = [1, 2, 2, 3, 3, 3, 4];
let uniques = doublons.filter((valeur, index) => doublons.indexOf(valeur) === index);
console.log("Uniques :", uniques); // [1, 2, 3, 4]

// 10. ⚠️ filter ne modifie pas l'original et renvoie toujours un NOUVEAU tableau
console.log("Longueur originale :", classe.length); // 4
console.log("Longueur filtrée   :", terminale.length); // 2

// 11. filter sur un tableau readonly -> fonctionne et renvoie T[]
let fige: readonly number[] = [1, 2, 3, 4];
let pairs = fige.filter((n) => n % 2 === 0);
console.log("Pairs :", pairs); // [2, 4]
