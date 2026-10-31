
# 4.4 - `find()` et `findIndex()`

`find()` parcourt le tableau et renvoie le **premier élément** qui respecte la condition. S'il n'y en a aucun, elle renvoie `undefined`.

```typescript
const eleves = [
    { nom: "Aita", note: 18 },
    { nom: "Moussa", note: 9 }
];

const aita = eleves.find((e) => e.nom === "Aita"); // { nom: "Aita", note: 18 }
const inconnu = eleves.find((e) => e.nom === "X"); // undefined
```

---

## 1. Signature

```typescript
array.find((element, index, array) => boolean): T | undefined
array.findIndex((element, index, array) => boolean): number   // -1 si absent
```

| Méthode       | Renvoie                             | Si rien trouvé |
| :------------ | :---------------------------------- | :------------- |
| `find()`      | L'élément lui-même                  | `undefined`    |
| `findIndex()` | La position (index)                 | `-1`           |
| `filter()`    | **Un tableau** de tous les éléments | `[]`           |

---

## 2. `find` vs `filter`

```typescript
const terminale = eleves.filter((e) => e.classe === "Terminale"); // T[]
const terminale1 = eleves.find((e) => e.classe === "Terminale");  // T | undefined
```

- Besoin **d'un seul** élément → `find`
- Besoin de **tous** les éléments correspondants → `filter`
- Besoin de la **position** → `findIndex`

---

## 3. Attention : `T | undefined`

Avec `strict` (et `strictNullChecks`), TypeScript vous **force** à vérifier le résultat :

```typescript
const e = eleves.find((e) => e.nom === "Seydou");
// e.nom                       // ❌ Object is possibly 'undefined'
if (e) e.nom;                  // ✅

// ou en une ligne :
const nom = eleves.find((e) => e.nom === "Aita")?.nom ?? "Aucun";
```

---

## 4. Exemples courants

```typescript
// Trouver un utilisateur par id
const user = users.find((u) => u.id === 42);

// Trouver la première note suffisante
const ok = notes.find((n) => n >= 10);

// Trouver une position
const i = eleves.findIndex((e) => e.nom === "Fatou"); // -1 si absente

// findIndex pour supprimer un élément par son identifiant
const index = users.findIndex((u) => u.id === 42);
if (index !== -1) users.splice(index, 1);
```

---

## 5. Points à retenir

- `find()` s'arrête dès le **premier** élément trouvé (plus rapide que `filter` sur les grands tableaux).
- `find()` **ne modifie pas** le tableau d'origine.
- `findLast()` (ES2023) renvoie le **dernier** élément correspondant.
- Pour tester une **simple existence** sans récupérer l'élément, `some()` est plus lisible.
