# 6.2 - Interface comme type de fonction

Une interface peut décrire **la signature d'une fonction** grâce à une **call signature** :

```typescript
interface Operation {
    (a: number, b: number): number;
}

const addition: Operation = (a, b) => a + b;
```

Ici, `Operation` n'est pas un objet : c'est un **type de fonction**.

---

## 1. Call signature

```typescript
interface Validateur {
    (valeur: string): boolean;
}

const estEmail: Validateur = (v) => v.includes("@");
const estTelephone: Validateur = (v) => /^\+?\d+$/.test(v);
```

TypeScript vérifie les **paramètres** et le **type de retour** :

```typescript
const mauvaise: Validateur = (v: number) => true; // ❌
```

---

## 2. Interface vs `type` pour une fonction

```typescript
// Interface
interface Operation {
    (a: number, b: number): number;
}

// Type
type OperationType = (a: number, b: number) => number;
```

Les deux sont **équivalents** pour une signature simple. On préfère :

- `type` pour les signatures courtes et les unions de fonctions ;
- `interface` quand la signature est **longue**, ou qu'on veut ajouter des **propriétés** à la fonction.

---

## 3. Propriétés sur une fonction

Une fonction peut aussi porter des propriétés :

```typescript
interface Logger {
    (message: string): void;
    niveau: "info" | "erreur";
}

function creerLogger(niveau: "info" | "erreur"): Logger {
    const logger = ((m: string) => console.log(`[${niveau}]`, m)) as Logger;
    logger.niveau = niveau;
    return logger;
}

const log = creerLogger("info");
log("Démarrage");   // ✅ appel
log.niveau;         // ✅ propriété
```

C'est le pattern utilisé par de nombreuses librairies (ex. `express`, `chalk`).

---

## 4. Deux écritures pour une méthode

```typescript
interface Calculateur {
    ajouter(a: number, b: number): number;          // syntaxe méthode
    soustraire: (a: number, b: number) => number;   // syntaxe propriété
}
```

Différence subtile :

|                           | Syntaxe méthode     | Syntaxe propriété       |
| :------------------------ | :------------------ | :---------------------- |
| Bivariance des paramètres | ✅ (plus permissive) | ❌ (strictFunctionTypes) |
| `readonly` possible       | ❌                   | ✅                       |
| Style                     | plus court          | plus explicite          |

Pour les callbacks, préférez la **syntaxe propriété** (vérification plus stricte).

---

## 5. Interface de callback

```typescript
interface CallbackResultat {
    (erreur: Error | null, resultat?: string): void;
}

function chargerDonnees(cb: CallbackResultat) {
    cb(null, "OK");
}
```

C'est le style « node-style callback » (`error-first`).

---

## 6. Interface générique de fonction

```typescript
interface Comparateur<T> {
    (a: T, b: T): number;
}

function trier<T>(tableau: T[], comparer: Comparateur<T>): T[] {
    return [...tableau].sort(comparer);
}

trier([3, 1, 2], (a, b) => a - b); // ✅
```

---

## 7. Surcharges dans une interface

```typescript
interface Convertir {
    (valeur: string): number;
    (valeur: number): string;
}
```

Plusieurs call signatures = surcharges. L'implémentation doit accepter l'union des paramètres.

⚠️ Une interface de surcharge décrit les **appels** possibles, pas le corps de la fonction :
une simple fonction fléchée ne peut pas être assignée à ce type (son retour devrait être
à la fois `number` et `string`). On implémente avec une fonction surchargée :

```typescript
function convertir(valeur: string): number;
function convertir(valeur: number): string;
function convertir(valeur: string | number): number | string {
    return typeof valeur === "string" ? Number(valeur) : String(valeur);
}
```

Si une seule signature suffit, préférez un `type` union :

```typescript
type ConvertirUnion = (valeur: string | number) => number | string;
```

---

## 8. Points à retenir

- Une interface avec `(paramètres): typeRetour` décrit une **fonction**.
- Elle sert à **nommer** et **réutiliser** une signature (callbacks, stratégies, handlers).
- Les paramètres sont vérifiés : nombre, types et type de retour.
- On peut ajouter des **propriétés** à la fonction (pattern logger / plugin).
- `type X = (...) => ...` est l'équivalent le plus court.
