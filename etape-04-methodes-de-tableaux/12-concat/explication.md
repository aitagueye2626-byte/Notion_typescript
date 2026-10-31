# 4.12 - `concat()`

`concat()` **fusionne** un tableau avec un ou plusieurs autres tableaux (ou valeurs) et renvoie un **nouveau tableau**. Les originaux ne sont jamais modifiés.

```typescript
array.concat(valeurOuTableau, ...): T[]
```

---

## 1. Exemples de base

```typescript
const fruits = ["Mangue", "Banane"];
const legumes = ["Carotte", "Tomate"];

const courses = fruits.concat(legumes);
// ["Mangue", "Banane", "Carotte", "Tomate"]

fruits; // ["Mangue", "Banane"]  (inchangé)
```

Plusieurs arguments :

```typescript
fruits.concat(legumes, ["Riz"], ["Huile"]);
```

Valeurs simples (non tableaux) :

```typescript
fruits.concat("Orange", "Papaye");
// ["Mangue", "Banane", "Orange", "Papaye"]
```

---

## 2. `concat()` vs spread `...`

Les deux sont équivalents pour les cas simples :

```typescript
fruits.concat(legumes);     // concat
[...fruits, ...legumes];    // spread
```

| Critère                        | `concat()`        | Spread `[...a, ...b]`                                |
| :----------------------------- | :---------------- | :--------------------------------------------------- |
| Lisibilité                     | Bonne             | **Meilleure** (surtout avec des valeurs intercalées) |
| Accepte un non-tableau         | ✅ (`concat("X")`) | ✅ (`["X", ...a]`)                                    |
| Aplatit un niveau              | ✅                 | ❌ (mais `flat()` existe)                             |
| Chaînable après `filter`/`map` | ✅                 | ✅                                                    |
| Sur `readonly T[]`             | ✅                 | ✅                                                    |

> 💡 **Recommandation** : préférez le spread pour les cas courants ; gardez `concat` pour chaîner avec d'autres méthodes ou quand vous partez d'un `readonly`.

---

## 3. Aplatissement

`concat` **ajoute** les éléments des tableaux passés en argument, mais ne descend que d'un niveau :

```typescript
[1, 2].concat([[3, 4], [5]]); // [1, 2, [3, 4], [5]]
[1, 2].concat([[3, 4], [5]]).flat(); // [1, 2, 3, 4, 5]
```

---

## 4. Cas concrets

```typescript
// Ajouter un élément sans muter (style immuable)
const nouvelleClasse = classe.concat({ nom: "Moussa", note: 15 });

// Fusionner des résultats de plusieurs sources
const tous = resultatsA.concat(resultatsB);

// Chaîner après un filter
const admis = classe.filter((e) => e.note >= 10).concat(redoublants);
```

---

## 5. Points à retenir

- `concat()` **ne modifie pas** le tableau d'origine (contrairement à `push`).
- Elle renvoie **toujours un nouveau tableau**.
- `push(...items)` modifie **sur place** ; `concat(items)` renvoie **une copie**.
- Pour ajouter un seul élément en mode immuable, `[...tab, elem]` est souvent plus lisible.
