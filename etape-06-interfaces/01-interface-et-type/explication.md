# 6.1 - Interface et type

`interface` et `type` décrivent tous les deux **la forme d'un objet**. Dans 90 % des cas, ils sont interchangeables.

```typescript
type PersonneType = { nom: string; age: number };

interface PersonneInterface {
    nom: string;
    age: number;
}

const a: PersonneType      = { nom: "Aita", age: 21 };
const b: PersonneInterface = { nom: "Aita", age: 21 };
```

---

## 1. Ce qu'ils ont en commun

| Capacité                       | `type` | `interface` |
| :----------------------------- | :----: | :---------: |
| Décrire un objet               |   ✅    |      ✅      |
| Propriétés optionnelles (`?`)  |   ✅    |      ✅      |
| Propriétés `readonly`          |   ✅    |      ✅      |
| Index signature                |   ✅    |      ✅      |
| Méthodes                       |   ✅    |      ✅      |
| Être implémenté par une classe |   ✅    |      ✅      |
| Compatibilité structurelle     |   ✅    |      ✅      |

---

## 2. Les vraies différences

### a) `interface` peut être **fusionnée** (declaration merging)

```typescript
interface Utilisateur { id: number; }
interface Utilisateur { email: string; }
// → { id: number; email: string }

type UtilisateurType = { id: number };
type UtilisateurType = { email: string }; // ❌ Duplicate identifier
```

> Utile pour **enrichir** une librairie externe (ex. `declare module`). Risque : deux fichiers peuvent modifier silencieusement le même type.

### b) `type` accepte **unions, tuples et primitifs**

```typescript
type Statut = "actif" | "inactif";  // ✅
type Point  = [number, number];     // ✅
type ID     = string | number;      // ✅

// interface Statut = "actif" | "inactif"; ❌ invalide
```

### c) `type` accepte les **intersections** et les **types calculés**

```typescript
type Admin = Utilisateur & { niveau: number };
type Lecture = Readonly<Utilisateur>;
type Partiel = Partial<Utilisateur>;
```

### d) `interface` peut étendre **plusieurs** interfaces

```typescript
interface C extends A, B { }
```

`type` y arrive avec `&` : `type C = A & B`.

### e) Messages d'erreur

`interface` conserve son **nom** dans les erreurs et l'autocomplétion, ce qui est souvent plus lisible pour une API publique.

---

## 3. `interface extends` vs `type &`

|                      | `interface C extends A`            | `type C = A & B`               |
| :------------------- | :--------------------------------- | :----------------------------- |
| Sources              | uniquement des objets / interfaces | tout type                      |
| Conflit de propriété | ❌ erreur explicite                 | ⚠️ devient `never` (silencieux) |
| Fusion               | ✅                                  | ❌                              |
| Lisibilité           | ✅                                  | ✅                              |

> Le fait que `interface extends` **signale** un conflit de type est un vrai avantage.

---

## 4. Quand utiliser quoi ?

| Situation                                 | Recommandation                      |
| :---------------------------------------- | :---------------------------------- |
| Forme d'un objet, API publique            | **`interface`**                     |
| Contrat implémenté par une classe         | **`interface`**                     |
| Enrichir un module externe                | **`interface`**                     |
| Union, tuple, type littéral               | **`type`**                          |
| Type calculé (`Partial`, `Pick`, `Omit`…) | **`type`**                          |
| Intersection rapide                       | `type` (`&`) ou `interface extends` |

> 💡 **Règle d'équipe courante** : `interface` par défaut pour les objets, `type` pour tout le reste. Le plus important est d'être **cohérent** dans un projet.

---

## 5. Ils se combinent

```typescript
interface Animal { nom: string; }

type AnimalAvecCri = Animal & { cri: string };

const chat: AnimalAvecCri = { nom: "Minou", cri: "Miaou" };
```

Rien n'interdit d'utiliser les deux dans le même fichier.
