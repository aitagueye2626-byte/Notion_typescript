# 4.15 - `shift()`

`shift()` **supprime le premier élément** d'un tableau et **le renvoie**. Elle **modifie** le tableau d'origine.

```typescript
array.shift(): T | undefined
```

---

## 1. Exemple

```typescript
const file = ["Aita", "Moussa", "Fatou"];
const premier = file.shift();

console.log(premier); // "Aita"
console.log(file);    // ["Moussa", "Fatou"]
```

Après `shift()`, tous les éléments **remontent d'un index** : `file[0]` devient `"Moussa"`.

---

## 2. Tableau vide → `undefined`

```typescript
const vide: number[] = [];
vide.shift(); // undefined (aucune erreur)
```

Le type de retour est donc **`T | undefined`** :

```typescript
const x = file.shift();
// x.toUpperCase();     // ❌ Object is possibly 'undefined'
if (x) x.toUpperCase(); // ✅
const y = file.shift() ?? ""; // ✅
```

---

## 3. `shift()` dans une file d'attente (FIFO)

`shift()` est **la** méthode de la file (First In, First Out), avec `push()` :

```typescript
const queue: string[] = [];
queue.push("Client 1");
queue.push("Client 2");

while (queue.length > 0) {
    const client = queue.shift();
    console.log("Client servi :", client);
}
// Client 1, puis Client 2
```

Cas concrets : file d'attente, file de messages, traitement dans l'ordre d'arrivée.

---

## 4. ⚠️ Performance

`shift()` est **coûteux** sur un grand tableau : chaque élément doit être recopié à l'index précédent (O(n)).

Pour une vraie file performante, on utilise plutôt :

```typescript
// 1. Un index de tête (O(1) par lecture)
let tete = 0;
const tab = [...];
const element = tab[tete++];

// 2. Une Map avec des clés numériques

// 3. Une librairie dédiée (ex : @datastructures-js/queue)
```

> 💡 `pop()` (retirer le dernier) est rapide (O(1)) ; `shift()` (retirer le premier) est lent.

---

## 5. `shift()` vs `pop()` vs `splice()`

| Méthode        | Retire         | Modifie | Retour           | Complexité |
| :------------- | :------------- | :-----: | :--------------- | :--------- |
| `shift()`      | le **premier** |    ✅    | `T \| undefined` | O(n)       |
| `pop()`        | le **dernier** |    ✅    | `T \| undefined` | O(1)       |
| `splice(0, 1)` | le premier     |    ✅    | `T[]`            | O(n)       |
| `slice(1)`     | —              |    ❌    | `T[]` (copie)    | O(n)       |

---

## 6. Version immuable

```typescript
const original = [1, 2, 3];
const sansPremier = original.slice(1);        // [2, 3]
const sansPremier2 = original.toSpliced(0, 1); // ES2023
```

---

## 7. Points à retenir

- `shift()` **mute** le tableau → indisponible sur `readonly T[]`.
- Sur un tableau vide → `undefined`, pas d'exception.
- Coûteux sur les grands tableaux : préférez `pop()` ou un index de tête si possible.
- Ne pas confondre avec `unshift()`, qui **ajoute** au début.
