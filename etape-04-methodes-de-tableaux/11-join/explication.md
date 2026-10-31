# 4.11 - `join()`

`join()` transforme un tableau en **chaîne de caractères**, en insérant un séparateur entre les éléments.

```typescript
array.join(separateur?: string): string
```

---

## 1. Syntaxe

| Appel                         | Résultat                                       |
| :---------------------------- | :--------------------------------------------- |
| `["A", "B", "C"].join()`      | `"A,B,C"` (virgule par défaut)                 |
| `["A", "B", "C"].join(" - ")` | `"A - B - C"`                                  |
| `["A", "B", "C"].join("")`    | `"ABC"`                                        |
| `["A"].join(", ")`            | `"A"` (pas de séparateur avec un seul élément) |
| `[].join(", ")`               | `""` (chaîne vide)                             |

---

## 2. Conversions automatiques

`join()` appelle implicitement `String()` sur chaque élément :

```typescript
[18, 15, 17].join(" / ");        // "18 / 15 / 17"
[true, false].join(", ");        // "true, false"
["Aita", null, undefined].join(", "); // "Aita, , "
```

⚠️ `null` et `undefined` deviennent des **chaînes vides**, pas `"null"` / `"undefined"`.

⚠️ Les objets utilisent `[object Object]` :

```typescript
[{ nom: "Aita" }].join(", "); // "[object Object]"
```

👉 Dans ce cas, commencez par `map` pour extraire ce que vous voulez afficher :

```typescript
classe.map((e) => e.nom).join(", "); // "Aita, Moussa, Fatou"
```

---

## 3. Cas concrets

```typescript
// Liste d'invités
["Aita", "Moussa"].join(", "); // "Aita, Moussa"

// Requête SQL
`SELECT ${["nom", "age"].join(", ")} FROM eleves`;

// Chemin de fichier
["cours", "typescript", "etape-04"].join("/"); // "cours/typescript/etape-04"

// Liste à puces
invites.map((n) => `- ${n}`).join("\n");

// URL avec paramètres
["https://api.exemple.com", "eleves", "42"].join("/");
```

---

## 4. `join()` vs `toString()` vs `split()`

| Méthode      | Sens                             | Exemple                          |
| :----------- | :------------------------------- | :------------------------------- |
| `join(sep)`  | Tableau → chaîne avec séparateur | `["A","B"].join("-")` → `"A-B"`  |
| `toString()` | Tableau → chaîne (virgule)       | `["A","B"].toString()` → `"A,B"` |
| `split(sep)` | **Chaîne → tableau** (l'inverse) | `"A-B".split("-")` → `["A","B"]` |

```typescript
const csv = "Aita,Dakar,21";
const champs = csv.split(",");   // ["Aita", "Dakar", "21"]
const retour = champs.join(","); // "Aita,Dakar,21"
```

---

## 5. Points à retenir

- `join()` **ne modifie pas** le tableau.
- Le séparateur peut être n'importe quelle chaîne, y compris `"\n"` ou `""`.
- Si le tableau contient des objets, passez par `map()` avant `join()`.
- `join()` est souvent la dernière étape d'une chaîne `filter().map().join()`.
