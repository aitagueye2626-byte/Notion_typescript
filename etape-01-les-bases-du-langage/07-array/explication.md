# 1.7 - Le type `Array` (Tableau) - Toutes les opérations

En TypeScript, un **tableau (`Array`)** est une liste ordonnée de valeurs.

---

## 1. Déclarer un tableau
- **Syntaxe crochets :** `let fruits: string[] = ["Mangue", "Banane"];`
- **Syntaxe générique :** `let notes: Array<number> = [15, 18];`
- **Tableau multi-types (Union) :** `let mixte: (string | number)[] = ["Aita", 21];`
- **Tableau de tableaux (Matrice 2D) :** `let grille: number[][] = [[1, 2], [3, 4]];`
- **Tableau en lecture seule :** `let fixe: readonly string[] = ["Lundi", "Mardi"];`

---

## 2. Lecture et informations de base
| Opération | Exemple | Description |
| :--- | :--- | :--- |
| **`tab[index]`** | `fruits[0]` | Lire un élément par son index (commence à 0). |
| **`at(index)`** | `fruits.at(-1)` | Lire un élément (accepte `-1` pour lire le dernier élément !). |
| **`length`** | `fruits.length` | Nombre d'éléments dans le tableau (peut aussi être modifié : `fruits.length = 0` vide le tableau). |
| **`Array.isArray(x)`** | `Array.isArray(fruits)` | Vérifie si une variable est bien un tableau (`true`/`false`). |

---

## 3. Ajouter et supprimer des éléments (modifie le tableau)
| Méthode | Exemple | Description |
| :--- | :--- | :--- |
| **`push(...)`** | `fruits.push("Ananas")` | Ajoute un ou plusieurs éléments **à la fin**. |
| **`unshift(...)`** | `fruits.unshift("Pomme")` | Ajoute un ou plusieurs éléments **au début**. |
| **`pop()`** | `fruits.pop()` | Supprime et renvoie le **dernier** élément. |
| **`shift()`** | `fruits.shift()` | Supprime et renvoie le **premier** élément. |
| **`splice(debut, nb, ...ajouts)`** | `fruits.splice(1, 2, "Kiwi")` | Supprime `nb` éléments à partir de `debut` et insère de nouveaux éléments au milieu. |

---

## 4. Rechercher et tester des éléments
| Méthode | Exemple | Description |
| :--- | :--- | :--- |
| **`includes(val)`** | `fruits.includes("Mangue")` | Renvoie `true` si la valeur est présente, sinon `false`. |
| **`indexOf(val)`** | `fruits.indexOf("Banane")` | Renvoie le **1er index** trouvé (en partant du début) ou `-1`. |
| **`lastIndexOf(val)`** | `fruits.lastIndexOf("Banane")` | Renvoie le **dernier index** trouvé (en partant de la fin) ou `-1`. |
| **`find(fn)`** | `notes.find(n => n > 15)` | Renvoie le **1er élément** qui vérifie la condition (ou `undefined`). |
| **`findLast(fn)`** | `notes.findLast(n => n > 15)` | Renvoie le **dernier élément** qui vérifie la condition. |
| **`findIndex(fn)`** | `notes.findIndex(n => n > 15)` | Renvoie l'**index du 1er élément** qui vérifie la condition (ou `-1`). |
| **`findLastIndex(fn)`** | `notes.findLastIndex(n => n > 15)` | Renvoie l'**index du dernier élément** qui vérifie la condition. |
| **`some(fn)`** | `notes.some(n => n >= 10)` | Renvoie `true` si **au moins un** élément respecte la condition. |
| **`every(fn)`** | `notes.every(n => n >= 10)` | Renvoie `true` si **tous** les éléments respectent la condition. |

---

