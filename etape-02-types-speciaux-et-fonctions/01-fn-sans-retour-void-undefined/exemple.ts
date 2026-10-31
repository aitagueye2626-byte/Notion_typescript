// 1. Fonction avec ": void" -> elle fait une action mais ne retourne rien
function direBonjour(nom: string): void {
    console.log("Bonjour", nom);

}

direBonjour("Aita");

// 2. Fonction avec ": undefined" -> retourne explicitement undefined
function neRienRetourner(): undefined {
    console.log("Cette fonction renvoie undefined");
    return undefined;
}

let resultat = neRienRetourner();
console.log("Valeur reçue :", resultat);

