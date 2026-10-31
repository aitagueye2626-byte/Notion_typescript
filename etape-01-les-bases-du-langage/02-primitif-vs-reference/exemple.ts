// 1. TYPE PRIMITIF (copie par valeur : indépendants)
let a: number = 10;
let b: number = a; // b copie la valeur 10
b = 20;            // On change b, mais a reste à 10

console.log("Primitif - a :", a); // 10
console.log("Primitif - b :", b); // 20


// 2. TYPE RÉFÉRENCE (copie par adresse : liés !)
let user1 = { nom: "Aita" };
let user2 = user1; // user2 pointe vers le MÊME objet que user1
user2.nom = "Fatou"; // On modifie user2... et user1 change aussi !

console.log("Référence - user1 :", user1.nom); // Fatou
console.log("Référence - user2 :", user2.nom); // Fatou
