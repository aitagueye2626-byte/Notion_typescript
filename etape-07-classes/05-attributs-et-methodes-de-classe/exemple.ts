// Attributs et méthodes de classe : instance, statiques et champs

// 1. Champs d'INSTANCE : une copie par objet
// 2. Champs STATIQUES (static) : une seule valeur, portée par la CLASSE
class Compteur {
    static total: number = 0;          // partagé par tous les objets
    static readonly VERSION = "1.0";   // constante de classe

    id: number;
    etiquette: string = "compteur";    // valeur par défaut
    private lectures = 0;              // champ privé initialisé

    constructor(id: number) {
        this.id = id;
        Compteur.total += 1;           // on accède au statique via la CLASSE
    }

    lire(): number {
        this.lectures += 1;
        return this.id;
    }

    get nombreDeLectures(): number {
        return this.lectures;
    }

    // 3. Méthode statique : ne dépend d'aucune instance (pas de "this" d'objet)
    static remettreAZero(): void {
        Compteur.total = 0;
    }

    static creer(id: number): Compteur {
        return new Compteur(id);
    }
}

let c1 = new Compteur(1);
let c2 = Compteur.creer(2);
console.log("Instances créées :", Compteur.total);
console.log("VERSION :", Compteur.VERSION);

// 4. Instance vs statique
console.log("c1.id :", c1.id, "| c2.id :", c2.id);
c1.lire();
c1.lire();
// 6. Lecture d'un champ privé via un getter (pas d'accès direct à this.lectures)
console.log("Lectures de c1 (champ d'instance) :", c1.nombreDeLectures);

// 5. Un membre statique s'appelle sur la CLASSE, pas sur l'instance
// c1.total;          // ❌ Property 'total' does not exist on type 'Compteur'
console.log("Total via la classe :", Compteur.total);

// 6. ⚠️ Dans une méthode statique, "this" désigne la classe elle-même
class MathUtil {
    static PI = 3.14159;

    static aireCercle(rayon: number): number {
        return this.PI * rayon ** 2; // this = MathUtil
    }
}
console.log("Aire :", MathUtil.aireCercle(2).toFixed(2));

// 7. ⚠️ Dans une méthode d'instance, un statique doit être préfixé par la classe
class Exemple {
    static message = "bonjour";

    afficher(): void {
        // console.log(this.message); // ❌ n'existe pas sur l'instance
        console.log(Exemple.message); // ✅
    }
}
new Exemple().afficher();

// 8. Champs d'instance initiés dans le constructeur à partir d'un statique
class Ticket {
    static prochainNumero = 1;
    readonly numero: number;
    readonly cree: Date;

    constructor() {
        this.numero = Ticket.prochainNumero++;
        this.cree = new Date();
    }
}
let t1 = new Ticket();
let t2 = new Ticket();
console.log("Tickets :", t1.numero, t2.numero);

// 9. Champs privés statiques : un cache partagé, invisible de l'extérieur
class Convertisseur {
    private static cache = new Map<string, number>();

    static celsiusEnFahrenheit(celsius: number): number {
        const cle = String(celsius);
        const deja = this.cache.get(cle);
        if (deja !== undefined) {
            return deja;
        }
        const resultat = celsius * 9 / 5 + 32;
        this.cache.set(cle, resultat);
        return resultat;
    }
}
console.log("25°C =", Convertisseur.celsiusEnFahrenheit(25), "°F");
console.log("25°C =", Convertisseur.celsiusEnFahrenheit(25), "°F (depuis le cache)");
// Convertisseur.cache; // ❌ private

// 10. Champs et méthode "static" sont hérités par les sous-classes
class Base {
    static nom = "Base";
    static presenter(): string {
        return `Classe ${this.nom}`;
    }
}
class Enfant extends Base { }
console.log(Enfant.presenter()); // "Classe Enfant" : this = la sous-classe
