// Chaînage optionnel (?.) : accéder à une propriété sans craindre null ou undefined

// 1. Le problème : accéder à une propriété d'un objet potentiellement absent
interface Adresse {
    rue: string;
    ville: string;
}

interface Utilisateur {
    nom: string;
    adresse?: Adresse;
}

let avecAdresse: Utilisateur = {
    nom: "Aita",
    adresse: { rue: "Rue 10", ville: "Dakar" }
};

let sansAdresse: Utilisateur = { nom: "Moussa" };

// 2. Sans chaînage optionnel : il faut vérifier manuellement
if (avecAdresse.adresse) {
    console.log("Ville :", avecAdresse.adresse.ville);
}

// 3. Avec le chaînage optionnel : plus concis
console.log("Ville :", avecAdresse.adresse?.ville);  // "Dakar"
console.log("Ville :", sansAdresse.adresse?.ville);  // undefined (pas d'erreur)

// 4. Chaîner plusieurs niveaux
interface Entreprise {
    nom: string;
    siege?: {
        pays?: {
            code?: string;
        };
    };
}

let entreprise: Entreprise = { nom: "Aita Tech" };
console.log("Code pays :", entreprise.siege?.pays?.code); // undefined

// 5. Combiner avec ?? pour une valeur par défaut
console.log("Code pays :", entreprise.siege?.pays?.code ?? "Inconnu");

// 6. Chaînage sur un tableau : accéder au premier élément
let liste: string[] | undefined;
console.log("Premier :", liste?.[0]); // undefined

let notes: number[] | null = [18, 15];
console.log("Première note :", notes?.[0]); // 18

// 7. Chaînage sur un index dynamique
let dictionnaire: Record<string, number> | undefined;
console.log("Valeur :", dictionnaire?.["maths"]); // undefined

// 8. Chaînage sur une méthode
interface Service {
    envoyer?: (message: string) => void;
}

let service: Service = {};
service.envoyer?.("Bonjour"); // pas d'erreur, rien ne se passe

let serviceComplet: Service = { envoyer: (m) => console.log("Envoyé :", m) };
serviceComplet.envoyer?.("Aita"); // "Envoyé : Aita"

// 9. Chaînage sur un appel de fonction
function obtenirUtilisateur(): Utilisateur | undefined {
    return undefined;
}
console.log("Nom :", obtenirUtilisateur()?.nom); // undefined

// 10. ⚠️ Attention : le chaînage s'arrête au premier undefined
// Objet nul
function nomOuDefaut(u: Utilisateur | null): string {
    return u?.nom ?? "Invité";
}
console.log("Nom :", nomOuDefaut(null)); // "Invité"
// Ici le paramètre est de type Utilisateur | null : si on recevait un objet sans
// "adresse", u?.nom renverrait quand même son nom (seul null/undefined arrête le chaînage).

// 11. ⚠️ Ne pas abuser : ?. ne protège pas d'une erreur de logique
// Si "adresse" devrait toujours exister, une erreur explicite est meilleure
function villeObligatoire(u: Utilisateur): string {
    if (!u.adresse) {
        throw new Error("Adresse manquante");
    }
    return u.adresse.ville;
}
console.log(villeObligatoire(avecAdresse));

// 12. ⚠️ ?. ne fonctionne pas sur une variable non déclarée
// variableInexistante?.nom; // ❌ Cannot find name

// 13. Comparaison : ancien style vs chaînage optionnel
let utilisateur: Utilisateur | undefined = sansAdresse;

// Ancien style
let ancienneVille = utilisateur && utilisateur.adresse && utilisateur.adresse.ville;
console.log("Ancien style :", ancienneVille);

// Style moderne
let ville = utilisateur?.adresse?.ville;
console.log("Chaînage :", ville);
