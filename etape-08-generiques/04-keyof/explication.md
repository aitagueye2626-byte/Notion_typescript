# 8.4 - L'opérateur `keyof`

L'opérateur **`keyof`** extrait toutes les clés (noms de propriétés) d'un type d'objet sous la forme d'un **type union de littéraux de chaînes de caractères**.

Associé aux fonctions et contraintes génériques, `keyof` permet d'écrire des opérations dynamiques sur les objets avec une **sécurité absolue** sur les noms et les types de leurs propriétés.

---

## 1. Découverte de `keyof`

```typescript
interface Utilisateur {
    id: number;
    nom: string;
    email: string;
    estActif: boolean;
}

// "ClesUtilisateur" équivaut à : "id" | "nom" | "email" | "estActif"
type ClesUtilisateur = keyof Utilisateur;

let cle: ClesUtilisateur;
cle = "nom";      // ✅ Valide
cle = "email";    // ✅ Valide
// cle = "adresse"; // ❌ Type '"adresse"' is not assignable to type 'keyof Utilisateur'.
```

---

## 2. Le duo incontournable : `<K extends keyof T>`

Le cas d'utilisation le plus célèbre de `keyof` est la lecture sécurisée d'une propriété dans un objet générique :

```typescript
function getPropriete<T, K extends keyof T>(objet: T, cle: K): T[K] {
    return objet[cle];
}
```

Décomposons cette signature :
1. `T` est le type de l'objet.
2. `K extends keyof T` oblige `cle` à être **une des clés valides** de l'objet `T`.
3. `T[K]` (type indexé) garantit que le type de retour est **exactement le type de cette propriété**.

### Exemple pratique :

```typescript
const aita: Utilisateur = {
    id: 1,
    nom: "Aita",
    email: "aita@mail.sn",
    estActif: true
};

const nom = getPropriete(aita, "nom");         // type string
const actif = getPropriete(aita, "estActif");   // type boolean
const identifiant = getPropriete(aita, "id");   // type number

// ❌ Rejeté immédiatement par le compilateur :
// getPropriete(aita, "salaire"); 
// Argument of type '"salaire"' is not assignable to parameter of type 'keyof Utilisateur'.
```

---

## 3. Modification typée avec `setProperty`

De la même manière, on peut garantir que la nouvelle valeur assignée respecte le type de la propriété visée :

```typescript
function setPropriete<T, K extends keyof T>(objet: T, cle: K, valeur: T[K]): void {
    objet[cle] = valeur;
}

setPropriete(aita, "nom", "Aita Gueye"); // ✅ Valide car "Aita Gueye" est string
// setPropriete(aita, "id", "cent");    // ❌ Erreur : string n'est pas assignable à number
```

---

## 4. `keyof` avec `typeof`

Pour extraire les clés d'un **objet déjà existant** (une valeur JavaScript et non un type), on combine `keyof typeof` :

```typescript
const configuration = {
    theme: "sombre",
    langue: "fr",
    taillePolice: 14
};

type ClesConfig = keyof typeof configuration; // "theme" | "langue" | "taillePolice"
```

---

## 5. Points à retenir

- `keyof T` produit l'union littérale des propriétés connues de `T`.
- `<K extends keyof T>` garantit qu'un argument de clé existe obligatoirement sur l'objet.
- `T[K]` (*indexed access type*) déduit automatiquement le type précis de la valeur ciblée.
- Élimine totalement les fautes de frappe (*typos*) dans les chaînes représentant des clés.
