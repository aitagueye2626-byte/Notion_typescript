# 2.1 - Fonction sans retour : `void` et `undefined`

En TypeScript, certaines fonctions font une action (comme afficher un message avec `console.log`), mais **ne renvoient aucune valeur** (elles n'ont pas de `return valeur`).

---

## 1. Le type `void` (Vide)
- On utilise **`: void`** après les parenthèses d'une fonction pour indiquer qu'elle **ne retourne rien**.
- Dans cette fonction, il n'y a pas de `return` (ou un simple `return;` vide pour arrêter la fonction).

## 2. Différence entre `: void` et `: undefined`

| Type de retour | Signification | Exemple |
| :--- | :--- | :--- |
| **`: void`** | La fonction ne retourne pas de valeur (usage standard). | `function saluer(): void { console.log("Salut"); }` |
| **`: undefined`** | La fonction retourne explicitement `undefined` (`return;` ou `return undefined;`). | `function rien(): undefined { return undefined; }` |

> **À retenir :** En pratique, quand une fonction ne retourne rien, on utilise toujours **`: void`**.
