// Destructuration avec les OBJETS : extraire les propriétés d'un objet dans des variables
// 1. Un objet de départ
let utilisateur = {
    nom: "Aita",
    age: 21,
    ville: "Dakar"
};
// --- MÉTHODE 1 : Façon normale (une ligne par propriété) ---
let nomNormal = utilisateur.nom;
let ageNormal = utilisateur.age;
console.log("Façon normale :", nomNormal, "-", ageNormal);
// --- MÉTHODE 2 : Avec destructuration ---
// On écrit les noms de propriétés entre { } et TypeScript les récupère directement
let { nom, age, ville } = utilisateur;
console.log("Avec destructuration :", nom, "-", age, "-", ville);
// 2. Renommer une variable pendant la destructuration
// Syntaxe : { propriete: nouveauNom }
let { nom: prenomUtilisateur } = utilisateur;
console.log("Renommé :", prenomUtilisateur);
let profil = { nom: "Aita" };
let { pays = "Sénégal" } = profil;
console.log("Pays (par défaut) :", pays);
// 4. Renommer + valeur par défaut en même temps
let { metier: profession = "Étudiante" } = profil;
console.log("Métier (renommé + défaut) :", profession);
// 5. Destructuration imbriquée
let commande = {
    numero: 42,
    client: {
        prenom: "Moussa",
        adresse: { villeLivraison: "Thiès" }
    }
};
let { client: { prenom, adresse: { villeLivraison } } } = commande;
console.log("Client :", prenom, "- Livraison à :", villeLivraison);
function afficherProduit({ libelle, prix }) {
    console.log("Produit :", libelle, "- Prix :", prix, "FCFA");
}
afficherProduit({ libelle: "Cahier", prix: 1500 });
// 7. Attention : la destructuration fait une COPIE des valeurs, pas une référence
let { nom: nomCopie } = utilisateur;
nomCopie = "Fatou";
console.log("Objet original intact :", utilisateur.nom);
export {};
