// Un objet "employe" qui contient un autre objet "adresse"
let employe = {
    nom: "Aita",
    adresse: {
        ville: "Dakar",
        pays: "Sénégal"
    }
};
// Pour lire une valeur imbriquée, on enchaîne les points (.)
console.log("Nom :", employe.nom);
console.log("Ville :", employe.adresse.ville);
console.log("Pays :", employe.adresse.pays);
export {};
