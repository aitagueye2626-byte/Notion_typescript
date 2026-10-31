// find() : renvoie le PREMIER élément qui respecte une condition (ou undefined)

let eleves = [
    { nom: "Aita", note: 18, classe: "Terminale" },
    { nom: "Moussa", note: 9, classe: "Première" },
    { nom: "Fatou", note: 15, classe: "Terminale" },
    { nom: "Ousmane", note: 12, classe: "Seconde" }
];

// 1. Trouver un élève par son nom
let aita = eleves.find((eleve) => eleve.nom === "Aita");
console.log("Aita trouvée :", aita);

// 2. Le premier élément qui respecte une condition (pas tous !)
let premierTerminale = eleves.find((eleve) => eleve.classe === "Terminale");
console.log("Premier de Terminale :", premierTerminale?.nom);

// 3. Si aucun élément ne correspond -> undefined
let introuvable = eleves.find((eleve) => eleve.nom === "Seydou");
console.log("Seydou :", introuvable); // undefined

// 4. ⚠️ find renvoie T | undefined : avec "strict", il faut vérifier avant d'utiliser
// console.log(introuvable.nom);  // ❌ Object is possibly 'undefined'
if (introuvable) {
    console.log("Nom :", introuvable.nom);
} else {
    console.log("Aucun élève trouvé");
}

// 5. La version courte avec le chaînage optionnel et ??
let nomTrouve = eleves.find((e) => e.note >= 15)?.nom ?? "Aucun";
console.log("Premier élève avec 15+ :", nomTrouve);

// 6. Différence importante avec filter()
// find  -> renvoie UN élément (T | undefined)
// filter -> renvoie un TABLEAU (T[]) même s'il n'y a qu'un élément
let tousLesTerminale = eleves.filter((eleve) => eleve.classe === "Terminale");
console.log("find  ->", premierTerminale);
console.log("filter ->", tousLesTerminale);

// 7. find ne modifie pas le tableau d'origine
console.log("Tableau original intact :", eleves.length, "élèves");

// 8. Cas concret : chercher une valeur dans un tableau simple
let notes = [8, 12, 15, 9];
let premiereNoteSuffisante = notes.find((note) => note >= 10);
console.log("Première note >= 10 :", premiereNoteSuffisante);

// 9. findIndex() : même principe mais renvoie la POSITION (ou -1)
let position = eleves.findIndex((eleve) => eleve.nom === "Fatou");
console.log("Position de Fatou :", position);
