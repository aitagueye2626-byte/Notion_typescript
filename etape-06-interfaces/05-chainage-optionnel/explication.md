# 6.5 - Chaînage optionnel (`?.`)

Le **chaînage optionnel** (`?.`) permet d'accéder à une propriété ou d'appeler une méthode **sans vérifier manuellement** que l'objet existe. Si l'objet est `null` ou `undefined`, l'expression renvoie `undefined` au lieu de lever une erreur.

```typescript
const ville = utilisateur.adresse?.ville;
```

---

## 1. Sans / avec chaînage

```typescript
// Sans
const ville = utilisateur.adresse && utilisateur.adresse.ville;

// Avec
const ville = utilisateur.adresse?.ville;
```

Les deux renvoient `undefined` si `adresse` est absent, mais la seconde est bien plus lisible.

---

## 2. Chaîner plusieurs niveaux

```typescript
entreprise.siege?.pays?.code; // undefined si un maillon manque
```

Chaque `?.` protège **un seul** accès. Sans `?.` sur `pays`, l'accès `pays.code` planterait.

---

## 3. Les trois formes

| Syntaxe      | Usage                                      |
| :----------- | :----------------------------------------- |
| `obj?.prop`  | accéder à une **propriété**                |
| `obj?.[cle]` | accéder à un **index** / une clé dynamique |
| `fn?.()`     | **appeler** une fonction / méthode         |

```typescript
utilisateur?.adresse?.ville;
tableau?.[0];
service.envoyer?.("Bonjour");
```

---

## 4. Combiner avec `??` (valeurs par défaut)

```typescript
const code = entreprise.siege?.pays?.code ?? "Inconnu";
```

⚠️ Ne **pas** utiliser `||` si `0` ou `""` sont des valeurs valides :

```typescript
const port = config.port ?? 3000; // ✅ 0 reste 0
const port2 = config.port || 3000; // ❌ 0 devient 3000
```

---

## 5. ⚠️ Le chaînage ne va pas plus loin que nécessaire

```typescript
a?.b.c;   // si a est undefined → undefined ; sinon a.b.c (peut planter si b est null)
a?.b?.c;  // protège les deux niveaux
```

Placez un `?.` **à chaque niveau** susceptible d'être `null` / `undefined`.

---

## 6. ⚠️ Ce que `?.` ne protège pas

- Une **variable non déclarée** : `inexistant?.x` → erreur de compilation.
- Une **méthode qui existe mais renvoie `undefined`** : `a?.b()` peut renvoyer `undefined` si `b` existe mais ne retourne rien.
- Un **accès invalide** en aval : `obj?.liste.push(x)` protège `obj`, pas `liste`.

---

## 7. Ne pas en abuser

`?.` masque l'absence de données. Si une valeur est **obligatoire par contrat**, une erreur explicite est souvent préférable :

```typescript
function ville(u: Utilisateur): string {
    if (!u.adresse) throw new Error("Adresse manquante");
    return u.adresse.ville;
}
```

Sinon, un `undefined` silencieux peut se propager loin dans le programme.

---

## 8. Cas d'usage typiques

```typescript
// Réponse API optionnelle
const nom = reponse?.data?.user?.name ?? "Anonyme";

// Callback facultatif
onSave?.(valeur);

// Premier élément d'une liste éventuellement vide
const premier = liste?.[0];

// Méthode d'interface optionnelle
compte.fermer?.();
```

---

## 9. Points à retenir

- `?.` renvoie `undefined` au lieu de lever une `TypeError`.
- Trois formes : `.prop`, `[cle]`, `()`.
- Se combine naturellement avec `??`.
- Ne protège que le niveau où il est placé.
- Pour un champ obligatoire, préférez une vérification explicite.
