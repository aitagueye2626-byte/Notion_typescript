// 8.2 - Classes génériques

// 1. Classe conteneur avec un paramètre de type <T>
class Boite<T> {
    private contenu: T;

    constructor(contenuInitial: T) {
        this.contenu = contenuInitial;
    }

    getContenu(): T {
        return this.contenu;
    }

    setContenu(nouveau: T): void {
        this.contenu = nouveau;
    }
}

const boiteTexte = new Boite<string>("Bonjour le monde");
console.log("Contenu boîte texte :", boiteTexte.getContenu());

const boiteNombre = new Boite(100); // inférence T = number
boiteNombre.setContenu(250);
console.log("Contenu boîte nombre :", boiteNombre.getContenu());

// 2. Structure de données générique : Pile (Stack)
class Pile<T> {
    private elements: T[] = [];

    empiler(element: T): void {
        this.elements.push(element);
    }

    depiler(): T | undefined {
        return this.elements.pop();
    }

    sommet(): T | undefined {
        return this.elements[this.elements.length - 1];
    }

    get taille(): number {
        return this.elements.length;
    }

    estVide(): boolean {
        return this.elements.length === 0;
    }
}

const pileLivres = new Pile<string>();
pileLivres.empiler("TypeScript Guide");
pileLivres.empiler("Design Patterns");
pileLivres.empiler("Clean Code");

console.log("Taille pile :", pileLivres.taille);
console.log("Sommet actuel :", pileLivres.sommet());
console.log("Dépilé :", pileLivres.depiler());
console.log("Nouveau sommet :", pileLivres.sommet());

// 3. Classe avec plusieurs paramètres de type <K, V>
class PaireCleValeur<K, V> {
    constructor(public readonly cle: K, public valeur: V) {}

    afficher(): string {
        return `Cle: ${String(this.cle)} -> Valeur: ${JSON.stringify(this.valeur)}`;
    }
}

const entree1 = new PaireCleValeur<number, string>(1, "Premier");
const entree2 = new PaireCleValeur<string, { role: string }>("admin", { role: "super-user" });

console.log(entree1.afficher());
console.log(entree2.afficher());

// 4. Méthode statique avec son propre paramètre générique
class UsineDePiles {
    static creerDepuisTableau<E>(elements: E[]): Pile<E> {
        const pile = new Pile<E>();
        for (const el of elements) {
            pile.empiler(el);
        }
        return pile;
    }
}

const pileChiffres = UsineDePiles.creerDepuisTableau([10, 20, 30, 40]);
console.log("Sommet de la pile créée par méthode statique :", pileChiffres.sommet());
