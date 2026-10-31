# 4.3 - `forEach()`

`forEach()` exécute une fonction **sur chaque élément** du tableau. Elle sert à produire un **effet de bord** (afficher, envoyer, modifier une variable extérieure), pas à construire un résultat.

```typescript
array.forEach((element, index, array) => void): void
```

---

## 1. Exemple

```typescript
const fruits = ["Mangue", "Banane", "Orange"];

fruits.forEach((fruit) => {
    console.log("Fruit :", fruit);
});
```

Avec l'index et le tableau :

```typescript
fruits.forEach((fruit, index, tableau) => {
    console.log(`${index + 1}. ${fruit} (sur ${tableau.length})`);
});
```

---

## 2. ⚠️ `forEach()` renvoie toujours `undefined`

```typescript
const resultat = fruits.forEach((f) => f.toUpperCase());
console.log(resultat); // undefined
```

Le `return` du callback est **ignoré**. Pour obtenir un résultat :

| Besoin                     | Méthode              |
| :------------------------- | :------------------- |
| Transformer chaque élément | `map()`              |
| Garder certains éléments   | `filter()`           |
| Calculer une valeur        | `reduce()`           |
| Tester                     | `some()` / `every()` |
| Agir sur chaque élément    | `forEach()`          |

---

## 3. ⚠️ On ne peut pas `break`

```typescript
notes.forEach((note) => {
    if (note < 10) return; // sort seulement du callback → la boucle continue
    console.log(note);
});
```

Pour s'arrêter avant la fin, utilisez `for...of` :

```typescript
for (const note of notes) {
    if (note < 10) break;
    console.log(note);
}
```

---

## 4. Accès à l'index

```typescript
["Aita", "Moussa"].forEach((nom, i) => {
    console.log(`${i} : ${nom}`); // 0 : Aita, 1 : Moussa
});
```

Pas d'équivalent de `map` sur un `Set` ou une `Map` avec `forEach` — les signatures diffèrent :

```typescript
map.forEach((valeur, cle) => console.log(cle, valeur)); // Map : (valeur, clé)
```

---

## 5. Tableaux creux

`forEach` **ignore les trous** (les index non définis) :

```typescript
const creux: number[] = [1, , 3];
creux.forEach((v) => console.log(v)); // 1 puis 3 (jamais undefined)
```

---

## 6. `forEach()` vs boucle `for...of`

|                      | `forEach()`                  | `for...of`                  |
| :------------------- | :--------------------------- | :-------------------------- |
| `break` / `continue` | ❌ (return = continue)        | ✅                           |
| `await`              | ⚠️ ne s'attend pas (à éviter) | ✅ (dans une fonction async) |
| Retour               | `undefined`                  | —                           |
| Lisibilité           | ✅ chaînable                  | ✅ contrôlable               |

> Pour du **code asynchrone**, `for...of` + `await` est presque toujours le bon choix.

---

## 7. Points à retenir

- `forEach()` **ne renvoie rien** : ne l'utilisez pas pour construire un tableau.
- Le callback reçoit `(element, index, array)`.
- `return` dans le callback = `continue`, pas `break`.
- Préférez `map` / `filter` / `reduce` quand vous avez besoin d'un **résultat**.
- `forEach` ne modifie pas la longueur du tableau ; évitez d'y ajouter/supprimer des éléments.
