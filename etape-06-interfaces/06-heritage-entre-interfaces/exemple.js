// Héritage entre interfaces : extends
// 3. Un Chien possède TOUTES les propriétés de Animal + les siennes
let rex = {
    nom: "Rex",
    age: 3,
    race: "Berger",
    manger: () => console.log("Rex mange"),
    aboyer: () => console.log("Wouf !")
};
rex.manger(); // hérité
rex.aboyer(); // propre
console.log(rex.nom, rex.race);
let donald = {
    nom: "Donald",
    voler: () => console.log("Je vole"),
    nager: () => console.log("Je nage")
};
donald.voler();
donald.nager();
let etudiant = {
    id: 1,
    nom: "Aita",
    matricule: "MAT-001"
};
console.log("Étudiant :", etudiant);
let voiture = { moteur: "electrique" };
console.log("Moteur :", voiture.moteur);
let config = { mode: "prod" };
console.log("Config :", config);
let premium = {
    id: 1,
    fermer: () => console.log("Compte fermé"),
    fonctionnalites: ["export", "stats"]
};
premium.fermer();
console.log("Fonctionnalités :", premium.fonctionnalites);
let viaType = { id: 1, nom: "Aita" };
console.log("Via type :", viaType);
export {};
// Différence : extends signale les conflits, & les rend silencieusement "never"
