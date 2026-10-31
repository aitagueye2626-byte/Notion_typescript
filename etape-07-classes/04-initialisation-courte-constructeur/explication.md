# 7.4 - Initialisation courte dans le constructeur

TypeScript permet de **déclarer et affecter** une propriété directement dans la liste des paramètres du constructeur, grâce à un **modificateur d'accès** (`public`, `private`, `protected`, `readonly`).

```typescript
// Version longue
class Personne {
    nom: string;
    age: number;

    constructor(nom: string, age: number) {
        this.nom = nom;
        this.age = age;
    }
}

// Version courte (parameter properties)
class Personne {
    constructor(
        public nom: string,
        public age: number
    ) {}
}
```

Les deux classes sont **strictement équivalentes** à l'usage. La seconde génère le même JavaScript que la première.

---

## 1. Les modificateurs autorisés

| Écriture                          | Effet                                   |
| :-------------------------------- | :-------------------------------------- |
| `public nom: string`              | propriété publique + affectation        |
| `private email: string`           | propriété privée + affectation          |
| `protected code: string`          | propriété protégée + affectation        |
| `readonly id: number`             | propriété publique en lecture seule     |
| `private readonly solde: number`  | privée **et** non réassignable          |
| `nom: string` (sans modificateur) | simple **paramètre**, pas une propriété |

```typescript
class Produit {
    readonly prixTTC: number;

    constructor(
        public nom: string,
        private prixHT: number,
        tauxTVA: number = 0.18 // paramètre simple
    ) {
        this.prixTTC = prixHT * (1 + tauxTVA);
    }
}

const p = new Produit("Cahier", 500);
p.nom;      // ✅
p.prixHT;   // ❌ private
p.tauxTVA;  // ❌ n'existe pas
```

---

## 2. Pourquoi l'utiliser ?

- **Moins de code** : plus de triple répétition `déclaration / paramètre / this.x = x`.
- **Moins d'erreurs** : impossible d'oublier `this.age = age`.
- **Lisibilité** : la signature du constructeur **est** la description de l'objet.

> 💡 Beaucoup de bases de code n'autorisent le raccourci que pour `private` / `readonly`, afin de garder le constructeur explicite. L'important est de choisir une convention et de la suivre.

---

## 3. Limites et pièges

1. **Uniquement dans le constructeur** — pas dans une méthode.
2. **Incompatible avec les surcharges de constructeur** : la signature d'implémentation ne peut pas déclarer de propriétés.
3. **Ordre d'initialisation** : les parameter properties sont affectées **avant** le corps du constructeur, donc avant `super()` dans une sous-classe (voir 7.10).
4. **Trop de paramètres** : au-delà de 4-5, passer un **objet d'options**.

```typescript
interface OptionsUtilisateur {
    nom: string;
    age: number;
    email: string;
    ville?: string;
}

class Utilisateur {
    readonly ville: string;

    constructor(readonly options: OptionsUtilisateur) {
        this.ville = options.ville ?? "Dakar";
    }
}
```

---

## 4. `readonly` dans le constructeur

Un `readonly` peut être affecté dans le constructeur **et nulle part ailleurs** :

```typescript
class Commande {
    readonly numero: string;

    constructor(numero: string) {
        this.numero = numero; // ✅
    }

    renommer(n: string): void {
        // this.numero = n; // ❌ Cannot assign to 'numero' because it is a read-only property
    }
}
```

Avec le raccourci, `readonly numero: string` fait les deux en une ligne.

---

## 5. Points à retenir

- `constructor(public nom: string)` déclare **et** affecte `this.nom`.
- Sans modificateur (`tauxTVA: number`), le paramètre reste local au constructeur.
- Combiner `private` + `readonly` pour un champ interne immuable.
- Pour beaucoup d'options, préférer un objet typé à une longue liste de paramètres.
