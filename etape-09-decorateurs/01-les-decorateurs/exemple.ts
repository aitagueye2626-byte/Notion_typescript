// 9.1 - Les décorateurs : premier contact

// 1. Déclaration d'un décorateur de fonction simple pour observer la définition
function TracerChargement(constructeur: Function): void {
    console.log(`[Décorateur] -> La classe '${constructeur.name}' vient d'être chargée en mémoire !`);
}

// 2. Application du décorateur avec le symbole @
@TracerChargement
class ServiceClient {
    constructor() {
        console.log("-> Instance de ServiceClient créée.");
    }
}

// Remarquez dans les logs : le message du décorateur apparaît AVANT les instanciations !
console.log("Avant création des instances :");
const client1 = new ServiceClient();
const client2 = new ServiceClient();

// 3. Décorateur simple qui ajoute une propriété au prototype de la classe
function AvecHorodatage(constructeur: Function): void {
    constructeur.prototype.dateCreation = new Date().toISOString();
    constructeur.prototype.estDisponible = true;
}

@AvecHorodatage
class Commande {
    constructor(public id: number, public total: number) {}
}

const commande1 = new Commande(1001, 79.9);
// Accès aux propriétés dynamiquement injectées via prototype
console.log("Commande ID :", commande1.id);
console.log("Date injectée par le décorateur :", (commande1 as any).dateCreation);
console.log("Est disponible ?", (commande1 as any).estDisponible);
