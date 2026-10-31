// Une variable de type "unknown" peut recevoir n'importe quoi
let saisieUtilisateur: unknown = "bonjour aita";

// ❌ Interdit directement : TypeScript refuse car il ne sait pas encore que c'est un texte
// console.log(saisieUtilisateur.toUpperCase());

// ✅ Autorisé : on vérifie d'abord que c'est bien un texte ("string") avec typeof
if (typeof saisieUtilisateur === "string") {
    console.log("Texte en majuscules :", saisieUtilisateur.toUpperCase());
}
