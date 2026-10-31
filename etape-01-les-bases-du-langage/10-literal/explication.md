# 1.10 - Le type `Literal` (Type littéral)

En TypeScript, un **type littéral (`Literal`)** est un type qui n'accepte **qu'une valeur exacte précise** (ou une liste précise de valeurs avec `|`), au lieu d'accepter n'importe quel `string` ou n'importe quel `number`.

---

## 1. Différence entre un type classique et un type `Literal`

| Type | Exemple | Ce qui est autorisé |
| :--- | :--- | :--- |
| **`string`** | `let couleur: string;` | N'importe quel texte (`"rouge"`, `"abc"`, `"bonjour"`...) |
| **Literal string** | `let couleur: "rouge" \| "vert" \| "bleu";` | **Uniquement** `"rouge"`, `"vert"` ou `"bleu"`. Tout autre mot donne une erreur ! |
| **Literal number** | `let noteMax: 10 \| 20;` | **Uniquement** le nombre `10` ou `20`. |
| **Literal boolean** | `let succes: true;` | **Uniquement** `true`. |

---

## 2. Lien avec `const` et `as const`
- Quand on déclare une variable avec **`const`**, TypeScript lui donne automatiquement un type **Literal** :
  - `const pays = "Sénégal";` $\rightarrow$ son type n'est pas `string`, mais exactement `"Sénégal"`.
- On peut aussi bloquer un objet ou un tableau en valeurs exactes avec **`as const`**.
