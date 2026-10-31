# 1.8 - Le type `Tuple`

En TypeScript, un **`Tuple`** est un tableau spécial dont **la taille est fixe** et où **le type de chaque position est connu à l'avance**.

---

## 1. Différence entre `Array` et `Tuple`

| Type | Syntaxe | Règle |
| :--- | :--- | :--- |
| **`Array` (Tableau)** | `(string \| number)[]` | Nombre d'éléments illimité, dans **n'importe quel ordre**. |
| **`Tuple`** | `[string, number]` | **Exactement 2 éléments** : le 1er **doit** être un `string`, le 2ème **doit** être un `number`. |

---

## 2. Les différentes formes de Tuple

| Syntaxe | Exemple | Description |
| :--- | :--- | :--- |
| **Tuple classique** | `let user: [string, number] = ["Aita", 21];` | Taille et ordre stricts. |
| **Tuple nommé (labels)** | `let coord: [x: number, y: number] = [10, 20];` | Donne un nom à chaque position pour rendre le code plus lisible. |
| **Tuple avec élément optionnel `?`** | `let info: [string, number?] = ["Aita"];` | Le 2ème élément est facultatif. |
| **Tuple en lecture seule (`readonly`)** | `let fixe: readonly [string, number] = ["Aita", 21];` | Interdit toute modification (même `push`). |
| **Tuple avec reste (`...type[]`)** | `let groupe: [string, ...number[]] = ["Notes", 15, 18, 12];` | Commence par un `string`, suivi d'autant de `number` qu'on veut. |

---

## 3. Opérations sur un Tuple
- **Lire par index :** `user[0]` (TypeScript sait que c'est un `string`), `user[1]` (TypeScript sait que c'est un `number`).
- **Modifier une position :** `user[1] = 22;` (uniquement avec le bon type).
- **Destructuration :** `const [nom, age] = user;` (très utilisé pour récupérer chaque valeur dans une variable).
