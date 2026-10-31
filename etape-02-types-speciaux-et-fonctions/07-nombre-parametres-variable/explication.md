# 2.7 - Nombre de paramètres variable (Rest parameters `...`)

En TypeScript, quand on ne sait pas à l'avance combien d'arguments on va passer à une fonction (2, 3, 10...), on utilise l'opérateur **`...` (Rest parameter)** devant le nom du paramètre.

---

## 1. Syntaxe
```typescript
function additionnerTout(...nombres: number[]): number {
    // "nombres" est automatiquement transformé en un tableau : number[]
}
```
TypeScript regroupe automatiquement **tous les arguments reçus dans un tableau** (`number[]`, `string[]`...).

---

## 2. Règles importantes
1. **Type tableau obligatoire :** Un paramètre `...` est toujours typé comme un tableau (ex: `...noms: string[]`).
2. **Toujours en dernier :** Si la fonction a d'autres paramètres normaux, le paramètre `...` doit obligatoirement être placé **en dernière position** :
   - ✅ `function inviter(hote: string, ...invites: string[])`
   - ❌ `function inviter(...invites: string[], hote: string)` *(Interdit)*
