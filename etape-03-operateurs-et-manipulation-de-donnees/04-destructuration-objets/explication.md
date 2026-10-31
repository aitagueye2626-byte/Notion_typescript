# 3.4 - Destructuration avec les objets

La **destructuration** permet d'**extraire plusieurs propriétés d'un objet en une seule ligne**, sans répéter le nom de l'objet.

*(Pour les tableaux, voir la leçon [3.3 - Destructuration avec les tableaux](../03-destructuration-tableaux/explication.md)).*

---

## 1. Syntaxe de base

```typescript
let utilisateur = { nom: "Aita", age: 21 };

// Sans destructuration
let nom = utilisateur.nom;
let age = utilisateur.age;

// Avec destructuration : on écrit les noms de propriétés entre { }
let { nom, age } = utilisateur;
```

> Les noms entre `{ }` **doivent correspondre aux clés de l'objet** (c'est la clé qui fait le lien, pas l'ordre).

---

## 2. Les variantes utiles

| Besoin                  | Syntaxe                                            | Effet                                          |
| :---------------------- | :------------------------------------------------- | :--------------------------------------------- |
| **Renommer**            | `let { nom: prenom } = utilisateur;`               | La valeur de `nom` est stockée dans `prenom`   |
| **Valeur par défaut**   | `let { pays = "Sénégal" } = utilisateur;`          | Utilisée si `pays` est `undefined` (ou absent) |
| **Renommer + défaut**   | `let { metier: job = "Étudiante" } = utilisateur;` | Les deux en même temps                         |
| **Imbriquée**           | `let { client: { prenom } } = commande;`           | Va chercher dans les objets internes           |
| **Dans les paramètres** | `function f({ libelle, prix }: Produit) {}`        | Très utilisé avec les objets de config         |

---

## 3. Points d'attention

- ⚠️ Si une propriété n'existe pas et qu'aucune valeur par défaut n'est donnée, la variable vaut `undefined`.
- ⚠️ La destructuration **copie les valeurs**. Si la valeur est un objet, la copie reste une **référence** vers le même objet (voir [1.3 - Copier un objet de type référence](../../etape-01-les-bases-du-langage/03-copier-objet-reference/explication.md)).
- ⚠️ On ne peut pas destructurer une propriété qui n'existe pas dans le **type** : TypeScript refusera la compilation.

---

## 4. Exemple récapitulatif

```typescript
type Produit = { libelle: string; prix: number };

function afficherProduit({ libelle, prix }: Produit): void {
    console.log(libelle, "-", prix, "FCFA");
}

afficherProduit({ libelle: "Cahier", prix: 1500 });
```
