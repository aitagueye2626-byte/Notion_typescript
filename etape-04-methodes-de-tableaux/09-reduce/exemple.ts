// reduce() : condenser un tableau en UNE SEULE valeur (somme, max, objet, etc.)

// Signature : tableau.reduce((accumulateur, element) => nouveauAccumulateur, valeurInitiale)

let notes = [18, 15, 17, 12];

// 1. Somme des notes
let total = notes.reduce((somme, note) => somme + note, 0);
console.log("Total :", total);

// 2. Moyenne
let moyenne = notes.reduce((somme, note) => somme + note, 0) / notes.length;
console.log("Moyenne :", moyenne.toFixed(2));

// 3. Maximum
let max = notes.reduce((plusGrande, note) => (note > plusGrande ? note : plusGrande), 0);
console.log("Meilleure note :", max);

// 4. Concaténer des textes
let mots = ["Bonjour", " ", "Aita", "!"];
let phrase = mots.reduce((texte, mot) => texte + mot, "");
console.log("Phrase :", phrase);

// 5. Compter des occurrences (accumulateur = objet)
let fruits = ["mangue", "banane", "mangue", "orange", "banane", "mangue"];
let compteur = fruits.reduce<Record<string, number>>((acc, fruit) => {
    acc[fruit] = (acc[fruit] ?? 0) + 1;
    return acc;
}, {});
console.log("Compteur :", compteur);

// 6. Transformer un tableau d'objets en objet indexé par une clé
type Eleve = { nom: string; note: number };
let classe: Eleve[] = [
    { nom: "Aita", note: 18 },
    { nom: "Moussa", note: 15 },
    { nom: "Fatou", note: 17 }
];

let parNom = classe.reduce<Record<string, number>>((acc, eleve) => {
    acc[eleve.nom] = eleve.note;
    return acc;
}, {});
console.log("Notes par nom :", parNom);
console.log("Note de Fatou :", parNom["Fatou"]);

// 7. Grouper par catégorie (accumulateur = objet de tableaux)
let groupes = classe.reduce<Record<string, string[]>>((acc, eleve) => {
    let categorie = eleve.note >= 16 ? "excellent" : "bien";
    (acc[categorie] ??= []).push(eleve.nom);
    return acc;
}, {});
console.log("Groupes :", groupes);

// 8. Aplatir un tableau de tableaux
let listes = [[1, 2], [3, 4], [5]];
let aplat = listes.reduce<number[]>((acc, liste) => acc.concat(liste), []);
console.log("Aplati :", aplat);

// 9. ⚠️ Sans valeur initiale, le premier élément sert d'accumulateur :
//    - sur un tableau vide, reduce() lance une TypeError
//    - le type de retour peut être différent de T[]
try {
    ([] as number[]).reduce((a, b) => a + b);
} catch (erreur) {
    console.log("Erreur sans valeur initiale :", (erreur as Error).message);
}

// 10. Toujours fournir la valeur initiale -> pas d'erreur, type explicite
let sommeVide = ([] as number[]).reduce((somme, n) => somme + n, 0);
console.log("Somme d'un tableau vide :", sommeVide);
