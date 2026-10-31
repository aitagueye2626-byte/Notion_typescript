# 4.10 - `reduceRight()` et `reduceLeft`

## 1. `reduceLeft` n'existe pas

JavaScript ne propose **pas** de méthode `reduceLeft`. C'est **`reduce()`** qui parcourt le tableau **de gauche à droite** — c'est donc l'équivalent de ce qu'on appelle « reduceLeft » dans d'autres langages.

| Méthode JavaScript | Sens de parcours    | Alias courant |
| :----------------- | :------------------ | :------------ |
| `reduce()`         | gauche → droite     | `reduceLeft`  |
| `reduceRight()`    | **droite → gauche** | `reduceRight` |

```typescript
const lettres = ["A", "B", "C"];

lettres.reduce((acc, l) => acc + l, "");      // "ABC"
lettres.reduceRight((acc, l) => acc + l, ""); // "CBA"
```

---

## 2. Quand la différence est visible

Pour les opérations **commutatives** (`+`, `*`, concaténation sans ordre important), le résultat est le même. La différence apparaît dès que **l'ordre compte** :

```typescript
const etapes = ["a", "b", "c"];

etapes.reduce((acc, e) => acc + " -> " + e, "départ");
// "départ -> a -> b -> c"

etapes.reduceRight((acc, e) => acc + " -> " + e, "départ");
// "départ -> c -> b -> a"
```

```typescript
// Soustraction : l'ordre des opérandes change
[1, 2, 3].reduce((acc, n) => acc - n, 10);      // ((10 - 1) - 2) - 3 = 4
[1, 2, 3].reduceRight((acc, n) => acc - n, 10); // ((10 - 3) - 2) - 1 = 4
```

---

## 3. Cas d'usage typiques de `reduceRight`

### Construire une liste chaînée (dans le bon ordre)

```typescript
type Maillon = { valeur: number; suivant: Maillon | null };

const liste = [1, 2, 3].reduceRight<Maillon | null>(
    (suivant, valeur) => ({ valeur, suivant }),
    null
);
// 1 -> 2 -> 3 -> null
```

> Avec `reduce` (gauche → droite), on obtiendrait la liste dans l'ordre inverse.

### Parcourir un historique du plus récent au plus ancien

```typescript
const historique = ["page1", "page2", "page3"];

const retour = historique.reduceRight<string[]>((acc, page) => {
    acc.push(page);
    return acc;
}, []);
// ["page3", "page2", "page1"]
```

### Appliquer des transformations dans l'ordre inverse

```typescript
const fns = [x => x + 1, x => x * 2];
fns.reduceRight((v, f) => f(v), 5); // f1(f2(5)) = (5 * 2) + 1 = 11
```

---

## 4. Sans valeur initiale

Comme `reduce()`, `reduceRight()` prend le **dernier** élément comme accumulateur de départ :

```typescript
[1, 2, 3].reduceRight((acc, n) => acc + n); // 6
```

Sur un tableau vide, elle lance une `TypeError`. **Fournissez toujours la valeur initiale.**

---

## 5. Résumé

|                        | `reduce()`                    | `reduceRight()`                                        |
| :--------------------- | :---------------------------- | :----------------------------------------------------- |
| Sens                   | gauche → droite               | droite → gauche                                        |
| Alias                  | reduceLeft                    | —                                                      |
| Valeur initiale        | recommandée                   | recommandée                                            |
| Tableau vide sans init | ❌ TypeError                   | ❌ TypeError                                            |
| Utile pour             | somme, comptage, regroupement | construction de liste, historique, composition inverse |
