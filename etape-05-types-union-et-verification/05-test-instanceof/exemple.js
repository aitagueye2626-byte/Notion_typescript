// Test de type union avec instanceof : réduire une union de CLASSES
// 1. Deux classes sans lien d'héritage
class Voiture {
    marque;
    portes;
    constructor(marque, portes) {
        this.marque = marque;
        this.portes = portes;
    }
    klaxonner() {
        console.log("Pouet !");
    }
}
class Bateau {
    nom;
    longueur;
    constructor(nom, longueur) {
        this.nom = nom;
        this.longueur = longueur;
    }
    naviguer() {
        console.log("Je navigue...");
    }
}
// 2. instanceof réduit le type à la classe correspondante
function decrire(vehicule) {
    if (vehicule instanceof Voiture) {
        // Ici TypeScript sait que vehicule est une Voiture
        console.log(`Voiture ${vehicule.marque} à ${vehicule.portes} portes`);
        vehicule.klaxonner();
    }
    else {
        // Ici TypeScript a déduit Bateau
        console.log(`Bateau ${vehicule.nom} de ${vehicule.longueur} m`);
        vehicule.naviguer();
    }
}
decrire(new Voiture("Toyota", 5));
decrire(new Bateau("Le Teranga", 12));
// 3. instanceof avec des classes natives
function afficherErreur(erreur) {
    if (erreur instanceof Error) {
        return `Erreur : ${erreur.message}`;
    }
    if (erreur instanceof TypeError) {
        return `Erreur de type : ${erreur.message}`;
    }
    return "Erreur inconnue";
}
console.log(afficherErreur(new Error("Problème")));
console.log(afficherErreur(new TypeError("Type invalide")));
console.log(afficherErreur("texte simple"));
// 4. instanceof avec les types natifs
function decrireValeur(valeur) {
    if (valeur instanceof Date) {
        return `Année : ${valeur.getFullYear()}`;
    }
    // TypeScript a éliminé Date ; il reste Map | string[] -> Array.isArray tranche
    if (Array.isArray(valeur)) {
        return `Tableau de ${valeur.length} éléments`;
    }
    return `Map de ${valeur.size} entrées`;
}
console.log(decrireValeur(new Date()));
console.log(decrireValeur(["Aita", "Moussa"]));
console.log(decrireValeur(new Map([["Aita", 18]])));
// Sur une Map, instanceof fonctionne aussi (variable dédiée pour le typage)
let dictionnaire = new Map();
if (dictionnaire instanceof Map) {
    console.log("Map vide, taille :", dictionnaire.size);
}
function aireForme(forme) {
    if (forme.type === "cercle")
        return forme.aire();
    return forme.aire();
}
console.log(aireForme({ type: "cercle", rayon: 2, aire: () => Math.PI * 4 }));
// 6. instanceof avec l'héritage : vérifie TOUTE la chaîne de prototypes
class Animal {
    nom;
    constructor(nom) {
        this.nom = nom;
    }
}
class Mammifere extends Animal {
}
class Chien2 extends Mammifere {
}
let rex = new Chien2("Rex");
console.log("Chien2 instanceof Chien2    :", rex instanceof Chien2); // true
console.log("Chien2 instanceof Mammifere :", rex instanceof Mammifere); // true
console.log("Chien2 instanceof Animal    :", rex instanceof Animal); // true
console.log("Chien2 instanceof Object    :", rex instanceof Object); // true
// 7. instanceof vs typeof vs Array.isArray
console.log("[] instanceof Array :", [] instanceof Array); // true
console.log("typeof []           :", typeof []); // "object"
console.log("Array.isArray([])   :", Array.isArray([])); // true
// 8. instanceof sur un objet venant du JSON -> false (pas d'instance)
let objetJson = JSON.parse('{"marque":"Toyota","portes":5}');
console.log("Objet JSON instanceof Voiture :", objetJson instanceof Voiture); // false
// 9. Pattern : garde de type personnalisée
function estVoiture(v) {
    return v instanceof Voiture;
}
let inconnu = new Voiture("Toyota", 4);
if (estVoiture(inconnu)) {
    console.log("Marque :", inconnu.marque);
}
export {};
