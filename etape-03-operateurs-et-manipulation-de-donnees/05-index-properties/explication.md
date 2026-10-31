# 3.5 - Index properties (index signature)

Une **index signature** (`[cle: string]: Type`) permet de déclarer un objet qui accepte des **clés dynamiques** — on ne connaît pas les noms des clés à l'avance, mais on connaît le type de leurs valeurs.

---

## 1. Le problème

```typescript
let notes = { maths: 18 };
notes.anglais = 17; // ❌ Error: Property 'anglais' does not exist
```

TypeScript est **strict** : il n'autorise que les propriétés déclarées. Or, pour un dictionnaire / une map, les clés sont souvent inconnues à l'avance.

---

## 2. La solution : l'index signature

```typescript
type Notes = {
    [matiere: string]: number; // toute clé string -> valeur number
};

let notes: Notes = { maths: 18 };
notes.anglais = 17;      // ✅ accepté
console.log(notes["anglais"]);
```

| Élément   | Signification                                                        |
| :-------- | :------------------------------------------------------------------- |
| `matiere` | Nom de la clé, **purement descriptif** (n'apparaît pas dans le type) |
| `string`  | Type des clés (`string` ou `number`)                                 |
| `number`  | Type des valeurs (toutes les clés ont **le même type de valeur**)    |

---

## 3. Clés numériques

```typescript
type Delegues = { [numeroClasse: number]: string };
let delegues: Delegues = { 1: "Aita", 2: "Moussa" };
```

> En JavaScript, **les clés d'objet sont toujours des `string`**. `delegues[1]` est en réalité `delegues["1"]` — c'est pourquoi TypeScript accepte aussi bien `[1]` que `["1"]`.

---

## 4. Mélanger index signature et propriétés fixes

```typescript
type Config = {
    nom: string;             // propriété obligatoire
    [option: string]: string; // toutes les clés -> string
};
```

⚠️ **Règle importante** : le type des propriétés fixes doit être **compatible** avec le type de l'index signature. Ici `nom: string` est compatible avec `string`.

```typescript
type Invalide = {
    id: number;
    [option: string]: string; // ❌ number n'est pas compatible avec string
};
```

---

## 5. Accès à une clé absente

Une clé non renseignée vaut `undefined`, **même si le type déclaré ne le dit pas** :

```typescript
let n: number = notes.philosophie; // "undefined" au runtime !
```

Avec `strict` (ou `noUncheckedIndexedAccess`), TypeScript renvoie `number | undefined` et vous oblige à vérifier :

```typescript
let n: number | undefined = notes.philosophie;
console.log(n ?? "Non notée");
```

---

## 6. Alternatives

| Approche        | Quand l'utiliser                                            |
| :-------------- | :---------------------------------------------------------- |
| Index signature | Vrai dictionnaire, clés libres (config, compteurs)          |
| `Map<K, V>`     | Besoin de `size`, `delete`, itération garantie, clés objets |
| `Record<K, V>`  | Quand les clés sont un **ensemble fermé** (`"fr" \| "en"`)  |

```typescript
type Traductions = Record<"fr" | "en", string>; // clés fermées
```
