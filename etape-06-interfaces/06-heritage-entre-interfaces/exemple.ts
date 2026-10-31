// Héritage entre interfaces : extends

// 1. Interface de base
interface Animal {
    nom: string;
    age: number;

    manger(): void;
}

// 2. Une interface qui hérite de Animal
interface Chien extends Animal {
    race: string;

    aboyer(): void;
}

// 3. Un Chien possède TOUTES les propriétés de Animal + les siennes
let rex: Chien = {
    nom: "Rex",
    age: 3,
    race: "Berger",
    manger: () => console.log("Rex mange"),
    aboyer: () => console.log("Wouf !")
};

rex.manger();          // hérité
rex.aboyer();          // propre
console.log(rex.nom, rex.race);

// 4. ⚠️ Il manque une propriété héritée -> erreur
// let incomplet: Chien = { nom: "Rex", race: "Berger" }; // ❌ age, manger manquants

// 5. Hériter de PLUSIEURS interfaces
interface Volant {
    voler(): void;
}

interface Nageant {
    nager(): void;
}

interface Canard extends Volant, Nageant {
    nom: string;
}

let donald: Canard = {
    nom: "Donald",
    voler: () => console.log("Je vole"),
    nager: () => console.log("Je nage")
};
donald.voler();
donald.nager();

// 6. Chaîne d'héritage sur plusieurs niveaux
interface EtreVivant {
    id: number;
}

interface Personne extends EtreVivant {
    nom: string;
}

interface Etudiant extends Personne {
    matricule: string;
}

let etudiant: Etudiant = {
    id: 1,
    nom: "Aita",
    matricule: "MAT-001"
};
console.log("Étudiant :", etudiant);

// 7. Une interface peut redéfinir (restreindre) une propriété héritée
interface Vehicule {
    moteur: string;
}

interface Voiture extends Vehicule {
    moteur: "essence" | "diesel" | "electrique"; // plus précis (sous-type de string)
}

let voiture: Voiture = { moteur: "electrique" };
console.log("Moteur :", voiture.moteur);

// ⚠️ Redéfinir avec un type INCOMPATIBLE est refusé
// interface Avion extends Vehicule { moteur: number; } // ❌ string vs number

// 8. Redéfinir une propriété optionnelle en obligatoire
interface ConfigBase {
    mode?: "dev" | "prod";
}

interface ConfigProd extends ConfigBase {
    mode: "prod"; // devient obligatoire
}
let config: ConfigProd = { mode: "prod" };
console.log("Config :", config);

// 9. Ajouter une méthode et hériter des existantes
interface Compte {
    id: number;
    fermer(): void;
}

interface ComptePremium extends Compte {
    fonctionnalites: string[];
}

let premium: ComptePremium = {
    id: 1,
    fermer: () => console.log("Compte fermé"),
    fonctionnalites: ["export", "stats"]
};
premium.fermer();
console.log("Fonctionnalités :", premium.fonctionnalites);

// 10. Héritage vs intersection : le résultat est similaire
interface Base { id: number; }
type Etendu = Base & { nom: string };

let viaType: Etendu = { id: 1, nom: "Aita" };
console.log("Via type :", viaType);
// Différence : extends signale les conflits, & les rend silencieusement "never"
