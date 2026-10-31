// Map : un dictionnaire avec de vraies méthodes (size, has, delete, iteration)
// 1. Créer une Map<K, V> : K = type des clés, V = type des valeurs
let notes = new Map();
// 2. Ajouter / modifier -> set()
notes.set("Aita", 18);
notes.set("Moussa", 15);
notes.set("Fatou", 17);
console.log("Nombre d'élèves :", notes.size); // 3
// 3. Lire -> get() renvoie V | undefined
console.log("Note d'Aita :", notes.get("Aita"));
console.log("Note d'Ousmane :", notes.get("Ousmane")); // undefined
// 4. Vérifier l'existence d'une clé -> has()
console.log("Moussa est dans la Map ?", notes.has("Moussa"));
// 5. Supprimer -> delete() renvoie true si la clé existait
notes.delete("Moussa");
console.log("Après suppression, Moussa est là ?", notes.has("Moussa"));
console.log("Taille :", notes.size);
// 6. Parcourir une Map (ordre d'insertion conservé)
notes.forEach((note, eleve) => {
    console.log(`${eleve} -> ${note}`);
});
// for...of sur les entrées : [cle, valeur]
for (const [eleve, note] of notes) {
    console.log("Entrée :", eleve, note);
}
// 7. Obtenir les clés et les valeurs
console.log("Élèves :", [...notes.keys()]);
console.log("Notes :", [...notes.values()]);
console.log("Entrées :", [...notes.entries()]);
// 8. Avantage clé par rapport à un objet : une Map peut utiliser n'importe quel type de clé
let villes = new Map();
villes.set(221, "Dakar");
villes.set(33, "Paris");
console.log("Ville du 221 :", villes.get(221));
// 9. Vider la Map
notes.clear();
console.log("Après clear, taille :", notes.size);
export {};
