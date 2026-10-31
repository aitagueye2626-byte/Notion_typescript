// Test de type union avec "in" : vérifier la PRÉSENCE d'une propriété
// 2. Utiliser "in" pour réduire le type
function faireParler(animal) {
    if ("miauler" in animal) {
        // TypeScript sait que c'est un Chat
        animal.miauler();
    }
    else {
        // TypeScript a déduit Chien
        animal.aboyer();
    }
}
faireParler({ nom: "Minou", miauler: () => console.log("Miaou !") });
faireParler({ nom: "Rex", aboyer: () => console.log("Wouf !") });
function afficherCompte(compte) {
    if ("numeroTVA" in compte) {
        return `Entreprise : ${compte.raisonSociale} (TVA ${compte.numeroTVA})`;
    }
    return `Particulier : ${compte.prenom} ${compte.nom}`;
}
console.log(afficherCompte({ raisonSociale: "Aita Tech", numeroTVA: "FR123" }));
console.log(afficherCompte({ prenom: "Aita", nom: "Gueye" }));
function decrireConfig(config) {
    if ("mode" in config) {
        // Ici "mode" existe dans le type, mais il peut valoir undefined
        return `Mode : ${config.mode ?? "non défini"}`;
    }
    return "Aucun mode";
}
console.log(decrireConfig({ nom: "app" }));
console.log(decrireConfig({ nom: "app", mode: "prod" }));
// 5. ⚠️ "in" vérifie l'existence de la propriété, pas sa valeur
let objet = { nom: "Aita", age: undefined };
console.log("age" in objet); // true (la propriété existe, même à undefined)
// 6. "in" vs hasOwnProperty
// "in" cherche aussi dans la chaîne de prototypes
console.log("toString" in {}); // true (hérité d'Object)
console.log(Object.prototype.hasOwnProperty.call({}, "toString")); // false
// Pour tester une propriété propre uniquement :
function aProprietePropre(obj, cle) {
    return Object.prototype.hasOwnProperty.call(obj, cle);
}
console.log(aProprietePropre({ nom: "Aita" }, "nom")); // true
function gerer(reponse) {
    if ("donnees" in reponse) {
        console.log("Données :", reponse.donnees.length);
    }
    else {
        console.log("Erreur :", reponse.message);
    }
}
gerer({ statut: "ok", donnees: ["a", "b"] });
gerer({ statut: "erreur", message: "Echec" });
function verifier(a) {
    // "valeur" in a est toujours true ici -> inutile
    if (typeof a.valeur === "number") {
        console.log("Nombre :", a.valeur + 1);
    }
    else {
        console.log("Texte :", a.valeur.toUpperCase());
    }
}
verifier({ valeur: 10 });
verifier({ valeur: "aita" });
export {};
