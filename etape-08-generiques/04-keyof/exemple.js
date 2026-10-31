// 8.4 - L'opérateur keyof et accès indexé
let champRecherche = "titre";
console.log("Champ sélectionné :", champRecherche);
// 2. Fonction générique getPropriete avec <K extends keyof T>
function getPropriete(objet, cle) {
    return objet[cle];
}
const livre = {
    id: 10,
    titre: "Guide TypeScript Complet",
    prix: 29.99,
    enStock: true
};
const titre = getPropriete(livre, "titre"); // infère string
const prix = getPropriete(livre, "prix"); // infère number
const disponible = getPropriete(livre, "enStock"); // infère boolean
console.log("Titre extrait :", titre.toUpperCase());
console.log("Prix extrait :", prix.toFixed(2), "€");
console.log("Disponibilité :", disponible ? "Oui" : "Non");
// 3. Fonction générique setPropriete avec vérification de type de la valeur
function setPropriete(objet, cle, nouvelleValeur) {
    objet[cle] = nouvelleValeur;
    console.log(`Propriété '${String(cle)}' mise à jour avec :`, nouvelleValeur);
}
setPropriete(livre, "titre", "TypeScript Avancé 2026");
setPropriete(livre, "prix", 34.5);
console.log("Livre après modifications :", livre);
// 4. Extraction des valeurs d'une liste d'objets pour une clé donnée (plucking)
function extraireColonne(liste, cle) {
    return liste.map((element) => element[cle]);
}
const inventaire = [
    { id: 1, titre: "Clavier mécanique", prix: 75, enStock: true },
    { id: 2, titre: "Écran 27 pouces", prix: 220, enStock: false },
    { id: 3, titre: "Casque audio", prix: 60, enStock: true }
];
const tousLesTitres = extraireColonne(inventaire, "titre");
const tousLesPrix = extraireColonne(inventaire, "prix");
console.log("Tous les titres :", tousLesTitres);
console.log("Tous les prix :", tousLesPrix);
// 5. Utilisation avec keyof typeof sur un objet littéral
const parametresApp = {
    version: "2.5.0",
    modeProduction: true,
    maxTentatives: 3
};
function lireParametre(cle) {
    console.log(`Paramètre ${cle} =`, parametresApp[cle]);
}
lireParametre("version");
lireParametre("maxTentatives");
export {};
