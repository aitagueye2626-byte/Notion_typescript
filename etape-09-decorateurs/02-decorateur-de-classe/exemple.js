// 9.2 - Décorateurs de classe
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 1. Décorateur qui scelle le constructeur et son prototype
function Scelle(constructeur) {
    Object.seal(constructeur);
    Object.seal(constructeur.prototype);
    console.log(`Classe ${constructeur.name} scellée avec succès.`);
}
let ParametresSecurises = class ParametresSecurises {
    cleApi = "SEC-XYZ-987";
    maxRequetes = 100;
};
ParametresSecurises = __decorate([
    Scelle
], ParametresSecurises);
const config = new ParametresSecurises();
console.log("Clé API :", config.cleApi);
function AvecMetadonneesAudit(ConstructeurBase) {
    return class extends ConstructeurBase {
        dateAudit = new Date();
        versionSchema = 2;
        obtenirInfosAudit() {
            return `Créé le ${this.dateAudit.toISOString()} (schéma v${this.versionSchema})`;
        }
    };
}
let Facture = class Facture {
    reference;
    montant;
    constructor(reference, montant) {
        this.reference = reference;
        this.montant = montant;
    }
};
Facture = __decorate([
    AvecMetadonneesAudit
], Facture);
const maFacture = new Facture("FAC-2026-001", 1250);
console.log("Facture référence :", maFacture.reference);
console.log("Infos audit injectées :", maFacture.obtenirInfosAudit());
// 3. Décorateur d'enregistrement (Pattern Service Registry)
const AnnuaireServices = new Map();
function EnregistrerService(cible) {
    AnnuaireServices.set(cible.name, cible);
    console.log(`[Annuaire] -> Service '${cible.name}' enregistré.`);
}
let ServicePaiement = class ServicePaiement {
    payer(somme) {
        console.log(`Paiement de ${somme} € effectué.`);
    }
};
ServicePaiement = __decorate([
    EnregistrerService
], ServicePaiement);
let ServiceEmail = class ServiceEmail {
    envoyer(destinataire) {
        console.log(`Email envoyé à ${destinataire}.`);
    }
};
ServiceEmail = __decorate([
    EnregistrerService
], ServiceEmail);
console.log("Services répertoriés dans l'annuaire :", Array.from(AnnuaireServices.keys()));
const ClasseEmailTrouvee = AnnuaireServices.get("ServiceEmail");
const instanceEmail = new ClasseEmailTrouvee();
instanceEmail.envoyer("aita@example.com");
export {};
