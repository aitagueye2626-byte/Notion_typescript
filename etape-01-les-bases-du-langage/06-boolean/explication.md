# 1.6 - Le type `boolean` - Explication et Opérations

En TypeScript, le type **`boolean`** ne peut avoir que **2 valeurs** : **`true`** (vrai) ou **`false`** (faux).

---

## 1. Les opérateurs logiques (combiner des booleans)
| Opérateur | Nom | Exemple | Explication |
| :--- | :--- | :--- | :--- |
| **`&&`** | **ET** (AND) | `estConnecte && estAdmin` | Renvoie `true` seulement si **les deux** sont `true`. |
| **`\|\|`** | **OU** (OR) | `estAdmin \|\| estModerateur` | Renvoie `true` si **au moins un** des deux est `true`. |
| **`!`** | **NON** (NOT / Inverse) | `!estConnecte` | Inverse la valeur : `!true` donne `false`, `!false` donne `true`. |

---

## 2. Les opérateurs de comparaison (qui produisent un `boolean`)
| Opérateur | Signification | Exemple | Résultat (`boolean`) |
| :--- | :--- | :--- | :--- |
| **`===`** | Strictement égal (valeur + type) | `5 === 5` | `true` |
| **`!==`** | Strictement différent | `5 !== 3` | `true` |
| **`>`** | Strictement supérieur | `10 > 5` | `true` |
| **`<`** | Strictement inférieur | `10 < 5` | `false` |
| **`>=`** | Supérieur ou égal | `18 >= 18` | `true` |
| **`<=`** | Inférieur ou égal | `12 <= 10` | `false` |

---

## 3. Convertir une valeur en `boolean`
- **`Boolean(valeur)`** ou **`!!valeur`** :
  - Valeurs qui donnent **`false`** (*falsy*) : `0`, `""` (texte vide), `null`, `undefined`, `NaN`, `false`.
  - Toutes les autres valeurs donnent **`true`** (*truthy*), ex: `Boolean("Aita")` $\rightarrow$ `true`, `Boolean(42)` $\rightarrow$ `true`.
