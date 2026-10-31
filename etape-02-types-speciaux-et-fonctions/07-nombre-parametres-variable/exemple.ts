// Avec "...prenoms: string[]", on peut envoyer autant de prénoms qu'on veut !
function afficherInvites(...prenoms: string[]): void {
    console.log("Liste des invités reçus :", prenoms);
    console.log("Nombre d'invités :", prenoms.length);
}

// 1. Appel avec 2 paramètres
afficherInvites("Aita", "Moussa");

// 2. Appel avec 4 paramètres
afficherInvites("Aita", "Moussa", "Fatou", "Ousmane");
