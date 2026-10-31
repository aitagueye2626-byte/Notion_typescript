// every() : teste si TOUS les éléments respectent une condition -> boolean

let notes = [18, 15, 17, 12];

// 1. Tous les élèves ont-ils la moyenne ?
let tousAdmis = notes.every((note) => note >= 10);
console.log("Tous ont la moyenne ?", tousAdmis); // true

// 2. Une seule note insuffisante suffit à rendre every() faux
let notesAvecEchec = [18, 9, 17];
let tousAdmis2 = notesAvecEchec.every((note) => note >= 10);
console.log("Avec un 9, tous admis ?", tousAdmis2); // false

// 3. every() s'arrête dès le premier élément qui échoue
notesAvecEchec.every((note) => {
    console.log("Vérifiée :", note); // affiche 18 puis 9, s'arrête là
    return note >= 10;
});

// 4. Sur un tableau vide, every() renvoie toujours true
//    (aucun élément ne contredit la condition)
console.log("Tableau vide :", [].every((n: number) => n > 100)); // true

// 5. Cas concrets avec des objets
type Eleve = { nom: string; note: number; presence: number };

let classe: Eleve[] = [
    { nom: "Aita", note: 18, presence: 100 },
    { nom: "Moussa", note: 15, presence: 95 },
    { nom: "Fatou", note: 17, presence: 98 }
];

let tousPresents = classe.every((eleve) => eleve.presence >= 90);
console.log("Tous à 90% de présence ?", tousPresents);

let tousMajeur = classe.every((eleve) => eleve.note >= 10);
console.log("Tous majeurs ?", tousMajeur);

// 6. every() vs some()
// every -> TOUS doivent respecter la condition
// some  -> AU MOINS UN doit la respecter
let auMoinsUnAvec18 = classe.some((eleve) => eleve.note === 18);
console.log("Au moins un 18 ?", auMoinsUnAvec18);

// 7. Utiliser every pour valider un formulaire (tableau de conditions)
let champsRemplis = ["Aita", "Dakar", "21"];
let formulaireValide = champsRemplis.every((champ) => champ.trim().length > 0);
console.log("Formulaire valide ?", formulaireValide);
