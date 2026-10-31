# 6.4 - Attributs et méthodes optionnels

Le symbole **`?`** rend une propriété ou une méthode **facultative**.

```typescript
interface Formulaire {
    nom: string;              // obligatoire
    email?: string;           // optionnel
    valider?: () => boolean;  // méthode optionnelle
}

const f: Formulaire = { nom: "Aita" }; // ✅ valide sans email ni valider
```

---

## 1. `?` signifie `T | undefined`

```typescript
interface Formulaire { nom: string; email?: string; }

type Email = Formulaire["email"]; // string | undefined
```

On ne peut donc pas utiliser la valeur directement :

```typescript
f.email.toUpperCase();      // ❌ Object is possibly 'undefined'
f.email?.toUpperCase();     // ✅
f.email ?? "non renseigné"; // ✅
```

---

## 2. `?` vs `| undefined`

| Écriture                     | Propriété absente                | Valeur `undefined` |
| :--------------------------- | :------------------------------- | :----------------- |
| `email?: string`             | ✅ autorisé                       | ✅ autorisé         |
| `email: string \| undefined` | ❌ **obligatoire** de la déclarer | ✅ autorisé         |

```typescript
interface A { email?: string }
interface B { email: string | undefined }

const a: A = {};                              // ✅
const b: B = {};                              // ❌ 'email' manquant
const b2: B = { email: undefined };           // ✅
```

> Avec `exactOptionalPropertyTypes`, `email?: string` **refuse** même `{ email: undefined }`.

---

## 3. Méthode optionnelle

```typescript
interface Compte {
    fermer?(): void;
}

compte.fermer?.(); // ✅ pas d'erreur si la méthode n'existe pas
```

Sans `?.` :

```typescript
if (compte.fermer) compte.fermer();
```

⚠️ Ne pas écrire `compte.fermer()` — erreur de compilation, et `TypeError` à l'exécution si la méthode est absente.

---

## 4. Options avec valeurs par défaut

Le pattern classique : toutes les options sont optionnelles à l'entrée, complètes en sortie.

```typescript
interface Options {
    vitesse?: number;
    couleur?: string;
    mode?: "clair" | "sombre";
}

function initialiser(options: Options = {}): Required<Options> {
    return {
        vitesse: options.vitesse ?? 1,
        couleur: options.couleur ?? "bleu",
        mode: options.mode ?? "clair",
    };
}
```

---

## 5. `Partial<T>` et `Required<T>`

Au lieu d'écrire `?` partout, on peut transformer un type existant :

```typescript
interface Utilisateur { id: number; nom: string; email: string; }

// Toutes les propriétés deviennent optionnelles
type UtilisateurPartiel = Partial<Utilisateur>;

function mettreAJour(id: number, changements: Partial<Utilisateur>) { ... }
mettreAJour(1, { email: "nouveau@exemple.com" }); // ✅

// Inverse : tout devient obligatoire
type UtilisateurComplet = Required<Partial<Utilisateur>>;
```

| Utilitaire    | Effet                  |
| :------------ | :--------------------- |
| `Partial<T>`  | toutes optionnelles    |
| `Required<T>` | toutes obligatoires    |
| `Readonly<T>` | toutes `readonly`      |
| `Pick<T, K>`  | garder certaines clés  |
| `Omit<T, K>`  | retirer certaines clés |

---

## 6. Propriété optionnelle et `undefined` explicite

```typescript
const obj = { nom: "Aita", email: undefined };
"email" in obj; // true — la clé existe avec la valeur undefined
```

Avec `Object.keys`, la clé apparaît aussi. Attention aux sérialisations JSON (les `undefined` disparaissent).

---

## 7. Points à retenir

- `?` = propriété **facultative** (peut être absente) et de type `T | undefined`.
- Toujours vérifier (`?.`, `??`, `if`) avant d'utiliser la valeur.
- Méthode optionnelle → `obj.methode?.()`.
- `Partial<T>` évite de répéter `?` sur un type existant.
- `email?: string` ≠ `email: string | undefined` (le second reste obligatoire).
