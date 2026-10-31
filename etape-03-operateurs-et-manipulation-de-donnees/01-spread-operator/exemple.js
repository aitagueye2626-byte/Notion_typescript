// 1. Spread avec des tableaux : fusionner deux listes
let mesFruits = ["Mangue", "Banane"];
let mesLegumes = ["Carotte", "Tomate"];
let listeCourses = [...mesFruits, ...mesLegumes];
console.log("Liste de courses :", listeCourses);
// 2. Spread avec un objet : copier un objet et ajouter une information
let profilBase = { nom: "Aita", pays: "Sénégal" };
let profilComplet = { ...profilBase, metier: "Développeuse" };
console.log("Profil complet :", profilComplet);
export {};
