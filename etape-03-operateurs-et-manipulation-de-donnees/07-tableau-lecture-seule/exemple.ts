// Tableau en lecture seule : readonly T[] et ReadonlyArray<T>

// 1. Tableau modifiable (normal)
let fruitsModifiables: string[] = ["Mangue", "Banane"];
fruitsModifiables.push("Ananas"); // ✅ autorisé
fruitsModifiables[0] = "Papaye";  // ✅ autorisé
console.log("Modifiable :", fruitsModifiables);

// 2. Tableau en lecture seule avec readonly
let fruitsFiges: readonly string[] = ["Mangue", "Banane"];
// fruitsFiges.push("Ananas");   // ❌ Error: Property 'push' does not exist on type 'readonly string[]'
// fruitsFiges[0] = "Papaye";    // ❌ Error: Index signature only permits reading
console.log("Lecture seule :", fruitsFiges);
console.log("Élément 0 :", fruitsFiges[0]); // ✅ la lecture reste possible

// 3. Syntaxe équivalente avec ReadonlyArray<T>
let notesFixes: ReadonlyArray<number> = [18, 15, 17];
// notesFixes.pop();              // ❌
console.log("Notes :", notesFixes);

// 4. Les méthodes qui ne modifient PAS le tableau restent disponibles
//    map, filter, slice, concat, includes, indexOf, reduce, join...
let doubles = notesFixes.map((n) => n * 2);
console.log("Doublées (nouveau tableau) :", doubles);
console.log("Contient 15 ?", notesFixes.includes(15));
console.log("Rejoint :", notesFixes.join(" - "));

// 5. On peut TOUJOURS assigner un tableau modifiable à une variable readonly
let tableauNormal: number[] = [1, 2, 3];
let vueReadonly: readonly number[] = tableauNormal; // ✅ (restriction d'accès)
// vueReadonly.push(4);                               // ❌ interdit via cette vue
tableauNormal.push(4);                                // ✅ mais possible via l'original
console.log("Vue readonly :", vueReadonly);

// 6. L'inverse est INTERDIT : un readonly ne peut pas devenir modifiable
// let modifiable2: number[] = vueReadonly; // ❌ Error: readonly cannot be assigned

// 7. Pour modifier, il faut copier le tableau
let copie = [...fruitsFiges];
copie.push("Ananas");
console.log("Copie modifiée :", copie);
console.log("Original intact :", fruitsFiges);

// 8. Cas concret : un paramètre de fonction qu'on s'interdit de modifier
function afficherTout(elements: readonly string[]): void {
    // elements.pop(); // ❌ impossible : on garantit à l'appelant qu'il ne sera pas modifié
    elements.forEach((e) => console.log("Élément :", e));
}
afficherTout(fruitsFiges);

// 9. readonly sur un tableau de tuples
let coordonnees: readonly [number, number][] = [[10, 20], [30, 40]];
console.log("Coordonnées :", coordonnees);
