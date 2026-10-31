// pop() : SUPPRIME et RENVOIE le DERNIER élément du tableau (modifie le tableau)
// 1. Retirer le dernier élément
let fruits = ["Mangue", "Banane", "Orange"];
let dernier = fruits.pop();
console.log("Élément retiré :", dernier); // "Orange"
console.log("Tableau après pop :", fruits); // ["Mangue", "Banane"]
// 2. Le tableau d'origine est MODIFIÉ (méthode mutante)
console.log("Longueur :", fruits.length); // 2
// 3. ⚠️ Sur un tableau vide, pop() renvoie undefined (sans erreur)
let vide = [];
let rien = vide.pop();
console.log("Sur tableau vide :", rien); // undefined
// 4. Avec "strict", le type de retour est T | undefined -> il faut vérifier
let peutEtreUndefined = fruits.pop();
// console.log(peutEtreUndefined.toUpperCase()); // ❌ Object is possibly 'undefined'
if (peutEtreUndefined) {
    console.log("En majuscules :", peutEtreUndefined.toUpperCase());
}
console.log("Après le 2e pop :", fruits); // ["Mangue"]
// 5. Utilisation en pile (LIFO : Last In, First Out)
let pile = [];
pile.push("page1");
pile.push("page2");
pile.push("page3");
console.log("Page courante :", pile[pile.length - 1]); // "page3"
let pageQuittee = pile.pop(); // quitter la page
console.log("Retour à :", pile[pile.length - 1]); // "page2"
console.log("Page quittée :", pageQuittee); // "page3"
// 6. Utiliser le résultat directement
let notes = [10, 12, 18];
let derniereNote = notes.pop() ?? 0;
console.log("Dernière note :", derniereNote); // 18
// 7. Version immuable : ne pas muter l'original
let original = [1, 2, 3];
let sansDernier = original.slice(0, -1); // copie sans le dernier
console.log("Original intact :", original); // [1, 2, 3]
console.log("Sans dernier    :", sansDernier); // [1, 2]
// 8. ⚠️ pop() est impossible sur un tableau readonly
let fige = [1, 2, 3];
export {};
// fige.pop(); // ❌ Property 'pop' does not exist on type 'readonly number[]'
// 9. pop() vs shift()
// pop   -> retire le DERNIER  (rapide)
// shift -> retire le PREMIER  (coûteux : tous les index sont décalés)
