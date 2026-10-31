# 4.1 - `indexOf()`

`indexOf()` renvoie la **position de la première occurrence** d'un élément dans un tableau, ou **`-1`** si l'élément est absent.

```typescript
array.indexOf(element, indexDeDepart?): number
```

---

## 1. Exemple

```typescript
const fruits = ["Mangue", "Banane", "Orange", "Mangue"];

fruits.indexOf("Mangue");  // 0  (première occurrence)
fruits.indexOf("Orange");  // 2
fruits.indexOf("Ananas");  // -1 (absent)
```

Avec un index de départ :

```typescript
fruits.indexOf("Mangue", 1); // 3 (on repart de l'index 1)
```

---

## 2. Tester la présence

```typescript
if (fruits.indexOf("Banane") !== -1) {
    console.log("La banane est dans la liste");
}
```

> 💡 Pour un simple test d'existence, préférez **`includes()`** :
> ```typescript
> fruits.includes("Banane"); // true — plus lisible
> ```

---

## 3. ⚠️ Comparaison stricte (`===`)

`indexOf` compare les valeurs avec `===` :

```typescript
[10, 20].indexOf(20);   // 1
[10, 20].indexOf("20"); // -1  (types différents, et TypeScript refuse même ce code)
```

---

## 4. ⚠️ Objets : comparaison par **référence**

```typescript
const eleves = [{ nom: "Aita" }, { nom: "Moussa" }];

eleves.indexOf({ nom: "Aita" }); // -1 ❌ ce n'est pas le même objet en mémoire
eleves.indexOf(eleves[0]);       // 0  ✅
```

Pour chercher un objet par une propriété, utilisez **`findIndex()`** :

```typescript
eleves.findIndex((e) => e.nom === "Aita"); // 0
```

---

## 5. ⚠️ `NaN` n'est jamais trouvé

```typescript
[1, NaN, 3].indexOf(NaN);              // -1 ❌ (NaN !== NaN)
[1, NaN, 3].findIndex(Number.isNaN);   // 1  ✅
```

---

## 6. `indexOf` vs `findIndex` vs `includes` vs `lastIndexOf`

| Méthode          | Recherche                     | Retour                   |
| :--------------- | :---------------------------- | :----------------------- |
| `indexOf(v)`     | une **valeur**                | position ou `-1`         |
| `lastIndexOf(v)` | une valeur, **depuis la fin** | position ou `-1`         |
| `findIndex(fn)`  | une **condition**             | position ou `-1`         |
| `includes(v)`    | une valeur                    | `boolean`                |
| `find(fn)`       | une condition                 | l'élément ou `undefined` |

---

## 7. Cas concret : supprimer un élément

```typescript
const prenoms = ["Aita", "Moussa", "Fatou"];
const i = prenoms.indexOf("Moussa");
if (i !== -1) prenoms.splice(i, 1);
// ["Aita", "Fatou"]
```

> Le duo `indexOf` + `splice` est l'ancêtre de `findIndex` + `splice` ; préférez `findIndex` quand la recherche porte sur une propriété.

---

## 8. Points à retenir

- `-1` = **absent** (le piège classique : `if (index)` est faux quand l'index vaut `0` !).
- L'index renvoyé est **0-based**.
- `indexOf` **ne modifie pas** le tableau.
- Ne fonctionne pas pour chercher par contenu d'objet → `findIndex`.
