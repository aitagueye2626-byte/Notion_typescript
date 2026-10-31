# 03 - Destructuration avec les tableaux

## Explication simple
La **destructuration de tableau** permet d'extraire les éléments d'un tableau dans des variables séparées **en une seule ligne**, en utilisant des crochets `[ ]` à gauche du `=` (comme `[$a, $b] = $tab` en PHP) :
- Au lieu d'écrire `let premier = podium[0];` puis `let deuxieme = podium[1];`
- On écrit directement : `let [premier, deuxieme] = podium;`
