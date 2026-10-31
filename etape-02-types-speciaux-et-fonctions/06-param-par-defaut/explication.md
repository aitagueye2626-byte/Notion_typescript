# 2.6 - Paramètre de fonction par défaut

En TypeScript, on peut donner une **valeur par défaut** à un paramètre de fonction avec le signe **`=`**.

---

## 1. Comment ça marche ?
```typescript
function saluer(nom: string, pays: string = "Sénégal"): void {
    console.log(nom, "habite au", pays);
}
```
- **Si on ne donne pas le 2ème argument** (`saluer("Aita")`) $\rightarrow$ TypeScript utilise automatiquement la valeur par défaut `"Sénégal"`.
- **Si on donne le 2ème argument** (`saluer("Aita", "Mali")`) $\rightarrow$ La valeur `"Mali"` remplace la valeur par défaut.

---

## 2. Différence entre Paramètre par défaut (`=`) et Paramètre optionnel (`?`)

| Syntaxe | Exemple | Valeur si non fourni |
| :--- | :--- | :--- |
| **Paramètre par défaut (`=`)** | `pays: string = "Sénégal"` | Vaut **`"Sénégal"`** (jamais `undefined`). |
| **Paramètre optionnel (`?`)** | `pays?: string` | Vaut **`undefined`**. |

> **Conseil :** Place toujours les paramètres avec valeur par défaut **à la fin** de la liste des paramètres.
