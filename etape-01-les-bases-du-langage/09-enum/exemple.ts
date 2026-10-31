// 1. Enum numérique (numéroté automatiquement : 0, 1, 2)
enum StatutCommande {
    EnAttente, // 0
    EnCours,   // 1
    Livree     // 2
}

let maCommande: StatutCommande = StatutCommande.Livree;
console.log("Statut commande (numéro) :", maCommande);

// 2. Enum avec du texte (String Enum)
enum RoleUtilisateur {
    Admin = "Administrateur",
    Client = "Client",
    Vendeur = "Vendeur"
}

let monRole: RoleUtilisateur = RoleUtilisateur.Client;
console.log("Mon rôle :", monRole);
