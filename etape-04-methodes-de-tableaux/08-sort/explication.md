# 4.8 - `sort()`

`sort()` **trie le tableau sur place** (il est modifié) et le renvoie. Sans fonction de comparaison, elle trie les éléments **comme du texte**.

```typescript
array.sort(comparateur?: (a, b) => number): T[]
```

---

## 1. ⚠️ Le piège numéro 1 : le tri par défaut

```typescript
[10, 9, 100, 1, 25].sort();
// [1, 10, 100, 25, 9] ❌  (comparaison caractère par caractère)
```

Par défaut, `sort()` convertit chaque élément en chaîne (`"10"`, `"9"`…) et les compare dans l'ordre **lexicographique**.

👉 **Pour des nombres, fournissez toujours un comparateur.**

---

## 2. La fonction de comparaison

Le comparateur reçoit deux éléments `(a, b)` et renvoie :

| Retour  | Signification               |
| :------ | :-------------------------- |
| **< 0** | `a` vient **avant** `b`     |
| **> 0** | `a` vient **après** `b`     |
| **0**   | ordre inchangé (tri stable) |

```typescript
const nombres = [10, 9, 100, 1, 25];

nombres.sort((a, b) => a - b); // croissant  → [1, 9, 10, 25, 100]
nombres.sort((a, b) => b - a); // décroissant → [100, 25, 10, 9, 1]
```

Version explicite :

```typescript
function croissant(a: number, b: number): number {
    return a < b ? -1 : a > b ? 1 : 0;
}
```

---

## 3. Trier des objets

```typescript
type Eleve = { nom: string; note: number };

classe.sort((a, b) => b.note - a.note);   // par note décroissante
classe.sort((a, b) => a.nom.localeCompare(b.nom)); // par nom
```

---

## 4. Trier des chaînes avec accents

```typescript
["Élodie", "Zoe", "Adama"].sort();                      // ordre ASCII : "Adama", "Zoe", "Élodie"
["Élodie", "Zoe", "Adama"].sort((a, b) => a.localeCompare(b, "fr"));
// "Adama", "Élodie", "Zoe" ✅
```

`localeCompare` respecte l'alphabet, les accents et la casse selon la locale.

---

## 5. ⚠️ `sort()` mute le tableau

```typescript
const original = [3, 1, 2];
const triee = [...original].sort((a, b) => a - b); // copie d'abord
// original → [3, 1, 2]
```

Depuis ES2023, `toSorted()` renvoie une copie triée **sans** muter :

```typescript
const triee = original.toSorted((a, b) => a - b);
```

Sur un `readonly T[]`, `sort()` est **indisponible** → utilisez `toSorted()` ou `[...tab].sort()`.

---

## 6. Tri stable

Depuis ES2019, `sort()` est **stable** : deux éléments considérés égaux gardent leur ordre d'origine.

```typescript
[{ n: "A", note: 15 }, { n: "B", note: 18 }, { n: "C", note: 15 }]
    .sort((a, b) => b.note - a.note)
    .map((e) => e.n); // ["B", "A", "C"] — A reste avant C
```

---

## 7. `sort()` vs `toSorted()` vs `reverse()`

| Méthode        | Modifie | Retour                               |
| :------------- | :-----: | :----------------------------------- |
| `sort()`       |    ✅    | le **même** tableau, trié            |
| `toSorted()`   |    ❌    | un **nouveau** tableau trié (ES2023) |
| `reverse()`    |    ✅    | le même tableau, inversé             |
| `toReversed()` |    ❌    | un nouveau tableau inversé (ES2023)  |

---

## 8. Points à retenir

- Toujours fournir un comparateur pour les nombres : `(a, b) => a - b`.
- `sort()` **mute** → copier avant si l'original doit rester intact.
- `localeCompare` pour les chaînes accentuées.
- Comparer deux propriétés : `a.note - b.note`.
- La complexité est en O(n log n) en pratique.
