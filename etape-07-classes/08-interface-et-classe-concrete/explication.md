# 7.8 - Interface et classe concrète (`implements`)

Une **interface** décrit un **contrat** : la forme qu'un objet doit respecter.
Une **classe concrète** fournit l'**implémentation** de ce contrat, avec `implements`.

```typescript
interface Entite {
    readonly id: number;
    nom: string;
    decrire(): string;
}

class Utilisateur implements Entite {
    constructor(
        public readonly id: number,
        public nom: string
    ) {}

    decrire(): string {
        return `Utilisateur #${this.id} : ${this.nom}`;
    }
}
```

Si une propriété ou une méthode du contrat manque, la **compilation échoue** :

```typescript
class Incomplet implements Entite {
    id = 1;
    nom = "X";
    // ❌ Class 'Incomplet' incorrectly implements interface 'Entite'.
    //    Property 'decrire' is missing.
}
```

---

## 1. `implements` ne produit aucun JavaScript

C'est une **vérification statique** uniquement : aucune classe parente n'est créée, aucun code n'est ajouté.
Contrairement à `extends`, `implements` ne donne **ni héritage ni état**.

|                            | `implements`                    | `extends`                       |
| :------------------------- | :------------------------------ | :------------------------------ |
| Source                     | interface (ou classe abstraite) | classe                          |
| Code hérité                | ❌                               | ✅                               |
| Doit redéfinir les membres | ✅                               | seulement les membres abstraits |
| Nombre                     | plusieurs                       | un seul                         |

---

## 2. Plusieurs interfaces

```typescript
interface Serializable { toJSON(): string; }
interface Payable { payer(montant: number): void; }

class Facture implements Entite, Serializable, Payable {
    // doit fournir TOUS les membres des trois interfaces
}
```

---

## 3. Programmer contre l'interface

```typescript
function afficherTout(elements: Entite[]): void {
    for (const e of elements) console.log(e.decrire());
}

afficherTout([utilisateur, facture]); // classes différentes, même contrat
```

La fonction ne dépend plus d'une classe précise : elle accepte **tout** ce qui respecte `Entite`. C'est la base des tests (mocks) et de l'injection de dépendances.

---

## 4. Typage structurel : pas besoin d'être une instance

TypeScript compare les **formes**, pas les noms de classes :

```typescript
const pseudo: Entite = {
    id: 99,
    nom: "Objet littéral",
    decrire: () => "Je ne suis pas une instance"
};
```

Cet objet est valide même sans `implements`. `implements` sert surtout à **vérifier volontairement** qu'une classe respecte un contrat, et à documenter l'intention.

---

## 5. Ce qu'une interface ne peut pas faire

- Imposer un **constructeur** (`constructor()` n'existe pas dans une interface).
- Exister à l'exécution (`instanceof Entite` est impossible).
- Fournir du code par défaut (voir les **classes abstraites**, 7.9).

Pour typer une fabrique, on utilise une signature `new` :

```typescript
type Fabrique<T> = new () => T;

function creer<T>(Classe: Fabrique<T>): T {
    return new Classe();
}
```

---

## 6. `implements` et visibilité

Les membres publics du contrat doivent être **publics** dans la classe.
Une classe ne peut pas implémenter une interface avec une méthode `private`.

```typescript
interface Salutable { saluer(): void; }

class A implements Salutable {
    private saluer(): void {} // ❌ 'saluer' est privé dans 'A' mais public dans 'Salutable'
}
```

---

## 7. Bonnes pratiques

- Interfaces **petites et ciblées** (`Nommable`, `Serializable`) plutôt qu'une grosse interface fourre-tout.
- Une classe peut implémenter plusieurs petites interfaces : composition > héritage.
- Déclarer les dépendances par l'**interface** (paramètres de fonction), pas par la classe concrète.

---

## 8. Points à retenir

- `class X implements A, B` vérifie que `X` fournit tout le contrat.
- Aucun code n'est hérité : c'est purement du typage.
- Le typage est **structurel** : un objet littéral peut satisfaire une interface.
- Une interface ne peut pas imposer de constructeur ; utilisez `new () => T`.
