// Interface et classe abstraite : contrat vs base partiellement implémentée

// 1. Interface : aucun code, tout est à écrire
interface Forme {
    readonly nom: string;
    aire(): number;
    perimetre(): number;
}

// 2. Classe abstraite : un mélange de code partagé et de membres à compléter
abstract class FormeBase implements Forme {
    abstract readonly nom: string;

    // Méthode abstraite : signature imposée, aucun corps
    abstract aire(): number;

    // Méthode concrète : code hérité par toutes les sous-classes
    decrire(): string {
        return `${this.nom} : aire ${this.aire().toFixed(2)}, périmètre ${this.perimetre().toFixed(2)}`;
    }

    // Signature abstraite réutilisable par les sous-classes
    abstract perimetre(): number;

    // Méthode concrète qui s'appuie sur une méthode abstraite
    estPlusGrandeQue(autre: Forme): boolean {
        return this.aire() > autre.aire();
    }
}

// 3. ⚠️ Une classe abstraite ne peut PAS être instanciée
// let f = new FormeBase(); // ❌ Cannot create an instance of an abstract class

// 4. Les sous-classes complètent les membres abstraits
class Carre extends FormeBase {
    readonly nom = "Carré";

    constructor(private readonly cote: number) {
        super();
    }

    aire(): number {
        return this.cote ** 2;
    }

    perimetre(): number {
        return 4 * this.cote;
    }
}

class Cercle extends FormeBase {
    readonly nom = "Cercle";

    constructor(private readonly rayon: number) {
        super();
    }

    aire(): number {
        return Math.PI * this.rayon ** 2;
    }

    perimetre(): number {
        return 2 * Math.PI * this.rayon;
    }
}

// 5. Utilisation via le contrat
let formes: Forme[] = [new Carre(3), new Cercle(2)];
for (const forme of formes) {
    console.log(forme.aire().toFixed(2)); // méthode imposée par l'interface
}

// 6. Utilisation via la base (méthodes partagées)
console.log(new Carre(3).decrire());
console.log(new Cercle(2).decrire());
console.log("Carré plus grand que cercle ?", new Carre(3).estPlusGrandeQue(new Cercle(2)));

// 7. Une sous-classe qui oublie un membre abstrait = erreur
// class Incomplet extends FormeBase {
//     readonly nom = "Incomplet";
//     // ❌ Non-abstract class 'Incomplet' does not implement inherited abstract member 'aire'
// }

// 8. Une classe abstraite peut avoir un constructeur (partagé)
abstract class Employe {
    constructor(public nom: string, protected salaireBase: number) { }

    abstract salaire(): number;

    toString(): string {
        return `${this.nom} : ${this.salaire()} FCFA`;
    }
}

class Developpeur extends Employe {
    constructor(nom: string, salaireBase: number, private prime: number) {
        super(nom, salaireBase);
    }

    salaire(): number {
        return this.salaireBase + this.prime;
    }
}

class Stagiaire extends Employe {
    salaire(): number {
        return this.salaireBase * 0.3;
    }
}

let equipe: Employe[] = [
    new Developpeur("Aita", 500_000, 50_000),
    new Stagiaire("Moussa", 200_000)
];
equipe.forEach((employe) => console.log(employe.toString()));

// 9. Interface vs classe abstraite : quand choisir ?
// - interface  : contrat pur, plusieurs implémentations sans code partagé, implémentable plusieurs fois
// - abstraite  : code partagé + membres à compléter, un seul héritage possible
// - combiner   : abstraite "implements" une interface -> contrat public + base commune

// 10. Une sous-classe est bien une instance de la base et du type interface
let carre = new Carre(4);
console.log("instanceof Carre :", carre instanceof Carre);
console.log("instanceof FormeBase :", carre instanceof FormeBase);
console.log("Compatible Forme :", (carre as Forme).aire() === 16);
