// Interface et classe abstraite : contrat vs base partiellement implémentée
// 2. Classe abstraite : un mélange de code partagé et de membres à compléter
class FormeBase {
    // Méthode concrète : code hérité par toutes les sous-classes
    decrire() {
        return `${this.nom} : aire ${this.aire().toFixed(2)}, périmètre ${this.perimetre().toFixed(2)}`;
    }
    // Méthode concrète qui s'appuie sur une méthode abstraite
    estPlusGrandeQue(autre) {
        return this.aire() > autre.aire();
    }
}
// 3. ⚠️ Une classe abstraite ne peut PAS être instanciée
// let f = new FormeBase(); // ❌ Cannot create an instance of an abstract class
// 4. Les sous-classes complètent les membres abstraits
class Carre extends FormeBase {
    cote;
    nom = "Carré";
    constructor(cote) {
        super();
        this.cote = cote;
    }
    aire() {
        return this.cote ** 2;
    }
    perimetre() {
        return 4 * this.cote;
    }
}
class Cercle extends FormeBase {
    rayon;
    nom = "Cercle";
    constructor(rayon) {
        super();
        this.rayon = rayon;
    }
    aire() {
        return Math.PI * this.rayon ** 2;
    }
    perimetre() {
        return 2 * Math.PI * this.rayon;
    }
}
// 5. Utilisation via le contrat
let formes = [new Carre(3), new Cercle(2)];
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
class Employe {
    nom;
    salaireBase;
    constructor(nom, salaireBase) {
        this.nom = nom;
        this.salaireBase = salaireBase;
    }
    toString() {
        return `${this.nom} : ${this.salaire()} FCFA`;
    }
}
class Developpeur extends Employe {
    prime;
    constructor(nom, salaireBase, prime) {
        super(nom, salaireBase);
        this.prime = prime;
    }
    salaire() {
        return this.salaireBase + this.prime;
    }
}
class Stagiaire extends Employe {
    salaire() {
        return this.salaireBase * 0.3;
    }
}
let equipe = [
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
console.log("Compatible Forme :", carre.aire() === 16);
export {};
