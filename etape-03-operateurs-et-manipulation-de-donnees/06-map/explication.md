# 3.6 - `Map`

`Map` est une **structure de dictionnaire** (clé → valeur) native de JavaScript, typée en TypeScript par `Map<K, V>`.

```typescript
let notes = new Map<string, number>(); // K = string (clés), V = number (valeurs)
```

---

## 1. Méthodes principales

| Méthode                             | Rôle                                          | Retour                        |
| :---------------------------------- | :-------------------------------------------- | :---------------------------- |
| `set(cle, valeur)`                  | Ajouter ou mettre à jour                      | La Map elle-même (chaînable)  |
| `get(cle)`                          | Lire une valeur                               | `V \| undefined`              |
| `has(cle)`                          | La clé existe-t-elle ?                        | `boolean`                     |
| `delete(cle)`                       | Supprimer une entrée                          | `boolean` (true si supprimée) |
| `clear()`                           | Tout vider                                    | `void`                        |
| `size`                              | Nombre d'entrées (**propriété**, pas méthode) | `number`                      |
| `keys()` / `values()` / `entries()` | Itérateurs                                    | `IterableIterator<...>`       |
| `forEach(callback)`                 | Parcours                                      | `void`                        |

---

## 2. Exemple complet

```typescript
let notes = new Map<string, number>();

notes.set("Aita", 18);
notes.set("Moussa", 15);

console.log(notes.get("Aita"));   // 18
console.log(notes.has("Moussa")); // true
console.log(notes.size);          // 2

notes.delete("Moussa");           // true
notes.size;                       // 1
```

---

## 3. Parcours

```typescript
// forEach : (valeur, cle, map)
notes.forEach((note, eleve) => console.log(eleve, note));

// for...of sur les entrées [cle, valeur]
for (const [eleve, note] of notes) {
    console.log(eleve, note);
}

// Convertir en tableau
const eleves: string[] = [...notes.keys()];
const notesTab: number[] = [...notes.values()];
```

---

## 4. `Map` vs objet `{ }`

| Critère             | Objet `{ }`                               | `Map`                                  |
| :------------------ | :---------------------------------------- | :------------------------------------- |
| Type des clés       | `string` / `number` / `symbol` uniquement | **n'importe quel type** (objet, date…) |
| Compter les entrées | `Object.keys(o).length`                   | `map.size`                             |
| Supprimer           | `delete o.cle`                            | `map.delete(cle)`                      |
| Ordre               | Ordre d'insertion (string)                | Ordre d'insertion garanti              |
| Tester une clé      | `"cle" in o`                              | `map.has(cle)`                         |
| Définition du type  | `{ [k: string]: V }` ou `Record<K, V>`    | `Map<K, V>`                            |

> 💡 **Règle simple** : dictionnaire dont les clés sont connues → `Record` ; clés dynamiques / objets comme clés / besoin de `size` → `Map`.

---

## 5. Attention au typage avec `strict`

```typescript
const note = notes.get("Inconnu"); // type : number | undefined
// notes.get("Inconnu") + 1        // ❌ erreur : peut être undefined
console.log((note ?? 0) + 1);      // ✅
```

---

## 6. Initialisation à partir d'un tableau

```typescript
const paires: [string, number][] = [["Aita", 18], ["Moussa", 15]];
const map = new Map(paires);
```

Et l'inverse :

```typescript
const tab: [string, number][] = [...map.entries()];
```
