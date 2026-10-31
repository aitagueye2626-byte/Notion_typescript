# 1.12 - Le Type Objet Anonyme

En TypeScript, un **type objet anonyme** consiste à écrire la structure exacte d'un objet (ses clés et leurs types) **directement après les deux-points `:`**, sans donner de nom à ce type.

---

## 1. Syntaxe d'un type objet anonyme

```typescript
let etudiant: { nom: string; age: number } = {
    nom: "Aita",
    age: 21
};
```

Pourquoi l'appelle-t-on **anonyme** ?
Parce que le type `{ nom: string; age: number }` est défini directement sur la variable (ou le paramètre d'une fonction) et **n'a pas de nom** réutilisable.

---

## 2. Les options possibles dans un type objet anonyme

| Syntaxe | Exemple | Signification |
| :--- | :--- | :--- |
| **Propriété obligatoire** | `{ nom: string; age: number }` | L'objet **doit** obligatoirement avoir `nom` et `age`. |
| **Propriété optionnelle (`?`)** | `{ nom: string; telephone?: string }` | `telephone` est facultatif (peut être omis). |
| **Propriété en lecture seule (`readonly`)** | `{ readonly id: number; nom: string }` | `id` ne pourra plus être modifié après la création de l'objet. |
