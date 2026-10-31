// Attribut en lecture seule dans une interface : readonly

interface Utilisateur {
    readonly id: number;   // ne peut pas être modifié après création
    nom: string;           // modifiable
}

let aita: Utilisateur = { id: 1, nom: "Aita" };

// 1. Lecture : autorisée
console.log("ID :", aita.id);
console.log("Nom :", aita.nom);

// 2. Modification d'une propriété normale : autorisée
aita.nom = "Aita Gueye";
console.log("Nouveau nom :", aita.nom);

// 3. Modification d'une propriété readonly : INTERDITE
// aita.id = 2; // ❌ Cannot assign to 'id' because it is a read-only property

// 4. L'objet doit TOUJOURS être initialisé avec les propriétés readonly
let moussa: Utilisateur = { id: 2, nom: "Moussa" };
console.log("Moussa :", moussa.id);

// 5. readonly sur un tableau : le tableau ne peut plus être modifié
interface Panier {
    readonly articles: readonly string[];
}

let panier: Panier = { articles: ["Cahier", "Stylo"] };
console.log("Articles :", panier.articles);
// panier.articles.push("Gomme");   // ❌ readonly string[]
// panier.articles = ["Rien"];      // ❌ propriété readonly

// 6. readonly ne rend pas l'objet profondément immuable
interface Profil {
    readonly nom: string;
    adresse: { ville: string };
}

let profil: Profil = { nom: "Aita", adresse: { ville: "Dakar" } };
// profil.nom = "X";                  // ❌
profil.adresse.ville = "Thiès";       // ✅ autorisé : readonly ne porte que sur "adresse"
console.log("Ville :", profil.adresse.ville);

// Pour un objet profondément immuable, utiliser Readonly<T> ou des types dédiés
let profilFige: Readonly<Profil> = profil;
// profilFige.nom = "Y";             // ❌
profilFige.adresse.ville = "Saint-Louis"; // ✅ toujours modifiable (shallow)

// 7. readonly avec un index signature
interface Notes {
    readonly [matiere: string]: number;
}
let notes: Notes = { maths: 18 };
console.log("Maths :", notes["maths"]);
// notes["maths"] = 20; // ❌ readonly

// 8. readonly n'a d'effet qu'à la COMPILATION (pas de protection à l'exécution)
//    Pour contourner volontairement la vérification, on passe par un cast :
let brut = aita as { id: number; nom: string };
brut.id = 99;
console.log("Contournement possible à l'exécution :", brut.id, "(l'objet d'origine a bien changé :", aita.id, ")");

// 9. readonly et les tableaux : on peut quand même lire et utiliser les méthodes non mutantes
let liste: readonly number[] = [3, 1, 2];
console.log("Trié (copie) :", [...liste].sort((a, b) => a - b));
console.log("Filtré :", liste.filter((n) => n > 1));

// 10. Cas d'usage : un identifiant qui ne doit jamais changer
interface Commande {
    readonly numero: string;
    statut: "en attente" | "expediee" | "livree";
}

let commande: Commande = { numero: "CMD-001", statut: "en attente" };
commande.statut = "expediee"; // ✅
// commande.numero = "CMD-002"; // ❌
console.log("Commande :", commande);
