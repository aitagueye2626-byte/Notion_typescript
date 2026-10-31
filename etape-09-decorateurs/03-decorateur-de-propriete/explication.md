# 9.3 - Décorateurs de propriété

Un **décorateur de propriété** est appliqué directement sur la déclaration d'une variable/attribut au sein d'une classe.

Il permet d'observer, de consigner ou de redéfinir la manière dont cette propriété est lue ou écrite.

---

## 1. Signature d'un décorateur de propriété

```typescript
function MonDecorateurPropriete(target: any, propertyKey: string): void {
    // target : le prototype de la classe (si membre d'instance)
    //          ou le constructeur (si membre static)
    // propertyKey : le nom de la propriété (chaîne de caractères)
}
```

> **Important :** Contrairement aux décorateurs de méthode, le décorateur de propriété **ne reçoit pas de descripteur de propriété** (`PropertyDescriptor`) en 3e paramètre en TypeScript expérimental, car les propriétés sont initialisées à l'instanciation et n'existent pas encore sur le prototype.

---

## 2. Cas 1 : Enregistrement de métadonnées

Le rôle le plus fréquent (utilisé par TypeORM pour `@Column()` ou `class-validator` pour `@IsNotEmpty()`) est de stocker le nom de la propriété dans une liste de métadonnées associées à la classe :

```typescript
const METADONNEES_REQUISES = new Map<any, string[]>();

function Requis(target: any, propertyKey: string): void {
    const proprietesExistantes = METADONNEES_REQUISES.get(target) || [];
    proprietesExistantes.push(propertyKey);
    METADONNEES_REQUISES.set(target, proprietesExistantes);
}

class InscriptionDTO {
    @Requis
    email!: string;

    @Requis
    motDePasse!: string;

    pseudo?: string;
}
```

---

## 3. Cas 2 : Redéfinition en Getter / Setter (Validation ou Logging)

Pour intercepter les lectures/écritures sur une propriété, on peut utiliser `Object.defineProperty` au sein du décorateur pour remplacer la valeur par un getter et un setter :

```typescript
function PositifSeulement(target: any, propertyKey: string): void {
    let valeur: number;

    const getter = () => valeur;
    const setter = (nouvelleValeur: number) => {
        if (nouvelleValeur < 0) {
            throw new Error(`La propriété '${propertyKey}' ne peut pas être négative !`);
        }
        valeur = nouvelleValeur;
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}
```

---

## 4. Propriétés d'instance vs Propriétés statiques

| Type de propriété | Valeur de `target` | Exemple |
| :---------------- | :----------------- | :------ |
| **Instance**      | `MaClasse.prototype` | `@MonDecorateur nom: string;` |
| **Statique**      | `MaClasse` (constructeur) | `@MonDecorateur static version: string;` |

---

## 5. Points à retenir

- Un décorateur de propriété reçoit `(target, propertyKey)`.
- Il ne reçoit pas de `descriptor` directement en mode expérimental.
- Il est principalement utilisé pour :
  - enregistrer des métadonnées (schémas, validation, sérialisation) ;
  - transformer un champ en accesseur dynamique avec `Object.defineProperty`.
