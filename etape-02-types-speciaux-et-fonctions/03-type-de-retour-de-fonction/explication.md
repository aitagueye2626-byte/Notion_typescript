# 2.3 - Type de retour de fonction

En TypeScript, on peut **préciser explicitement le type de la valeur que la fonction doit retourner** en l'écrivant juste après les parenthèses `( ) : type`.

---

## 1. Syntaxe

```typescript
function nomDeLaFonction(parametre: number): number {
    return parametre * 2;
}
```
Ici, le **`: number`** après les parenthèses garantit que la fonction retournera **obligatoirement** un nombre. Si par erreur on écrit `return "Bonjour"`, TypeScript affiche immédiatement une erreur !

---

## 2. Les différents types de retour possibles

| Type de retour | Exemple de signature | Ce que `return` doit renvoyer |
| :--- | :--- | :--- |
| **`: number`** | `function calculerPrix(): number` | Un nombre (`10`, `25.5`...) |
| **`: string`** | `function getNom(): string` | Un texte (`"Aita"`...) |
| **`: boolean`** | `function estMajeur(age: number): boolean` | `true` ou `false` |
| **`: string[]`** | `function getFruits(): string[]` | Un tableau de textes |
| **`: { nom: string }`** | `function getUser(): { nom: string }` | Un objet avec la propriété `nom` |
