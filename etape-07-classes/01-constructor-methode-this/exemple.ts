// Constructor, méthode et this : la base d'une classe
// Une classe = un plan qui regroupe des DONNÉES (propriétés) et des COMPORTEMENTS (méthodes)

// 1. Déclaration d'une classe
class Personne {
    // Propriétés : chaque objet créé possède les siennes
    nom: string;
    age: number;

    // Constructeur : appelé automatiquement par "new"
    constructor(nom: string, age: number) {
        this.nom = nom;
        this.age = age;
    }

    // Méthode : une fonction qui appartient à l'objet
    sePresenter(): string {
        return `Je m'appelle ${this.nom} et j'ai ${this.age} ans.`;
    }

    // Méthode qui modifie l'objet
    feterAnniversaire(): void {
        this.age = this.age + 1;
    }
}

// 2. "new" crée un objet et appelle le constructor
let aita = new Personne("Aita", 21);
let moussa = new Personne("Moussa", 25);

// 3. Accès aux propriétés
console.log("Nom :", aita.nom);
console.log("Âge :", aita.age);

// 4. Appel des méthodes
console.log(aita.sePresenter());
console.log(moussa.sePresenter()); // même méthode, données différentes

// 5. Chaque "new" produit un objet INDÉPENDANT
aita.feterAnniversaire();
console.log("Après anniversaire :", aita.age, "| Moussa :", moussa.age);

// 6. "this" = l'objet sur lequel la méthode est appelée
let sauvegarde = aita;
sauvegarde.feterAnniversaire();
console.log("aita et sauvegarde pointent vers le même objet :", aita.age);

// 7. ⚠️ Piège classique : perdre "this" en détachant la méthode
const presenter = aita.sePresenter; // méthode détachée de l'objet
try {
    presenter();
} catch (erreur) {
    console.log("Erreur attendue (this undefined) :", (erreur as Error).message);
}

// 8. Solution : appeler avec la bonne cible
console.log("Appel corrigé :", presenter.call(aita));

// 9. Une classe peut aussi contenir une propriété calculée à partir d'une autre
class Cercle {
    rayon: number;

    constructor(rayon: number) {
        this.rayon = rayon;
    }

    get perimetre(): number {
        return 2 * Math.PI * this.rayon;
    }

    aire(): number {
        return Math.PI * this.rayon ** 2;
    }
}

let cercle = new Cercle(2);
console.log("Périmètre :", cercle.perimetre.toFixed(2));
console.log("Aire :", cercle.aire().toFixed(2));

// 10. Vérification à l'exécution que les objets sont bien des instances
console.log("aita est une Personne ?", aita instanceof Personne);
console.log("Nombre de propriétés :", Object.keys(aita));
