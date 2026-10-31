// unshift() : AJOUTE un ou plusieurs éléments au DÉBUT du tableau (modifie le tableau)
// Renvoie la NOUVELLE LONGUEUR du tableau
// 1. Ajouter un élément au début
let fruits = ["Banane", "Orange"];
let nouvelleLongueur = fruits.unshift("Mangue");
console.log("Nouvelle longueur :", nouvelleLongueur); // 3
console.log("Tableau :", fruits); // ["Mangue", "Banane", "Orange"]
// 2. Ajouter plusieurs éléments d'un coup (dans l'ordre donné)
let file = ["Fatou"];
file.unshift("Aita", "Moussa");
console.log("File :", file); // ["Aita", "Moussa", "Fatou"]
// 3. Le tableau d'origine est MODIFIÉ, tous les index sont décalés
console.log("Index 0 :", file[0]); // "Aita"
// 4. Différence avec push() : push ajoute à la FIN, unshift au DÉBUT
let exemple = [];
exemple.push("fin"); // ["fin"]
exemple.unshift("début"); // ["début", "fin"]
console.log("Exemple :", exemple);
// 5. Utiliser la longueur retournée
let notes = [12, 15];
if (notes.unshift(18) === 3) {
    console.log("Le tableau contient maintenant 3 notes");
}
// 6. ⚠️ Performance : unshift() est LENT sur les grands tableaux
//    Tous les éléments doivent être décalés d'un index (O(n)).
//    Pour ajouter fréquemment au début, préférez un tableau construit à l'envers
//    puis reverse(), ou le spread [...nouveaux, ...existants].
// 7. Version immuable : ne pas muter l'original
let original = [2, 3];
let avecPremier = [1, ...original];
console.log("Original intact :", original); // [2, 3]
console.log("Avec premier    :", avecPremier); // [1, 2, 3]
// 8. Cas concret : ajouter un nouvel élément en tête d'historique
let historique = ["page2", "page3"];
let pageCourante = "page1";
historique = [pageCourante, ...historique];
console.log("Historique :", historique); // ["page1", "page2", "page3"]
// 9. ⚠️ unshift() est impossible sur un tableau readonly
let fige = [2, 3];
export {};
// fige.unshift(1); // ❌ Property 'unshift' does not exist on type 'readonly number[]'
// 10. Récapitulatif des ajouts
// push()    -> ajoute à la FIN     (rapide)
// unshift() -> ajoute au DÉBUT     (lent)
