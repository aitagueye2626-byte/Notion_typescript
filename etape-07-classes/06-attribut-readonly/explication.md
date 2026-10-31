# 7.6 - Attribut en lecture seule (`readonly`)

`readonly` rend une propriété **non réassignable** après sa construction.

```typescript
class Commande {
    readonly numero: string;

    constructor(numero: string) {
        this.numero = numero; // ✅ autorisé : on est dans le constructeur
    }

    renumeroter(n: string): void {
        // this.numero = n; // ❌ Cannot assign to 'numero' because it is a read-only property
    }
}
```

---

## 1. Où l'affectation est-elle permise ?

| Emplacement                                 | `readonly` |
| :------------------------------------------ | :--------- |
| Déclaration avec valeur (`readonly id = 1`) | ✅          |
| Dans le `constructor`                       | ✅          |
| Dans une méthode / un getter / un setter    | ❌          |
| Depuis l'extérieur (`obj.id = 2`)           | ❌          |
| Dans une sous-classe (champ hérité)         | ❌          |

---

## 2. `readonly` ≠ `const`

|               | `const`          | `readonly`                                  |
| :------------ | :--------------- | :------------------------------------------ |
| S'applique à  | une **variable** | une **propriété** (classe, interface, type) |
| Portée        | bloc             | objet                                       |
| Réassignation | interdite        | interdite (sauf constructeur)               |

```typescript
const x = 1;              // variable figée
class A { readonly y = 2; } // propriété figée
```

---

## 3. Le piège : `readonly` est **superficiel**

```typescript
class Panier {
    readonly articles: string[] = [];
}

const panier = new Panier();
panier.articles.push("Cahier"); // ✅ autorisé : on modifie le CONTENU
// panier.articles = [];        // ❌ on ne peut pas changer la RÉFÉRENCE
```

`readonly` protège la **référence**, pas les éléments.

Pour aller plus loin :

```typescript
class PanierFige {
    private readonly articles: readonly string[];

    constructor(articles: string[]) {
        this.articles = [...articles]; // copie défensive
    }

    lister(): readonly string[] { return this.articles; }
}
```

- `readonly string[]` : tableau **sans** `push`/`pop`/`sort` (mutants).
- **copie défensive** (`[...articles]`) : l'appelant ne peut pas modifier le tableau d'origine.
- `Object.freeze` : immuabilité **à l'exécution** (JS), en plus du typage.

---

## 4. `readonly` et les objets imbriqués

```typescript
class Profil {
    readonly adresse = { ville: "Dakar" };
}

const p = new Profil();
p.adresse.ville = "Thiès";      // ✅ (readonly porte sur "adresse")
// p.adresse = { ville: "X" };  // ❌
```

Pour un objet profondément immuable, utilisez `Readonly<T>` / `as const` ou des structures figées.

---

## 5. `readonly` dans le constructeur (parameter property)

```typescript
class Utilisateur {
    constructor(
        public readonly id: number,
        public nom: string
    ) {}
}
```

Une ligne déclare, affecte et fige `id`. C'est le raccourci le plus fréquent (voir 7.4).

---

## 6. `readonly` vs getter

|                                 | `readonly x: T`  | `get x(): T`                |
| :------------------------------ | :--------------- | :-------------------------- |
| Valeur                          | stockée une fois | recalculée à chaque lecture |
| Modifiable dans le constructeur | ✅                | ❌ (pas de stockage)         |
| Peut dépendre d'autres champs   | ❌ (figée)        | ✅                           |

```typescript
class Cercle {
    constructor(readonly rayon: number) {}
    get diametre(): number { return this.rayon * 2; }
}
```

---

## 7. Limite : compilation seulement

```typescript
const brute = commande as { numero: string };
brute.numero = "HACK"; // ✅ à l'exécution
```

`readonly` est effacé au runtime. Pour une protection réelle, combinez avec `Object.freeze()`.

---

## 8. Points à retenir

- `readonly` = pas de réassignation après construction.
- Affectation possible uniquement à la déclaration ou dans le `constructor`.
- Superficiel : le contenu d'un tableau/objet reste modifiable.
- Très utile pour les identifiants, dates de création, références internes.
- Aucune protection à l'exécution.
