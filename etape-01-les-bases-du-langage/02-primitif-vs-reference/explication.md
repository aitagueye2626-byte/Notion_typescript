# 1.2 - Type primitif vs Type référence

En TypeScript, il existe deux grandes familles de types :

## 1. Les types primitifs (`number`, `string`, `boolean`)
- Ils stockent **directement la valeur**.
- Quand on copie une variable primitive dans une autre (`let b = a`), on crée une **vraie copie indépendante**. Modifier `b` ne change pas `a`.

## 2. Les types références (`Object`, `Array`)
- Ils stockent **l'adresse (la référence)** vers l'objet en mémoire, pas l'objet lui-même.
- Quand on fait `let user2 = user1`, les deux variables pointent vers **le même objet**. Modifier `user2` modifie aussi `user1` !
