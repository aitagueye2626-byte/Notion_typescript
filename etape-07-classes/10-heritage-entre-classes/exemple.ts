// Héritage entre classes : "extends", super, protected

// 1. Classe parente (base)
class Animal {
    // protected : accessible dans la classe ET dans les sous-classes (pas dehors)
    protected nom: string;

    constructor(nom: string) {
        this.nom = nom;
    }

    manger(): void {
        console.log(`${this.nom} mange.`);
    }

    // Méthode qui sera redéfinie dans les sous-classes (voir 7.11)
    crier(): string {
        return "...";
    }

    sePresenter(): string {
        return `${this.nom} dit ${this.crier()}`;
    }
}

// 2. La sous-classe hérite de TOUT ce qui est public/protected
class Chien extends Animal {
    private race: string;

    constructor(nom: string, race: string) {
        super(nom); // 3. OBLIGATOIRE avant "this", appelle le constructeur du parent
        this.race = race;
    }

    // 4. Accès au membre protected hérité
    aboyer(): void {
        console.log(`${this.nom} (${this.race}) aboie : Wouf !`);
    }

    override crier(): string {
        return "Wouf";
    }
}

class Chat extends Animal {
    constructor(nom: string) {
        super(nom);
    }

    override crier(): string {
        return "Miaou";
    }

    // Accès au protected depuis la sous-classe
    dormir(): void {
        console.log(`${this.nom} dort.`);
    }
}

// 5. Une instance de sous-classe EST une instance du parent
let rex = new Chien("Rex", "Berger");
rex.manger();     // méthode héritée
rex.aboyer();     // méthode propre
console.log(rex.crier()); // version redéfinie

let felix = new Chat("Félix");
felix.manger();
console.log(felix.crier());
felix.dormir();

// 6. Le type parent accepte les sous-classes (polymorphisme)
let animaux: Animal[] = [rex, felix];
animaux.forEach((animal) => console.log(animal.sePresenter()));

// 7. instanceof : vérifier le type réel
console.log("rex instanceof Chien :", rex instanceof Chien);
console.log("rex instanceof Animal :", rex instanceof Animal);
console.log("rex instanceof Chat :", rex instanceof Chat);

// 8. protected vs private
class Parent {
    protected protege = "protégé";
    private prive = "privé";

    lirePrive(): string {
        return this.prive; // ✅ dans la classe qui le déclare
    }
}

class Enfant extends Parent {
    lireProtege(): string {
        return this.protege; // ✅ accessible dans la sous-classe
    }

    // lirePriveParent(): string {
    //     return this.prive; // ❌ private : visible uniquement dans Parent
    // }
}
console.log(new Enfant().lireProtege(), new Enfant().lirePrive());

// 9. "super.methode()" pour appeler la version du parent
class Oiseau extends Animal {
    constructor(nom: string) {
        super(nom);
    }

    override manger(): void {
        super.manger();                 // version du parent
        console.log("... et picore des graines.");
    }
}
new Oiseau("Piaf").manger();

// 10. ⚠️ Un seul parent possible (pas d'héritage multiple en JS/TS)
//    Pour plusieurs comportements, préférer la composition ou les interfaces (7.8)

// 11. Chaîne d'héritage sur plusieurs niveaux
class Mammifere extends Animal {
    allaiter(): void {
        console.log(`${this.nom} allaite.`);
    }
}
class Baleine extends Mammifere {
    override crier(): string {
        return "Chant";
    }
}
let baleine = new Baleine("Wally");
baleine.manger();    // Animal
baleine.allaiter();  // Mammifere
console.log(baleine.crier()); // Baleine
