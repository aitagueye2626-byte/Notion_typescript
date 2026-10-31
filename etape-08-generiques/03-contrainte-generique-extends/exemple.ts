// 8.3 - Contraintes génériques avec extends

// 1. Contrainte sur une propriété "length"
interface Mesurable {
    length: number;
}

function mesurerEtAfficher<T extends Mesurable>(element: T): number {
    console.log("Mesure de l'élément :", element.length);
    return element.length;
}

mesurerEtAfficher("Bonjour le monde"); // string a une propriété length
mesurerEtAfficher([10, 20, 30, 40]);   // un tableau a length
mesurerEtAfficher({ length: 12, unit: "cm" });

// 2. Contrainte d'entité avec id
interface EntiteDeBase {
    id: number;
    dateCreation?: Date;
}

interface Utilisateur extends EntiteDeBase {
    nom: string;
    email: string;
}

interface Produit extends EntiteDeBase {
    libelle: string;
    prix: number;
}

class Depot<T extends EntiteDeBase> {
    private donnees: T[] = [];

    ajouter(item: T): void {
        this.donnees.push(item);
        console.log(`Élément #${item.id} ajouté avec succès.`);
    }

    trouverParId(id: number): T | undefined {
        return this.donnees.find((item) => item.id === id);
    }

    tous(): T[] {
        return [...this.donnees];
    }
}

// Utilisation avec Utilisateur
const depotUsers = new Depot<Utilisateur>();
depotUsers.ajouter({ id: 1, nom: "Aita Gueye", email: "aita@example.com" });
depotUsers.ajouter({ id: 2, nom: "Fatou Sow", email: "fatou@example.com" });

const userTrouve = depotUsers.trouverParId(1);
console.log("Utilisateur trouvé :", userTrouve?.nom);

// Utilisation avec Produit
const depotProduits = new Depot<Produit>();
depotProduits.ajouter({ id: 101, libelle: "Ordinateur", prix: 850 });
console.log("Produits :", depotProduits.tous());

// 3. Contrainte "extends object" pour interdire les types primitifs
function clonerSansId<T extends { id: number }>(objet: T): Omit<T, "id"> {
    const copie = { ...objet };
    delete (copie as Partial<T>).id;
    return copie;
}

const produitSansId = clonerSansId({ id: 999, libelle: "Souris sans fil", prix: 25 });
console.log("Copie sans identifiant :", produitSansId);

// 4. Comparer deux éléments disposant d'un getter ou valeur
interface Comparable {
    valeurNumerique(): number;
}

function trouverPlusGrand<T extends Comparable>(a: T, b: T): T {
    return a.valeurNumerique() >= b.valeurNumerique() ? a : b;
}

class Score implements Comparable {
    constructor(public joueur: string, public points: number) {}
    valeurNumerique(): number {
        return this.points;
    }
}

const score1 = new Score("Aita", 95);
const score2 = new Score("Moussa", 88);
const gagnant = trouverPlusGrand(score1, score2);
console.log("Gagnant :", gagnant.joueur, "avec", gagnant.points, "points");
