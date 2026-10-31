// Interface comme type de fonction : décrire la signature d'une fonction
// Une variable de ce type doit être une fonction avec cette signature
let addition = (a, b) => a + b;
let multiplication = (a, b) => a * b;
console.log("Addition :", addition(10, 20)); // 30
console.log("Multiplication :", multiplication(4, 5)); // 20
let calc = {
    ajouter: (a, b) => a + b,
    soustraire: (a, b) => a - b
};
console.log("Ajout :", calc.ajouter(5, 3));
console.log("Soustraction :", calc.soustraire(5, 3));
function chargerDonnees(callback) {
    // simulation
    callback(null, "Données chargées");
}
chargerDonnees((erreur, resultat) => {
    if (erreur) {
        console.log("Erreur :", erreur.message);
        return;
    }
    console.log("Succès :", resultat);
});
const estEmail = (valeur) => valeur.includes("@");
const estTelephone = (valeur) => /^\+?\d+$/.test(valeur);
console.log("Email valide ?", estEmail("aita@exemple.com"));
console.log("Téléphone valide ?", estTelephone("+221770000000"));
function creerLogger(niveau) {
    const logger = ((message) => {
        console.log(`[${niveau}]`, message);
    });
    logger.niveau = niveau;
    return logger;
}
let log = creerLogger("info");
log("Démarrage");
console.log("Niveau :", log.niveau);
function trier(tableau, comparer) {
    return [...tableau].sort(comparer);
}
let nombres = trier([3, 1, 2], (a, b) => a - b);
console.log("Trié :", nombres);
let division = (a, b) => a / b;
console.log("Division :", division(10, 2));
function convertir(valeur) {
    if (typeof valeur === "string")
        return Number(valeur);
    return String(valeur);
}
console.log(convertir("42")); // 42
console.log(convertir(42)); // "42"
const convertirUnion = (valeur) => typeof valeur === "string" ? Number(valeur) : String(valeur);
console.log(convertirUnion("7"), convertirUnion(7));
export {};
