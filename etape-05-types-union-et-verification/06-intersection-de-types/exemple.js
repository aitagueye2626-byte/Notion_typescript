// Intersection de types : un objet doit posséder TOUTES les propriétés (symbole &)
let aita = {
    nom: "Aita",
    age: 21
    // ⚠️ Il FAUT les deux propriétés, sinon erreur
};
console.log("Personne :", aita);
let compte = {
    id: 1,
    email: "aita@exemple.com",
    creeLe: new Date(),
    modifieLe: new Date()
};
console.log("Compte :", compte.id, compte.email);
// 7. Intersection avec un type générique
function ajouterDateCreation(objet) {
    return { ...objet, creeLe: new Date() };
}
let produit = ajouterDateCreation({ nom: "Cahier", prix: 1500 });
console.log("Produit :", produit.nom, produit.creeLe.getFullYear());
let admin = { niveau: 2, id: 2, email: "admin@exemple.com" };
console.log("Admin :", admin);
let e1 = { id: 1, email: "a@b.com" };
let e2 = { id: 2, tel: "+221" };
// let e3: EmployeJoignable = { id: 3 }; // ❌ ni email ni tel
console.log(e1, e2);
let logger = Object.assign((message) => console.log(logger.prefixe, message), { prefixe: "[LOG]" });
logger("Démarrage");
export {};
// 11. Récapitulatif
// & = ET  (toutes les propriétés)
// | = OU  (au moins une forme)
