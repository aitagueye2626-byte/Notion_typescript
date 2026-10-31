# 1.9 - Le type `Enum` (Énumération)

En TypeScript, un **`enum`** permet de définir une **liste de valeurs constantes nommées**. On l'utilise quand une variable ne peut prendre qu'un choix limité de valeurs (ex: les jours de la semaine, les rôles d'un utilisateur, le statut d'une commande).

---

## 1. Les différents types d'`Enum`

### A. Enum numérique (par défaut)

Si on ne précise pas de valeur, TypeScript numérote automatiquement à partir de `0` (`0`, `1`, `2`...).

```typescript
enum Direction {
    Haut,   // vaut 0
    Bas,    // vaut 1
    Gauche, // vaut 2
    Droite  // vaut 3
}
```

### B. Enum numérique personnalisé

On peut choisir le numéro de départ (ou donner un numéro à chacun) :
```typescript
enum CodeHttp {
    Succes = 200,
    Introuvable = 404,
    ErreurServeur = 500
}
```

### C. Enum de texte (String Enum) - *Le plus lisible*

Chaque clé a une valeur de type `string` :
```typescript
enum Role {
    Admin = "ADMIN",
    Client = "CLIENT",
    Invite = "INVITE"
}
```

---

## 2. Opérations sur un `Enum`
| Opération | Exemple | Résultat |
| :--- | :--- | :--- |
| **Lire une valeur** | `Role.Admin` | `"ADMIN"` |
| **Typer une variable** | `let monRole: Role = Role.Client;` | Oblige à choisir une valeur de `Role`. |
| **Lecture inverse (Enum numérique)** | `Direction[0]` | `"Haut"` (permet de retrouver le nom à partir du numéro). |
| **Lister les clés / valeurs** | `Object.values(Role)` | `["ADMIN", "CLIENT", "INVITE"]` |
