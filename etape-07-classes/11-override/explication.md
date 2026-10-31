# 7.11 - `override` (redéfinition de méthode)

**Redéfinir** (override) consiste, dans une sous-classe, à fournir une nouvelle version d'une méthode déjà définie dans la classe parente.

```typescript
class Employe {
    constructor(public nom: string, protected salaireBase: number) {}

    salaire(): number {
        return this.salaireBase;
    }
}

class Developpeur extends Employe {
    constructor(nom: string, salaireBase: number, private prime: number) {
        super(nom, salaireBase);
    }

    override salaire(): number {
        return super.salaire() + this.prime;
    }
}
```

---

## 1. Les règles d'une redéfinition valide

| Règle                        | Détail                                                                |
| :--------------------------- | :-------------------------------------------------------------------- |
| Même nom                     | `salaire` → `salaire`                                                 |
| Signature **compatible**     | paramètres identiques ou plus larges, retour identique ou plus précis |
| Visibilité non réduite       | on ne peut pas passer de `public` à `private`                         |
| Membre parent non `private`  | un membre `private` n'est pas hérité, donc non redéfinissable         |
| `super.methode()` disponible | pour réutiliser la version parente                                    |

```typescript
class Stagiaire extends Employe {
    // override salaire(): string { return "0"; }
    // ❌ Property 'salaire' in type 'Stagiaire' is not assignable to the same property in base type 'Employe'
}
```

---

## 2. Le mot-clé `override`

```typescript
class Developpeur extends Employe {
    override salaire(): number { return super.salaire() + this.prime; }
}
```

`override` est **optionnel** mais très recommandé (option `noImplicitOverride`).
Il échoue si la méthode n'existe **pas** dans le parent :

```typescript
class Bug extends Employe {
    override salaireTotal(): number { return 0; }
    // ❌ This member cannot have an 'override' modifier because it is not declared in the base class
}
```

Cela détecte les fautes de frappe et les redéfinitions involontaires (méthode renommée dans le parent).

---

## 3. `super` dans une redéfinition

```typescript
class Manager extends Employe {
    override poste(): string { return `Manager de ${this.equipeTaille}`; }

    override fiche(): string {
        return `[MANAGER] ${super.fiche()}`; // ajoute sans réécrire
    }
}
```

`super.fiche()` appelle la version de `Employe`, même si `fiche()` est redéfinie.

---

## 4. Polymorphisme : la redéfinition prend effet partout

```typescript
class Employe {
    fiche(): string {
        return `${this.nom} - ${this.poste()}`; // appelle la version REDÉFINIE
    }
    poste(): string { return "Employé"; }
}

new Developpeur("Aita", 500_000, 80_000).fiche(); // "Aita - Développeur"
```

Une méthode du parent qui appelle `this.poste()` utilise la version de la **sous-classe** : c'est le comportement dynamique de `this`.

---

## 5. Redéfinir un getter

```typescript
class Compte {
    constructor(protected solde: number) {}
    get description(): string { return `Solde : ${this.solde}`; }
}

class ComptePremium extends Compte {
    override get description(): string {
        return `⭐ ${super.description} (premium)`;
    }
}
```

Un `get` peut être redéfini par un `get` (pas par une méthode ni un champ).

---

## 6. Ce qui ne se redéfinit pas

- Un membre `private` du parent (invisible pour l'enfant).
- Un **constructeur** au sens « override » : on utilise `super(...)`.
- Un champ par une méthode (ou inversement) : le type doit rester compatible.

```typescript
class Base { protected interne(): string { return "base"; } }

class Enfant extends Base {
    override interne = 42; // ❌ type number incompatible avec la méthode
}
```

---

## 7. Points à retenir

- Redéfinir = même nom, signature compatible, visibilité non réduite.
- `override` (fortement recommandé) garantit que le parent possède bien le membre.
- `super.methode()` permet d'**étendre** au lieu de remplacer.
- La redéfinition est visible via le type parent (polymorphisme).
- On ne peut pas redéfinir un membre `private`.
