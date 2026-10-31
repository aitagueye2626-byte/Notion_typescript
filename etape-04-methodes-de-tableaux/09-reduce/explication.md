# 4.9 - `reduce()` (et `reduceRight`)

`reduce()` parcourt le tableau et **condense tous ses éléments en une seule valeur** : un nombre (somme), un texte, un objet, un tableau…

```typescript
array.reduce((accumulateur, element, index, array) => nouveauAccumulateur, valeurInitiale): U
```

| Paramètre        | Rôle                                                           |
| :--------------- | :------------------------------------------------------------- |
| `accumulateur`   | La valeur accumulée jusqu'ici (au départ = `valeurInitiale`)   |
| `element`        | L'élément courant                                              |
| `valeurInitiale` | Valeur de départ de l'accumulateur (**fortement recommandée**) |

---

## 1. Somme et moyenne

```typescript
const notes = [18, 15, 17, 12];

const total = notes.reduce((somme, note) => somme + note, 0);       // 62
const moyenne = notes.reduce((s, n) => s + n, 0) / notes.length;    // 15.5
```

---

## 2. Maximum / minimum

```typescript
const max = notes.reduce((m, n) => (n > m ? n : m), notes[0]);
```

---

## 3. Accumulateur = objet

```typescript
const fruits = ["mangue", "banane", "mangue"];

const compteur = fruits.reduce<Record<string, number>>((acc, fruit) => {
    acc[fruit] = (acc[fruit] ?? 0) + 1;
    return acc;
}, {});
// { mangue: 2, banane: 1 }
```

```typescript
// Indexer un tableau d'objets par une clé
const parNom = classe.reduce<Record<string, number>>((acc, e) => {
    acc[e.nom] = e.note;
    return acc;
}, {});
```

---

## 4. Accumulateur = tableau

```typescript
// Aplatir
[[1, 2], [3, 4]].reduce<number[]>((acc, l) => acc.concat(l), []); // [1, 2, 3, 4]

// Filtrer + transformer en une passe
const nomsMajeurs = classe.reduce<string[]>((acc, e) => {
    if (e.note >= 10) acc.push(e.nom);
    return acc;
}, []);
```

---

## 5. Toujours préciser le type de l'accumulateur

Le générique `<U>` sur `reduce<U>` évite les erreurs de typage :

```typescript
notes.reduce<number>((acc, n) => acc + n, 0);
fruits.reduce<Record<string, number>>((acc, f) => ({ ...acc }), {});
```

Sans valeur initiale, TypeScript infère l'accumulateur comme `T` (le type de l'élément), ce qui **interdit** un accumulateur d'un autre type.

---

## 6. ⚠️ Piège : pas de valeur initiale

```typescript
[].reduce((a, b) => a + b); // ❌ TypeError: Reduce of empty array with no initial value
```

- Sur un tableau vide → **exception**
- Sur un tableau non vide → le premier élément devient l'accumulateur et la boucle démarre à l'index 1

👉 **Bonne pratique : toujours fournir la valeur initiale** (`0`, `""`, `{}`, `[]`).

---

## 7. `reduceRight` / `reduceLeft`

`reduceLeft` **n'existe pas** en JavaScript : c'est `reduce()`, qui va de **gauche à droite**.

`reduceRight()` fait exactement la même chose mais **de droite à gauche** :

```typescript
const lettres = ["A", "B", "C"];

lettres.reduce((acc, l) => acc + l, "");      // "ABC"  (reduce = reduceLeft)
lettres.reduceRight((acc, l) => acc + l, ""); // "CBA"  (reduceRight)
```

| Méthode                 | Sens            | Résultat sur `["A", "B", "C"]` |
| :---------------------- | :-------------- | :----------------------------- |
| `reduce` (= reduceLeft) | gauche → droite | `"ABC"`                        |
| `reduceRight`           | droite → gauche | `"CBA"`                        |

Pour l'addition et la concaténation, le résultat est identique (l'ordre change seulement pour les opérations non commutatives comme `-`, `/` ou la concaténation de chaînes).

```typescript
[1, 2, 3].reduce((a, b) => a - b, 10);      // 10 - 1 - 2 - 3 = 4
[1, 2, 3].reduceRight((a, b) => a - b, 10); // 10 - 3 - 2 - 1 = 4 (différent ici !)
```

---

## 8. `reduce()` vs les autres méthodes

| Besoin                                    | Méthode          |
| :---------------------------------------- | :--------------- |
| Transformer chaque élément                | `map`            |
| Garder certains éléments                  | `filter`         |
| Calculer une seule valeur (somme, objet…) | `reduce`         |
| Tester une condition                      | `some` / `every` |

> 💡 Si votre `reduce` ne fait que `map` ou `filter`, utilisez `map` ou `filter` — c'est plus lisible.
