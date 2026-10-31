// Type union : une variable peut accepter PLUSIEURS types (séparés par |)
// 1. Union de primitifs
let identifiant;
identifiant = 42; // ✅ number
identifiant = "AITA-42"; // ✅ string
// identifiant = true;   // ❌ boolean n'est pas dans l'union
console.log("Identifiant :", identifiant);
let statutCommande = "en cours";
// statutCommande = "annulee"; // ❌ valeur non autorisée
console.log("Statut :", statutCommande);
// 3. Union avec null (pour une valeur facultative)
let telephone = null;
telephone = "+221 77 000 00 00";
console.log("Téléphone :", telephone);
let vehicule;
vehicule = { roues: 4, permisB: true };
vehicule = { roues: 2, casque: true };
console.log("Véhicule :", vehicule);
// 5. ⚠️ On ne peut utiliser QUE les membres communs sans vérification
// vehicule.roues     ✅ présent dans les deux types
// vehicule.permisB   ❌ n'existe pas sur Moto
// 6. Tableau d'éléments de plusieurs types
let resultats = [18, "absent", 15, "absent"];
console.log("Résultats :", resultats);
// 7. Fonction acceptant une union
function formaterValeur(valeur) {
    // ⚠️ Il faut vérifier le type avant d'utiliser une méthode spécifique
    if (typeof valeur === "number") {
        return valeur.toFixed(2);
    }
    return valeur.toUpperCase();
}
console.log(formaterValeur(3.14159)); // "3.14"
console.log(formaterValeur("aita")); // "AITA"
// 8. Union vs any : l'union reste typée
// any       -> aucune vérification, erreurs à l'exécution
// A | B     -> TypeScript force à gérer chaque cas
// 9. Parenthèses obligatoires avec les tableaux
let liste1 = "texte"; // string OU number[]
let liste2 = ["texte", 1]; // tableau de string OU number
console.log(liste1, liste2);
// 10. Type union et narrowing automatique
function longueur(valeur) {
    // string.length et string[].length existent tous les deux -> pas besoin de vérifier
    return valeur.length;
}
console.log(longueur("Aita")); // 4
console.log(longueur(["A", "B"])); // 2
export {};
