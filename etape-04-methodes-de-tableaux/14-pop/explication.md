# 4.14 - `pop()`

`pop()` **supprime le dernier élément** d'un tableau et **le renvoie**. Elle **modifie** le tableau d'origine.

```typescript
array.pop(): T | undefined
```

---

## 1. Exemple

```typescript
const fruits = ["Mangue", "Banane", "Orange"];
const dernier = fruits.pop();

console.log(dernier); // "Orange"
console.log(fruits);  // ["Mangue", "Banane"]
```

---

## 2. Tableau vide → `undefined`

```typescript
const vide: string[] = [];
vide.pop(); // undefined (aucune erreur)
```

C'est pour cela que le type de retour est **`T | undefined`**, pas `T` :

```typescript
const x = fruits.pop();
// x.toUpperCase();          // ❌ Object is possibly 'undefined'
if (x) x.toUpperCase();      // ✅
const y = fruits.pop() ?? ""; // ✅ valeur de secours
```

---

## 3. `pop()` dans les structures de pile (LIFO)

`pop()` est **la** méthode de la pile (Last In, First Out) :

```typescript
const pile: string[] = [];
pile.push("page1");
pile.push("page2");
pile.push("page3");

pile[pile.length - 1]; // "page3" (sommet de la pile)
pile.pop();            // retire "page3"
pile.pop();            // retire "page2"
```

Cas concrets : bouton **undo**, navigation **retour**, historique, parsing, algorithme de backtracking.

---

## 4. `pop()` vs `shift()` vs `splice()`

| Méthode        | Retire          | Modifie le tableau | Retour                        |
| :------------- | :-------------- | :----------------: | :---------------------------- |
| `pop()`        | le **dernier**  |         ✅          | `T \| undefined`              |
| `shift()`      | le **premier**  |         ✅          | `T \| undefined`              |
| `splice(i, 1)` | à l'**index i** |         ✅          | `T[]` (éléments supprimés)    |
| `slice(0, -1)` | —               |         ❌          | `T[]` (copie sans le dernier) |

> 💡 `pop()` est **rapide** (O(1)) ; `shift()` est **lent** (O(n), car il faut décaler tous les index).

---

## 5. Version immuable

Pour ne pas modifier le tableau d'origine :

```typescript
const original = [1, 2, 3];
const sansDernier = original.slice(0, -1); // [1, 2]
// ou avec ES2023 :
const sansDernier2 = original.toSpliced(-1, 1);
```

---

## 6. Points à retenir

- `pop()` **mute** le tableau : à éviter sur un état partagé (React/Redux) ou un `readonly T[]`.
- Sur un tableau vide → `undefined`, pas d'exception.
- Retourne l'élément retiré, ce qui permet de l'utiliser directement.
- Ne pas confondre avec `shift()`, qui retire le **premier** élément.
