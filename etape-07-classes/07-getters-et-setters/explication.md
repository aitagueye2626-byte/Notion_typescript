# 7.7 - Getters et setters

Les **accesseurs** permettent d'exposer une propriété dont la lecture (`get`) ou l'écriture (`set`) passe par du code : validation, calcul, transformation.

```typescript
class Temperature {
    private _celsius: number;

    constructor(celsius: number) {
        this._celsius = celsius;
    }

    get celsius(): number {
        return this._celsius;
    }

    set celsius(valeur: number) {
        if (valeur < -273.15) throw new Error("Sous le zéro absolu");
        this._celsius = valeur;
    }
}

const t = new Temperature(20);
t.celsius;      // 20   -> get (sans parenthèses)
t.celsius = 25; // 25   -> set
```

---

## 1. La syntaxe `get` / `set`

```typescript
class Personne {
    private _nom = "";

    get nom(): string {
        return this._nom;
    }

    set nom(valeur: string) {
        this._nom = valeur.trim();
    }
}

const p = new Personne();
p.nom = "  Aita  ";
console.log(p.nom); // "Aita" (espaces retirés par le setter)
```

Remarques :

- On **lit** `p.nom` (pas `p.nom()`), on **écrit** `p.nom = ...`.
- Le type de retour du `get` et le type du paramètre du `set` doivent être **compatibles**.
- TypeScript infère la propriété comme normale : elle apparaît dans l'autocomplétion.

---

## 2. Trois combinaisons

| Déclaration   | Lecture | Écriture | Usage                                     |
| :------------ | :-----: | :------: | :---------------------------------------- |
| `get` seul    |    ✅    |    ❌     | propriété **calculée** / en lecture seule |
| `set` seul    |    ❌    |    ✅     | mot de passe, secret, injection           |
| `get` + `set` |    ✅    |    ✅     | validation à l'écriture                   |

```typescript
class Rectangle {
    constructor(private readonly l: number, private readonly h: number) {}
    get aire(): number { return this.l * this.h; } // get seul
}

const r = new Rectangle(4, 5);
r.aire;      // 20
// r.aire = 30; // ❌ Cannot assign to 'aire' because it is a read-only property
```

---

## 3. Propriété calculée

Aucun stockage : la valeur est recalculée à chaque lecture.

```typescript
class Cercle {
    constructor(readonly rayon: number) {}
    get diametre(): number { return this.rayon * 2; }
    get perimetre(): number { return 2 * Math.PI * this.rayon; }
}
```

> ⚠️ Si le calcul est coûteux, un getter le refait à **chaque** accès. Dans ce cas, cachez la valeur dans un champ mis à jour explicitement.

---

## 4. Validation dans le setter

```typescript
class Age {
    private _valeur = 0;

    get valeur(): number { return this._valeur; }

    set valeur(v: number) {
        if (!Number.isInteger(v) || v < 0 || v > 150) {
            throw new RangeError("Âge invalide");
        }
        this._valeur = v;
    }
}
```

C'est le principal intérêt : garantir qu'un objet **ne peut pas** se retrouver dans un état incohérent.

---

## 5. Conversion dans les deux sens

```typescript
class Temperature {
    private _c = 0;
    get celsius() { return this._c; }
    set celsius(v: number) { this._c = v; }

    get fahrenheit() { return this._c * 9 / 5 + 32; }
    set fahrenheit(f: number) { this.celsius = (f - 32) * 5 / 9; } // réutilise la validation
}
```

Un seul champ source (`_c`) et plusieurs vues : évite les valeurs contradictoires.

---

## 6. Bonnes pratiques

- **Ne pas mettre d'effet de bord dans un getter** (pas d'appel réseau, pas de mutation).
- Un setter invalide doit **lever une erreur** ou journaliser, jamais ignorer silencieusement.
- Préfixer le champ interne (`_celsius`, `#celsius`) pour éviter un conflit de nom.
- Un accesseur ne remplace pas un getter de framework : en JS/TS pur, il suffit.
- `Object.keys(obj)` n'affiche **pas** les accesseurs définis sur le prototype (`get`) : ils ne sont pas des champs propres.

---

## 7. Points à retenir

- `get` / `set` s'utilisent **comme une propriété**, pas comme une méthode.
- `get` seul = lecture seule ; `set` seul = écriture seule ; les deux = validation.
- Les getters calculés évitent les données dupliquées.
- Le setter est l'endroit naturel pour **valider**.
