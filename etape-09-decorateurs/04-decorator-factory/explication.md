# 9.4 - Fabrique de décorateurs (`Decorator Factory`)

Un décorateur simple `@MonDecorateur` ne peut pas recevoir d'arguments passés par le développeur.

Une **fabrique de décorateurs** (*Decorator Factory*) est une fonction qui accepte des paramètres de configuration et **renvoie la fonction décoratrice réelle**.

On l'appelle avec des parenthèses : `@MaFabrique(param1, param2)`.

---

## 1. Structure d'une fabrique de décorateurs

Une fabrique est une fonction qui "enveloppe" le décorateur :

```typescript
function Logger(prefixe: string) {
    // 1. La fabrique reçoit les paramètres personnalisés ("prefixe")
    return function (target: Function) {
        // 2. Le décorateur renvoyé reçoit les arguments standards du décorateur
        console.log(`[${prefixe}] Classe décorée : ${target.name}`);
    };
}

@Logger("ADMIN")
class UtilisateurAdmin {}
```

---

## 2. Fabrique pour décorateur de classe

Imaginons un décorateur similaire à ceux des ORM pour associer une table de base de données à une classe :

```typescript
interface OptionsTable {
    nom: string;
    schema?: string;
}

function Table(options: OptionsTable) {
    return function (constructeur: Function) {
        constructeur.prototype._nomTable = options.nom;
        constructeur.prototype._schema = options.schema ?? "public";
    };
}

@Table({ nom: "utilisateurs", schema: "auth" })
class Utilisateur {}
```

---

## 3. Fabrique pour décorateur de propriété : validation

Une fabrique est indispensable pour paramétrer des règles de validation comme une longueur minimale ou une valeur par défaut :

```typescript
function LongueurMinimale(tailleMin: number) {
    return function (target: any, propertyKey: string) {
        const clePrivee = Symbol(propertyKey);

        Object.defineProperty(target, propertyKey, {
            get() {
                return this[clePrivee];
            },
            set(valeur: string) {
                if (typeof valeur === "string" && valeur.length < tailleMin) {
                    throw new Error(`La propriété '${propertyKey}' doit comporter au moins ${tailleMin} caractères.`);
                }
                this[clePrivee] = valeur;
            },
            enumerable: true,
            configurable: true
        });
    };
}

class Compte {
    @LongueurMinimale(8)
    motDePasse!: string;
}
```

---

## 4. Ordre d'exécution de plusieurs décorateurs (Composition)

Lorsque plusieurs décorateurs sont appliqués à un même élément :

1. **Les fabriques** sont évaluées dans l'ordre d'écriture : **de haut en bas** (1, 2, 3...).
2. **Les décorateurs** sont exécutés dans l'ordre inverse : **de bas en bas vers le haut** (...3, 2, 1) selon la logique de composition mathématique $f(g(x))$.

```typescript
@Premier()  // 1. Fabrique 1 -> 4. Exécution 1
@Second()   // 2. Fabrique 2 -> 3. Exécution 2
class Exemple {}
```

---

## 5. Points à retenir

- Une fabrique est une fonction qui renvoie un décorateur : `function MaFabrique(...) { return function(target, ...) {} }`.
- Permet de rendre les décorateurs dynamiques et configurables avec des options.
- Utilisée par presque toutes les bibliothèques TypeScript du marché (NestJS, Angular, class-validator, TypeORM).
