// 9.4 - Fabriques de décorateurs (Decorator Factory)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Entite(options) {
    return function (constructeur) {
        console.log(`[Factory @Entite] Configuration de '${constructeur.name}' sur la table '${options.nomTable}' v${options.version}`);
        constructeur.prototype._metaEntite = options;
    };
}
let Utilisateur = class Utilisateur {
    id;
    nom;
    constructor(id, nom) {
        this.id = id;
        this.nom = nom;
    }
};
Utilisateur = __decorate([
    Entite({ nomTable: "utilisateurs_app", version: 1 })
], Utilisateur);
const user = new Utilisateur(1, "Aita");
console.log("Métadonnées de table injectées :", user._metaEntite);
// 2. Fabrique pour décorateur de propriété : validation de plage numérique
function PlageNumerique(min, max) {
    return function (target, propertyKey) {
        const cleInterne = Symbol(propertyKey);
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this[cleInterne];
            },
            set: function (valeur) {
                if (typeof valeur === "number" && (valeur < min || valeur > max)) {
                    console.log(`⚠️ Erreur : '${propertyKey}' (${valeur}) doit être entre ${min} et ${max}.`);
                    return;
                }
                this[cleInterne] = valeur;
                console.log(`✅ '${propertyKey}' affecté avec succès :`, valeur);
            },
            enumerable: true,
            configurable: true
        });
    };
}
class ProfilUtilisateur {
    age;
    noteConfiance;
}
__decorate([
    PlageNumerique(18, 99)
], ProfilUtilisateur.prototype, "age", void 0);
__decorate([
    PlageNumerique(0, 100)
], ProfilUtilisateur.prototype, "noteConfiance", void 0);
const profil = new ProfilUtilisateur();
console.log("--- Test validation avec Decorator Factory ---");
profil.age = 15; // Trop jeune
profil.age = 21; // Valide
profil.noteConfiance = 85; // Valide
profil.noteConfiance = 150; // Trop élevé
// 3. Démonstration de l'ordre d'évaluation et d'exécution de plusieurs décorateurs
function DecorateurA(nom) {
    console.log(`1. Fabrique [${nom}] évaluée (Haut -> Bas)`);
    return function (cible) {
        console.log(`2. Décorateur [${nom}] appliqué (Bas -> Haut) sur ${cible.name}`);
    };
}
function DecorateurB(nom) {
    console.log(`1. Fabrique [${nom}] évaluée (Haut -> Bas)`);
    return function (cible) {
        console.log(`2. Décorateur [${nom}] appliqué (Bas -> Haut) sur ${cible.name}`);
    };
}
console.log("--- Déclaration de la classe décorée multiple ---");
let ExempleOrdre = class ExempleOrdre {
};
ExempleOrdre = __decorate([
    DecorateurA("PREMIER"),
    DecorateurB("SECOND")
], ExempleOrdre);
export {};
