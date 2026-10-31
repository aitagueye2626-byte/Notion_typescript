# 5.4 - Test de type union avec `in`

L'opérateur **`in`** vérifie si une propriété **existe** dans un objet. TypeScript s'en sert pour réduire une union de types d'objets qui n'ont pas de discriminant commun.

```typescript
if ("propriete" in objet) {
    // TypeScript sait que objet possède cette propriété
}
```

---

## 1. Exemple : distinguer deux formes

```typescript
type Chat  = { nom: string; miauler: () => void };
type Chien = { nom: string; aboyer: () => void };

function faireParler(animal: Chat | Chien): void {
    if ("miauler" in animal) {
        animal.miauler(); // ✅ TypeScript sait que c'est un Chat
    } else {
        animal.aboyer();  // ✅ réduit à Chien
    }
}
```

---

## 2. `in` sur des données (pas seulement des méthodes)

```typescript
type ComptePro         = { raisonSociale: string; numeroTVA: string };
type CompteParticulier = { prenom: string; nom: string };

function afficher(compte: ComptePro | CompteParticulier): string {
    if ("numeroTVA" in compte) {
        return compte.raisonSociale; // ✅ ComptePro
    }
    return `${compte.prenom} ${compte.nom}`; // ✅ CompteParticulier
}
```

---

## 3. ⚠️ `in` teste l'**existence**, pas la valeur

```typescript
const objet = { nom: "Aita", age: undefined };
"age" in objet; // true — la propriété existe, même à undefined
```

Pour tester qu'une valeur est définie, utilisez `!== undefined` :

```typescript
if (objet.age !== undefined) { /* ... */ }
```

---

## 4. ⚠️ `in` remonte la chaîne de prototypes

```typescript
"toString" in {};  // true (hérité d'Object.prototype)
```

Pour ne tester que les propriétés **propres** :

```typescript
Object.prototype.hasOwnProperty.call(obj, "toString"); // false
// ou
Object.hasOwn(obj, "toString"); // ES2022
```

TypeScript considère néanmoins `in` comme un narrowing sûr, car le type déclaré décrit la forme attendue.

---

## 5. `in` vs les autres techniques de réduction

| Test                    | Quand l'utiliser                               |
| :---------------------- | :--------------------------------------------- |
| `x.type === "..."`      | Union **discriminée** (le plus explicite)      |
| `"prop" in x`           | Pas de discriminant, propriétés **distinctes** |
| `typeof x === "string"` | Primitifs                                      |
| `x instanceof Classe`   | Instances de classes                           |
| `Array.isArray(x)`      | Tableaux                                       |

---

## 6. Quand préférer un discriminant

Si vous pouvez ajouter une propriété `type` / `kind` / `statut`, faites-le : c'est **plus lisible** et le test d'exhaustivité avec `never` devient possible.

```typescript
// Moins bon : dépend de la présence d'une méthode
if ("miauler" in animal) { ... }

// Meilleur : discriminant explicite
if (animal.type === "chat") { ... }
```

`in` reste très utile quand les types viennent d'une **API externe** ou d'une librairie que vous ne pouvez pas modifier.

---

## 7. Points à retenir

- Syntaxe : `"propriete" in objet` (la clé à gauche est une **chaîne**).
- Ne fonctionne pas sur les primitifs (`"a" in "abc"` → TypeError).
- Teste l'existence, pas la valeur ni le type.
- Remonte la chaîne de prototypes → `Object.hasOwn()` pour les propriétés propres.
- À utiliser quand les membres de l'union n'ont **pas** de propriété commune discriminante.
