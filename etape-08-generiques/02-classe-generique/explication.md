# 8.2 - Classes génériques

Une **classe générique** possède un ou plusieurs paramètres de type spécifiés lors de son instanciation. Cela permet de créer des structures de données réutilisables (collections, dépôts, conteneurs) sans fixer le type de données stockées.

---

## 1. Déclaration d'une classe générique

On place les chevrons `<T>` immédiatement après le nom de la classe :

```typescript
class Boite<T> {
    private contenu: T;

    constructor(contenuInitial: T) {
        this.contenu = contenuInitial;
    }

    getContenu(): T {
        return this.contenu;
    }

    setContenu(nouveauContenu: T): void {
        this.contenu = nouveauContenu;
    }
}
```

---

## 2. Instanciation d'une classe générique

On peut spécifier le type explicitement ou laisser TypeScript l'inférer grâce aux arguments du constructeur :

```typescript
// Détection automatique (inférence) :
const boiteDeNombre = new Boite(42);         // Boite<number>

// Spécification explicite :
const boiteDeTexte = new Boite<string>("A"); // Boite<string>

// ❌ Erreur si on tente de stocker un mauvais type :
// boiteDeTexte.setContenu(123);
// Argument of type 'number' is not assignable to parameter of type 'string'.
```

---

## 3. Exemple classique : la Pile (Stack)

Une pile LIFO (*Last In, First Out*) est l'exemple typique où les génériques apportent flexibilité et robustesse :

```typescript
class Pile<T> {
    private elements: T[] = [];

    empiler(element: T): void {
        this.elements.push(element);
    }

    depiler(): T | undefined {
        return this.elements.pop();
    }

    get taille(): number {
        return this.elements.length;
    }
}

const pileDeTaches = new Pile<string>();
pileDeTaches.empiler("Apprendre TypeScript");
pileDeTaches.empiler("Pratiquer les génériques");

const derniereTache = pileDeTaches.depiler(); // type string | undefined
```

---

## 4. Classes génériques avec plusieurs types `<K, V>`

On peut déclarer plusieurs paramètres de type, par exemple pour représenter une table clé-valeur ou un dictionnaire :

```typescript
class PaireCleValeur<K, V> {
    constructor(public cle: K, public valeur: V) {}

    afficher(): string {
        return `[Clé: ${this.cle} => Valeur: ${this.valeur}]`;
    }
}

const entree = new PaireCleValeur<number, string>(101, "Aita");
```

---

## 5. Limitation : les membres statiques (`static`)

Les membres statiques appartiennent à la classe elle-même (au constructeur global) et non aux instances. Ils **ne peuvent donc pas utiliser** le paramètre de type `<T>` de la classe :

```typescript
class File<T> {
    // ❌ Erreur : Static members cannot reference class type parameters.
    // static elementParDefaut: T;

    // ✅ Mais une méthode statique peut avoir son propre générique :
    static creerFileVide<E>(): File<E> {
        return new File<E>();
    }
}
```

---

## 6. Points à retenir

- Une classe générique `class MaClasse<T> { ... }` s'adapte au type qu'on lui confie.
- Le type est conservé pour tous les attributs et méthodes de l'instance.
- Les membres statiques (`static`) ne peuvent pas utiliser le `T` de la classe (car il n'y a qu'un seul objet constructeur pour toutes les instances).
- Permet de concevoir des abstractions puissantes (repositories, services API, caches, files d'attente).
