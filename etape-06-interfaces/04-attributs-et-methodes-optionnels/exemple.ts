// Attributs et méthodes optionnels dans une interface : le symbole ?

interface Formulaire {
    nom: string;            // obligatoire
    email?: string;         // optionnel (string | undefined)
    telephone?: string;     // optionnel
    valider?: () => boolean; // méthode optionnelle
}

// 1. Un objet avec seulement les champs obligatoires est valide
let f1: Formulaire = { nom: "Aita" };
console.log("F1 :", f1);

// 2. On peut fournir les champs optionnels
let f2: Formulaire = {
    nom: "Moussa",
    email: "moussa@exemple.com"
};
console.log("F2 :", f2);

// 3. Méthode optionnelle : il faut vérifier avant de l'appeler
function soumettre(formulaire: Formulaire): boolean {
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
let formulaireFatou: Formulaire = { nom: "Fatou" };
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

// 7. Interface avec méthodes obligatoires ET optionnelles
interface Compte {
    id: number;
    nom: string;
    verifierMotDePasse(motDePasse: string): boolean; // obligatoire
    fermer?(): void;                                  // optionnel
}

let compte: Compte = {
    id: 1,
    nom: "Aita",
    verifierMotDePasse: (mdp) => mdp === "secret"
};
console.log("Mot de passe ok ?", compte.verifierMotDePasse("secret"));
compte.fermer?.(); // pas d'erreur si absent

// 8. Fonction qui complète les options par défaut (pattern config)
interface Options {
    vitesse?: number;
    couleur?: string;
    mode?: "clair" | "sombre";
}

function initialiser(options: Options = {}): Required<Options> {
    return {
        vitesse: options.vitesse ?? 1,
        couleur: options.couleur ?? "bleu",
        mode: options.mode ?? "clair"
    };
}

console.log("Par défaut :", initialiser());
console.log("Personnalisé :", initialiser({ mode: "sombre", vitesse: 3 }));

// 9. Partial<T> : rendre TOUTES les propriétés optionnelles
interface Utilisateur {
    id: number;
    nom: string;
    email: string;
}

function mettreAJour(id: number, changements: Partial<Utilisateur>): void {
    console.log("Mise à jour de", id, ":", changements);
}
mettreAJour(1, { email: "nouveau@exemple.com" }); // ✅ pas besoin de id ni nom

// 10. Required<T> : rendre toutes les propriétés obligatoires
type UtilisateurComplet = Required<Partial<Utilisateur>>;
let complet: UtilisateurComplet = { id: 1, nom: "Aita", email: "a@b.com" };
console.log("Complet :", complet);
