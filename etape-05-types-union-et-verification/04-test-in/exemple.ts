// Test de type union avec "in" : vérifier la PRÉSENCE d'une propriété

// 1. Deux types d'objets sans propriété discriminante
type Chat = {
    nom: string;
    miauler: () => void;
};

type Chien = {
    nom: string;
    aboyer: () => void;
};

type Animal = Chat | Chien;

// 2. Utiliser "in" pour réduire le type
function faireParler(animal: Animal): void {
    if ("miauler" in animal) {
        // TypeScript sait que c'est un Chat
        animal.miauler();
    } else {
        // TypeScript a déduit Chien
        animal.aboyer();
    }
}

faireParler({ nom: "Minou", miauler: () => console.log("Miaou !") });
faireParler({ nom: "Rex", aboyer: () => console.log("Wouf !") });

// 3. "in" sur des propriétés de données (pas seulement des méthodes)
type ComptePro = {
    raisonSociale: string;
    numeroTVA: string;
};

type CompteParticulier = {
    prenom: string;
    nom: string;
};

function afficherCompte(compte: ComptePro | CompteParticulier): string {
    if ("numeroTVA" in compte) {
        return `Entreprise : ${compte.raisonSociale} (TVA ${compte.numeroTVA})`;
    }
    return `Particulier : ${compte.prenom} ${compte.nom}`;
}

console.log(afficherCompte({ raisonSociale: "Aita Tech", numeroTVA: "FR123" }));
console.log(afficherCompte({ prenom: "Aita", nom: "Gueye" }));

// 4. "in" fonctionne aussi avec une propriété optionnelle
type Config = {
    mode?: "dev" | "prod";
    nom: string;
};

function decrireConfig(config: Config): string {
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
console.log("toString" in {});                        // true (hérité d'Object)
console.log(Object.prototype.hasOwnProperty.call({}, "toString")); // false

// Pour tester une propriété propre uniquement :
function aProprietePropre(obj: object, cle: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, cle);
}
console.log(aProprietePropre({ nom: "Aita" }, "nom")); // true

// 7. "in" dans une union discriminée reste utilisable, mais "type" est plus explicite
type Succes = { statut: "ok"; donnees: string[] };
type Echec = { statut: "erreur"; message: string };

function gerer(reponse: Succes | Echec): void {
    if ("donnees" in reponse) {
        console.log("Données :", reponse.donnees.length);
    } else {
        console.log("Erreur :", reponse.message);
    }
}
gerer({ statut: "ok", donnees: ["a", "b"] });
gerer({ statut: "erreur", message: "Echec" });

// 8. "in" ne remplace pas une vérification de valeur
type A = { valeur: string | number };
function verifier(a: A): void {
    // "valeur" in a est toujours true ici -> inutile
    if (typeof a.valeur === "number") {
        console.log("Nombre :", a.valeur + 1);
    } else {
        console.log("Texte :", a.valeur.toUpperCase());
    }
}
verifier({ valeur: 10 });
verifier({ valeur: "aita" });
