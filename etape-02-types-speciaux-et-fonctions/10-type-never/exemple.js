// Une fonction qui lance TOUJOURS une erreur a le type de retour ": never"
// car elle coupe le programme et n'atteint jamais la fin de la fonction.
function signalerErreur(message) {
    throw new Error(message);
}
console.log("Début du programme...");
// Cet appel va déclencher l'erreur en rouge dans la console et stopper le programme :
signalerErreur("Accès refusé : mot de passe incorrect !");
export {};
