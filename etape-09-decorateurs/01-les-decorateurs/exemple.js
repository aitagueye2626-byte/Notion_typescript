// 9.1 - Les décorateurs : premier contact
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 1. Déclaration d'un décorateur de fonction simple pour observer la définition
function TracerChargement(constructeur) {
    console.log(`[Décorateur] -> La classe '${constructeur.name}' vient d'être chargée en mémoire !`);
}
// 2. Application du décorateur avec le symbole @
let ServiceClient = class ServiceClient {
    constructor() {
        console.log("-> Instance de ServiceClient créée.");
    }
};
ServiceClient = __decorate([
    TracerChargement
], ServiceClient);
// Remarquez dans les logs : le message du décorateur apparaît AVANT les instanciations !
console.log("Avant création des instances :");
const client1 = new ServiceClient();
const client2 = new ServiceClient();
// 3. Décorateur simple qui ajoute une propriété au prototype de la classe
function AvecHorodatage(constructeur) {
    constructeur.prototype.dateCreation = new Date().toISOString();
    constructeur.prototype.estDisponible = true;
}
let Commande = class Commande {
    id;
    total;
    constructor(id, total) {
        this.id = id;
        this.total = total;
    }
};
Commande = __decorate([
    AvecHorodatage
], Commande);
const commande1 = new Commande(1001, 79.9);
// Accès aux propriétés dynamiquement injectées via prototype
console.log("Commande ID :", commande1.id);
console.log("Date injectée par le décorateur :", commande1.dateCreation);
console.log("Est disponible ?", commande1.estDisponible);
export {};
