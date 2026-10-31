# 2.4 - Le type `Function`

En TypeScript, une variable peut stocker une fonction ! Pour typer cette variable, il existe **2 façons** :

---

## 1. Le type générique `Function` (avec un F majuscule)
- `let maVariable: Function;`
- Indique que `maVariable` ne peut contenir **qu'une fonction** (et pas un nombre ou un texte).
- ⚠️ **Limite :** `Function` accepte *n'importe quelle* fonction, peu importe ses paramètres ou son retour.

## 2. Le type de fonction précis (Signature de fonction) - *Recommandé*
- `let monCalcul: (a: number, b: number) => number;`
- Indique que la variable ne peut contenir **qu'une fonction qui prend 2 `number` en paramètres et retourne un `number`**.
