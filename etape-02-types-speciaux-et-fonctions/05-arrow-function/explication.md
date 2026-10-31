# 2.5 - Arrow Function (Fonction fléchée `=>`)

Une **Arrow Function (fonction fléchée)** est une façon plus courte et moderne d'écrire une fonction en utilisant la flèche **`=>`** (sans écrire le mot `function`).

---

## 1. Comparaison : Fonction classique vs Arrow Function

```typescript
// Fonction classique
function doubler(n: number): number {
    return n * 2;
}

// Arrow Function (avec accolades et return)
const doublerFleche = (n: number): number => {
    return n * 2;
};

// Arrow Function courte (sur 1 seule ligne : pas besoin de { } ni de "return" !)
const doublerCourt = (n: number): number => n * 2;
```

---

## 2. Les variantes d'écriture d'une Arrow Function

| Cas | Exemple | Explication |
| :--- | :--- | :--- |
| **Avec plusieurs lignes (`{ }`)** | `const fn = (a: number) => { return a + 1; };` | Nécessite les accolades `{ }` et le mot **`return`**. |
| **Sur une seule ligne (retour implicite)** | `const fn = (a: number) => a + 1;` | Renvoie directement le résultat **sans écrire `return`**. |
| **Sans paramètre `()`** | `const saluer = () => console.log("Bonjour");` | Les parenthèses vides `()` sont obligatoires. |
| **Retourner un objet sur 1 ligne** | `const creerUser = (nom: string) => ({ nom });` | On entoure l'objet de parenthèses `({ ... })`. |
