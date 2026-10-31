// 1. Le ": number" après les parenthèses oblige la fonction à retourner un nombre
function multiplier(a, b) {
    return a * b;
    // return "texte"; // ❌ Erreur TS : interdit car le type de retour est "number"
}
// 2. Le ": boolean" oblige la fonction à retourner true ou false
function verifierMajorite(agePersonne) {
    return agePersonne >= 18;
}
console.log("Multiplication (4 x 5) :", multiplier(4, 5));
console.log("Est majeur (20 ans) :", verifierMajorite(20));
export {};
