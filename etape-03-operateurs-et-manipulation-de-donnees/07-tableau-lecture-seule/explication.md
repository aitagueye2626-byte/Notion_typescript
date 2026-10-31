# 3.7 - Tableau en lecture seule (`readonly T[]`)

TypeScript permet de déclarer un tableau **non modifiable** : on peut le lire, mais pas ajouter, supprimer ni remplacer d'élément.

```typescript
let fruits: readonly string[] = ["Mangue", "Banane"];

fruits.push("Ananas");  // ❌ Property 'push' does not exist on type 'readonly string[]'
fruits[0] = "Papaye";   // ❌ Index signature in type 'readonly string[]' only permits reading
console.log(fruits[0]); // ✅ la lecture fonctionne
```

---

## 1. Deux syntaxes équivalentes

| Syntaxe                 | Note                        |
| :---------------------- | :-------------------------- |
| `readonly string[]`     | Syntaxe courte, recommandée |
| `ReadonlyArray<string>` | Syntaxe longue, identique   |

```typescript
let notes: ReadonlyArray<number> = [18, 15, 17];
```

---

## 2. Ce qui est interdit / autorisé

| Opération                                  | Sur `string[]` |       Sur `readonly string[]`        |
| :----------------------------------------- | :------------: | :----------------------------------: |
| Lire `tab[0]`, `tab.length`                |       ✅        |                  ✅                   |
| `push` / `pop` / `shift` / `unshift`       |       ✅        |                  ❌                   |
| `splice` / `sort` / `reverse` / `fill`     |       ✅        |                  ❌                   |
| Affecter `tab[0] = ...`                    |       ✅        |                  ❌                   |
| `map` / `filter` / `slice` / `concat`      |       ✅        | ✅ (renvoient un **nouveau** tableau) |
| `includes` / `indexOf` / `join` / `reduce` |       ✅        |                  ✅                   |
| `forEach`                                  |       ✅        |                  ✅                   |

> 💡 **Règle** : toutes les méthodes qui **modifient sur place** sont supprimées du type ; celles qui **renvoient une copie** restent.

---

## 3. Compatibilité des types

```typescript
let normal: number[] = [1, 2, 3];
let fige: readonly number[] = normal; // ✅ autorisé (on restreint l'accès)

// let normal2: number[] = fige;      // ❌ interdit (on élargirait les droits)
```

> Un `T[]` est assignable à un `readonly T[]`, **jamais l'inverse**.

⚠️ La restriction n'est pas une copie : si l'original change, la « vue readonly » voit le changement.

```typescript
normal.push(4);
console.log(fige); // [1, 2, 3, 4]
```

---

## 4. Comment modifier quand même ?

Il faut **créer une copie** :

```typescript
const copie = [...fruits, "Ananas"];      // spread
const copie2 = fruits.concat("Ananas");   // concat
const copie3 = fruits.slice();            // slice sans argument
```

---

## 5. Le cas d'usage le plus courant : les paramètres de fonction

```typescript
function total(prix: readonly number[]): number {
    // prix.push(0); // ❌ impossible : la fonction promet de ne rien modifier
    return prix.reduce((somme, p) => somme + p, 0);
}
```

Cela documente l'intention **dans le type** et empêche les effets de bord accidentels.

---

## 6. `readonly` sur les objets et les tuples

Ne pas confondre :

| Écriture                    | Effet                                                                        |
| :-------------------------- | :--------------------------------------------------------------------------- |
| `readonly string[]`         | Le **tableau** ne peut pas changer (ajout/suppression/remplacement)          |
| `ReadonlyArray<T>`          | Idem                                                                         |
| `readonly [string, number]` | Tuple en lecture seule                                                       |
| `{ readonly nom: string }`  | La **propriété** `nom` de l'objet ne peut pas être réassignée (voir étape 6) |

```typescript
type Point = readonly [number, number];
let p: Point = [10, 20];
// p[0] = 5; // ❌
```
