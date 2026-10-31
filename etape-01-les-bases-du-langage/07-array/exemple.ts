// 1. Syntaxe classique avec crochets : type[]
let fruits: string[] = ["Mangue", "Banane", "Orange"];

// 2. Syntaxe générique : Array<type>
let notes: Array<number> = [15, 18, 12];

// 3. Tableau acceptant plusieurs types : (string | number)[]
let infos: (string | number)[] = ["Aita", 21, "Dakar", 2026];

// 4. Manipuler un tableau
console.log("Premier fruit (index 0) :", fruits[0]); // "Mangue"

fruits[1] = "Fraise";    // Remplace "Banane" par "Fraise"
fruits.push("Ananas");   // Ajoute "Ananas" à la fin du tableau
// fruits.push(100);     // ❌ Erreur TS : interdit d'ajouter un nombre dans string[]

console.log("Tableau fruits modifié :", fruits);
console.log("Nombre de fruits :", fruits.length);
console.log("Tableau notes :", notes);
console.log("Tableau mixte (string | number) :", infos);
