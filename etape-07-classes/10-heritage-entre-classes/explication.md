# 7.10 - Héritage entre classes (`extends`)

Une classe peut **hériter** d'une autre : elle récupère ses propriétés et méthodes, et peut en ajouter ou en modifier.

```typescript
class Animal {
    protected nom: string;

    constructor(nom: string) {
        this.nom = nom;
    }

    manger(): void {
        console.log(`${this.nom} mange.`);
    }
}

class Chien extends Animal {
    private race: string;

    constructor(nom: string, race: string) {
        super(nom);          // appelle le constructeur du parent
        this.race = race;
    }

    aboyer(): void {
        console.log(`${this.nom} aboie.`); // "nom" est protected -> accessible
    }
}

const rex = new Chien("Rex", "Berger");
rex.manger();  // hérité
rex.aboyer();  // propre
```

---

## 1. `extends` en trois règles

1. **`super(...)` est obligatoire** dans le constructeur de la sous-classe, **avant** toute utilisation de `this`.
2. La sous-classe hérite des membres `public` et `protected`, **pas** des `private`.
3. Une classe ne peut étendre **qu'une seule** classe.

```typescript
class Chat extends Animal {
    constructor(nom: string) {
        // this.nom = nom; // ❌ super() doit être appelé avant d'accéder à this
        super(nom);
    }
}
```

---

## 2. `public`, `protected`, `private`

| Modificateur | Classe elle-même | Sous-classe | Extérieur |
| :----------- | :--------------: | :---------: | :-------: |
| `public`     |        ✅         |      ✅      |     ✅     |
| `protected`  |        ✅         |      ✅      |     ❌     |
| `private`    |        ✅         |      ❌      |     ❌     |

```typescript
class Parent {
    protected protege = "ok";
    private prive = "secret";
}

class Enfant extends Parent {
    lire(): string {
        return this.protege; // ✅
        // return this.prive; // ❌ Property 'prive' is private and only accessible within class 'Parent'
    }
}
```

> Utilisez `protected` quand l'état doit être **manipulé par les enfants** ; `private` quand il doit rester interne à la classe qui le déclare.

---

## 3. Appeler la version du parent : `super.methode()`

```typescript
class Oiseau extends Animal {
    manger(): void {
        super.manger();                    // comportement du parent
        console.log("... et picore.");     // comportement ajouté
    }
}
```

C'est l'usage typique avec les **redéfinitions** (voir 7.11) : on étend sans réécrire.

---

## 4. Polymorphisme et `instanceof`

```typescript
const animaux: Animal[] = [new Chien("Rex", "Berger"), new Chat("Félix")];
animaux.forEach((a) => a.manger()); // même appel, comportements adaptés

rex instanceof Chien;  // true
rex instanceof Animal; // true  (une sous-classe EST un parent)
rex instanceof Chat;   // false
```

Une sous-classe est **substituable** au parent : partout où un `Animal` est attendu, un `Chien` convient.

---

## 5. Chaîne d'héritage

```typescript
class Animal { }
class Mammifere extends Animal { }
class Baleine extends Mammifere { }
```

`Baleine` possède tout de `Mammifere` **et** de `Animal`.
Les constructeurs remontent la chaîne : `super(...)` appelle le parent immédiat, qui appelle le sien.

---

## 6. Quand (ne pas) hériter

✅ **Bonne raison** : relation « **est un** » réelle (`Chien est un Animal`), code réellement partagé.

❌ **Mauvaises raisons** :

- réutiliser une méthode sans relation logique (`Voiture extends Moteur`) → préférez la **composition** ;
- pour « gagner du temps » → une interface + composition est souvent plus souple ;
- héritage profond (> 2-3 niveaux) → difficile à suivre et à tester.

```typescript
// Composition : la voiture A un moteur, elle n'EST pas un moteur
class Moteur { demarrer(): void { console.log("Vroum"); } }

class Voiture {
    constructor(private readonly moteur: Moteur) {}
    demarrer(): void { this.moteur.demarrer(); }
}
```

---

## 7. Points à retenir

- `extends` = héritage de code (méthodes + état), une seule classe parente.
- `super(...)` avant `this` ; `super.methode()` pour appeler la version parente.
- `protected` est le seul niveau visible des deux côtés de l'héritage.
- Une sous-classe est compatible avec le type du parent (`instanceof`, tableaux du type parent).
- Préférez la composition quand la relation n'est pas « est un ».
