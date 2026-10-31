// reduceRight() : comme reduce(), mais parcourt le tableau de DROITE à GAUCHE
// 1. Concaténation : l'ordre change
let lettres = ["A", "B", "C"];
let gaucheADroite = lettres.reduce((acc, lettre) => acc + lettre, "");
let droiteAGauche = lettres.reduceRight((acc, lettre) => acc + lettre, "");
console.log("reduce (= reduceLeft) :", gaucheADroite); // "ABC"
console.log("reduceRight          :", droiteAGauche); // "CBA"
// 2. Opération non commutative : la soustraction
let nombres = [1, 2, 3];
let soustraction = nombres.reduce((acc, n) => acc - n, 10); // ((10 - 1) - 2) - 3 = 4
let soustractionInverse = nombres.reduceRight((acc, n) => acc - n, 10); // ((10 - 3) - 2) - 1 = 4
console.log("reduce      :", soustraction); // 4
console.log("reduceRight :", soustractionInverse); // 4
// Ici le résultat est identique (addition/soustraction d'entiers), mais l'ORDRE des étapes diffère.
// L'ordre devient visible avec une concaténation ou une construction de chaîne.
// Avec la concaténation, l'ordre est explicite :
let etapes = ["a", "b", "c"];
console.log("reduce      :", etapes.reduce((acc, e) => acc + " -> " + e, "départ"));
console.log("reduceRight :", etapes.reduceRight((acc, e) => acc + " -> " + e, "départ"));
let liste = [1, 2, 3].reduceRight((suivant, valeur) => ({ valeur, suivant }), null);
console.log("Liste chaînée :", JSON.stringify(liste));
// 4. Cas concret : parcourir du dernier au premier (ex : historique, pile undo)
let historique = ["page1", "page2", "page3"];
let dernierVersPremier = historique.reduceRight((acc, page) => {
    acc.push(page);
    return acc;
}, []);
console.log("Historique inversé :", dernierVersPremier);
// 5. ⚠️ Rappel : reduceLeft n'existe pas -> reduce() est déjà "de gauche à droite"
//    reduceLeft = reduce
//    reduceRight = parcours de droite à gauche
console.log("reduce est le reduceLeft :", typeof lettres.reduce === "function");
// 6. Sans valeur initiale, le dernier élément sert d'accumulateur (pour reduceRight)
let sansInit = [1, 2, 3].reduceRight((acc, n) => acc + n);
console.log("Sans valeur initiale :", sansInit); // 6
export {};
