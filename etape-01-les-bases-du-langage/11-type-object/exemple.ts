// 1. Créer un objet avec des propriétés (clé: valeur)
let voiture = {
    marque: "Toyota",
    annee: 2024
};

// 2. Lire et modifier les propriétés d'un objet
console.log("Marque :", voiture.marque);
voiture.annee = 2025;
console.log("Année modifiée :", voiture.annee);

// 3. Le type générique "object" (accepte n'importe quel objet, mais pas un primitif)

let donnees: object = { ville: "Dakar", pays: "Sénégal" };

console.log("Objet générique :", donnees);
console.log("Clés de voiture :", Object.keys(voiture));
