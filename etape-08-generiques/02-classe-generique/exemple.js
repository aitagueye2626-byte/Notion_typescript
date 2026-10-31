// 8.2 - Classes génériques
// 1. Classe conteneur avec un paramètre de type <T>
class Boite {
    contenu;
    constructor(contenuInitial) {
        this.contenu = contenuInitial;
    }
    getContenu() {
        return this.contenu;
    }
    setContenu(nouveau) {
        this.contenu = nouveau;
    }
}
const boiteTexte = new Boite("Bonjour le monde");
console.log("Contenu boîte texte :", boiteTexte.getContenu());
const boiteNombre = new Boite(100); // inférence T = number
boiteNombre.setContenu(250);
console.log("Contenu boîte nombre :", boiteNombre.getContenu());
// 2. Structure de données générique : Pile (Stack)
class Pile {
    elements = [];
    empiler(element) {
        this.elements.push(element);
    }
    depiler() {
        return this.elements.pop();
    }
    sommet() {
        return this.elements[this.elements.length - 1];
    }
    get taille() {
        return this.elements.length;
    }
    estVide() {
        return this.elements.length === 0;
    }
}
const pileLivres = new Pile();
pileLivres.empiler("TypeScript Guide");
pileLivres.empiler("Design Patterns");
pileLivres.empiler("Clean Code");
console.log("Taille pile :", pileLivres.taille);
console.log("Sommet actuel :", pileLivres.sommet());
console.log("Dépilé :", pileLivres.depiler());
console.log("Nouveau sommet :", pileLivres.sommet());
// 3. Classe avec plusieurs paramètres de type <K, V>
class PaireCleValeur {
    cle;
    valeur;
    constructor(cle, valeur) {
        this.cle = cle;
        this.valeur = valeur;
    }
    afficher() {
        return `Cle: ${String(this.cle)} -> Valeur: ${JSON.stringify(this.valeur)}`;
    }
}
const entree1 = new PaireCleValeur(1, "Premier");
const entree2 = new PaireCleValeur("admin", { role: "super-user" });
console.log(entree1.afficher());
console.log(entree2.afficher());
// 4. Méthode statique avec son propre paramètre générique
class UsineDePiles {
    static creerDepuisTableau(elements) {
        const pile = new Pile();
        for (const el of elements) {
            pile.empiler(el);
        }
        return pile;
    }
}
const pileChiffres = UsineDePiles.creerDepuisTableau([10, 20, 30, 40]);
console.log("Sommet de la pile créée par méthode statique :", pileChiffres.sommet());
export {};
