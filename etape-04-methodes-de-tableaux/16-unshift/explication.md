# 4.16 - `unshift()`

`unshift()` **ajoute un ou plusieurs éléments au début** d'un tableau. Elle **modifie** le tableau d'origine et renvoie sa **nouvelle longueur**.

```typescript
array.unshift(...elements): number
```

---

## 1. Exemple

```typescript
const fruits = ["Banane", "Orange"];
const longueur = fruits.unshift("Mangue");

console.log(longueur); // 3
console.log(fruits);   // ["Mangue", "Banane", "Orange"]
```

Plusieurs éléments (insérés dans l'ordre donné) :

```typescript
const file = ["Fatou"];
file.unshift("Aita", "Moussa");
// ["Aita", "Moussa", "Fatou"]
```

---

## 2. Retour : la nouvelle longueur

Contrairement à `splice()` qui renvoie les éléments supprimés, `unshift()` renvoie un **nombre** :

```typescript
const notes = [12, 15];
notes.unshift(18); // 3  ← la nouvelle taille
```

> En pratique, on ignore presque toujours cette valeur de retour.

---

## 3. `push()` vs `unshift()`

| Méthode             | Ajoute à     | Modifie | Retour            | Complexité |
| :------------------ | :----------- | :-----: | :---------------- | :--------- |
| `push(...items)`    | la **fin**   |    ✅    | Nouvelle longueur | O(1)       |
| `unshift(...items)` | le **début** |    ✅    | Nouvelle longueur | O(n)       |

```typescript
const tab: string[] = [];
tab.push("fin");      // ["fin"]
tab.unshift("début"); // ["début", "fin"]
```

---

## 4. ⚠️ Performance

`unshift()` décale **tous** les éléments existants d'un index → O(n). Sur un grand tableau, c'est coûteux si répété.

Alternatives :

```typescript
// 1. Spread (immuable, même coût mais plus lisible)
const nouveau = [element, ...tableau];

// 2. Construire à l'envers puis reverse() si les ajouts sont fréquents
const inverses: T[] = [];
inverses.push(x); // O(1)
inverses.reverse(); // une seule fois

// 3. Pile LIFO : utiliser push()/pop() au lieu de unshift()/shift()
```

---

## 5. Version immuable

```typescript
const original = [2, 3];
const avecPremier = [1, ...original];   // [1, 2, 3]
// original reste [2, 3]
```

Sur un `readonly T[]`, `unshift()` est **indisponible** ; il faut passer par le spread.

---

## 6. Cas concrets

```typescript
// Ajouter en tête d'historique
historique = [pageCourante, ...historique];

// Préfixer une liste de résultats
const resultats = [...nouveauxResultats, ...anciensResultats];

// Ajouter un en-tête à une liste de lignes
lignes.unshift({ nom: "Nom", note: "Note" });
```

---

## 7. Récapitulatif des 4 méthodes aux extrémités

|           | Ajouter            | Retirer          |
| :-------- | :----------------- | :--------------- |
| **Début** | `unshift()` (lent) | `shift()` (lent) |
| **Fin**   | `push()` (rapide)  | `pop()` (rapide) |
