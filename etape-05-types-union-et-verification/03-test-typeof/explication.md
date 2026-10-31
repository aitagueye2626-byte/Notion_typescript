# 5.3 - Test de type union avec `typeof`

L'opérateur **`typeof`** renvoie une chaîne décrivant le type **à l'exécution**. TypeScript s'en sert pour **réduire** une union de primitifs.

```typescript
function decrire(valeur: string | number | boolean): string {
    if (typeof valeur === "string") {
        return valeur.length.toString(); // ✅ string
    }
    if (typeof valeur === "number") {
        return valeur.toFixed(2);        // ✅ number
    }
    return valeur ? "Vrai" : "Faux";     // ✅ boolean
}
```

---

## 1. Les valeurs possibles de `typeof`

| Expression            | Résultat         |
| :-------------------- | :--------------- |
| `typeof "abc"`        | `"string"`       |
| `typeof 42`           | `"number"`       |
| `typeof true`         | `"boolean"`      |
| `typeof undefined`    | `"undefined"`    |
| `typeof Symbol()`     | `"symbol"`       |
| `typeof 10n`          | `"bigint"`       |
| `typeof function(){}` | `"function"`     |
| `typeof {}`           | `"object"`       |
| `typeof []`           | `"object"` ⚠️     |
| **`typeof null`**     | **`"object"`** ⚠️ |

---

## 2. ⚠️ Les deux pièges

### `typeof null === "object"`

```typescript
typeof null; // "object"
```

Testez **toujours `null` d'abord** :

```typescript
if (valeur === null) return "null";
if (typeof valeur === "object") { /* vrai objet */ }
```

### `typeof [] === "object"`

`typeof` ne distingue pas un tableau d'un objet. Utilisez `Array.isArray()` :

```typescript
if (Array.isArray(valeur)) {
    valeur.length; // ✅ TypeScript sait que c'est un tableau
}
```

---

## 3. `typeof` ne discrimine que les **primitifs**

Pour une union de types d'objets, `typeof` renvoie `"object"` pour tous :

```typescript
type Chat = { miauler(): void };
type Chien = { aboyer(): void };

function f(animal: Chat | Chien) {
    // typeof animal === "object" pour les deux -> inutile
    "miauler" in animal; // ✅ utiliser "in"
}
```

👉 Utilisez le **discriminateur** (5.2), **`in`** (5.5) ou **`instanceof`** (5.6).

---

## 4. `typeof` avec `switch`

```typescript
function afficher(v: string | number | boolean | undefined) {
    switch (typeof v) {
        case "string": return v.toUpperCase();
        case "number": return v * 2;
        case "boolean": return v ? "oui" : "non";
        case "undefined": return "aucune valeur";
    }
}
```

Le `switch` sur `typeof` **réduit** aussi le type dans chaque `case`.

---

## 5. `typeof` pour valider une entrée `unknown`

```typescript
function convertir(valeur: unknown): number | null {
    if (typeof valeur === "number") return valeur;
    if (typeof valeur === "string") {
        const n = Number(valeur);
        return Number.isNaN(n) ? null : n;
    }
    return null;
}
```

C'est le pattern de **validation** : `unknown` → `typeof` → type sûr.

---

## 6. `typeof` vs `instanceof` vs `in`

| Test                  | Fonctionne sur                           | Ne fonctionne pas sur                  |
| :-------------------- | :--------------------------------------- | :------------------------------------- |
| `typeof x`            | primitifs, `undefined`, `function`       | objets personnalisés, `null`, tableaux |
| `x instanceof Classe` | instances de classes (Date, Map, Error…) | interfaces, types, primitifs           |
| `"prop" in x`         | présence d'une propriété                 | primitifs                              |
| `x.type === "..."`    | unions discriminées                      | unions sans discriminant               |

---

## 7. Points à retenir

- `typeof` est un **opérateur**, pas une fonction : `typeof x` (parenthèses optionnelles).
- Il renvoie une **chaîne**, pas un type TypeScript.
- Tester `null` **avant** `typeof === "object"`.
- Pour les tableaux → `Array.isArray()` ; pour les classes → `instanceof`.
