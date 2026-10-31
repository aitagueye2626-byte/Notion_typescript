// 1. Enum numérique (numéroté automatiquement : 0, 1, 2)
var StatutCommande;
(function (StatutCommande) {
    StatutCommande[StatutCommande["EnAttente"] = 0] = "EnAttente";
    StatutCommande[StatutCommande["EnCours"] = 1] = "EnCours";
    StatutCommande[StatutCommande["Livree"] = 2] = "Livree"; // 2
})(StatutCommande || (StatutCommande = {}));
let maCommande = StatutCommande.Livree;
console.log("Statut commande (numéro) :", maCommande);
// 2. Enum avec du texte (String Enum)
var RoleUtilisateur;
(function (RoleUtilisateur) {
    RoleUtilisateur["Admin"] = "Administrateur";
    RoleUtilisateur["Client"] = "Client";
    RoleUtilisateur["Vendeur"] = "Vendeur";
})(RoleUtilisateur || (RoleUtilisateur = {}));
let monRole = RoleUtilisateur.Client;
console.log("Mon rôle :", monRole);
export {};
