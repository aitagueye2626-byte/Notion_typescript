# 02 - Nullish Coalescing (`??`)

## Explication simple
L'opérateur **`??`** (exactement comme en PHP !) permet de donner une **valeur de secours par défaut** uniquement si la variable à gauche vaut **`null`** ou **`undefined`** :
- `valeur ?? "Valeur par défaut"`
- Si `valeur` existe (même si c'est `0` ou `""`), on la garde.
- Si `valeur` est `null` ou `undefined`, on prend la valeur de droite.
