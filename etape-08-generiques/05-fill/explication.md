# 8.5 - Remplissage générique (`Fill`) et types par défaut

La création et le remplissage de collections ou de structures de données est un cas d'application fondamental des génériques en TypeScript.

La notion de **Fill** (remplissage) intervient à plusieurs niveaux :
1. Écrire une fonction générique pour initialiser un tableau de taille $N$ rempli d'une valeur de type $T$.
2. Comprendre le typage de la méthode standard `Array.prototype.fill<T>()`.
3. Définir des **valeurs génériques par défaut** (`<T = string>`) pour le remplissage.
4. Remplir des dictionnaires ou objets de type `Record<K, V>`.

---

## 1. Fonction générique `remplirTableau<T>`

En JavaScript pur, `new Array(5).fill("A")` n'offre aucune vérification de type. En TypeScript, nous créons une fonction générique assurant un typage strict :

```typescript
function remplirTableau<T>(taille: number, valeur: T): T[] {
    const resultat: T[] = [];
    for (let i = 0; i < taille; i++) {
        resultat.push(valeur);
    }
    return resultat;
}

const zeros = remplirTableau(4, 0);          // number[] -> [0, 0, 0, 0]
const textes = remplirTableau(3, "TypeScript"); // string[] -> ["TypeScript", "TypeScript", "TypeScript"]
```

Le retour est garanti être du type exact du paramètre `valeur`.

---

## 2. Le typage de `Array.prototype.fill`

Dans la bibliothèque standard TypeScript (`lib.es2015.core.d.ts`), la méthode `fill` est elle-même définie de manière générique :

```typescript
// Définition interne dans TypeScript :
// fill(value: T, start?: number, end?: number): this;
```

Cela signifie que `fill()` sur un tableau `T[]` n'accepte qu'une valeur compatible avec `T`, garantissant l'intégrité du tableau :

```typescript
const nombres: number[] = [1, 2, 3, 4];
nombres.fill(9);      // ✅ Valide : 9 est un number
// nombres.fill("abc"); // ❌ Erreur : string n'est pas assignable à number !
```

---

## 3. Paramètres de type par défaut (`<T = string>`)

Comme pour les paramètres de fonctions classiques avec valeur par défaut, TypeScript permet de donner un **type par défaut** à un paramètre générique :

```typescript
class ConteneurRempli<T = string> {
    private elements: T[];

    constructor(taille: number, valeur: T) {
        this.elements = new Array<T>(taille).fill(valeur);
    }

    getElements(): T[] {
        return this.elements;
    }
}

// Sans préciser le type, T prend la valeur par défaut (string) si applicable
const conteneur = new ConteneurRempli(3, "defaut"); // ConteneurRempli<string>
const conteneurNum = new ConteneurRempli<number>(3, 42); // ConteneurRempli<number>
```

---

## 4. Remplissage générique avec factory / callback

Quand la valeur à remplir est un objet, utiliser une référence directe la dupliquerait par référence (toutes les cases pointeraient vers le même objet en mémoire !).

Une fonction générique de remplissage avec **fabrique (factory callback)** résout ce problème :

```typescript
function remplirAvecFabrique<T>(taille: number, fabrique: (index: number) => T): T[] {
    const tableau: T[] = [];
    for (let i = 0; i < taille; i++) {
        tableau.push(fabrique(i)); // chaque tour crée une nouvelle instance
    }
    return tableau;
}

const utilisateurs = remplirAvecFabrique(3, (i) => ({ id: i + 1, nom: `Utilisateur #${i + 1}` }));
// Chaque utilisateur est un objet indépendant en mémoire !
```

---

## 5. Remplissage d'un dictionnaire `Record<K, V>`

On peut aussi remplir un ensemble de clés avec une valeur générique :

```typescript
function remplirCles<K extends string | number | symbol, V>(cles: K[], valeurParDefaut: V): Record<K, V> {
    const resultat = {} as Record<K, V>;
    for (const cle of cles) {
        resultat[cle] = valeurParDefaut;
    }
    return resultat;
}

const permissions = remplirCles(["lire", "ecrire", "supprimer"], false);
// type Record<"lire" | "ecrire" | "supprimer", boolean>
```

---

## 6. Points à retenir

- Une fonction de remplissage générique garantit que le type de chaque cellule produite correspond au type demandé.
- Attention aux objets : remplir avec une valeur littérale partage la même référence mémoire ; privilégier une fonction générique fabrique `(index: number) => T`.
- Les types par défaut `<T = MonType>` permettent de simplifier l'utilisation d'une classe ou fonction générique.
- `Record<K, V>` permet d'associer un ensemble de clés à un type de valeur générique.
