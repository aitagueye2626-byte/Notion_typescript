# 6.3 - Attribut en lecture seule (`readonly`)

Le mot-clé **`readonly`** empêche la **réaffectation** d'une propriété après la création de l'objet.

```typescript
interface Utilisateur {
    readonly id: number;
    nom: string;
}

const aita: Utilisateur = { id: 1, nom: "Aita" };

aita.nom = "Aita Gueye"; // ✅
aita.id = 2;             // ❌ Cannot assign to 'id' because it is a read-only property
```

---

## 1. L'objet doit être initialisé

```typescript
const u: Utilisateur = { id: 1, nom: "Aita" }; // ✅ les deux propriétés
// const v: Utilisateur = { nom: "Aita" };     // ❌ 'id' manquant
```

`readonly` **ne rend pas** la propriété optionnelle : elle doit être fournie à la création (sauf `readonly id?: number`).

---

## 2. `readonly` sur un tableau

```typescript
interface Panier {
    readonly articles: readonly string[];
}

const panier: Panier = { articles: ["Cahier"] };

panier.articles.push("Stylo"); // ❌ readonly string[]
panier.articles = [];          // ❌ propriété readonly
```

Les deux `readonly` sont nécessaires :

| Écriture                               | Empêche                  |
| :------------------------------------- | :----------------------- |
| `readonly articles: string[]`          | **remplacer** le tableau |
| `articles: readonly string[]`          | **modifier** le contenu  |
| `readonly articles: readonly string[]` | les deux                 |

---

## 3. ⚠️ `readonly` est **superficiel**

```typescript
interface Profil {
    readonly nom: string;
    adresse: { ville: string };
}

const p: Profil = { nom: "Aita", adresse: { ville: "Dakar" } };

p.nom = "X";                 // ❌
p.adresse.ville = "Thiès";   // ✅ autorisé !
```

`readonly` protège **la référence** `adresse`, pas son contenu. Pour aller plus loin :

```typescript
type Adresse = { readonly ville: string };
interface ProfilProfond { readonly nom: string; readonly adresse: Adresse; }
```

`Readonly<T>` est lui aussi **superficiel** :

```typescript
const fige: Readonly<Profil> = p;
fige.nom = "Y";              // ❌
fige.adresse.ville = "Z";    // ✅ encore modifiable
```

---

## 4. `readonly` avec un index signature

```typescript
interface Notes {
    readonly [matiere: string]: number;
}

notes["maths"] = 20; // ❌
```

---

## 5. ⚠️ `readonly` n'existe qu'à la compilation

À l'exécution, il n'y a **aucune protection** :

```typescript
const brut = aita as { id: number; nom: string };
brut.id = 99; // fonctionne !
```

Pour une immutabilité réelle à l'exécution : `Object.freeze()`.

```typescript
const gele = Object.freeze({ id: 1, nom: "Aita" });
// gele.id = 2; // silencieux en mode non strict, TypeError en mode strict
```

---

## 6. `readonly` vs `const`

|              | `const`                          | `readonly`                       |
| :----------- | :------------------------------- | :------------------------------- |
| S'applique à | une **variable**                 | une **propriété** / un paramètre |
| Empêche      | réassigner la variable           | réassigner la propriété          |
| Sur un objet | `const obj = {}` → `obj.x = 1` ✅ | `readonly x` → `obj.x = 1` ❌     |

```typescript
const tab = [1, 2];
tab.push(3);        // ✅ const n'empêche pas de muter le contenu
readonlyTab.push(3); // ❌
```

---

## 7. Cas d'usage typiques

```typescript
interface Commande {
    readonly numero: string;     // identifiant immuable
    readonly creeeLe: Date;      // horodatage
    statut: "en attente" | "expediee" | "livree"; // état modifiable
}
```

- Identifiants (`id`, `uuid`, `numero`)
- Dates de création
- Résultats d'une fonction
- Paramètres d'une fonction qui ne doivent pas être modifiés

---

## 8. Points à retenir

- `readonly` = **réaffectation interdite** après initialisation.
- Profond uniquement si vous le déclarez à chaque niveau.
- Aucun impact à l'exécution → `Object.freeze()` si nécessaire.
- Ne pas confondre avec `const` (variable) ni avec `readonly T[]` (tableau).
