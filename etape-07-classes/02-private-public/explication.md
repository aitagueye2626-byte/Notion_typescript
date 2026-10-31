# 7.2 - `private` et `public`

Les **modificateurs d'accès** définissent qui peut lire ou modifier un membre de classe.

| Modificateur      | Accessible dans la classe | Dans une sous-classe | De l'extérieur |
| :---------------- | :-----------------------: | :------------------: | :------------: |
| `public` (défaut) |             ✅             |          ✅           |       ✅        |
| `private`         |             ✅             |          ❌           |       ❌        |

```typescript
class CompteBancaire {
    public titulaire: string;
    private solde: number;

    constructor(titulaire: string, soldeInitial: number) {
        this.titulaire = titulaire;
        this.solde = soldeInitial;
    }

    get soldeActuel(): number {
        return this.solde;
    }
}

const compte = new CompteBancaire("Aita", 1000);
compte.titulaire;   // ✅
compte.soldeActuel; // ✅ (getter public)
compte.solde;       // ❌ Property 'solde' is private
```

---

## 1. Pourquoi cacher des données ?

- **Protéger les invariants** : un solde ne doit pas devenir négatif n'importe comment.
- **Contrôler les modifications** : passer par `deposer()` / `retirer()` qui vérifient les règles.
- **Faciliter l'évolution** : on peut changer l'intérieur tant que l'API publique ne bouge pas.

```typescript
class CompteBancaire {
    private solde = 0;

    deposer(montant: number): void {
        if (montant <= 0) throw new Error("Montant invalide");
        this.solde += montant;
    }

    retirer(montant: number): void {
        if (montant > this.solde) throw new Error("Solde insuffisant");
        this.solde -= montant;
    }
}
```

---

## 2. Le défaut est `public`

```typescript
class A {
    x = 1;        // équivalent à public x = 1
    public y = 2; // explicite
}
```

On écrit rarement `public` : la plupart des équipes ne l'écrivent que pour **contraster** avec un `private` voisin.

---

## 3. `private` s'applique aussi aux méthodes

```typescript
class ParseurCSV {
    lire(): string[][] {
        return this.decouper("...");
    }

    private decouper(ligne: string): string[] { // détail d'implémentation
        return ligne.split(",");
    }
}
```

Cela découpe le code en méthodes lisibles sans exposer la mécanique interne.

---

## 4. `private` TypeScript ≠ `private` JavaScript (`#`)

Le `private` de TypeScript **disparaît à la compilation** : c'est une vérification statique seulement.

```typescript
class Secret {
    private valeur = 42;
}
const s = new Secret();
(s as any).valeur; // ✅ à l'exécution (contournement)
```

JavaScript a une vraie encapsulation, avec `#` :

```typescript
class Secret {
    #valeur = 42;
    reveler(): number { return this.#valeur; }
}
new Secret().#valeur; // ❌ SyntaxError : champ privé natif
```

|                                 | `private` (TS) | `#champ` (JS) |
| :------------------------------ | :------------- | :------------ |
| Vérifié à la compilation        | ✅              | ✅             |
| Protégé à l'exécution           | ❌              | ✅             |
| Visible dans `Object.keys`      | ✅              | ❌             |
| Utilisable dans une sous-classe | ❌              | ❌             |

> 💡 Pour un vrai secret (jeton, mot de passe en mémoire), préférez `#`.

---

## 5. Cas particuliers utiles

- **Getter seul** (`get solde()`) : lecture publique, écriture impossible depuis l'extérieur.
- **`private readonly`** : lecture dans la classe, aucune réécriture après le constructeur.
- **`protected`** (voir 7.10) : accessible dans la classe **et** les sous-classes, pas dehors.

---

## 6. Points à retenir

- Rien à écrire = `public`.
- `private` = visible uniquement dans la classe, refusé à la compilation ailleurs.
- Exposer l'état via des **méthodes** (et non des propriétés modifiables) protège les règles métier.
- `private` TS est effacé à l'exécution ; `#` est une vraie protection JavaScript.
