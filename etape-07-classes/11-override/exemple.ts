// Override : redéfinir une méthode héritée

class Employe {
    constructor(
        public nom: string,
        protected salaireBase: number
    ) { }

    salaire(): number {
        return this.salaireBase;
    }

    // Sera redéfinie dans la sous-classe
    poste(): string {
        return "Employé";
    }

    // Méthode qui utilise les méthodes redéfinies (polymorphisme)
    fiche(): string {
        return `${this.nom} - ${this.poste()} - ${this.salaire()} FCFA`;
    }
}

class Developpeur extends Employe {
    constructor(nom: string, salaireBase: number, private prime: number) {
        super(nom, salaireBase);
    }

    // 1. Redéfinition simple : même nom, même signature
    override salaire(): number {
        return super.salaire() + this.prime; // réutilise la version parente
    }

    override poste(): string {
        return "Développeur";
    }
}

let dev = new Developpeur("Aita", 500_000, 80_000);
console.log(dev.fiche());           // fiche() appelle les versions REDÉFINIES
console.log("Salaire direct :", dev.salaire());

// 2. "override" est une sécurité (tsconfig noImplicitOverride)
//    Il échoue si le parent n'a PAS la méthode -> erreur de frappe détectée
// class Bug extends Employe {
//     override salaireTotal(): number { return 0; } // ❌ ne redéfinit rien
// }

// 3. Une redéfinition doit rester COMPATIBLE avec le type du parent
class Stagiaire extends Employe {
    override salaire(): number {
        return Math.round(this.salaireBase * 0.3);
    }

    // override salaire(): string { ... } // ❌ Type 'string' is not assignable to type 'number'
}

let stagiaire = new Stagiaire("Moussa", 200_000);
console.log(stagiaire.fiche());

// 4. Polymorphisme : même appel, comportements différents
let equipe: Employe[] = [dev, stagiaire, new Employe("Fatou", 300_000)];
equipe.forEach((e) => console.log(e.fiche()));

// 5. Appeler explicitement la version parente
class Manager extends Employe {
    constructor(nom: string, salaireBase: number, private equipeTaille: number) {
        super(nom, salaireBase);
    }

    override poste(): string {
        return `Manager de ${this.equipeTaille} personnes`;
    }

    override fiche(): string {
        return `[MANAGER] ${super.fiche()}`; // ajoute un préfixe à la version parente
    }
}
console.log(new Manager("Awa", 700_000, 5).fiche());

// 6. Redéfinir un getter
class Compte {
    constructor(protected solde: number) { }

    get description(): string {
        return `Solde : ${this.solde}`;
    }
}

class ComptePremium extends Compte {
    override get description(): string {
        return `⭐ ${super.description} (premium)`;
    }
}
console.log(new ComptePremium(1500).description);

// 7. ⚠️ Redéfinir un membre protected : possible ; private : impossible
class Base {
    protected interne(): string {
        return "base";
    }
}
class Enfant extends Base {
    override interne(): string {
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
