// Interface et classe concrète : "implements"
// 2. La classe concrète IMPLÉMENTE le contrat et fournit le code
class Utilisateur {
    id;
    nom;
    email;
    constructor(id, nom, email) {
        this.id = id;
        this.nom = nom;
        this.email = email;
    }
    decrire() {
        return `Utilisateur #${this.id} : ${this.nom}`;
    }
    toJSON() {
        return JSON.stringify({ id: this.id, nom: this.nom, email: this.email });
    }
}
let utilisateur = new Utilisateur(1, "Aita", "aita@exemple.com");
console.log(utilisateur.decrire());
console.log(utilisateur.toJSON());
// 3. "implements" ne génère aucun code : c'est une vérification de compilation
//    Une méthode manquante = erreur
class Incomplet {
    id;
    nom;
    constructor(id, nom) {
        this.id = id;
        this.nom = nom;
    }
    decrire() {
        return this.nom;
    }
}
console.log(new Incomplet(2, "Moussa").decrire());
class Facture {
    id;
    nom;
    montant;
    constructor(id, nom, montant) {
        this.id = id;
        this.nom = nom;
        this.montant = montant;
    }
    decrire() {
        return `Facture ${this.nom} (${this.montant} FCFA)`;
    }
    payer(montant) {
        this.montant -= montant;
    }
    toJSON() {
        return JSON.stringify({ id: this.id, nom: this.nom, montant: this.montant });
    }
}
let facture = new Facture(10, "F-2024-10", 5000);
facture.payer(1500);
console.log(facture.decrire());
// 5. Programmer contre l'interface, pas contre la classe
function afficherTout(elements) {
    for (const element of elements) {
        console.log(element.decrire());
    }
}
afficherTout([utilisateur, facture]);
// 6. Une instance de classe satisfait une interface par sa FORME (typage structurel)
const pseudoUtilisateur = {
    id: 99,
    nom: "Objet littéral",
    decrire: () => "Je ne suis pas une instance"
};
console.log(pseudoUtilisateur.decrire());
// 7. ⚠️ implements ne rend pas la classe "du type de l'interface" à l'exécution
console.log("instanceof Utilisateur :", utilisateur instanceof Utilisateur);
function creer(Classe) {
    return new Classe();
}
class Brouillon {
    id = 0;
    nom = "brouillon";
    decrire() {
        return "Brouillon";
    }
}
console.log("Fabriqué :", creer(Brouillon).decrire());
class Equipe {
    nom;
    membres;
    constructor(nom, membres) {
        this.nom = nom;
        this.membres = membres;
    }
}
console.log(new Equipe("Dev", ["Aita", "Moussa"]));
export {};
