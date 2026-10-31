// 9.3 - Décorateurs de propriété
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 1. Décorateur de métadonnées : marquer des champs requis
const ChampsRequis = new Map();
function Requis(target, propertyKey) {
    const proprietes = ChampsRequis.get(target) || [];
    proprietes.push(propertyKey);
    ChampsRequis.set(target, proprietes);
    console.log(`[Requis] -> Propriété '${propertyKey}' marquée comme obligatoire.`);
}
function validerObjet(instance) {
    const prototype = Object.getPrototypeOf(instance);
    const champsObligatoires = ChampsRequis.get(prototype) || [];
    for (const champ of champsObligatoires) {
        if (instance[champ] === undefined || instance[champ] === null || instance[champ] === "") {
            console.log(`❌ Validation échouée : le champ '${champ}' est manquant.`);
            return false;
        }
    }
    console.log("✅ Objet validé avec succès.");
    return true;
}
class FormulaireContact {
    nom;
    email;
    message;
    constructor(nom, email, message) {
        this.nom = nom;
        this.email = email;
        this.message = message;
    }
}
__decorate([
    Requis
], FormulaireContact.prototype, "nom", void 0);
__decorate([
    Requis
], FormulaireContact.prototype, "email", void 0);
const formInvalide = new FormulaireContact("", "aita@test.sn");
validerObjet(formInvalide);
const formValide = new FormulaireContact("Aita", "aita@test.sn", "Bonjour !");
validerObjet(formValide);
// 2. Décorateur qui transforme une propriété en lecture seule via getter/setter
function MajusculesAutomatiques(target, propertyKey) {
    const symboleValeur = Symbol(propertyKey);
    Object.defineProperty(target, propertyKey, {
        get: function () {
            return this[symboleValeur];
        },
        set: function (nouvelleValeur) {
            this[symboleValeur] = typeof nouvelleValeur === "string" ? nouvelleValeur.toUpperCase() : nouvelleValeur;
        },
        enumerable: true,
        configurable: true
    });
}
class ProduitCatalogue {
    codeArticle;
    constructor(codeArticle) {
        this.codeArticle = codeArticle;
    }
}
__decorate([
    MajusculesAutomatiques
], ProduitCatalogue.prototype, "codeArticle", void 0);
const article = new ProduitCatalogue("ref-abc-123");
console.log("Code article formaté en majuscules :", article.codeArticle);
article.codeArticle = "promo-hiver";
console.log("Nouveau code après réassignation :", article.codeArticle);
export {};
