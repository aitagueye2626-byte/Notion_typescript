// some() : teste si AU MOINS UN élément respecte une condition -> boolean
let notes = [18, 9, 15, 12];
// 1. Y a-t-il au moins une note >= 18 ?
let aUn18 = notes.some((note) => note >= 18);
console.log("Au moins un 18+ ?", aUn18); // true
// 2. Si aucun élément ne correspond -> false
let aUn20 = notes.some((note) => note === 20);
console.log("Au moins un 20 ?", aUn20); // false
// 3. some() s'arrête dès le premier élément qui correspond
notes.some((note) => {
    console.log("Vérifiée :", note); // affiche 18 puis s'arrête
    return note >= 18;
});
// 4. Sur un tableau vide, some() renvoie toujours false
console.log("Tableau vide :", [].some((n) => n > 0)); // false
let classe = [
    { nom: "Aita", note: 18, presence: 100 },
    { nom: "Moussa", note: 15, presence: 60 },
    { nom: "Fatou", note: 17, presence: 98 }
];
let aUnAbsent = classe.some((eleve) => eleve.presence < 75);
console.log("Un élève en difficulté d'assiduité ?", aUnAbsent); // true
let aUnEleveMajor = classe.some((eleve) => eleve.note >= 18);
console.log("Un major ?", aUnEleveMajor); // true
let tousOnt20 = classe.some((eleve) => eleve.note === 20);
console.log("Quelqu'un a 20 ?", tousOnt20); // false
// 6. some() vs every()
// some  -> AU MOINS UN doit respecter la condition
// every -> TOUS doivent respecter la condition
console.log("Tous >= 10 ?", classe.every((e) => e.note >= 10)); // true
console.log("Un < 10 ?", classe.some((e) => e.note < 10)); // false
// 7. some() vs includes() : includes compare une VALEUR, some une CONDITION
let prenoms = ["Aita", "Moussa", "Fatou"];
console.log("includes Moussa :", prenoms.includes("Moussa")); // true
console.log("some commence par F :", prenoms.some((p) => p.startsWith("F"))); // true
// 8. Vérifier si un tableau contient des doublons
function aDesDoublons(tableau) {
    return tableau.some((element, index) => tableau.indexOf(element) !== index);
}
console.log("Doublons ?", aDesDoublons([1, 2, 2])); // true
console.log("Doublons ?", aDesDoublons([1, 2, 3])); // false
// 9. Cas concret : vérifier un formulaire avant envoi
let champs = ["Aita", "Dakar", ""];
let aUnChampVide = champs.some((champ) => champ.trim() === "");
if (aUnChampVide) {
    console.log("Formulaire invalide : un champ est vide");
}
export {};
