# 1.14 - Alias ou Type personnalisé (`type`)

En TypeScript, le mot-clé **`type`** permet de **donner un nom à un type** pour pouvoir le **réutiliser partout** sans avoir à le réécrire à chaque fois.

*(Par convention, on commence toujours le nom d'un type personnalisé par une **Majuscule**).*

---

## 1. Pourquoi utiliser un Alias de type (`type`) ?
Sans alias (avec un objet anonyme), si on a 3 élèves, on doit répéter `{ nom: string; age: number }` 3 fois.
Avec `type`, on définit le modèle **une seule fois** et on le réutilise par son nom !

---

## 2. Les différentes utilisations de `type`

| Type d'alias | Exemple de déclaration | Exemple d'utilisation |
| :--- | :--- | :--- |
| **Alias d'objet** | `type Utilisateur = { nom: string; age: number };` | `let u1: Utilisateur = { nom: "Aita", age: 21 };` |
| **Alias d'union / literal** | `type Statut = "actif" \| "inactif";` | `let compte: Statut = "actif";` |
| **Alias de primitif** | `type Identifiant = number \| string;` | `let idClient: Identifiant = 101;` |
| **Alias de Tuple** | `type Coordonnee = [number, number];` | `let pos: Coordonnee = [10, 20];` |
