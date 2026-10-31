// concat() : FUSIONNER deux (ou plusieurs) tableaux sans modifier les originaux

let fruits = ["Mangue", "Banane"];
let legumes = ["Carotte", "Tomate"];

// 1. Fusion simple
let courses = fruits.concat(legumes);
console.log("Courses :", courses);

// 2. Les tableaux d'origine ne sont PAS modifiés
console.log("Fruits :", fruits);
console.log("Légumes :", legumes);

// 3. Fusionner plusieurs tableaux d'un coup
let epicerie = fruits.concat(legumes, ["Riz"], ["Huile"]);
console.log("Épicerie :", epicerie);

// 4. Ajouter des éléments simples (pas seulement des tableaux)
let fruitsPlus = fruits.concat("Orange", "Papaye");
console.log("Fruits+ :", fruitsPlus);

// 5. concat() accepte un tableau en lecture seule
let notesFixes: readonly number[] = [18, 15];
let toutesLesNotes = notesFixes.concat([17, 12]);
console.log("Notes :", toutesLesNotes);

// 6. Équivalent moderne avec le spread operator (plus lisible)
let coursesAvecSpread = [...fruits, ...legumes];
console.log("Avec spread :", coursesAvecSpread);

// 7. Difference : concat APLATIT un niveau de tableaux passés en argument,
//    mais pas les tableaux imbriqués dans le tableau d'origine
let imbrique: (number | number[])[] = [1, 2];
let resultat = imbrique.concat([[3, 4], [5]]);
console.log("Imbriqué :", resultat); // [1, 2, [3, 4], [5]]
console.log("Aplati  :", resultat.flat()); // [1, 2, 3, 4, 5]

// 8. Cas concret : ajouter un élément à un tableau typé sans le muter
type Eleve = { nom: string; note: number };
let classe: Eleve[] = [{ nom: "Aita", note: 18 }];

let nouvelleClasse: Eleve[] = classe.concat({ nom: "Moussa", note: 15 });
console.log("Classe originale :", classe);
console.log("Nouvelle classe  :", nouvelleClasse);
