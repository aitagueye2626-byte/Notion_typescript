# 7.1 - Constructor, méthode, `this`

Une **classe** est un plan (un moule) qui regroupe :

- des **propriétés** (les données de l'objet) ;
- un **constructeur** (comment fabriquer l'objet) ;
- des **méthodes** (ce que l'objet sait faire).

```typescript
class Personne {
    nom: string;
    age: number;

    constructor(nom: string, age: number) {
        this.nom = nom;
        this.age = age;
    }

    sePresenter(): string {
        return `Je m'appelle ${this.nom} et j'ai ${this.age} ans.`;
    }
}

const aita = new Personne("Aita", 21);
console.log(aita.sePresenter());
```

---

## 1. Les trois étapes de la création

1. `class Personne { ... }` **déclare** le plan (rien n'est encore créé).
2. `new Personne("Aita", 21)` **crée** un objet et exécute le `constructor`.
3. `this` désigne, **pendant la construction**, l'objet en train de naître.

> Sans `new`, une classe lève une erreur : `TypeError: Class constructor Personne cannot be invoked without 'new'`.

---

## 2. À quoi sert `this` ?

`this` est **l'objet sur lequel la méthode est appelée** :

```typescript
class Compteur {
    valeur = 0;

    incrementer(): void {
        this.valeur += 1; // this = l'objet "compteur" ci-dessous
    }
}

const compteur = new Compteur();
compteur.incrementer();
console.log(compteur.valeur); // 1
```

La même méthode, appelée sur deux objets différents, travaille sur des données différentes.

---

## 3. `this` est perdu quand on détache la méthode

```typescript
const presenter = aita.sePresenter;
presenter(); // ❌ TypeError: Cannot read properties of undefined (reading 'nom')
```

En appelant `presenter()` sans objet devant, `this` vaut `undefined` (en mode strict, ce qui est le cas des modules ES et des classes).

**Solutions :**

```typescript
presenter.call(aita);        // ✅ fixe this explicitement
presenter.apply(aita, []);   // ✅ idem, arguments sous forme de tableau
const lie = aita.sePresenter.bind(aita);
lie();                       // ✅ this figé pour toujours
```

Ou déclarer la méthode comme **propriété fléchée** (elle capture `this` de l'instance) :

```typescript
class Personne {
    nom = "Aita";
    sePresenter = (): string => `Je m'appelle ${this.nom}`;
}
```

C'est le pattern utilisé pour les callbacks (`setTimeout`, `addEventListener`…).

---

## 4. Propriétés et méthodes

| Élément              | Où le déclarer                  | Exemple                       |
| :------------------- | :------------------------------ | :---------------------------- |
| Propriété d'instance | dans la classe ou `constructor` | `nom: string;`                |
| Constructeur         | `constructor(...)`              | `constructor(nom: string) {}` |
| Méthode              | `nomMethode(): type {}`         | `sePresenter(): string {}`    |
| Accesseur (`get`)    | `get nom() {}`                  | `get perimetre(): number {}`  |

---

## 5. Classes vs objets littéraux

```typescript
// Objet littéral : une seule forme, pas de méthode réutilisable ni de vérification
const p1 = { nom: "Aita", age: 21 };

// Classe : plan réutilisable, comportements, `instanceof`, état
class Personne { /* ... */ }
const p2 = new Personne("Aita", 21);
```

Pour un simple conteneur de données, un objet littéral ou une `interface` suffit.
Une classe est utile dès qu'il y a **de l'état qui évolue** et des **comportements liés**.

---

## 6. Points à retenir

- `new` appelle le `constructor`, qui remplit les propriétés via `this`.
- Une méthode utilise `this` pour lire/écrire les propriétés de l'instance.
- Détacher une méthode (`const f = obj.methode`) perd `this` : utiliser `bind`, `call`, ou une propriété fléchée.
- Chaque `new` crée un objet **indépendant**.
- `instanceof` permet de vérifier le type réel à l'exécution.
