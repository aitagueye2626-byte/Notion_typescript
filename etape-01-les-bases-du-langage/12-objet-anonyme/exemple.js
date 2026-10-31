// 1. Type objet anonyme : on précise les types directement après ":"
let etudiant = {
    nom: "Aita",
    age: 21
};
// 2. Type objet anonyme avec une propriété optionnelle (?)
let livre = {
    titre: "Apprendre TypeScript"
    // auteur est facultatif grâce au "?"
};
console.log("Étudiant :", etudiant.nom, "-", etudiant.age, "ans");
console.log("Livre :", livre.titre);
export {};
