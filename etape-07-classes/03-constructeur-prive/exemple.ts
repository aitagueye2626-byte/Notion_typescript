// Constructeur privé : empêcher "new" de l'extérieur

// 1. Un constructor privé interdit new ... depuis l'extérieur
class Configuration {
    private static instance: Configuration | null = null;
    private readonly valeurs = new Map<string, string>(); // map est traité en 3.6

    // constructor privé : seul le code de la classe peut l'appeler
    private constructor() { }

    // 2. Méthode statique : point d'entrée unique
    static obtenir(): Configuration {
        if (Configuration.instance === null) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }

    definir(cle: string, valeur: string): void {
        this.valeurs.set(cle, valeur);
    }

    lire(cle: string): string | undefined {
        return this.valeurs.get(cle);
    }
}

// 3. new est refusé à la compilation
// let c = new Configuration(); // ❌ Constructor of class 'Configuration' is private

// 4. On passe par la fabrique statique
let config = Configuration.obtenir();
config.definir("langue", "fr");

// 5. Toujours LA MÊME instance (singleton)
let memeConfig = Configuration.obtenir();
console.log("Même instance ?", config === memeConfig);
console.log("Langue :", memeConfig.lire("langue"));

// 6. Pourquoi ? Exemple : un compteur d'identifiants unique
class Identifiant {
    private static suivant = 1;
    readonly valeur: number;

    private constructor(valeur: number) {
        this.valeur = valeur;
    }

    static creer(): Identifiant {
        return new Identifiant(Identifiant.suivant++);
    }
}

console.log("ID 1 :", Identifiant.creer().valeur);
console.log("ID 2 :", Identifiant.creer().valeur);

// 7. Autre usage : fonction de fabrique "nommée" (plus lisible que new pour un objet complexe)
class Point {
    readonly x: number;
    readonly y: number;

    private constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static origine(): Point {
        return new Point(0, 0);
    }

    static depuisTableau(coordonnees: [number, number]): Point {
        return new Point(coordonnees[0], coordonnees[1]);
    }

    deplacer(dx: number, dy: number): Point {
        return new Point(this.x + dx, this.y + dy);
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}

let point = Point.depuisTableau([2, 3]);
console.log("Point :", point.toString());
console.log("Déplacé :", point.deplacer(1, -1).toString());
console.log("Origine :", Point.origine().toString());

// 8. ⚠️ private est effacé en JavaScript : new reste possible en contournant (erreur humaine)
// let interdit = new (Configuration as any)();
