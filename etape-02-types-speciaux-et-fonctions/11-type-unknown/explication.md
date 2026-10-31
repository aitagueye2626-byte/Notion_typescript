# 11 - Type `unknown`

## Explication simple
Le type **`unknown`** ("inconnu" en anglais) permet de stocker **n'importe quelle valeur** (un texte, un nombre, un booléen...) quand on ne connaît pas encore son type à l'avance.

### Pourquoi utiliser `unknown` plutôt que `any` ?
- Avec **`any`**, TypeScript ne vérifie plus rien (risque de bug).
- Avec **`unknown`**, TypeScript nous **oblige à vérifier le type** (avec `typeof`) avant de manipuler la variable. C'est donc beaucoup plus sécurisé !
