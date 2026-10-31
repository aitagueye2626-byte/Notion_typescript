// sort() : TRIE le tableau EN PLACE (modifie le tableau d'origine)
// ⚠️ Sans fonction de comparaison, sort() trie en texte (ordre lexicographique)

// 1. Trier des chaînes (fonctionne bien par défaut)
let fruits = ["Orange", "Banane", "Mangue", "Ananas"];
fruits.sort();
console.log("Fruits triés :", fruits); // ["Ananas", "Banane", "Mangue", "Orange"]

// 2. ⚠️ PIÈGE : trier des nombres sans callback
let nombres = [10, 9, 100, 1, 25];
nombres.sort();
console.log("Tri par défaut :", nombres); // [1, 10, 100, 25, 9] ❌ comparé comme du texte !

// 3. ✅ Trier des nombres avec une fonction de comparaison
let nombres2 = [10, 9, 100, 1, 25];
nombres2.sort((a, b) => a - b);
console.log("Croissant :", nombres2); // [1, 9, 10, 25, 100]

nombres2.sort((a, b) => b - a);
console.log("Décroissant :", nombres2); // [100, 25, 10, 9, 1]

// 4. Comparateur explicite (plus lisible et généralisable)
function parOrdreCroissant(a: number, b: number): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}
console.log("Avec comparateur :", [3, 1, 2].sort(parOrdreCroissant)); // [1, 2, 3]

// 5. Trier des objets par propriété
type Eleve = { nom: string; note: number };
let classe: Eleve[] = [
    { nom: "Fatou", note: 17 },
    { nom: "Aita", note: 18 },
    { nom: "Moussa", note: 15 }
];

classe.sort((a, b) => b.note - a.note); // du meilleur au moins bon
console.log("Par note décroissante :", classe.map((e) => `${e.nom}:${e.note}`));

// 6. Trier des chaînes avec localeCompare (gère les accents)
let prenoms = ["Élodie", "Zoe", "Adama", "Éric"];
prenoms.sort((a, b) => a.localeCompare(b, "fr"));
console.log("Tri alphabétique FR :", prenoms);

// 7. Tri stable : les éléments égaux gardent leur ordre relatif
let eleves2: Eleve[] = [
    { nom: "A", note: 15 },
    { nom: "B", note: 18 },
    { nom: "C", note: 15 }
];
eleves2.sort((a, b) => b.note - a.note);
console.log("Tri stable :", eleves2.map((e) => e.nom)); // ["B", "A", "C"]

// 8. ⚠️ sort() modifie le tableau d'origine -> en copier un avant si nécessaire
let original = [3, 1, 2];
let copieTriee = [...original].sort((a, b) => a - b);
console.log("Original :", original);     // [3, 1, 2]
console.log("Copie    :", copieTriee);   // [1, 2, 3]

// 9. Version immuable avec toSorted() (ES2023)
let original2 = [3, 1, 2];
let triee = original2.toSorted((a, b) => a - b);
console.log("Original2 :", original2); // [3, 1, 2]
console.log("toSorted  :", triee);     // [1, 2, 3]

// 10. ⚠️ sort() impossible sur un tableau readonly
let fige: readonly number[] = [3, 1, 2];
// fige.sort(); // ❌ Property 'sort' does not exist on type 'readonly number[]'

// 11. Reverse : inverser l'ordre (mute aussi)
let ordre = [1, 2, 3];
ordre.reverse();
console.log("Inversé :", ordre); // [3, 2, 1]
