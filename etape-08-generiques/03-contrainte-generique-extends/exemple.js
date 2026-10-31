// 8.3 - Contraintes génériques avec extends
function mesurerEtAfficher(element) {
    console.log("Mesure de l'élément :", element.length);
    return element.length;
}
mesurerEtAfficher("Bonjour le monde"); // string a une propriété length
mesurerEtAfficher([10, 20, 30, 40]); // un tableau a length
mesurerEtAfficher({ length: 12, unit: "cm" });
class Depot {
    donnees = [];
    ajouter(item) {
        this.donnees.push(item);
        console.log(`Élément #${item.id} ajouté avec succès.`);
    }
    trouverParId(id) {
        return this.donnees.find((item) => item.id === id);
    }
    tous() {
        return [...this.donnees];
    }
}
// Utilisation avec Utilisateur
const depotUsers = new Depot();
depotUsers.ajouter({ id: 1, nom: "Aita Gueye", email: "aita@example.com" });
depotUsers.ajouter({ id: 2, nom: "Fatou Sow", email: "fatou@example.com" });
const userTrouve = depotUsers.trouverParId(1);
console.log("Utilisateur trouvé :", userTrouve?.nom);
// Utilisation avec Produit
const depotProduits = new Depot();
depotProduits.ajouter({ id: 101, libelle: "Ordinateur", prix: 850 });
console.log("Produits :", depotProduits.tous());
// 3. Contrainte "extends object" pour interdire les types primitifs
function clonerSansId(objet) {
    const copie = { ...objet };
    delete copie.id;
    return copie;
}
const produitSansId = clonerSansId({ id: 999, libelle: "Souris sans fil", prix: 25 });
console.log("Copie sans identifiant :", produitSansId);
function trouverPlusGrand(a, b) {
    return a.valeurNumerique() >= b.valeurNumerique() ? a : b;
}
class Score {
    joueur;
    points;
    constructor(joueur, points) {
        this.joueur = joueur;
        this.points = points;
    }
    valeurNumerique() {
        return this.points;
    }
}
const score1 = new Score("Aita", 95);
const score2 = new Score("Moussa", 88);
const gagnant = trouverPlusGrand(score1, score2);
console.log("Gagnant :", gagnant.joueur, "avec", gagnant.points, "points");
export {};
