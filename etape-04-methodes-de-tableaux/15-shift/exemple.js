// shift() : SUPPRIME et RENVOIE le PREMIER élément du tableau (modifie le tableau)
// 1. Retirer le premier élément
let file = ["Aita", "Moussa", "Fatou"];
let premier = file.shift();
console.log("Élément retiré :", premier); // "Aita"
console.log("File après shift :", file); // ["Moussa", "Fatou"]
// 2. Le tableau d'origine est MODIFIÉ et tous les index sont décalés
console.log("Longueur :", file.length); // 2
console.log("Nouvel index 0 :", file[0]); // "Moussa"
// 3. ⚠️ Sur un tableau vide, shift() renvoie undefined (sans erreur)
let vide = [];
console.log("Sur tableau vide :", vide.shift()); // undefined
// 4. Avec "strict", le type de retour est T | undefined
let suivant = file.shift();
// console.log(suivant.toUpperCase()); // ❌ Object is possibly 'undefined'
if (suivant) {
    console.log("Suivant en majuscules :", suivant.toUpperCase());
}
console.log("Après le 2e shift :", file); // ["Fatou"]
// 5. Utilisation en file d'attente (FIFO : First In, First Out)
let queue = [];
queue.push("Client 1");
queue.push("Client 2");
queue.push("Client 3");
while (queue.length > 0) {
    let client = queue.shift();
    console.log("Client servi :", client);
}
console.log("File vide :", queue); // []
// 6. Utiliser le résultat directement avec une valeur par défaut
let notes = [18, 15, 12];
let premiereNote = notes.shift() ?? 0;
console.log("Première note :", premiereNote); // 18
// 7. ⚠️ Performance : shift() est LENT sur les grands tableaux
//    Tous les éléments doivent être décalés d'un index (O(n)).
//    Pour une vraie file, préférez une Map, un index de tête, ou une librairie dédiée :
let indexTete = 0;
let grandTableau = Array.from({ length: 1000 }, (_, i) => i);
let tete = grandTableau[indexTete]; // lecture O(1)
indexTete++; // "consommer" l'élément sans décaler
// 8. Version immuable : ne pas muter l'original
let original = [1, 2, 3];
let sansPremier = original.slice(1); // copie sans le premier
console.log("Original intact :", original); // [1, 2, 3]
console.log("Sans premier    :", sansPremier); // [2, 3]
// 9. ⚠️ shift() est impossible sur un tableau readonly
let fige = [1, 2, 3];
export {};
// fige.shift(); // ❌ Property 'shift' does not exist on type 'readonly number[]'
// 10. shift() vs pop()
// shift -> retire le PREMIER (lent : décale tout)
// pop   -> retire le DERNIER (rapide)
