// Getters et setters : contrôler la lecture et l'écriture d'une propriété

class Temperature {
    // 1. Convention : un champ privé "_celsius" derrière l'accesseur "celsius"
    private _celsius: number;

    constructor(celsius: number) {
        this._celsius = celsius;
    }

    // 2. getter : appelé comme une propriété, sans parenthèses
    get celsius(): number {
        return this._celsius;
    }

    // 3. setter : valide avant d'écrire
    set celsius(valeur: number) {
        if (valeur < -273.15) {
            throw new Error("Température impossible (sous le zéro absolu)");
        }
        this._celsius = valeur;
    }

    // 4. Propriété calculée : aucun stockage, recalculée à chaque lecture
    get fahrenheit(): number {
        return this._celsius * 9 / 5 + 32;
    }

    set fahrenheit(valeur: number) {
        this.celsius = (valeur - 32) * 5 / 9; // réutilise la validation
    }
}

let t = new Temperature(20);
console.log("Celsius :", t.celsius);         // 20  (get)
console.log("Fahrenheit :", t.fahrenheit);   // 68  (get calculé)

t.celsius = 25;                              // set + validation
console.log("Nouveau Celsius :", t.celsius);
console.log("Fahrenheit recalculé :", t.fahrenheit);

t.fahrenheit = 212;                          // set qui passe par le setter celsius
console.log("212°F =", t.celsius, "°C");

try {
    t.celsius = -300;                        // validation : refus
} catch (erreur) {
    console.log("Refusé :", (erreur as Error).message);
}

// 5. Le champ privé n'est pas accessible de l'extérieur
// console.log(t._celsius); // ❌ private

// 6. Getter SEUL : propriété en lecture seule de l'extérieur
class Rectangle {
    constructor(
        private readonly largeur: number,
        private readonly hauteur: number
    ) { }

    get aire(): number {
        return this.largeur * this.hauteur;
    }

    // pas de set aire -> affectation refusée à la compilation
}
let r = new Rectangle(4, 5);
console.log("Aire :", r.aire);
// r.aire = 30; // ❌ Cannot assign to 'aire' because it is a read-only property

// 7. Setter SEUL : écriture sans lecture publique
class MotDePasse {
    private _hache = "";

    set valeur(motDePasse: string) {
        if (motDePasse.length < 8) {
            throw new Error("8 caractères minimum");
        }
        this._hache = "*".repeat(motDePasse.length); // simulation de hachage
    }

    get longueurHache(): number {
        return this._hache.length;
    }
}
let mdp = new MotDePasse();
mdp.valeur = "superSecret";
console.log("Longueur stockée :", mdp.longueurHache);
// console.log(mdp.valeur); // ❌ Property 'valeur' only has a setter

// 8. Getter qui dérive d'une liste
class Panier {
    private articles: { nom: string; prix: number }[] = [];

    ajouter(nom: string, prix: number): void {
        this.articles.push({ nom, prix });
    }

    get total(): number {
        return this.articles.reduce((somme, a) => somme + a.prix, 0);
    }

    get nombre(): number {
        return this.articles.length;
    }
}
let panier = new Panier();
panier.ajouter("Cahier", 500);
panier.ajouter("Stylo", 250);
console.log(`${panier.nombre} articles, total ${panier.total} FCFA`);

// 9. ⚠️ Un getter ne doit pas modifier d'état (effet de bord inattendu)
// et un setter ne doit pas seulement ignorer l'erreur : lever ou journaliser.
