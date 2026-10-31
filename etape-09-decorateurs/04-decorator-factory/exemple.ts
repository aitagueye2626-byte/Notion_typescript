// 9.4 - Fabriques de décorateurs (Decorator Factory)

// 1. Fabrique pour décorateur de classe : configuration d'entité
interface ConfigEntite {
    nomTable: string;
    version: number;
}

function Entite(options: ConfigEntite) {
    return function (constructeur: Function) {
        console.log(`[Factory @Entite] Configuration de '${constructeur.name}' sur la table '${options.nomTable}' v${options.version}`);
        constructeur.prototype._metaEntite = options;
    };
}

@Entite({ nomTable: "utilisateurs_app", version: 1 })
class Utilisateur {
    constructor(public id: number, public nom: string) {}
}

const user = new Utilisateur(1, "Aita");
console.log("Métadonnées de table injectées :", (user as any)._metaEntite);

// 2. Fabrique pour décorateur de propriété : validation de plage numérique
function PlageNumerique(min: number, max: number) {
    return function (target: any, propertyKey: string) {
        const cleInterne = Symbol(propertyKey);

        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this[cleInterne];
            },
            set: function (valeur: number) {
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
    @PlageNumerique(18, 99)
    age!: number;

    @PlageNumerique(0, 100)
    noteConfiance!: number;
}

const profil = new ProfilUtilisateur();
console.log("--- Test validation avec Decorator Factory ---");
profil.age = 15; // Trop jeune
profil.age = 21; // Valide
profil.noteConfiance = 85; // Valide
profil.noteConfiance = 150; // Trop élevé

// 3. Démonstration de l'ordre d'évaluation et d'exécution de plusieurs décorateurs
function DecorateurA(nom: string) {
    console.log(`1. Fabrique [${nom}] évaluée (Haut -> Bas)`);
    return function (cible: Function) {
        console.log(`2. Décorateur [${nom}] appliqué (Bas -> Haut) sur ${cible.name}`);
    };
}

function DecorateurB(nom: string) {
    console.log(`1. Fabrique [${nom}] évaluée (Haut -> Bas)`);
    return function (cible: Function) {
        console.log(`2. Décorateur [${nom}] appliqué (Bas -> Haut) sur ${cible.name}`);
    };
}

console.log("--- Déclaration de la classe décorée multiple ---");
@DecorateurA("PREMIER")
@DecorateurB("SECOND")
class ExempleOrdre {}