## 5. Parcourir un tableau (Boucles)
| Opération | Exemple | Description |
| :--- | :--- | :--- |
| **`forEach(fn)`** | `fruits.forEach((f, i) => console.log(i, f))` | Exécute une fonction sur chaque élément (ne renvoie rien). |
| **`for (let x of tab)`** | `for (const fruit of fruits) { ... }` | Boucle sur les **valeurs** du tableau. |
| **`for (let i in tab)`** | `for (const index in fruits) { ... }` | Boucle sur les **index** du tableau. |
| **`entries()` / `keys()` / `values()`** | `fruits.entries()` | Récupère un itérateur des `[index, valeur]`, des `index` ou des `valeurs`. |

---

## 6. Transformer, filtrer et calculer (crée un nouveau résultat)
| Méthode | Exemple | Description |
| :--- | :--- | :--- |
| **`map(fn)`** | `notes.map(n => n * 2)` | Crée un nouveau tableau en transformant chaque élément. |
| **`filter(fn)`** | `notes.filter(n => n >= 10)` | Crée un nouveau tableau uniquement avec les éléments qui valident la condition. |
| **`reduce(fn, init)`** | `notes.reduce((acc, n) => acc + n, 0)` | Réduit le tableau à une seule valeur (de gauche à droite), ex: somme totale. |
| **`reduceRight(fn, init)`** | `notes.reduceRight((acc, n) => acc + n, 0)` | Comme `reduce`, mais en partant de la droite vers la gauche. |
| **`flat(profondeur)`** | `[[1, 2], [3]].flat()` | Aplatit des tableaux imbriqués en un seul tableau `[1, 2, 3]`. |
| **`flatMap(fn)`** | `phrases.flatMap(p => p.split(" "))` | Fait un `map()` suivi automatiquement d'un `flat()`. |

---

## 7. Trier, inverser et remplir
| Méthode | Exemple | Description |
| :--- | :--- | :--- |
| **`sort(fn)`** | `notes.sort((a, b) => a - b)` | Trie le tableau sur place (croissant : `a - b`, décroissant : `b - a`). |
| **`toSorted(fn)`** | `notes.toSorted((a, b) => a - b)` | Renvoie une copie triée **sans modifier** le tableau original. |
| **`reverse()`** | `fruits.reverse()` | Inverse l'ordre des éléments sur place. |
| **`toReversed()`** | `fruits.toReversed()` | Renvoie une copie inversée **sans modifier** l'original. |
| **`fill(val, deb, fin)`** | `notes.fill(0, 1, 3)` | Remplit le tableau avec une valeur fixe (`0`) entre les index `deb` et `fin`. |
| **`copyWithin(cible, deb, fin)`** | `notes.copyWithin(0, 2)` | Copie une portion du tableau vers un autre endroit du même tableau. |

---

## 8. Extraire, copier, fusionner et convertir
| Opération | Exemple | Description |
| :--- | :--- | :--- |
| **`slice(deb, fin)`** | `fruits.slice(0, 2)` | Extrait un sous-tableau de `deb` jusqu'à `fin` (non inclus), sans modifier l'original. |
| **`concat(tab2)`** | `fruits.concat(["Kiwi"])` | Fusionne deux ou plusieurs tableaux en un nouveau tableau. |
| **`Spread [...]`** | `[...fruits, ...autres]` | Copie ou fusionne des tableaux facilement. |
| **`Destructuration`** | `const [premier, second] = fruits` | Extrait les éléments directement dans des variables. |
| **`join(sep)`** | `fruits.join(" - ")` | Transforme le tableau en `string` avec un séparateur. |
| **`toString()`** | `fruits.toString()` | Transforme le tableau en `string` séparé par des virgules. |
| **`Array.from(...)`** | `Array.from("Aita")` | Crée un tableau à partir d'un texte ou objet itérable (`["A", "i", "t", "a"]`). |
| **`Array.of(...)`** | `Array.of(1, 2, 3)` | Crée un tableau à partir des arguments passés (`[1, 2, 3]`). |
