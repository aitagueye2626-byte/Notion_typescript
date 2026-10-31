// 1. Fonction qui additionne deux nombres et renvoie le résultat avec "return"
function additionner(x: number, y: number) {
    return x + y;
}

let somme = additionner(10, 5);
console.log("Résultat de l'addition :", somme);

// 2. Fonction qui renvoie un texte (string)
function creerMessage(prenom: string) {
    return "Bienvenue " + prenom;
}

let texte = creerMessage("Aita");
console.log(texte);
