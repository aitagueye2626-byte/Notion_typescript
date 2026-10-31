// Override : redéfinir une méthode héritée
class Employe {
    nom;
    salaireBase;
    constructor(nom, salaireBase) {
        this.nom = nom;
        this.salaireBase = salaireBase;
    }
    salaire() {
        return this.salaireBase;
    }
    // Sera redéfinie dans la sous-classe
    poste() {
        return "Employé";
    }
    // Méthode qui utilise les méthodes redéfinies (polymorphisme)
    fiche() {
        return `${this.nom} - ${this.poste()} - ${this.salaire()} FCFA`;
    }
}
class Developpeur extends Employe {
    prime;
    constructor(nom, salaireBase, prime) {
        super(nom, salaireBase);
        this.prime = prime;
    }
    // 1. Redéfinition simple : même nom, même signature
    salaire() {
        return super.salaire() + this.prime; // réutilise la version parente
    }
    poste() {
        return "Développeur";
    }
}
let dev = new Developpeur("Aita", 500_000, 80_000);
console.log(dev.fiche()); // fiche() appelle les versions REDÉFINIES
console.log("Salaire direct :", dev.salaire());
// 2. "override" est une sécurité (tsconfig noImplicitOverride)
//    Il échoue si le parent n'a PAS la méthode -> erreur de frappe détectée
// class Bug extends Employe {
//     override salaireTotal(): number { return 0; } // ❌ ne redéfinit rien
// }
// 3. Une redéfinition doit rester COMPATIBLE avec le type du parent
class Stagiaire extends Employe {
    salaire() {
        return Math.round(this.salaireBase * 0.3);
    }
}
let stagiaire = new Stagiaire("Moussa", 200_000);
console.log(stagiaire.fiche());
// 4. Polymorphisme : même appel, comportements différents
let equipe = [dev, stagiaire, new Employe("Fatou", 300_000)];
equipe.forEach((e) => console.log(e.fiche()));
// 5. Appeler explicitement la version parente
class Manager extends Employe {
    equipeTaille;
    constructor(nom, salaireBase, equipeTaille) {
        super(nom, salaireBase);
        this.equipeTaille = equipeTaille;
    }
    poste() {
        return `Manager de ${this.equipeTaille} personnes`;
    }
    fiche() {
        return `[MANAGER] ${super.fiche()}`; // ajoute un préfixe à la version parente
    }
}
console.log(new Manager("Awa", 700_000, 5).fiche());
// 6. Redéfinir un getter
class Compte {
    solde;
    constructor(solde) {
        this.solde = solde;
    }
    get description() {
        return `Solde : ${this.solde}`;
    }
}
class ComptePremium extends Compte {
    get description() {
        return `⭐ ${super.description} (premium)`;
    }
}
console.log(new ComptePremium(1500).description);
// 7. ⚠️ Redéfinir un membre protected : possible ; private : impossible
class Base {
    interne() {
        return "base";
    }
}
class Enfant extends Base {
    interne() {
        return "enfant";
    }
}
// 8. Ne PAS redéfinir un champ d'initialisation pour changer son type
// class Autre extends Base {
//     override interne = 42; // ❌ type incompatible avec la méthode
// }
// 9. Redéfinition et constructeur : le constructeur n'est PAS une redéfinition
//    il "remplace" celui du parent mais utilise super(...)
console.log("Enfant.interne() :", new Enfant().interne());
export {};
