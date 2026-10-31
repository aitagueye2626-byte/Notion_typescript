// 9.3 - Décorateurs de propriété

// 1. Décorateur de métadonnées : marquer des champs requis
const ChampsRequis = new Map<any, string[]>();

function Requis(target: any, propertyKey: string): void {
    const proprietes = ChampsRequis.get(target) || [];
    proprietes.push(propertyKey);
    ChampsRequis.set(target, proprietes);
    console.log(`[Requis] -> Propriété '${propertyKey}' marquée comme obligatoire.`);
}

function validerObjet(instance: any): boolean {
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
    @Requis
    nom: string;

    @Requis
    email: string;

    message?: string;

    constructor(nom: string, email: string, message?: string) {
        this.nom = nom;
        this.email = email;
        this.message = message;
    }
}

const formInvalide = new FormulaireContact("", "aita@test.sn");
validerObjet(formInvalide);

const formValide = new FormulaireContact("Aita", "aita@test.sn", "Bonjour !");
validerObjet(formValide);

// 2. Décorateur qui transforme une propriété en lecture seule via getter/setter
function MajusculesAutomatiques(target: any, propertyKey: string): void {
    const symboleValeur = Symbol(propertyKey);

    Object.defineProperty(target, propertyKey, {
        get: function () {
            return this[symboleValeur];
        },
        set: function (nouvelleValeur: string) {
            this[symboleValeur] = typeof nouvelleValeur === "string" ? nouvelleValeur.toUpperCase() : nouvelleValeur;
        },
        enumerable: true,
        configurable: true
    });
}

class ProduitCatalogue {
    @MajusculesAutomatiques
    codeArticle: string;

    constructor(codeArticle: string) {
        this.codeArticle = codeArticle;
    }
}

const article = new ProduitCatalogue("ref-abc-123");
console.log("Code article formaté en majuscules :", article.codeArticle);
article.codeArticle = "promo-hiver";
console.log("Nouveau code après réassignation :", article.codeArticle);
