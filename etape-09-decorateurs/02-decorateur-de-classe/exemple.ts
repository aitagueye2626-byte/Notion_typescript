// 9.2 - Décorateurs de classe

// 1. Décorateur qui scelle le constructeur et son prototype
function Scelle(constructeur: Function): void {
    Object.seal(constructeur);
    Object.seal(constructeur.prototype);
    console.log(`Classe ${constructeur.name} scellée avec succès.`);
}

@Scelle
class ParametresSecurises {
    cleApi = "SEC-XYZ-987";
    maxRequetes = 100;
}

const config = new ParametresSecurises();
console.log("Clé API :", config.cleApi);

// 2. Décorateur qui enrichit le constructeur en étendant la classe
type ConstructeurGenerique = new (...args: any[]) => {};

function AvecMetadonneesAudit<T extends ConstructeurGenerique>(ConstructeurBase: T) {
    return class extends ConstructeurBase {
        public readonly dateAudit: Date = new Date();
        public readonly versionSchema: number = 2;

        obtenirInfosAudit(): string {
            return `Créé le ${this.dateAudit.toISOString()} (schéma v${this.versionSchema})`;
        }
    };
}

@AvecMetadonneesAudit
class Facture {
    constructor(public reference: string, public montant: number) {}
}

const maFacture = new Facture("FAC-2026-001", 1250);
console.log("Facture référence :", maFacture.reference);
console.log("Infos audit injectées :", (maFacture as any).obtenirInfosAudit());

// 3. Décorateur d'enregistrement (Pattern Service Registry)
const AnnuaireServices = new Map<string, Function>();

function EnregistrerService(cible: Function): void {
    AnnuaireServices.set(cible.name, cible);
    console.log(`[Annuaire] -> Service '${cible.name}' enregistré.`);
}

@EnregistrerService
class ServicePaiement {
    payer(somme: number): void {
        console.log(`Paiement de ${somme} € effectué.`);
    }
}

@EnregistrerService
class ServiceEmail {
    envoyer(destinataire: string): void {
        console.log(`Email envoyé à ${destinataire}.`);
    }
}

console.log("Services répertoriés dans l'annuaire :", Array.from(AnnuaireServices.keys()));
const ClasseEmailTrouvee = AnnuaireServices.get("ServiceEmail") as new () => ServiceEmail;
const instanceEmail = new ClasseEmailTrouvee();
instanceEmail.envoyer("aita@example.com");
