# 7.3 - Constructeur privé

Un **constructeur privé** empêche la création d'instances avec `new` depuis l'extérieur de la classe.
Seul le code **interne** à la classe peut l'appeler — en pratique, une **méthode statique** de fabrique.

```typescript
class Configuration {
    private static instance: Configuration | null = null;

    private constructor() {} // personne ne peut faire new Configuration()

    static obtenir(): Configuration {
        if (Configuration.instance === null) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }
}

// const c = new Configuration(); // ❌ Constructor of class 'Configuration' is private
const config = Configuration.obtenir(); // ✅
```

---

## 1. À quoi ça sert ?

| Objectif                                                               | Comment                                                            |
| :--------------------------------------------------------------------- | :----------------------------------------------------------------- |
| **Singleton** : une seule instance partagée                            | `static instance` + `static obtenir()`                             |
| **Compteur / identifiants uniques**                                    | le constructeur incrémente un `static`                             |
| **Fabriques nommées** : `Point.origine()` plutôt que `new Point(0, 0)` | constructeur privé + méthodes `static`                             |
| **Validation avant création**                                          | la fabrique vérifie les données puis appelle `private constructor` |

---

## 2. Singleton

```typescript
class Configuration {
    private static instance: Configuration | null = null;
    private valeurs = new Map<string, string>();

    private constructor() {}

    static obtenir(): Configuration {
        Configuration.instance ??= new Configuration();
        return Configuration.instance;
    }

    definir(cle: string, valeur: string): void { this.valeurs.set(cle, valeur); }
    lire(cle: string): string | undefined { return this.valeurs.get(cle); }
}

Configuration.obtenir().definir("langue", "fr");
console.log(Configuration.obtenir().lire("langue")); // "fr"
```

`Configuration.obtenir() === Configuration.obtenir()` est toujours `true`.

> ⚠️ Le singleton rend les tests plus difficiles (état partagé entre tests). À réserver aux vraies ressources globales (config, connexion, logger).

---

## 3. Identifiants uniques

```typescript
class Identifiant {
    private static suivant = 1;
    readonly valeur: number;

    private constructor(valeur: number) { this.valeur = valeur; }

    static creer(): Identifiant {
        return new Identifiant(Identifiant.suivant++);
    }
}

Identifiant.creer().valeur; // 1
Identifiant.creer().valeur; // 2
```

Comme le constructeur est privé, personne ne peut fabriquer un identifiant avec un numéro arbitraire.

---

## 4. Fabriques nommées

`Point.depuisTableau([2, 3])` et `Point.origine()` sont plus expressifs que `new Point(0, 0)` :
le nom de la méthode documente l'intention.

```typescript
class Point {
    readonly x: number;
    readonly y: number;

    private constructor(x: number, y: number) { this.x = x; this.y = y; }

    static origine(): Point { return new Point(0, 0); }
    static depuisTableau([x, y]: [number, number]): Point { return new Point(x, y); }

    deplacer(dx: number, dy: number): Point { return new Point(this.x + dx, this.y + dy); }
}
```

Remarquez `deplacer` : il renvoie un **nouveau** `Point` immuable. C'est possible même si le constructeur est privé, puisque le code est **dans** la classe.

---

## 5. Limites

- `private` est **effacé à la compilation** : `new (MaClasse as any)()` fonctionne en JS.
- Une sous-classe ne peut pas appeler un constructeur privé (`protected` ouvre ce droit, `private` non).
- Le singleton complique les tests ; préférez une **instance passée en paramètre** quand c'est possible.

---

## 6. Points à retenir

- `private constructor()` : `new` interdit depuis l'extérieur.
- On expose une **méthode statique** qui décide quand/comment créer l'instance.
- Usages typiques : singleton, compteurs, fabriques nommées, validations.
- Cela n'ajoute aucune protection **à l'exécution**, seulement une garantie de compilation.
