# 4.2 - `lastIndexOf()`

`lastIndexOf()` renvoie la position de la **dernière occurrence** d'un élément, ou **`-1`** s'il est absent. C'est le miroir de `indexOf()`, qui cherche depuis le début.

```typescript
array.lastIndexOf(element, indexDeDepart?): number
```

---

## 1. Exemple

```typescript
const fruits = ["Mangue", "Banane", "Orange", "Mangue"];

fruits.indexOf("Mangue");     // 0  (première)
fruits.lastIndexOf("Mangue"); // 3  (dernière)

fruits.lastIndexOf("Ananas"); // -1 (absent)
```

---

## 2. `indexOf()` vs `lastIndexOf()`

|             | `indexOf()`                       | `lastIndexOf()`                     |
| :---------- | :-------------------------------- | :---------------------------------- |
| Parcours    | début → fin                       | **fin → début**                     |
| Renvoie     | première position                 | **dernière** position               |
| Absent      | `-1`                              | `-1`                                |
| 2e argument | index de **départ** (vers la fin) | index de **départ** (vers le début) |

---

## 3. L'index de départ (2e argument)

`lastIndexOf(element, i)` cherche **en remontant** depuis l'index `i` (inclus) :

```typescript
const fruits = ["Mangue", "Banane", "Orange", "Mangue"];

fruits.lastIndexOf("Mangue", 2); // 0 (on ignore l'index 3)
fruits.lastIndexOf("Mangue", 3); // 3
```

Index négatif (compté depuis la fin) :

```typescript
["A", "B", "A"].lastIndexOf("A", -1); // 2
["A", "B", "A"].lastIndexOf("A", -2); // 2
```

---

## 4. Cas concrets

### Dernière occurrence dans une chaîne

```typescript
"Bonjour Aita, bonjour Dakar".lastIndexOf("a"); // dernière position de "a"
```

### Récupérer une extension de fichier

```typescript
const fichier = "archive.tar.gz";
const point = fichier.lastIndexOf(".");
fichier.slice(point + 1); // "gz"
```

> On utilise `lastIndexOf` et non `indexOf`, car un nom comme `archive.tar.gz` contient **plusieurs** points.

### Vérifier qu'un élément est bien le dernier

```typescript
const i = tab.lastIndexOf(v);
const estDernier = i === tab.length - 1;
```

---

## 5. Mêmes limites que `indexOf`

- Comparaison stricte (`===`) : `[10].lastIndexOf("10")` → `-1`.
- Objets comparés par **référence** : `lastIndexOf({ nom: "Aita" })` → `-1`.
- `NaN` n'est jamais trouvé.

Pour une recherche par condition, utilisez **`findLastIndex()`** (ES2023) :

```typescript
[1, 5, 10, 15].findLastIndex((n) => n % 5 === 0); // 3
```

---

## 6. Points à retenir

- `-1` signifie **absent** — et attention : `if (index)` est faux quand `index === 0`.
- L'index renvoyé est **0-based**.
- `lastIndexOf()` **ne modifie pas** le tableau.
- Utile pour les extensions de fichiers, les URL, les chaînes avec séparateurs répétés.
