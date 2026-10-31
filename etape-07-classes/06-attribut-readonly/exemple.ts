// Attribut en lecture seule dans une classe : readonly

class Commande {
    readonly numero: string;       // ne peut plus changer après le constructeur
    readonly cree: Date = new Date();
    statut: "en attente" | "expediee" | "livree" = "en attente";

    constructor(numero: string) {
        this.numero = numero;      // ✅ seule affectation autorisée : dans le constructeur
    }

    expedier(): void {
        this.statut = "expediee";  // ✅ le statut n'est pas readonly
    }

    // 1. Toute réaffectation hors du constructeur est refusée
    // renumeroter(nouveau: string): void {
    //     this.numero = nouveau; // ❌ Cannot assign to 'numero' because it is a read-only property
    // }
}

let commande = new Commande("CMD-001");
commande.expedier();
console.log("Commande :", commande.numero, commande.statut);

// 2. readonly avec un tableau : la RÉFÉRENCE est figée, pas le CONTENU
class Panier {
    readonly articles: string[] = [];

    ajouter(article: string): void {
        this.articles.push(article); // ✅ on modifie le contenu
    }

    // remplacer(nouveaux: string[]): void {
    //     this.articles = nouveaux; // ❌ on ne peut pas changer la référence
    // }
}

let panier = new Panier();
panier.ajouter("Cahier");
panier.ajouter("Stylo");
console.log("Articles :", panier.articles);
// panier.articles.push("Gomme"); // ⚠️ autorisé aussi de l'extérieur : readonly ne protège pas le contenu

// 3. Pour figer AUSSI le contenu : readonly string[] (type) + pas d'accès direct
class PanierFige {
    private readonly articles: readonly string[];

    constructor(articles: string[]) {
        this.articles = [...articles]; // copie défensive
    }

    lister(): readonly string[] {
        return this.articles;
    }
}

let fige = new PanierFige(["Livre"]);
console.log("Fige :", fige.lister());
// fige.lister().push("X"); // ❌ readonly string[] n'a pas de push

// 4. readonly + parameter properties (voir 7.4)
class Utilisateur {
    constructor(
        public readonly id: number,
        public nom: string
    ) { }
}

let utilisateur = new Utilisateur(1, "Aita");
utilisateur.nom = "Aita Gueye"; // ✅
// utilisateur.id = 2;          // ❌ readonly
console.log("Utilisateur :", utilisateur);

// 5. readonly sur un objet : seule la propriété est figée (pas le contenu profond)
class Profil {
    readonly adresse: { ville: string } = { ville: "Dakar" };
}

let profil = new Profil();
profil.adresse.ville = "Thiès"; // ✅ readonly porte sur "adresse", pas sur "ville"
// profil.adresse = { ville: "Paris" }; // ❌
console.log("Ville :", profil.adresse.ville);

// 6. readonly vs getter seul : deux façons d'exposer une valeur non modifiable
class Cercle {
    constructor(readonly rayon: number) { }

    get diametre(): number {
        return this.rayon * 2;   // calculé, jamais stocké
    }
}
let cercle = new Cercle(3);
console.log("Diamètre :", cercle.diametre);
// cercle.diametre = 10; // ❌ Cannot assign to 'diametre' because it is a read-only property

// 7. readonly est une protection de COMPILATION seulement
const commandeBrute = commande as { numero: string };
commandeBrute.numero = "HACK";
console.log("Contournement possible à l'exécution :", commandeBrute.numero);

// 8. Résumé des combinaisons
// readonly                -> réassignation interdite (référence)
// readonly string[]       -> tableau sans méthodes mutantes
// Object.freeze(obj)      -> immuable à l'exécution (JS)
console.log("Freeze :", Object.isFrozen(Object.freeze({ a: 1 })));
