// 1. Copier un objet proprement avec { ... }
let personneOriginale = { nom: "Aita" };
let personneCopie = { ...personneOriginale }; // Vraie copie indépendante
personneCopie.nom = "Fatou"; // On modifie la copie
console.log("Original :", personneOriginale.nom); // Reste "Aita" !
console.log("Copie :", personneCopie.nom); // Devient "Fatou"
export {};
