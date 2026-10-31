# 8.1 - Fonctions génériques

Les **génériques** (Generics) permettent d'écrire du code réutilisable qui fonctionne avec **différents types**, tout en conservant une **sécurité de typage totale** (sans passer par `any`).

Un générique agit comme une **variable de type** : au lieu de manipuler une valeur, on passe un type en paramètre.

---

## 1. Le problème sans les génériques

Supposons que nous voulions une fonction qui renvoie l'élément passé en argument :

```typescript
// ❌ Approche 1 : Dupliquer le code pour chaque type
function identiteString(valeur: string): string { return valeur; }
function identiteNumber(valeur: number): number { return valeur; }

// ❌ Approche 2 : Utiliser "any" (perte de sécurité et d'autocomplétion)
function identiteAny(valeur: any): any {
    return valeur;
}
const res = identiteAny("bonjour");
// res est de type any ! TypeScript ne sait plus que c'est une chaîne.
```

---

## 2. La solution : la fonction générique `<T>`

On introduit un **paramètre de type**, noté conventionnellement `<T>` (pour *Type*) :

```typescript
function identite<T>(valeur: T): T {
    return valeur;
}

// 1. Inférence automatique du type par TypeScript :
const mot = identite("Aita");       // TypeScript infère T = string
const age = identite(21);           // TypeScript infère T = number

// 2. Définition explicite du type :
const actif = identite<boolean>(true); // T est explicitement boolean
```

Grâce à `<T>`, TypeScript garantit que le type de retour est **strictement identique** au type du paramètre reçu. L'autocomplétion et les vérifications fonctionnent parfaitement.

---

## 3. Plusieurs paramètres de type : `<T, U>`

Une fonction peut déclarer plusieurs paramètres de type génériques (couramment nommés `T`, `U`, `V`, `K`, `V`...) :

```typescript
function creerPaire<T, U>(premier: T, second: U): [T, U] {
    return [premier, second];
}

const paire = creerPaire("id", 101); // type [string, number]
```

---

## 4. Fonctions génériques avec des tableaux

Manipuler des tableaux d'éléments de type inconnu à l'avance est l'un des cas d'usage les plus fréquents :

```typescript
// Récupérer le premier élément d'un tableau
function premierElement<T>(elements: T[]): T | undefined {
    return elements[0];
}

const n = premierElement([10, 20, 30]);      // type: number | undefined
const s = premierElement(["a", "b", "c"]);  // type: string | undefined
```

---

## 5. Syntaxe avec les fonctions fléchées (Arrow Functions)

Avec une fonction fléchée, la syntaxe est similaire :

```typescript
const inverser = <T>(elements: T[]): T[] => {
    return [...elements].reverse();
};

const nombresInverses = inverser([1, 2, 3]); // [3, 2, 1]
```

> **Astuce TSX / React :** Dans un fichier `.tsx`, écrire `<T>` peut être confondu avec une balise JSX. On écrit alors `<T,>` ou `<T extends unknown>` pour lever l'ambiguïté.

---

## 6. Conventions de nommage

| Lettre | Signification courante |
| :----- | :--------------------- |
| `T`    | Type général           |
| `U`, `V` | Types secondaires    |
| `K`    | Clé (*Key*)            |
| `V`    | Valeur (*Value*)       |
| `E`    | Élément (*Element*)    |

---

## 7. Points à retenir

- Un générique `<T>` est un **paramètre de type** résolu à l'appel.
- Évite la duplication de code tout en évitant le piège de `any`.
- TypeScript infère généralement le type tout seul ; on peut le forcer avec `<Type>`.
- Permet de travailler sur des structures dynamiques (tableaux, promesses, objets) en gardant le typage exact.
