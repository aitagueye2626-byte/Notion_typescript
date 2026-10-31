// lastIndexOf() : renvoie la DERNIÈRE position d'un élément dans le tableau (ou -1)
let fruits = ["Mangue", "Banane", "Orange", "Mangue", "Papaye"];
// 1. Trouver la dernière position d'un élément
console.log("Mangue :", fruits.lastIndexOf("Mangue")); // 3
console.log("Banane :", fruits.lastIndexOf("Banane")); // 1 (une seule occurrence)
// 2. Comparaison directe avec indexOf
console.log("indexOf(Mangue)     :", fruits.indexOf("Mangue")); // 0 (première)
console.log("lastIndexOf(Mangue) :", fruits.lastIndexOf("Mangue")); // 3 (dernière)
// 3. Si l'élément n'existe pas -> -1
console.log("Ananas :", fruits.lastIndexOf("Ananas")); // -1
// 4. Recherche en REMONTANT à partir d'un index donné
//    On cherche avant l'index 3 (exclu) : la 1re occurrence est donc à 0
console.log("Avant l'index 3 :", fruits.lastIndexOf("Mangue", 2)); // 0
// 5. Un index négatif compte depuis la fin : -1 = dernier élément
console.log("Depuis -1 :", fruits.lastIndexOf("Mangue", -1)); // 3
console.log("Depuis -2 :", fruits.lastIndexOf("Mangue", -2)); // 3
console.log("Depuis -3 :", fruits.lastIndexOf("Mangue", -3)); // 0
// 6. Utilisation : trouver la dernière occurrence d'une lettre dans une chaîne
let phrase = "Bonjour Aita, bonjour Dakar";
console.log("Dernier 'a' :", phrase.lastIndexOf("a")); // position du dernier 'a'
// 7. Utilisation : récupérer l'extension d'un nom de fichier
let fichier = "archive.tar.gz";
let dernierPoint = fichier.lastIndexOf(".");
console.log("Extension :", fichier.slice(dernierPoint + 1)); // "gz"
// 8. Comparaison stricte (===) comme indexOf
let notes = [10, 20, 10];
console.log("10 :", notes.lastIndexOf(10)); // 2
let eleves = [{ nom: "Aita" }, { nom: "Moussa" }];
console.log("Objet identique :", eleves.lastIndexOf(eleves[1])); // 1
console.log("Même contenu    :", eleves.lastIndexOf({ nom: "Moussa" })); // -1
// 10. findLastIndex() : version avec une condition (ES2023)
let positions = [1, 5, 10, 15, 20];
let dernierMultipleDe5 = positions.findLastIndex((n) => n % 5 === 0);
console.log("Dernier multiple de 5 :", dernierMultipleDe5); // 4
// 11. Rappel : -1 = absent, et l'index 0 est une position valide !
let index = fruits.lastIndexOf("Mangue");
if (index !== -1) {
    console.log("Trouvé à l'index", index);
}
export {};
