# 5.6 - Intersection de types (`A & B`)

Une **intersection** crée un type qui possède **toutes les propriétés** des types combinés. C'est le « ET » logique.

```typescript
type Nommable = { nom: string };
type Ageable  = { age: number };

type Personne = Nommable & Ageable;
// { nom: string; age: number }

const aita: Personne = { nom: "Aita", age: 21 }; // ✅
```

---

## 1. Union vs intersection

| Opérateur | Sens   | Exigence                                       |
| :-------- | :----- | :--------------------------------------------- |
| `A \| B`  | **OU** | l'objet correspond à **au moins un** des types |
| `A & B`   | **ET** | l'objet possède **toutes** les propriétés      |

```typescript
type A = { a: number };
type B = { b: string };

type Union        = A | B;  // { a } OU { b }
type Intersection = A & B;  // { a, b } — les deux obligatoires

const u1: Union = { a: 1 };              // ✅
const u2: Union = { b: "x" };            // ✅
const i1: Intersection = { a: 1, b: "x" }; // ✅ (les deux)
// const i2: Intersection = { a: 1 };    // ❌ 'b' manquant
```

---

## 2. Intersections impossibles → `never`

Si deux types ont la **même propriété** avec des types incompatibles, l'intersection devient **inhabitable** :

```typescript
type A = { valeur: string };
type B = { valeur: number };

type Impossible = A & B; // valeur: string & number → never
```

De même pour des littéraux contradictoires :

```typescript
"oui" & "non"; // never
```

---

## 3. Enrichir un type existant

Pattern très courant : ajouter des champs à un type sans le dupliquer.

```typescript
type Utilisateur = { id: number; email: string };

type UtilisateurAvecDates = Utilisateur & {
    creeLe: Date;
    modifieLe: Date;
};
```

> 💡 Alternative moderne : `interface UtilisateurAvecDates extends Utilisateur { ... }`. Les deux sont équivalents pour les objets ; `&` fonctionne aussi sur les `type` unions et les primitifs.

---

## 4. Intersection avec un générique

```typescript
function avecDateCreation<T extends object>(objet: T): T & { creeLe: Date } {
    return { ...objet, creeLe: new Date() };
}

const produit = avecDateCreation({ nom: "Cahier", prix: 1500 });
produit.nom;    // ✅
produit.creeLe; // ✅ Date
```

C'est la signature typique d'un helper de factory / d'un décorateur de données.

---

## 5. Combiner `&` et `|` avec des parenthèses

```typescript
type Employe  = { id: number };
type Contact  = { email: string };
type Telephone = { tel: string };

// Un employé joignable par email OU par téléphone
type EmployeJoignable = Employe & (Contact | Telephone);
```

⚠️ Sans parenthèses, la priorité n'est pas celle attendue — `&` lie plus fort que `|` en TypeScript, mais écrivez toujours les parenthèses pour la lisibilité.

---

## 6. Intersections de fonctions

```typescript
type Log = (message: string) => void;
type LogHorodate = Log & { prefixe: string };

const logger: LogHorodate = Object.assign(
    (m: string) => console.log(logger.prefixe, m),
    { prefixe: "[LOG]" }
);
```

Un peu ésotérique, mais utile pour typer des fonctions avec propriétés (`express`, callbacks enrichis).

---

## 7. Intersection vs `interface extends`

|                        | `A & B`              | `interface C extends A, B`     |
| :--------------------- | :------------------- | :----------------------------- |
| Fonctionne avec `type` | ✅                    | ❌ (seulement avec `interface`) |
| Fusion de déclarations | ❌                    | ✅                              |
| Messages d'erreur      | parfois moins clairs | plus lisibles                  |
| Unions / primitifs     | ✅                    | ❌                              |

---

## 8. Points à retenir

- `&` = **ET** : toutes les propriétés sont exigées.
- Une intersection de propriétés contradictoires donne `never`.
- Très utilisé pour **enrichir** un type (`Utilisateur & { creeLe: Date }`).
- Toujours mettre des parenthèses quand on mélange `&` et `|`.
- `interface extends` est souvent plus lisible pour des objets simples.
