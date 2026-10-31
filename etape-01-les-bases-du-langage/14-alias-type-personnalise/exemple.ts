// 1. Créer un type personnalisé (Alias) pour un objet
type Eleve = {
    nom: string;
    note: number;
};

// On réutilise le type "Eleve" autant de fois qu'on veut !
let eleve1: Eleve = { nom: "Aita", note: 18 };
let eleve2: Eleve = { nom: "Moussa", note: 15 };

// 2. Créer un type personnalisé pour un choix de valeurs
type Niveau = "Débutant" | "Intermédiaire" | "Avancé";

let monNiveau: Niveau = "Avancé";

console.log("Élève 1 :", eleve1.nom, "- Note :", eleve1.note);
console.log("Élève 2 :", eleve2.nom, "- Note :", eleve2.note);
console.log("Niveau :", monNiveau);

