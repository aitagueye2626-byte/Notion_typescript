// Attributs et méthodes optionnels dans une interface : le symbole ?
// 1. Un objet avec seulement les champs obligatoires est valide
let f1 = { nom: "Aita" };
console.log("F1 :", f1);
// 2. On peut fournir les champs optionnels
let f2 = {
    nom: "Moussa",
    email: "moussa@exemple.com"
};
console.log("F2 :", f2);
// 3. Méthode optionnelle : il faut vérifier avant de l'appeler
function soumettre(formulaire) {
    if (formulaire.valider) {
        // TypeScript sait que valider existe ici
        return formulaire.valider();
    }
    return true; // pas de validation -> accepté
}
console.log("Soumis :", soumettre({ nom: "Aita" }));
console.log("Soumis :", soumettre({ nom: "Aita", valider: () => false }));
// 4. ⚠️ La méthode optionnelle peut aussi être appelée avec ?.
//    On type la variable au lieu d'un cast, pour que TypeScript garde le contrôle
let formulaireFatou = { nom: "Fatou" };
let resultat = formulaireFatou.valider?.() ?? true;
console.log("Avec chaînage optionnel :", resultat);
// 5. Accéder à une propriété optionnelle donne T | undefined
let email = f1.email;
console.log("Email :", email); // undefined
// console.log(email.toUpperCase()); // ❌ Object is possibly 'undefined'
console.log("Email en majuscules :", email?.toUpperCase() ?? "non renseigné");
// 6. Valeur par défaut à la lecture
let telephone = f2.telephone ?? "Non renseigné";
console.log("Téléphone :", telephone);
let compte = {
    id: 1,
    nom: "Aita",
    verifierMotDePasse: (mdp) => mdp === "secret"
};
console.log("Mot de passe ok ?", compte.verifierMotDePasse("secret"));
compte.fermer?.(); // pas d'erreur si absent
function initialiser(options = {}) {
    return {
        vitesse: options.vitesse ?? 1,
        couleur: options.couleur ?? "bleu",
        mode: options.mode ?? "clair"
    };
}
console.log("Par défaut :", initialiser());
console.log("Personnalisé :", initialiser({ mode: "sombre", vitesse: 3 }));
function mettreAJour(id, changements) {
    console.log("Mise à jour de", id, ":", changements);
}
mettreAJour(1, { email: "nouveau@exemple.com" }); // ✅ pas besoin de id ni nom
let complet = { id: 1, nom: "Aita", email: "a@b.com" };
console.log("Complet :", complet);
export {};
