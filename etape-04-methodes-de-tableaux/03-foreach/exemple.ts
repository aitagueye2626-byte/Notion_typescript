// forEach() : exécuter une action sur CHAQUE élément du tableau

let fruits = ["Mangue", "Banane", "Orange"];

// 1. Afficher chaque élément
fruits.forEach((fruit) => {
    console.log("Fruit :", fruit);
});

// 2. Le callback reçoit aussi l'index et le tableau complet
fruits.forEach((fruit, index, tableau) => {
    console.log(`${index + 1}. ${fruit} (sur ${tableau.length})`);
});

// 3. ⚠️ forEach() renvoie TOUJOURS undefined
let resultat = fruits.forEach((fruit) => fruit.toUpperCase());
console.log("Retour de forEach :", resultat); // undefined
// -> pour transformer, utiliser map()

let majuscules = fruits.map((fruit) => fruit.toUpperCase());
console.log("Avec map :", majuscules);

// 4. Calculer une somme avec forEach (mais reduce est préférable)
let notes = [18, 15, 17, 12];
let total = 0;
notes.forEach((note) => {
    total += note;
});
console.log("Total :", total); // 62

let totalAvecReduce = notes.reduce((somme, note) => somme + note, 0);
console.log("Avec reduce :", totalAvecReduce);

// 5. Accumuler dans un tableau extérieur
let majeurs: number[] = [];
notes.forEach((note) => {
    if (note >= 15) majeurs.push(note);
});
console.log("Notes >= 15 :", majeurs);

// 6. ⚠️ on ne peut PAS arrêter un forEach (break / return ne fonctionne pas)
//    return sort seulement du callback courant, pas de la boucle
notes.forEach((note) => {
    if (note < 15) {
        return; // continue quand même avec les éléments suivants
    }
    console.log("Note suffisante :", note);
});

// Pour s'arrêter, utiliser for...of avec break
for (const note of notes) {
    if (note < 15) break;
    console.log("for...of :", note);
}

// 7. Parcourir un tableau d'objets
type Eleve = { nom: string; note: number };
let classe: Eleve[] = [
    { nom: "Aita", note: 18 },
    { nom: "Moussa", note: 15 },
    { nom: "Fatou", note: 17 }
];

classe.forEach(({ nom, note }) => {
    console.log(`${nom} a eu ${note}/20`);
});

// 8. forEach ne traite pas les "trous" d'un tableau creux
let creux: (number | undefined)[] = [1, , 3];
creux.forEach((v) => console.log("Valeur :", v)); // 1 puis 3 (pas de undefined)

// 9. forEach vs les autres méthodes
// forEach -> effectuer une action (effet de bord), retourne undefined
// map     -> transformer chaque élément, retourne un nouveau tableau
// filter  -> garder certains éléments, retourne un nouveau tableau
// some/every -> tester, retourne un boolean
// reduce  -> condenser en une valeur
