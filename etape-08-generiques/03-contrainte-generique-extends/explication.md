# 8.3 - Contraintes génériques avec `extends`

Par défaut, un paramètre générique `<T>` accepte absolument n'importe quel type (`string`, `number`, `boolean`, `null`, objet, etc.).

Par conséquent, TypeScript vous empêche d'accéder à des propriétés spécifiques de `T`, car il ne peut pas garantir leur existence.

Le mot-clé **`extends`** permet d'imposer une **contrainte générique** : on force `T` à posséder une structure minimale ou à hériter d'un type précis.

---

## 1. Le problème sans contrainte

```typescript
function afficherLongueur<T>(element: T): void {
    // ❌ Erreur : Property 'length' does not exist on type 'T'.
    // console.log(element.length);
}
```

TypeScript refuse le code car si quelqu'un appelle `afficherLongueur(42)`, un nombre n'a pas de propriété `.length`.

---

## 2. La solution : `<T extends { length: number }>`

En utilisant `extends`, on spécifie que `T` doit posséder au minimum la propriété exigée :

```typescript
interface AyantLongueur {
    length: number;
}

function afficherLongueur<T extends AyantLongueur>(element: T): number {
    console.log(`Longueur : ${element.length}`);
    return element.length;
}

// ✅ Valide : chaînes, tableaux, objets avec length
afficherLongueur("Bonjour");       // string a .length
afficherLongueur([10, 20, 30]);    // Array a .length
afficherLongueur({ length: 5 });   // objet avec length

// ❌ Erreur à la compilation :
// afficherLongueur(123);
// Argument of type 'number' is not assignable to parameter of type 'AyantLongueur'.
```

---

## 3. Contrainte sur un identifiant : `<T extends { id: string | number }>`

C'est un motif indispensable pour créer des services CRUD ou des gestionnaires d'entités :

```typescript
interface Entite {
    id: number;
}

class EntiteService<T extends Entite> {
    private elements: T[] = [];

    ajouter(item: T): void {
        this.elements.push(item);
    }

    trouverParId(id: number): T | undefined {
        return this.elements.find(el => el.id === id); // ✅ el.id est garanti existant !
    }
}
```

---

## 4. Contrainte `extends object`

Si l'on souhaite interdire les types primitifs (`number`, `string`, `boolean`, `symbol`), on peut contraindre `T extends object` :

```typescript
function clonerObjet<T extends object>(source: T): T {
    return { ...source };
}

clonerObjet({ nom: "Aita" }); // ✅ Valide
// clonerObjet(42);           // ❌ Erreur : number n'est pas un object
```

---

## 5. Synthèse des formes de contraintes

| Syntaxe | Signification |
| :------ | :------------ |
| `<T extends string>` | `T` doit être une chaîne ou un sous-type (littéral) |
| `<T extends { id: number }>` | `T` doit obligatoirement posséder une propriété `id` numérique |
| `<T extends any[]>` | `T` doit obligatoirement être un tableau |
| `<T extends object>` | `T` doit obligatoirement être un type référence (pas un primitif) |
| `<T extends MonInterface>` | `T` doit respecter le contrat de `MonInterface` |

---

## 6. Points à retenir

- `extends` dans un paramètre de type `<T extends Contrainte>` n'est pas de l'héritage de classe au sens objet, mais une **relation d'assignabilité** (le type doit satisfaire la forme requise).
- Il permet de manipuler en toute sécurité des propriétés et méthodes du type contraint.
- Toute tentative d'appel avec un type incompatible est rejetée à la compilation.
