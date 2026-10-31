// private / public : qui peut accéder à quoi ?

// 1. public (par défaut) : accessible partout
// 2. private : accessible UNIQUEMENT à l'intérieur de la classe
class CompteBancaire {
    public titulaire: string;      // lisible et modifiable de l'extérieur
    private solde: number;         // protégé : personne ne peut le casser de l'extérieur

    constructor(titulaire: string, soldeInitial: number) {
        this.titulaire = titulaire;
        this.solde = soldeInitial;
    }

    // 3. Une méthode publique donne un accès CONTRÔLÉ à l'état privé
    deposer(montant: number): void {
        if (montant <= 0) {
            throw new Error("Le montant doit être positif");
        }
        this.solde += montant;
    }

    retirer(montant: number): void {
        if (montant > this.solde) {
            throw new Error("Solde insuffisant");
        }
        this.solde -= montant;
    }

    // 4. Lecture seule de l'extérieur (aucun setter : le solde ne se modifie que via deposer/retirer)
    get soldeActuel(): number {
        return this.solde;
    }

    private journaliser(operation: string): void {
        console.log(`[LOG] ${this.titulaire} : ${operation} (solde ${this.solde})`);
    }

    // Une méthode publique peut appeler une méthode privée
    faireUnDepot(montant: number): void {
        this.deposer(montant);
        this.journaliser(`dépôt de ${montant}`);
    }
}

let compte = new CompteBancaire("Aita", 1000);

// 5. Accès public : autorisé
console.log("Titulaire :", compte.titulaire);
console.log("Solde :", compte.soldeActuel);

// 6. Accès à un membre privé depuis l'extérieur : REFUSÉ à la compilation
// compte.solde = 1_000_000;       // ❌ Property 'solde' is private
// compte.journaliser("test");     // ❌ Property 'journaliser' is private

// 7. On passe donc par l'API publique
compte.faireUnDepot(500);
compte.retirer(200);
console.log("Solde après opérations :", compte.soldeActuel);

// 8. Les règles métier sont protégées
try {
    compte.retirer(100_000);
} catch (erreur) {
    console.log("Refusé :", (erreur as Error).message);
}

// 9. private existe aussi pour les méthodes : utile pour découper du code interne
class ParseurCSV {
    private lignes: string[];

    constructor(texte: string) {
        this.lignes = texte.split("\n");
    }

    lire(): string[][] {
        return this.lignes.map((ligne) => this.decouper(ligne));
    }

    private decouper(ligne: string): string[] {
        return ligne.split(",").map((cellule) => cellule.trim());
    }
}

let parseur = new ParseurCSV("Aita,21\nMoussa,25");
console.log("Données :", parseur.lire());
// parseur.decouper("x"); // ❌ private

// 10. ⚠️ private est une protection de COMPILATION : en JS, c'est une simple propriété
console.log("Propriétés réelles de l'objet :", Object.keys(compte));

// 11. private vs #privé (natif JavaScript) : # est vraiment inaccessible à l'exécution
class Secret {
    #valeur = 42;

    reveler(): number {
        return this.#valeur;
    }
}
let secret = new Secret();
console.log("Révélé :", secret.reveler());
// secret.#valeur;  // ❌ syntaxe interdite hors de la classe
// console.log(Object.keys(secret)); // [] : la propriété # n'apparaît pas
