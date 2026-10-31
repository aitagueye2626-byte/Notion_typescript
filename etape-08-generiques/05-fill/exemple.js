// 8.5 - Remplissage générique (Fill) et types par défaut
// 1. Fonction générique remplirTableau<T>
function remplirTableau(taille, valeur) {
    const tableau = [];
    for (let i = 0; i < taille; i++) {
        tableau.push(valeur);
    }
    return tableau;
}
const listeDeScores = remplirTableau(5, 0); // number[]
const listeDeBalises = remplirTableau(3, "INIT"); // string[]
console.log("Scores initialisés :", listeDeScores);
console.log("Balises :", listeDeBalises);
// 2. Utilisation de la méthode standard Array.prototype.fill typée
const matriceLigne = [1, 2, 3, 4, 5];
matriceLigne.fill(9, 1, 4); // Remplace les index 1 à 3 par 9
console.log("Tableau après fill partiel :", matriceLigne);
// 3. Remplissage avec fabrique pour éviter le partage de référence mémoire
function remplirAvecFabrique(taille, createur) {
    const resultats = [];
    for (let i = 0; i < taille; i++) {
        resultats.push(createur(i));
    }
    return resultats;
}
const panierInitial = remplirAvecFabrique(3, (i) => ({
    id: i + 1,
    reference: `REF-${100 + i}`,
    prix: (i + 1) * 15
}));
console.log("Articles du panier initial :", panierInitial);
// Vérification : modifier l'un ne modifie pas les autres
panierInitial[0].prix = 99;
console.log("Premier article modifié :", panierInitial[0].prix, "| Second :", panierInitial[1].prix);
// 4. Classe avec paramètre de type par défaut <T = string>
class Grille {
    lignes;
    colonnes;
    donnees;
    constructor(lignes, colonnes, valeurInitiale) {
        this.lignes = lignes;
        this.colonnes = colonnes;
        this.donnees = [];
        for (let l = 0; l < lignes; l++) {
            const ligne = [];
            for (let c = 0; c < colonnes; c++) {
                ligne.push(valeurInitiale);
            }
            this.donnees.push(ligne);
        }
    }
    lire(l, c) {
        return this.donnees[l][c];
    }
    ecrire(l, c, valeur) {
        this.donnees[l][c] = valeur;
    }
    afficher() {
        console.log(this.donnees.map((ligne) => ligne.join(" | ")).join("\n"));
    }
}
// Utilisation avec type par défaut (string)
const grilleMorpion = new Grille(3, 3, ".");
grilleMorpion.ecrire(1, 1, "X");
grilleMorpion.ecrire(0, 0, "O");
console.log("Grille Morpion :");
grilleMorpion.afficher();
// Utilisation avec type explicite (number)
const grilleBinaire = new Grille(2, 4, 0);
grilleBinaire.ecrire(0, 2, 1);
console.log("Grille Binaire :");
grilleBinaire.afficher();
// 5. Remplissage d'un dictionnaire Record<K, V>
function initialiserConfiguration(cles, valeur) {
    const config = {};
    for (const cle of cles) {
        config[cle] = valeur;
    }
    return config;
}
const statutsModules = initialiserConfiguration(["authentification", "facturation", "notifications"], true);
console.log("Modules activés :", statutsModules);
export {};
