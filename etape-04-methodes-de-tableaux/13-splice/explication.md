# 4.13 - `splice()`

`splice()` **modifie le tableau d'origine** en supprimant, ajoutant ou remplaçant des éléments. Elle renvoie un tableau contenant les éléments **supprimés**.

```typescript
array.splice(debut, nombreASupprimer?, ...elementsAInserer): T[]
```

| Paramètre             | Rôle                                                                       |
| :-------------------- | :------------------------------------------------------------------------- |
| `debut`               | Index où commencer (négatif = depuis la fin)                               |
| `nombreASupprimer`    | Combien d'éléments supprimer (0 = simple insertion, omis = jusqu'à la fin) |
| `...elementsAInserer` | Éléments à insérer à partir de `debut`                                     |

---

## 1. Les quatre usages

### a) Supprimer

```typescript
const fruits = ["Mangue", "Banane", "Orange", "Papaye"];
const supprimes = fruits.splice(1, 2); // supprime 2 éléments à partir de l'index 1
// supprimes → ["Banane", "Orange"]
// fruits    → ["Mangue", "Papaye"]
```

### b) Insérer (sans supprimer)

```typescript
const langages = ["JavaScript", "Python"];
langages.splice(1, 0, "TypeScript");
// ["JavaScript", "TypeScript", "Python"]
```

### c) Remplacer

```typescript
const notes = [10, 12, 14];
notes.splice(1, 1, 20);
// [10, 20, 14]
```

### d) Vider

```typescript
tab.splice(0, tab.length); // ou tab.splice(0);
```

---

## 2. Index négatif

```typescript
const chiffres = [1, 2, 3, 4, 5];
chiffres.splice(-2); // supprime les 2 derniers -> [4, 5]
// chiffres → [1, 2, 3]
```

---

## 3. `splice()` vs `slice()`

|                    | `splice()`                           | `slice()`                   |
| :----------------- | :----------------------------------- | :-------------------------- |
| Modifie l'original | ✅ **Oui**                            | ❌ Non                       |
| Retour             | Éléments **supprimés**               | Une **copie** de la portion |
| Arguments          | `(debut, nbASupprimer, ...aInserer)` | `(debut, finExclue)`        |
| Sur `readonly T[]` | ❌ indisponible                       | ✅ disponible                |

```typescript
const n = [1, 2, 3, 4, 5];
n.slice(1, 3);    // [2, 3]  (n inchangé)
n.splice(1, 2);   // [2, 3]  (n devient [1, 4, 5])
```

> ⚠️ **Piège classique** : `slice` ≠ `splice`. Le nom se ressemble, le comportement est radicalement différent.

---

## 4. Version immuable : `toSpliced()` (ES2023)

```typescript
const original = ["a", "b", "c"];
const copie = original.toSpliced(1, 1);
// original → ["a", "b", "c"]
// copie    → ["a", "c"]
```

À utiliser quand vous voulez le résultat de `splice` **sans** muter le tableau (React, Redux, `readonly`).

---

## 5. Cas concret : supprimer un élément par identifiant

```typescript
const index = classe.findIndex((e) => e.nom === "Moussa");
if (index !== -1) {
    const [supprime] = classe.splice(index, 1);
}
```

`findIndex` + `splice` est le duo idiomatique pour retirer un élément identifié.

---

## 6. Points à retenir

- `splice()` **mute** le tableau : à éviter sur des données partagées.
- Elle renvoie les éléments **supprimés**, pas le tableau modifié.
- `splice(0, 0, x)` = insérer au début ; `splice(tab.length, 0, x)` = ajouter à la fin (= `push`).
- `delete tab[i]` laisse un trou (`undefined`) ; `splice(i, 1)` retire vraiment l'élément et décale les suivants.
