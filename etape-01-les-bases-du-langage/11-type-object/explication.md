# 1.11 - Le type `object`

En TypeScript, un **objet** regroupe plusieurs informations (appelées **propriétés** ou **clés/valeurs**) entre accolades `{ clé: valeur }`.

---

## 1. Différence entre `object` (générique) et un objet typé

1. **Le mot-clé `object` (en minuscule)** :
   - Indique simplement que la variable est un objet (et non un primitif comme `number`, `string`, `boolean`).
   - ⚠️ **Limite :** Avec `: object`, TypeScript ne connaît pas les propriétés à l'intérieur (`voiture.marque` donnera une erreur).
2. **Laisser TypeScript deviner (inférence) ou typer les propriétés :**
   - Permet d'accéder aux propriétés en toute sécurité (`voiture.marque`).

---

## 2. Toutes les opérations possibles sur un Objet

| Opération | Exemple | Description |  œ
| :--- | :--- | :--- |
| **Lire une propriété (point)** | `voiture.marque` | Accès classique à une propriété. |
| **Lire une propriété (crochets)** | `voiture["marque"]` | Accès dynamique avec le nom de la clé entre guillemets. |
| **Modifier une propriété** | `voiture.annee = 2025;` | Change la valeur d'une propriété existante. |
| **Vérifier si une clé existe (`in`)** | `"marque" in voiture` | Renvoie `true` si la propriété existe dans l'objet. |
| **Lister toutes les clés** | `Object.keys(voiture)` | Renvoie un tableau des noms de propriétés : `["marque", "annee"]`. |
| **Lister toutes les valeurs** | `Object.values(voiture)` | Renvoie un tableau des valeurs : `["Toyota", 2024]`. |
| **Lister les paires `[clé, valeur]`** | `Object.entries(voiture)` | Renvoie `[["marque", "Toyota"], ["annee", 2024]]`. |
| **Copier / Fusionner des objets** | `{ ...obj1, ...obj2 }` ou `Object.assign({}, obj1)` | Crée un nouvel objet en combinant les propriétés. |
| **Bloquer toute modification** | `Object.freeze(voiture)` | Gèle l'objet pour empêcher qu'on modifie ses valeurs. |
