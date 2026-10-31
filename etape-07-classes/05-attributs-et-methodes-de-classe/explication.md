# 7.5 - Attributs et méthodes de classe

Une classe peut contenir deux familles de membres :

|              | **Instance**                 | **Statique** (`static`) |
| :----------- | :--------------------------- | :---------------------- |
| Propriétaire | chaque objet créé avec `new` | la classe elle-même     |
| Accès        | `objet.membre`               | `Classe.membre`         |
| Copie        | une par instance             | une seule, partagée     |
| `this`       | l'objet                      | la classe               |

```typescript
class Compteur {
    static total = 0;      // partagé
    id: number;            // par instance

    constructor(id: number) {
        this.id = id;
        Compteur.total += 1;
    }

    static remettreAZero(): void { Compteur.total = 0; }
}

new Compteur(1);
new Compteur(2);
console.log(Compteur.total); // 2
```

---

## 1. Champs d'instance

Déclarés dans la classe, initialisés sur place ou dans le constructeur :

```typescript
class Article {
    titre: string;              // déclaré
    publie = false;             // avec valeur par défaut
    private vues = 0;           // privé + valeur par défaut
    readonly cree = new Date(); // figé à la construction

    constructor(titre: string) {
        this.titre = titre;
    }
}
```

Chaque `new Article(...)` obtient ses **propres** `titre`, `publie`, `vues`, `cree`.

---

## 2. Champs et méthodes statiques

```typescript
class MathUtil {
    static PI = 3.14159;

    static aireCercle(rayon: number): number {
        return this.PI * rayon ** 2; // dans un static, this = la classe
    }
}

MathUtil.aireCercle(2); // ✅
```

Ils servent aux **utilitaires** (pas d'état par objet), aux **constantes**, aux **compteurs** et aux **fabriques** (`Classe.creer()`).

---

## 3. `this` dans un contexte statique

- Dans une **méthode statique**, `this` = la **classe** (ou la sous-classe qui l'appelle).
- Dans une **méthode d'instance**, `this` = l'**objet** ; un statique doit être préfixé par le nom de la classe.

```typescript
class Exemple {
    static message = "bonjour";

    afficher(): void {
        // console.log(this.message);   // ❌ n'existe pas sur l'instance
        console.log(Exemple.message);   // ✅
    }
}
```

---

## 4. Statiques privés : un état partagé caché

```typescript
class Convertisseur {
    private static cache = new Map<string, number>();

    static celsiusEnFahrenheit(c: number): number {
        const deja = this.cache.get(String(c));
        if (deja !== undefined) return deja;

        const f = c * 9 / 5 + 32;
        this.cache.set(String(c), f);
        return f;
    }
}
```

Le cache est partagé par tous les appels, mais inaccessible depuis l'extérieur.

> ⚠️ Un état statique mutable **persiste entre les tests** ; pensez à une méthode `reset()` (ou à éviter le statique pour ce genre de logique).

---

## 5. Héritage des statiques

Les membres statiques sont **hérités** :

```typescript
class Base {
    static nom = "Base";
    static presenter(): string { return `Classe ${this.nom}`; }
}

class Enfant extends Base {}
Enfant.presenter(); // "Classe Enfant" — this = Enfant
```

C'est la base de nombreux patterns de fabrique (`Model.creer()`).

---

## 6. Champs avec valeur par défaut et ordre d'exécution

À la construction, l'ordre est :

1. champs de la classe (dans l'ordre de déclaration),
2. paramètres du constructeur / `super(...)`,
3. corps du constructeur.

```typescript
class Ordre {
    a = console.log("1 - champ a"); // s'exécute à la construction
    constructor() {
        console.log("2 - corps du constructor");
    }
}
```

---

## 7. Points à retenir

- Instance = état par objet ; `static` = état/méthode porté par la classe.
- `Classe.membre` pour un statique, `objet.membre` pour une instance — les deux ne se mélangent pas.
- Dans une méthode statique, `this` est la classe.
- Un statique privé est un bon cache partagé, à condition de pouvoir le réinitialiser.
