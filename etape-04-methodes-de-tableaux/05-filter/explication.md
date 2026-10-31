# 4.5 - `filter()`

`filter()` renvoie un **nouveau tableau** contenant uniquement les éléments qui respectent une condition. Le tableau d'origine n'est **pas modifié**.

```typescript
array.filter((element, index, array) => boolean): T[]
```

---

## 1. Exemple

```typescript
const notes = [18, 9, 15, 12, 7, 17];

const admis = notes.filter((note) => note >= 10);
// [18, 15, 12, 17]

notes; // inchangé
```

Si aucun élément ne correspond → **tableau vide** (`[]`), jamais `undefined`.

---

## 2. Filtrer des objets

```typescript
type Eleve = { nom: string; note: number; classe: string };

const terminale = classe.filter((e) => e.classe === "Terminale");
const majors = classe.filter((e) => e.note >= 16);

// Plusieurs conditions
const terminaleAdmise = classe.filter((e) => e.classe === "Terminale" && e.note >= 10);
```

---

## 3. Le 2e paramètre : l'index

```typescript
// Garder un élément sur deux
tab.filter((_, i) => i % 2 === 0);
```

---

## 4. Filtrer les valeurs « vides »

```typescript
const valeurs = [0, "Aita", "", null, 5, undefined];
valeurs.filter(Boolean); // ["Aita", 5]
```

⚠️ `Boolean` élimine aussi `0` et `""` — parfois indésirable :

```typescript
valeurs.filter((v) => v !== null && v !== undefined); // garde 0 et ""
```

---

## 5. Type guards : `filter` peut restreindre le type

```typescript
function estString(v: unknown): v is string {
    return typeof v === "string";
}

const mixte: (string | number)[] = ["Aita", 42];
const textes: string[] = mixte.filter(estString); // ✅ type affiné à string[]
```

Sans prédicat typé (`v is string`), le résultat reste `(string | number)[]`.

---

## 6. Supprimer les doublons

```typescript
const doublons = [1, 2, 2, 3, 3, 3];
const uniques = doublons.filter((v, i) => doublons.indexOf(v) === i); // [1, 2, 3]
```

Alternative plus efficace sur les grands tableaux : `[...new Set(doublons)]`.

---

## 7. Chaîner les méthodes

```typescript
const somme = classe
    .filter((e) => e.note >= 10)  // T[]
    .map((e) => e.note)           // number[]
    .reduce((s, n) => s + n, 0);  // number
```

> 💡 `filter` puis `map` est le duo le plus courant. `flatMap` peut fusionner les deux.

---

## 8. `filter` vs `find` vs `some` vs `every`

| Méthode    | Retour           | Résultat                        |
| :--------- | :--------------- | :------------------------------ |
| `filter()` | `T[]`            | **tous** ceux qui correspondent |
| `find()`   | `T \| undefined` | le **premier**                  |
| `some()`   | `boolean`        | au moins un ?                   |
| `every()`  | `boolean`        | tous ?                          |

---

## 9. Points à retenir

- `filter()` **ne mute pas** le tableau d'origine.
- Elle **renvoie toujours un nouveau tableau**, même vide.
- Elle fonctionne sur un `readonly T[]` et renvoie un `T[]` modifiable.
- Le callback doit renvoyer un **boolean** (les valeurs falsy sont écartées).
- Pour un simple test d'existence, `some()` est plus efficace (elle s'arrête au premier trouvé).
