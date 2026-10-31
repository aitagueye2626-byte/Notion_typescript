# 6.6 - Héritage entre interfaces (`extends`)

Une interface peut **hériter** d'une ou plusieurs autres interfaces avec le mot-clé `extends`. Elle obtient alors toutes leurs propriétés, et peut en ajouter.

```typescript
interface Animal {
    nom: string;
    manger(): void;
}

interface Chien extends Animal {
    race: string;
    aboyer(): void;
}
```

Un `Chien` doit avoir `nom`, `manger`, `race` **et** `aboyer`.

---

## 1. Exemple complet

```typescript
const rex: Chien = {
    nom: "Rex",
    race: "Berger",
    manger: () => console.log("mange"),
    aboyer: () => console.log("Wouf"),
};

rex.manger(); // hérité de Animal
rex.aboyer(); // propre à Chien
```

Si une propriété héritée manque → **erreur de compilation**.

---

## 2. Héritage multiple

```typescript
interface Volant  { voler(): void; }
interface Nageant { nager(): void; }

interface Canard extends Volant, Nageant {
    nom: string;
}

const d: Canard = { nom: "Donald", voler() {}, nager() {} };
```

Une interface peut étendre **plusieurs** interfaces ; un `type` utiliserait `&`.

---

## 3. Chaîne d'héritage

```typescript
interface EtreVivant { id: number; }
interface Personne extends EtreVivant { nom: string; }
interface Etudiant extends Personne { matricule: string; }

// Etudiant → id + nom + matricule
```

L'héritage est **transitif**.

---

## 4. Redéfinir une propriété héritée

### Cas valide : restreindre le type

```typescript
interface Vehicule { moteur: string; }

interface Voiture extends Vehicule {
    moteur: "essence" | "diesel" | "electrique"; // sous-type de string ✅
}
```

### Cas invalide : type incompatible

```typescript
interface Avion extends Vehicule {
    moteur: number; // ❌ number n'est pas assignable à string
}
```

### Cas valide : rendre optionnel → obligatoire

```typescript
interface ConfigBase { mode?: "dev" | "prod"; }
interface ConfigProd extends ConfigBase { mode: "prod"; } // ✅
```

L'inverse (obligatoire → optionnel) est **refusé**.

---

## 5. `extends` vs `&`

```typescript
interface A { id: number; }

interface B extends A { nom: string; }   // extends
type C = A & { nom: string };            // intersection
```

Les deux produisent un type équivalent, mais :

|                         | `interface extends`    | `type &`          |
| :---------------------- | :--------------------- | :---------------- |
| Conflit de propriété    | ❌ **erreur explicite** | ⚠️ devient `never` |
| Fusion de déclarations  | ✅                      | ❌                 |
| Étendre un `type` union | ❌                      | ✅                 |
| Lisibilité de l'erreur  | ✅                      | parfois confuse   |

> Préférez `extends` quand vous décrivez des **objets** : les conflits sont signalés clairement.

---

## 6. Héritage et classes

Une classe peut **implémenter** une interface (ou plusieurs) :

```typescript
class MonChien implements Chien {
    constructor(
        public nom: string,
        public race: string
    ) {}
    manger() {}
    aboyer() {}
}
```

L'interface décrit le **contrat**, la classe fournit l'**implémentation** (voir étape 7).

---

## 7. Points à retenir

- `extends` = héritage : l'interface enfant a **tout** ce que possède le parent.
- On peut étendre **plusieurs** interfaces.
- Une redéfinition doit rester **compatible** (sous-type) et peut rendre obligatoire.
- Pour les objets, `extends` est souvent plus clair que `&`.
- Ne pas confondre avec l'héritage de **classes** (étape 7), qui apporte aussi du code.
