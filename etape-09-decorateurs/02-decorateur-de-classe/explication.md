# 9.2 - Décorateurs de classe

Un **décorateur de classe** s'applique directement sur la déclaration d'une classe (juste au-dessus du mot-clé `class`).

Il reçoit un unique argument : le **constructeur** de la classe cible (`target: Function`).

---

## 1. Signature d'un décorateur de classe

```typescript
function MonDecorateurDeClasse(target: Function): void | typeof target {
    // target = la fonction constructeur de la classe décorée
}
```

Deux approches sont possibles :
1. **Ne rien retourner (`void`)** : observer la classe, lui ajouter des métadonnées statiques ou modifier son `prototype`.
2. **Retourner une nouvelle fonction constructeur** : remplacer ou enrichir le constructeur d'origine pour intercepter l'instanciation (`new`).

---

## 2. Cas 1 : Sceller une classe avec `Object.seal`

Empêche l'ajout ou la suppression de nouvelles propriétés sur la classe et son prototype :

```typescript
function Scelle(constructeur: Function): void {
    Object.seal(constructeur);
    Object.seal(constructeur.prototype);
}

@Scelle
class Configuration {
    version = "1.0.0";
}
```

---

## 3. Cas 2 : Remplacer ou étendre le constructeur

En retournant une classe anonyme qui hérite de `target`, on peut injecter des propriétés ou intercepter l'instanciation de chaque objet créé avec `new` :

```typescript
function AjouterHorodatage<T extends { new (...args: any[]): {} }>(ConstructeurOriginal: T) {
    return class extends ConstructeurOriginal {
        creeLe = new Date();
    };
}

@AjouterHorodatage
class Tache {
    titre: string;
    constructor(titre: string) {
        this.titre = titre;
    }
}

const tache = new Tache("Finir la formation TypeScript");
console.log((tache as any).creeLe); // Date automatique ajoutée à l'instanciation !
```

---

## 4. Cas 3 : Registre de composants (Pattern Service Locator)

Un décorateur de classe peut enregistrer automatiquement toutes les classes décorées dans une collection centrale :

```typescript
const REGISTRE_SERVICES: Function[] = [];

function Service(target: Function): void {
    REGISTRE_SERVICES.push(target);
    console.log(`Service enregistré : ${target.name}`);
}

@Service
class PaiementService {}

@Service
class NotificationService {}
// REGISTRE_SERVICES contient automatiquement [PaiementService, NotificationService]
```

---

## 5. Points à retenir

- Le décorateur de classe reçoit la fonction constructeur en paramètre.
- Pour ajouter un comportement statique ou métadonnée : modifier `target` ou `target.prototype`.
- Pour ajouter un comportement à chaque `new` : renvoyer `class extends target`.
- Utilisé massivement par Angular (`@Component`, `@Injectable`) et NestJS (`@Module`, `@Controller`).
