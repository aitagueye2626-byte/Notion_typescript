# 7.9 - Interface et classe abstraite

Une **interface** décrit un contrat **sans code**.
Une **classe abstraite** (`abstract`) décrit un contrat **avec du code partagé** et des membres laissés à compléter.

```typescript
interface Forme {
    readonly nom: string;
    aire(): number;
    perimetre(): number;
}

abstract class FormeBase implements Forme {
    abstract readonly nom: string;
    abstract aire(): number;
    abstract perimetre(): number;

    decrire(): string {           // code hérité par toutes les sous-classes
        return `${this.nom} : ${this.aire().toFixed(2)}`;
    }
}

class Carre extends FormeBase {
    readonly nom = "Carré";
    constructor(private readonly cote: number) { super(); }
    aire(): number { return this.cote ** 2; }
    perimetre(): number { return 4 * this.cote; }
}
```

---

## 1. `abstract` en deux mots

| Membre                   | Effet                                                       |
| :----------------------- | :---------------------------------------------------------- |
| `abstract class`         | **ne peut pas** être instanciée avec `new`                  |
| `abstract methode(): T;` | signature seulement : la sous-classe **doit** l'implémenter |
| méthode normale          | héritée telle quelle                                        |
| `abstract` + corps       | interdit (erreur de syntaxe)                                |

```typescript
// new FormeBase(); // ❌ Cannot create an instance of an abstract class
```

---

## 2. Interface vs classe abstraite

|                        | **Interface**            | **Classe abstraite**          |
| :--------------------- | :----------------------- | :---------------------------- |
| Code                   | ❌ aucun                  | ✅ méthodes concrètes          |
| Propriétés avec valeur | ❌                        | ✅                             |
| Constructeur           | ❌                        | ✅                             |
| `new`                  | ❌                        | ❌                             |
| Nombre implémentable   | plusieurs                | un seul `extends`             |
| Existe à l'exécution   | ❌                        | ✅ (`instanceof`)              |
| Usage typique          | contrat d'API, mocks, DI | base commune, template method |

> 💡 **Règle** : commencez par une interface. Passez à une classe abstraite seulement s'il faut **partager du code** entre les implémentations.

---

## 3. Classe abstraite **qui implémente** une interface

C'est la combinaison la plus fréquente :

```typescript
abstract class FormeBase implements Forme {
    abstract aire(): number;   // satisfait le contrat, mais laisse l'implémentation aux enfants
}
```

- Le contrat public est celui de l'interface.
- Le code commun vit dans la base.
- Chaque sous-classe ne complète que ce qui est spécifique.

---

## 4. Le constructeur d'une classe abstraite

Il est **appelé par les sous-classes** via `super()`, jamais directement :

```typescript
abstract class Employe {
    constructor(public nom: string, protected salaireBase: number) {}
    abstract salaire(): number;
}

class Developpeur extends Employe {
    constructor(nom: string, salaireBase: number, private prime: number) {
        super(nom, salaireBase); // obligatoire AVANT d'utiliser this
    }
    salaire(): number { return this.salaireBase + this.prime; }
}
```

`protected` (voir 7.10) est accessible dans les sous-classes ; `private` ne l'est pas.

Une redéfinition dans une sous-classe peut (et devrait, puisque le projet active
`noImplicitOverride`) porter le mot-clé `override` — voir 7.11.

---

## 5. Template method

La base fixe l'**algorithme**, les sous-classes fournissent les **étapes** :

```typescript
abstract class Rapport {
    generer(): string {
        return `${this.entete()}\n${this.corps()}\n${this.pied()}`;
    }
    protected abstract entete(): string;
    protected abstract corps(): string;
    protected pied(): string { return "— fin —"; }
}
```

Ici `generer()` n'est jamais redéfini : seule la partie variable change.

---

## 6. Erreurs classiques

- `new MaClasseAbstraite()` → `Cannot create an instance of an abstract class`.
- Oublier d'implémenter un membre abstrait → `Non-abstract class 'X' does not implement inherited abstract member 'aire'`.
- Mettre du code dans une méthode abstraite → erreur de syntaxe.
- Utiliser `private` dans la base quand la sous-classe doit y accéder → `protected` est le bon modificateur.

---

## 7. Points à retenir

- `abstract class` : contrat + code partagé, non instanciable.
- Les méthodes `abstract` doivent être implémentées par chaque sous-classe.
- Une interface ne peut pas fournir de code ; une classe abstraite oui.
- Combinez les deux : `abstract class X implements Y`.
