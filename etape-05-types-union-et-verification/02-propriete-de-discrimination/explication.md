# 5.2 - Propriété de discrimination (discriminated union)

Une **union discriminée** est une union de types d'objets qui partagent une propriété commune (souvent `type`, `kind` ou `statut`) dont la valeur est un **littéral unique** par variante. TypeScript s'en sert pour **réduire automatiquement** le type.

```typescript
type PaiementEspeces = { type: "especes"; montant: number };
type PaiementCarte   = { type: "carte";   montant: number; numeroCarte: string };

type Paiement = PaiementEspeces | PaiementCarte;
```

La propriété **discriminante** est ici `type`.

---

## 1. Réduction automatique avec `switch`

```typescript
function traiter(paiement: Paiement): string {
    switch (paiement.type) {
        case "especes":
            return `${paiement.montant} FCFA`;           // ✅ PaiementEspeces
        case "carte":
            return paiement.numeroCarte.slice(-4);       // ✅ PaiementCarte
    }
}
```

Dans chaque `case`, TypeScript connaît **exactement** la variante : les propriétés spécifiques sont accessibles, et celles des autres variantes sont interdites.

---

## 2. Réduction avec `if`

```typescript
if (paiement.type === "carte") {
    paiement.numeroCarte; // ✅
} else {
    paiement.montant;     // ✅ uniquement ce qui est commun
}
```

---

## 3. Pourquoi c'est indispensable

Sans discriminateur, on ne peut accéder qu'aux propriétés **communes** :

```typescript
type A = { a: number };
type B = { b: number };

function f(x: A | B) {
    // x.a; // ❌ n'existe pas sur B
}
```

Avec un discriminateur, plus besoin de casts (`as`) ni de vérifications fragiles.

---

## 4. Le test d'exhaustivité avec `never`

```typescript
function montantTotal(p: Paiement): number {
    switch (p.type) {
        case "especes":
        case "carte":
            return p.montant;
        default:
            const jamais: never = p; // ✅ compilation OK
            return jamais;
    }
}
```

Si vous ajoutez plus tard `type: "mobile"` sans mettre à jour le `switch`, `p` ne sera plus `never` → **erreur de compilation**. Le compilateur vous signale tout oubli.

---

## 5. Exemple complet : état d'une requête

```typescript
type EtatRequete =
    | { statut: "chargement" }
    | { statut: "succes"; donnees: string[] }
    | { statut: "erreur"; message: string };

function afficher(etat: EtatRequete) {
    switch (etat.statut) {
        case "chargement": console.log("..."); break;
        case "succes":     console.log(etat.donnees.length); break;
        case "erreur":     console.log(etat.message); break;
    }
}
```

C'est le pattern standard pour modéliser un état qui peut prendre **plusieurs formes exclusives** (React, Redux, appels réseau).

---

## 6. Bonnes pratiques

| Règle                                                   | Raison                                           |
| :------------------------------------------------------ | :----------------------------------------------- |
| Nommer la propriété `type` / `kind` / `statut`          | Convention lisible                               |
| Utiliser des **littéraux** (`"carte"`, pas `string`)    | Seuls les littéraux permettent la discrimination |
| Un discriminant **différent par variante**              | Sinon TypeScript ne peut pas réduire             |
| Toujours prévoir un `default` + `never`                 | Garantit l'exhaustivité                          |
| Préférer l'union discriminée aux classes + `instanceof` | Plus simple, sérialisable en JSON                |

---

## 7. Union discriminée vs héritage de classes

|                             | Union discriminée  | Hiérarchie de classes |
| :-------------------------- | :----------------- | :-------------------- |
| Sérialisation JSON          | ✅ naturelle        | ❌ méthodes perdues    |
| Taille du code généré       | ✅ aucun runtime    | ⚠️ classes en JS       |
| Extensibilité               | ⚠️ modifier l'union | ✅ sous-classe         |
| Vérification d'exhaustivité | ✅ `never`          | ⚠️ manuelle            |
