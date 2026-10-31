// 8.1 - Fonctions génériques
// 1. Fonction identité générique avec un paramètre <T>
function identite(valeur) {
    return valeur;
}
const texte = identite("Bonjour TypeScript !"); // T = string
const nombre = identite(42); // T = number
const tableau = identite([1, 2, 3]); // T = number[]
console.log("Texte inféré :", texte.toUpperCase());
console.log("Nombre inféré :", nombre.toFixed(2));
console.log("Tableau inféré :", tableau.length);
// 2. Spécification explicite du type
const booleen = identite(true);
console.log("Booleen explicite :", booleen);
// 3. Fonction générique avec plusieurs types <T, U>
function creerPaire(premier, second) {
    return [premier, second];
}
const paire1 = creerPaire("utilisateur", 101);
const paire2 = creerPaire(true, { role: "admin" });
console.log("Paire 1 :", paire1);
console.log("Paire 2 :", paire2);
// 4. Fonction générique manipulant un tableau
function premierElement(elements) {
    return elements[0];
}
const premierNombre = premierElement([100, 200, 300]);
const premierMot = premierElement(["Alice", "Bob", "Charlie"]);
console.log("Premier nombre :", premierNombre);
console.log("Premier mot :", premierMot);
// 5. Fonction fléchée générique
const inverserTableau = (elements) => {
    return [...elements].reverse();
};
const nombresInverses = inverserTableau([1, 2, 3, 4, 5]);
const motsInverses = inverserTableau(["un", "deux", "trois"]);
console.log("Nombres inversés :", nombresInverses);
console.log("Mots inversés :", motsInverses);
// 6. Fusion générique de deux objets simples
function fusionner(obj1, obj2) {
    return { ...obj1, ...obj2 };
}
const profil = fusionner({ nom: "Aita", age: 21 }, { role: "Developpeuse", active: true });
console.log("Profil fusionné :", profil.nom, "-", profil.role);
export {};
