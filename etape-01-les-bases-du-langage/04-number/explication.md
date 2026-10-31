# 1.4 - Le type `number` - Explication et Opérations

En TypeScript, le type **`number`** représente tous les nombres : entiers (`25`), décimaux (`19.99`), négatifs (`-5`), mais aussi `Infinity` et `NaN` (Not a Number).

---

## 1. Les opérateurs arithmétiques (calculs)
| Opérateur | Nom | Exemple | Résultat |
| :--- | :--- | :--- | :--- |
| **`+`** | Addition | `10 + 5` | `15` |
| **`-`** | Soustraction | `10 - 5` | `5` |
| **`*`** | Multiplication | `10 * 5` | `50` |
| **`/`** | Division | `10 / 4` | `2.5` |
| **`%`** | Modulo (reste de la division) | `10 % 3` | `1` |
| **`**`** | Puissance (exposant) | `2 ** 3` | `8` |

---

## 2. Les opérateurs d'assignation et d'incrémentation
- **`x++`** : Ajoute `1` à `x` (incrémentation)
- **`x--`** : Enlève `1` à `x` (décrémentation)
- **`x += 5`** : Équivaut à `x = x + 5`
- **`x -= 5`** : Équivaut à `x = x - 5`
- **`x *= 2`** : Équivaut à `x = x * 2`
- **`x /= 2`** : Équivaut à `x = x / 2`

---

## 3. Les méthodes utiles sur `number` et `Math`
| Méthode | Exemple | Description |
| :--- | :--- | :--- |
| **`toFixed(n)`** | `(15.567).toFixed(2)` | Formate avec `n` chiffres après la virgule (`"15.57"`). |
| **`toString()`** | `(25).toString()` | Convertit le nombre en texte (`"25"`). |
| **`Number(texte)`** | `Number("42")` | Convertit un texte en nombre (`42`). |
| **`parseInt(texte)`** | `parseInt("42.9")` | Convertit un texte en nombre **entier** (`42`). |
| **`parseFloat(texte)`** | `parseFloat("42.9")` | Convertit un texte en nombre **décimal** (`42.9`). |
| **`Number.isInteger(x)`** | `Number.isInteger(10)` | Vérifie si c'est un entier (`true` ou `false`). |
| **`Number.isNaN(x)`** | `Number.isNaN(NaN)` | Vérifie si la valeur est `NaN` (erreur de calcul). |
| **`Math.round(x)`** | `Math.round(4.6)` | Arrondit à l'entier le plus proche (`5`). |
| **`Math.floor(x)`** | `Math.floor(4.9)` | Arrondit à l'entier inférieur (`4`). |
| **`Math.ceil(x)`** | `Math.ceil(4.1)` | Arrondit à l'entier supérieur (`5`). |
| **`Math.max(a, b)` / `Math.min(a, b)`** | `Math.max(10, 25)` | Renvoie le plus grand (`25`) ou le plus petit nombre. |
| **`Math.random()`** | `Math.random()` | Génère un nombre aléatoire entre `0` et `1`. |
