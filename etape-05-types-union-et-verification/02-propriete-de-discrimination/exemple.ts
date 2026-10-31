// Propriété de discrimination (discriminated union) :
// chaque membre de l'union possède une propriété commune avec une valeur littérale unique

// 1. Définir les variantes avec une propriété "type"
type PaiementEspeces = {
    type: "especes";
    montant: number;
};

type PaiementCarte = {
    type: "carte";
    montant: number;
    numeroCarte: string;
};

type PaiementMobile = {
    type: "mobile";
    montant: number;
    operateur: "Orange" | "Wave" | "Free";
};

// 2. L'union discriminée
type Paiement = PaiementEspeces | PaiementCarte | PaiementMobile;

// 3. Utilisation : TypeScript réduit automatiquement le type selon "type"
function traiterPaiement(paiement: Paiement): string {
    switch (paiement.type) {
        case "especes":
            // Ici TypeScript sait que paiement est un PaiementEspeces
            return `Espèces : ${paiement.montant} FCFA`;

        case "carte":
            // Ici paiement est un PaiementCarte -> numeroCarte est accessible
            return `Carte ${paiement.numeroCarte.slice(-4)} : ${paiement.montant} FCFA`;

        case "mobile":
            return `${paiement.operateur} : ${paiement.montant} FCFA`;
    }
}

console.log(traiterPaiement({ type: "especes", montant: 5000 }));
console.log(traiterPaiement({ type: "carte", montant: 12000, numeroCarte: "1234567812345678" }));
console.log(traiterPaiement({ type: "mobile", montant: 3000, operateur: "Wave" }));

// 4. Avec if/else : même réduction de type
function afficherPaiement(paiement: Paiement): void {
    if (paiement.type === "carte") {
        console.log("Carte :", paiement.numeroCarte);
    } else if (paiement.type === "mobile") {
        console.log("Opérateur :", paiement.operateur);
    } else {
        // TypeScript sait qu'il ne reste que "especes"
        console.log("Montant :", paiement.montant);
    }
}
afficherPaiement({ type: "mobile", montant: 1000, operateur: "Orange" });

// 5. Accéder à une propriété d'un seul variant SANS vérifier le type -> erreur
function erreur(paiement: Paiement): void {
    // paiement.numeroCarte; // ❌ n'existe pas sur toutes les variantes
    if (paiement.type === "carte") {
        paiement.numeroCarte; // ✅
    }
}
erreur({ type: "especes", montant: 0 });

// 6. Vérification exhaustive avec never
function verifierExhaustif(paiement: Paiement): number {
    switch (paiement.type) {
        case "especes":
        case "carte":
        case "mobile":
            return paiement.montant;
        default:
            // Si on ajoute un nouveau variant sans mettre à jour ce switch,
            // cette ligne provoque une erreur de compilation
            const jamais: never = paiement;
            return jamais;
    }
}
console.log("Montant total :", verifierExhaustif({ type: "especes", montant: 2500 }));

// 7. Cas concret : état d'une requête HTTP
type EtatRequete =
    | { statut: "chargement" }
    | { statut: "succes"; donnees: string[] }
    | { statut: "erreur"; message: string };

function afficherEtat(etat: EtatRequete): void {
    switch (etat.statut) {
        case "chargement":
            console.log("Chargement...");
            break;
        case "succes":
            console.log("Données :", etat.donnees.length);
            break;
        case "erreur":
            console.log("Erreur :", etat.message);
            break;
    }
}

afficherEtat({ statut: "chargement" });
afficherEtat({ statut: "succes", donnees: ["Aita", "Moussa"] });
afficherEtat({ statut: "erreur", message: "Réseau indisponible" });
