# 4.7 - `every()`

`every()` teste si **tous** les éléments d'un tableau respectent une condition. Elle renvoie `true` ou `false`.

```typescript
array.every((element, index, array) => boolean): boolean
```

---

## 1. Exemple simple

```typescript
const notes = [18, 15, 17, 12];

const tousAdmis = notes.every((note) => note >= 10);
console.log(tousAdmis); // true
```

Si **un seul** élément échoue → `false` :

```typescript
[18, 9, 17].every((note) => note >= 10); // false
```

---

## 2. Points importants

| Point                  | Détail                                              |
| :--------------------- | :-------------------------------------------------- |
| **Court-circuit**      | S'arrête dès le premier élément qui renvoie `false` |
| **Tableau vide**       | Renvoie **toujours `true`** (vrai par vacuité)      |
| **Modifie le tableau** | ❌ Non                                               |
| **Retour**             | `boolean`                                           |

```typescript
// Le callback n'est appelé que 2 fois ici :
[18, 9, 17].every((n) => {
    console.log(n); // 18 puis 9
    return n >= 10;
});
```

---

## 3. `every()` vs `some()` vs `find()`

| Méthode    | Question posée                               | Retour           |
| :--------- | :------------------------------------------- | :--------------- |
| `every()`  | **Tous** respectent-ils la condition ?       | `boolean`        |
| `some()`   | **Au moins un** respecte-t-il la condition ? | `boolean`        |
| `find()`   | **Quel est le premier** qui la respecte ?    | `T \| undefined` |
| `filter()` | **Quels sont ceux** qui la respectent ?      | `T[]`            |

```typescript
classe.every((e) => e.note >= 10); // tous majeurs ?
classe.some((e) => e.note === 18); // au moins un 18 ?
```

---

## 4. Cas concrets

```typescript
type Eleve = { nom: string; note: number; presence: number };

// Valider une liste de conditions
const classe: Eleve[] = [...];
const tousPresents = classe.every((e) => e.presence >= 90);

// Valider un formulaire : aucun champ vide
const champs = ["Aita", "Dakar", "21"];
const valide = champs.every((c) => c.trim().length > 0);

// Vérifier qu'une liste de nombres est triée
const triee = (tab: number[]) => tab.every((n, i) => i === 0 || tab[i - 1] <= n);
```

---

## 5. Piège fréquent

`every()` sur un tableau vide renvoie `true`, ce qui peut valider un formulaire sans aucun champ :

```typescript
[].every((x: string) => x !== ""); // true 😱
```

Pensez donc à vérifier aussi `tableau.length > 0` si le tableau ne doit pas être vide.
