# 5.1 - Type union (`A | B`)

Un **type union** permet à une variable d'accepter **plusieurs types possibles**, séparés par le symbole `|`.

```typescript
let identifiant: string | number;

identifiant = 42;        // ✅
identifiant = "AITA-42"; // ✅
identifiant = true;      // ❌ boolean n'est pas dans l'union
```

---

## 1. Union de primitifs

```typescript
let valeur: string | number | boolean;
```

On peut aussi mélanger avec `null` / `undefined` :

```typescript
let telephone: string | null = null;
let age: number | undefined;
```

---

## 2. Union de littéraux

Un cas très fréquent : restreindre aux valeurs réellement autorisées.

```typescript
type Statut = "en attente" | "en cours" | "livree";

let statut: Statut = "en cours";  // ✅
statut = "annulee";               // ❌ n'est pas dans l'union
```

> 💡 C'est souvent une **meilleure alternative aux `enum`** (pas de code généré, plus lisible, compatible JSON).

---

## 3. Union de types d'objets

```typescript
type Voiture = { roues: number; permisB: true };
type Moto    = { roues: number; casque: boolean };

let vehicule: Voiture | Moto;

vehicule = { roues: 4, permisB: true };
vehicule = { roues: 2, casque: true };

vehicule.roues;    // ✅ commun aux deux
// vehicule.permisB; // ❌ n'existe pas forcément
```

👉 Pour utiliser une propriété spécifique, il faut **réduire** le type (voir 5.2 à 5.5).

---

## 4. Unions et tableaux : attention aux parenthèses

```typescript
let a: string | number[];   // string OU number[]
let b: (string | number)[]; // tableau d'éléments string OU number

let x: (string | number)[] = ["Aita", 18]; // ✅
```

Sans parenthèses, `[]` ne s'applique qu'au **dernier** type de l'union.

---

## 5. Il faut vérifier avant d'utiliser

TypeScript n'autorise que les membres **communs** à tous les types de l'union :

```typescript
function formater(valeur: string | number): string {
    // valeur.toUpperCase();  // ❌ pas sur number
    if (typeof valeur === "number") {
        return valeur.toFixed(2);
    }
    return valeur.toUpperCase(); // ici TypeScript sait que c'est un string
}
```

Ce mécanisme s'appelle le **narrowing** (réduction de type) — détaillé dans les leçons suivantes.

---

## 6. Union vs `any`

|                   | `string \| number` | `any`         |
| :---------------- | :----------------- | :------------ |
| Vérification      | ✅ stricte          | ❌ aucune      |
| Autocomplétion    | ✅ selon le cas     | ❌             |
| Erreurs détectées | à la compilation   | à l'exécution |

> `any` désactive le typage ; une union **garde** les avantages de TypeScript.

---

## 7. Récapitulatif des techniques de narrowing

| Test                     | Utile pour            | Leçon |
| :----------------------- | :-------------------- | :---- |
| propriété `type` commune | union d'objets        | 5.2   |
| `typeof x === "string"`  | primitifs             | 5.4   |
| `"prop" in obj`          | présence de propriété | 5.5   |
| `x instanceof Classe`    | classes               | 5.6   |
