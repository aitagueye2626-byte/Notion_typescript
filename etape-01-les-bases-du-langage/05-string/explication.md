# 1.5 - Le type `string` - Explication et Opérations

En TypeScript, le type **`string`** représente une chaîne de caractères (du texte).
On peut l'écrire avec `"..."`, `'...'` ou `` `...` `` (backticks).

---

## 1. Assembler du texte (Concaténation)
- **Avec `+`** : `"Bonjour " + nom`
- **Avec `+=`** : `phrase += " !"`
- **Avec backticks `` ` ${ } ` ``** : `` `Bonjour ${nom} !` ``

---

## 2. Toutes les opérations et méthodes sur `string`

### A. Taille et lecture de caractères
| Opération | Exemple | Description |
| :--- | :--- | :--- |
| **`length`** | `"Aita".length` | Renvoie le nombre de caractères (`4`). |
| **`texte[i]`** ou **`charAt(i)`** | `"Aita"[0]` | Renvoie le caractère à l'index `0` (`"A"`). |
| **`at(i)`** | `"Aita".at(-1)` | Renvoie le caractère (accepte `-1` pour le dernier : `"a"`). |

### B. Changer la casse (Majuscules / Minuscules) et nettoyer
| Méthode | Exemple | Description |
| :--- | :--- | :--- |
| **`toUpperCase()`** | `"aita".toUpperCase()` | Met tout en MAJUSCULES (`"AITA"`). |
| **`toLowerCase()`** | `"AITA".toLowerCase()` | Met tout en minuscules (`"aita"`). |
| **`trim()`** | `"  bonjour  ".trim()` | Supprime les espaces inutiles au début et à la fin. |
| **`trimStart()` / `trimEnd()`** | `texte.trimStart()` | Supprime les espaces uniquement au début ou à la fin. |

### C. Rechercher dans un texte
| Méthode | Exemple | Description |
| :--- | :--- | :--- |
| **`includes(mot)`** | `"Bonjour Aita".includes("Aita")` | Vérifie si le texte contient `"Aita"` (`true`/`false`). |
| **`startsWith(mot)`** | `"Bonjour".startsWith("Bon")` | Vérifie si le texte commence par `"Bon"` (`true`). |
| **`endsWith(mot)`** | `"image.png".endsWith(".png")` | Vérifie si le texte finit par `".png"` (`true`). |
| **`indexOf(mot)`** | `"banane".indexOf("a")` | Position de la 1ère apparition (`1`, ou `-1` si introuvable). |
| **`lastIndexOf(mot)`** | `"banane".lastIndexOf("a")` | Position de la dernière apparition (`3`). |

### D. Découper, remplacer et transformer
| Méthode | Exemple | Description |
| :--- | :--- | :--- |
| **`slice(deb, fin)`** | `"TypeScript".slice(0, 4)` | Extrait une partie du texte (`"Type"`). |
| **`substring(deb, fin)`** | `"TypeScript".substring(4, 10)` | Extrait une sous-chaîne (`"Script"`). |
| **`replace(ancien, nouv)`** | `"a-b-c".replace("-", " ")` | Remplace la **1ère** occurrence (`"a b-c"`). |
| **`replaceAll(anc, nouv)`** | `"a-b-c".replaceAll("-", " ")` | Remplace **toutes** les occurrences (`"a b c"`). |
| **`split(separateur)`** | `"a,b,c".split(",")` | Découpe le texte et renvoie un **tableau** `["a", "b", "c"]`. |
| **`repeat(n)`** | `"Ha".repeat(3)` | Répète le texte `n` fois (`"HaHaHa"`). |
| **`padStart(n, char)`** | `"5".padStart(3, "0")` | Complète au début jusqu'à `n` caractères (`"005"`). |
| **`padEnd(n, char)`** | `"5".padEnd(3, "0")` | Complète à la fin (`"500"`). |
