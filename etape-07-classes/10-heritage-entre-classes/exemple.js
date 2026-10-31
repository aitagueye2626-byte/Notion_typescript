// Héritage entre classes : "extends", super, protected
// 1. Classe parente (base)
class Animal {
    // protected : accessible dans la classe ET dans les sous-classes (pas dehors)
    nom;
    constructor(nom) {
        this.nom = nom;
    }
    manger() {
        console.log(`${this.nom} mange.`);
    }
    // Méthode qui sera redéfinie dans les sous-classes (voir 7.11)
    crier() {
        return "...";
    }
    sePresenter() {
        return `${this.nom} dit ${this.crier()}`;
    }
}
// 2. La sous-classe hérite de TOUT ce qui est public/protected
class Chien extends Animal {
    race;
    constructor(nom, race) {
        super(nom); // 3. OBLIGATOIRE avant "this", appelle le constructeur du parent
        this.race = race;
    }
    // 4. Accès au membre protected hérité
    aboyer() {
        console.log(`${this.nom} (${this.race}) aboie : Wouf !`);
    }
    crier() {
        return "Wouf";
    }
}
class Chat extends Animal {
    constructor(nom) {
        super(nom);
    }
    crier() {
        return "Miaou";
    }
    // Accès au protected depuis la sous-classe
    dormir() {
        console.log(`${this.nom} dort.`);
    }
}
// 5. Une instance de sous-classe EST une instance du parent
let rex = new Chien("Rex", "Berger");
rex.manger(); // méthode héritée
rex.aboyer(); // méthode propre
console.log(rex.crier()); // version redéfinie
let felix = new Chat("Félix");
felix.manger();
console.log(felix.crier());
felix.dormir();
// 6. Le type parent accepte les sous-classes (polymorphisme)
let animaux = [rex, felix];
animaux.forEach((animal) => console.log(animal.sePresenter()));
// 7. instanceof : vérifier le type réel
console.log("rex instanceof Chien :", rex instanceof Chien);
console.log("rex instanceof Animal :", rex instanceof Animal);
console.log("rex instanceof Chat :", rex instanceof Chat);
// 8. protected vs private
class Parent {
    protege = "protégé";
    prive = "privé";
    lirePrive() {
        return this.prive; // ✅ dans la classe qui le déclare
    }
}
class Enfant extends Parent {
    lireProtege() {
        return this.protege; // ✅ accessible dans la sous-classe
    }
}
console.log(new Enfant().lireProtege(), new Enfant().lirePrive());
// 9. "super.methode()" pour appeler la version du parent
class Oiseau extends Animal {
    constructor(nom) {
        super(nom);
    }
    manger() {
        super.manger(); // version du parent
        console.log("... et picore des graines.");
    }
}
new Oiseau("Piaf").manger();
// 10. ⚠️ Un seul parent possible (pas d'héritage multiple en JS/TS)
//    Pour plusieurs comportements, préférer la composition ou les interfaces (7.8)
// 11. Chaîne d'héritage sur plusieurs niveaux
class Mammifere extends Animal {
    allaiter() {
        console.log(`${this.nom} allaite.`);
    }
}
class Baleine extends Mammifere {
    crier() {
        return "Chant";
    }
}
let baleine = new Baleine("Wally");
baleine.manger(); // Animal
baleine.allaiter(); // Mammifere
console.log(baleine.crier()); // Baleine
export {};
