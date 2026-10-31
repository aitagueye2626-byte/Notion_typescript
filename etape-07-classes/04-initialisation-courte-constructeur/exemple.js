// Initialisation courte dans le constructeur (parameter properties)
// 1. Version longue : déclarer les propriétés, puis les affecter une par une
class PersonneLongue {
    nom;
    age;
    email;
    constructor(nom, age, email) {
        this.nom = nom;
        this.age = age;
        this.email = email;
    }
    resume() {
        return `${this.nom} (${this.age} ans) - ${this.email}`;
    }
}
// 2. Version courte : le modificateur d'accès DANS le paramètre
//    TypeScript déclare la propriété ET l'affecte automatiquement
class Personne {
    nom;
    age;
    email;
    id;
    constructor(nom, age, email, id) {
        this.nom = nom;
        this.age = age;
        this.email = email;
        this.id = id;
    }
    resume() {
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
    nom;
    prixHT;
    quantite;
    prixTTC;
    constructor(nom, // propriété publique
    prixHT, // propriété privée
    quantite, // propriété publique
    tauxTVA = 0.18 // simple paramètre : PAS une propriété
    ) {
        this.nom = nom;
        this.prixHT = prixHT;
        this.quantite = quantite;
        this.prixTTC = prixHT * (1 + tauxTVA);
    }
    total() {
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
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
let p = new Point(2, 3);
console.log("Point :", p.x, p.y);
class Utilisateur {
    nom;
    age;
    email;
    ville;
    constructor(options) {
        this.nom = options.nom;
        this.age = options.age;
        this.email = options.email;
        this.ville = options.ville ?? "Dakar";
    }
}
let utilisateur = new Utilisateur({ nom: "Fatou", age: 24, email: "fatou@exemple.com" });
console.log("Utilisateur :", utilisateur);
export {};
