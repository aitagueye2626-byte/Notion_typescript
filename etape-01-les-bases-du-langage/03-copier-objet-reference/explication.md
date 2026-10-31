# 1.3 - Copier un objet de type référence

Dans la notion précédente, on a vu que `let copie = original` ne crée pas un nouvel objet (les deux restent liés).

Pour créer une **vraie copie indépendante** d'un objet ou d'un tableau, on utilise l'opérateur **`...` (Spread operator)** :

- Pour un objet : `let copie = { ...original };`
- Pour un tableau : `let copie = [ ...original ];`

Ainsi, si on modifie `copie`, `original` **ne change pas**.
