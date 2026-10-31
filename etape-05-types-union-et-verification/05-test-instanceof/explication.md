# 5.5 - Test de type union avec `instanceof`

L'opérateur **`instanceof`** vérifie si un objet a été **créé à partir d'une classe** (ou d'une de ses sous-classes). TypeScript s'en sert pour réduire une union de **classes**.

```typescript
if (objet instanceof MaClasse) {
    // TypeScript sait que objet est une instance de MaClasse
}
```

---

## 1. Exemple

```typescript
class Voiture { constructor(public marque: string) {} klaxonner() {} }
class Bateau  { constructor(public nom: string) {} naviguer() {} }

type Vehicule = Voiture | Bateau;

function decrire(v: Vehicule): void {
    if (v instanceof Voiture) {
        v.klaxonner();   // ✅ Voiture
    } else {
        v.naviguer();    // ✅ Bateau
    }
}
```

---

## 2. ⚠️ Ne fonctionne pas avec les interfaces et les types

`instanceof` vérifie une **classe à l'exécution**. Or les interfaces et les types disparaissent à la compilation :

```typescript
type Forme = { aire(): number };

// if (forme instanceof Forme) // ❌ 'Forme' only refers to a type
```

👉 Pour les interfaces, utilisez un **discriminant** (`type`) ou `in`.

---

## 3. Classes natives

```typescript
erreur instanceof Error;        // ✅
valeur instanceof Date;         // ✅
valeur instanceof Map;          // ✅
valeur instanceof Array;        // ✅ (mais préférez Array.isArray)
```

`Array.isArray()` est plus fiable : il fonctionne aussi pour les tableaux créés dans **un autre contexte** (iframe, `vm`), où `instanceof Array` échoue.

---

## 4. Héritage : `instanceof` remonte toute la chaîne

```typescript
class Animal {}
class Mammifere extends Animal {}
class Chien extends Mammifere {}

const rex = new Chien();

rex instanceof Chien;     // true
rex instanceof Mammifere; // true
rex instanceof Animal;    // true
rex instanceof Object;    // true
```

Ordre des tests : du **plus spécifique** au plus général.

---

## 5. ⚠️ Les objets JSON ne sont pas des instances

```typescript
const objet = JSON.parse('{"marque":"Toyota"}');
objet instanceof Voiture; // false — c'est un objet littéral, pas une instance
```

C'est une raison de préférer les **unions discriminées** pour les données venant d'une API.

---

## 6. `instanceof` vs les autres tests

| Test                    | S'applique à                                 |
| :---------------------- | :------------------------------------------- |
| `x instanceof Classe`   | **instances de classes** (y compris natives) |
| `typeof x === "string"` | primitifs                                    |
| `"prop" in x`           | présence de propriété                        |
| `x.type === "..."`      | unions discriminées (données / interfaces)   |
| `Array.isArray(x)`      | tableaux                                     |

---

## 7. Garde de type personnalisée

`instanceof` s'utilise aussi pour créer un prédicat de type :

```typescript
function estVoiture(v: unknown): v is Voiture {
    return v instanceof Voiture;
}

const inconnu: unknown = new Voiture("Toyota");
if (estVoiture(inconnu)) {
    inconnu.marque; // ✅
}
```

---

## 8. Points à retenir

- `instanceof` teste la présence d'un **prototype** dans la chaîne de l'objet.
- Il faut la classe **à l'exécution** → impossible avec `interface` / `type`.
- Ne traverse pas la sérialisation JSON.
- Tester du plus spécifique au plus général.
- Pour les données sérialisées, préférer les unions discriminées.
