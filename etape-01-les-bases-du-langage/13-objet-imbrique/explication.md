# 1.13 - Le Type Objet Imbriqué

En TypeScript, un **objet imbriqué** est simplement **un objet qui contient un autre objet** à l'intérieur d'une de ses propriétés (par exemple : un client qui possède un objet `adresse`).

---

## 1. Comment typer un objet imbriqué ?
On imbrique également les accolades `{ ... }` dans la définition du type :

```typescript
let client: {
    nom: string;
    adresse: {
        ville: string;
        quartier: string;
    };
} = {
    nom: "Aita",
    adresse: {
        ville: "Dakar",
        quartier: "Mermoz"
    }
};
```

---

## 2. Comment accéder aux valeurs et les manipuler ?

| Opération | Exemple | Résultat |
| :--- | :--- | :--- |
| **Lire une propriété imbriquée** | `client.adresse.ville` | `"Dakar"` |
| **Modifier une propriété imbriquée** | `client.adresse.quartier = "Plateau";` | Modifie uniquement le quartier. |
| **Lecture sécurisée (si optionnel)** | `client.adresse?.ville` | Évite une erreur si `adresse` n'existe pas. |
| **Copier un objet imbriqué (copie profonde)** | `structuredClone(client)` | Copie l'objet **et** tous ses sous-objets indépendamment. |
