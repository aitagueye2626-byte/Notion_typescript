// Initialisation courte dans le constructeur (parameter properties)

// 1. Version longue : déclarer les propriétés, puis les affecter une par une
class PersonneLongue {
    nom: string;
    age: number;
    private email: string;

    constructor(nom: string, age: number, email: string) {
        this.nom = nom;
        this.age = age;
        this.email = email;
    }

    resume(): string {
        return `${this.nom} (${this.age} ans) - ${this.email}`;
    }
}

// 2. Version courte : le modificateur d'accès DANS le paramètre
//    TypeScript déclare la propriété ET l'affecte automatiquement
class Personne {
    constructor(
        public nom: string,
        public age: number,
        private email: string,
        readonly id: number
    ) { }

    resume(): string {
        return `${this.nom} (${this.age} ans) - ${this.email} - #${this.id}`;
    }
}

// 3. Les deux classes sont équivalentes à l'usage
let longue = new PersonneLongue("Aita", 21, "aita@exemple.com");
let courte = new Personne("Aita", 21, "aita@exemple.com", 1);

console.log(longue.resume());
console.log(courte.resume());

// 4. Les membres "parameter properties" sont bien des propriétés de l'instance
console.log("Propriétés :", Object.keys(courte));
console.log("Nom :", courte.nom); // public
// courte.email;  // ❌ private
// courte.id = 2; // ❌ readonly

// 5. On peut combiner avec des paramètres NORMAUX (sans modificateur)
class Produit {
    public readonly prixTTC: number;

    constructor(
        public nom: string,          // propriété publique
        private prixHT: number,      // propriété privée
        public quantite: number,     // propriété publique
        tauxTVA: number = 0.18       // simple paramètre : PAS une propriété
    ) {
        this.prixTTC = prixHT * (1 + tauxTVA);
    }

    total(): number {
        return this.prixTTC * this.quantite;
    }
}

let produit = new Produit("Cahier", 500, 3);
console.log("Produit :", produit.nom);
console.log("Prix TTC :", produit.prixTTC);
console.log("Total :", produit.total());
// console.log(produit.tauxTVA); // ❌ n'existe pas sur l'instance

// 6. Avec un constructeur vide, les accolades restent obligatoires
class Point {
    constructor(public x: number = 0, public y: number = 0) { }
}

let p = new Point(2, 3);
console.log("Point :", p.x, p.y);

// 7. ⚠️ Limites
// - uniquement dans le constructor (pas dans une méthode)
// - incompatible avec un constructeur surchargé (voir 2.9)
// - ne pas abuser : au-delà de 4-5 paramètres, préférer un objet d'options

// 8. Pattern "objet d'options" quand il y a beaucoup de champs
interface OptionsUtilisateur {
    nom: string;
    age: number;
    email: string;
    ville?: string;
}

class Utilisateur {
    readonly nom: string;
    readonly age: number;
    readonly email: string;
    readonly ville: string;

    constructor(options: OptionsUtilisateur) {
        this.nom = options.nom;
        this.age = options.age;
        this.email = options.email;
        this.ville = options.ville ?? "Dakar";
    }
}

let utilisateur = new Utilisateur({ nom: "Fatou", age: 24, email: "fatou@exemple.com" });
console.log("Utilisateur :", utilisateur);
