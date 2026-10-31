# 4.6 - `some()`

`some()` teste si **au moins un** élément du tableau respecte une condition. Elle renvoie `true` ou `false`.

```typescript
array.some((element, index, array) => boolean): boolean
```

---

## 1. Exemple

```typescript
const notes = [18, 9, 15, 12];

notes.some((note) => note >= 18); // true
notes.some((note) => note === 20); // false
```

---

## 2. Points importants

| Point                  | Détail                                             |
| :--------------------- | :------------------------------------------------- |
| **Court-circuit**      | S'arrête dès le premier élément qui renvoie `true` |
| **Tableau vide**       | Renvoie **toujours `false`**                       |
| **Modifie le tableau** | ❌ Non                                              |
| **Retour**             | `boolean`                                          |

```typescript
[18, 9, 15].some((n) => {
    console.log(n); // affiche 18 puis s'arrête (true)
    return n >= 18;
});
```

---

## 3. `some()` vs `every()` vs `includes()`

| Méthode       | Question posée                          | Retour           |
| :------------ | :-------------------------------------- | :--------------- |
| `some()`      | **Au moins un** respecte la condition ? | `boolean`        |
| `every()`     | **Tous** respectent la condition ?      | `boolean`        |
| `includes(v)` | La **valeur** `v` est-elle présente ?   | `boolean`        |
| `find()`      | Quel est le premier qui correspond ?    | `T \| undefined` |

```typescript
classe.some((e) => e.note >= 18);   // un major ?
classe.every((e) => e.note >= 10);  // tous admis ?
prenoms.includes("Moussa");         // valeur exacte ?
```

> ⚠️ Relation logique : `some(cond)` === `!every(!cond)`.

---

## 4. Cas concrets

```typescript
// Un élève en difficulté d'assiduité ?
classe.some((e) => e.presence < 75);

// Détecter des doublons
tab.some((element, index) => tab.indexOf(element) !== index);

// Valider un formulaire (aucun champ vide)
champs.some((c) => c.trim() === "");

// Vérifier qu'un tableau contient au moins une valeur autorisée
roles.some((r) => rolesAutorises.includes(r));
```

---

## 5. ⚠️ `some()` sur un tableau vide

```typescript
[].some((x) => x > 0); // false
```

Logique : « au moins un élément » est faux s'il n'y a **aucun** élément. Attention à ne pas confondre avec `every()`, qui renvoie `true` sur un tableau vide.

---

## 6. `some()` vs `find()`

Si vous avez besoin de **l'élément** et pas seulement d'un booléen :

```typescript
const major = classe.find((e) => e.note >= 18);
if (major) console.log(major.nom);
```

Si vous n'avez besoin que de **savoir si** → `some()` (plus rapide, s'arrête au premier).
