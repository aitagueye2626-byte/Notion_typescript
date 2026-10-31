// Interface et classe concrète : "implements"

// 1. L'interface décrit le CONTRAT (ce qui doit exister), sans code
interface Serializable {
    toJSON(): string;
}

interface Entite {
    readonly id: number;
    nom: string;
    decrire(): string;
}

// 2. La classe concrète IMPLÉMENTE le contrat et fournit le code
class Utilisateur implements Entite, Serializable {
    constructor(
        public readonly id: number,
        public nom: string,
        private email: string
    ) { }

    decrire(): string {
        return `Utilisateur #${this.id} : ${this.nom}`;
    }

    toJSON(): string {
        return JSON.stringify({ id: this.id, nom: this.nom, email: this.email });
    }
}

let utilisateur = new Utilisateur(1, "Aita", "aita@exemple.com");
console.log(utilisateur.decrire());
console.log(utilisateur.toJSON());

// 3. "implements" ne génère aucun code : c'est une vérification de compilation
//    Une méthode manquante = erreur
class Incomplet implements Entite {
    constructor(public readonly id: number, public nom: string) { }

    decrire(): string {
        return this.nom;
    }
    // si on supprime decrire(), ❌ Class 'Incomplet' incorrectly implements interface 'Entite'
}
console.log(new Incomplet(2, "Moussa").decrire());

// 4. Une classe peut implémenter PLUSIEURS interfaces
interface Payable {
    payer(montant: number): void;
}

class Facture implements Entite, Payable, Serializable {
    constructor(
        public readonly id: number,
        public nom: string,
        private montant: number
    ) { }

    decrire(): string {
        return `Facture ${this.nom} (${this.montant} FCFA)`;
    }

    payer(montant: number): void {
        this.montant -= montant;
    }

    toJSON(): string {
        return JSON.stringify({ id: this.id, nom: this.nom, montant: this.montant });
    }
}

let facture = new Facture(10, "F-2024-10", 5000);
facture.payer(1500);
console.log(facture.decrire());

// 5. Programmer contre l'interface, pas contre la classe
function afficherTout(elements: Entite[]): void {
    for (const element of elements) {
        console.log(element.decrire());
    }
}
afficherTout([utilisateur, facture]);

// 6. Une instance de classe satisfait une interface par sa FORME (typage structurel)
const pseudoUtilisateur: Entite = {
    id: 99,
    nom: "Objet littéral",
    decrire: () => "Je ne suis pas une instance"
};
console.log(pseudoUtilisateur.decrire());

// 7. ⚠️ implements ne rend pas la classe "du type de l'interface" à l'exécution
console.log("instanceof Utilisateur :", utilisateur instanceof Utilisateur);
// utilisateur instanceof Entite; // ❌ une interface n'existe pas en JavaScript

// 8. L'interface ne peut PAS imposer un constructeur
// interface Constructible { constructor(); } // ❌ invalide
// -> pour cela, utiliser une signature de type "new () => T" (voir 6.2)

type Fabrique<T> = new () => T;

function creer<T>(Classe: Fabrique<T>): T {
    return new Classe();
}

class Brouillon implements Entite {
    readonly id = 0;
    nom = "brouillon";
    decrire(): string {
        return "Brouillon";
    }
}
console.log("Fabriqué :", creer(Brouillon).decrire());

// 9. Bonnes pratiques : une interface petite et ciblée vaut mieux qu'une grosse
interface Nommable {
    nom: string;
}

class Equipe implements Nommable {
    constructor(public nom: string, public membres: string[]) { }
}
console.log(new Equipe("Dev", ["Aita", "Moussa"]));
