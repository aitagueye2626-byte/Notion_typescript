// Interface comme type de fonction : décrire la signature d'une fonction

// 1. Syntaxe "call signature"
interface Operation {
    (a: number, b: number): number;
}

// Une variable de ce type doit être une fonction avec cette signature
let addition: Operation = (a, b) => a + b;
let multiplication: Operation = (a, b) => a * b;

console.log("Addition :", addition(10, 20));          // 30
console.log("Multiplication :", multiplication(4, 5)); // 20

// 2. ⚠️ Une fonction incompatible est refusée
// let mauvaise: Operation = (a: string) => a; // ❌ types incompatibles

// 3. Interface avec une propriété fonctionnelle (méthode)
interface Calculateur {
    ajouter(a: number, b: number): number;
    soustraire: (a: number, b: number) => number;
}

let calc: Calculateur = {
    ajouter: (a, b) => a + b,
    soustraire: (a, b) => a - b
};
console.log("Ajout :", calc.ajouter(5, 3));
console.log("Soustraction :", calc.soustraire(5, 3));

// 4. Interface de callback
interface CallbackResultat {
    (erreur: Error | null, resultat?: string): void;
}

function chargerDonnees(callback: CallbackResultat): void {
    // simulation
    callback(null, "Données chargées");
}

chargerDonnees((erreur, resultat) => {
    if (erreur) {
        console.log("Erreur :", erreur.message);
        return;
    }
    console.log("Succès :", resultat);
});

// 5. Interface pour un validateur
interface Validateur {
    (valeur: string): boolean;
}

const estEmail: Validateur = (valeur) => valeur.includes("@");
const estTelephone: Validateur = (valeur) => /^\+?\d+$/.test(valeur);

console.log("Email valide ?", estEmail("aita@exemple.com"));
console.log("Téléphone valide ?", estTelephone("+221770000000"));

// 6. Interface avec des propriétés ET une call signature
interface FonctionAvecProprietes {
    (message: string): void;
    niveau: "info" | "erreur";
}

function creerLogger(niveau: "info" | "erreur"): FonctionAvecProprietes {
    const logger = ((message: string) => {
        console.log(`[${niveau}]`, message);
    }) as FonctionAvecProprietes;
    logger.niveau = niveau;
    return logger;
}

let log = creerLogger("info");
log("Démarrage");
console.log("Niveau :", log.niveau);

// 7. Interface comme type d'une fonction passée en paramètre
interface Comparateur<T> {
    (a: T, b: T): number;
}

function trier<T>(tableau: T[], comparer: Comparateur<T>): T[] {
    return [...tableau].sort(comparer);
}

let nombres = trier([3, 1, 2], (a, b) => a - b);
console.log("Trié :", nombres);

// 8. Interface vs type pour une fonction
type OperationType = (a: number, b: number) => number;
let division: OperationType = (a, b) => a / b;
console.log("Division :", division(10, 2));

// Les deux sont équivalents ; l'interface est plus lisible pour une signature longue

// 9. Fonction avec surcharge déclarée dans une interface
interface Convertir {
    (valeur: string): number;
    (valeur: number): string;
}

// ⚠️ Une interface de surcharge décrit les APPELS possibles, pas le corps :
// une fonction fléchée unique ne peut pas être assignée aux deux signatures
// (son type de retour devrait être à la fois number et string).
// const convertir: Convertir = (valeur: string | number) => ...; // ❌

// On implémente donc avec une fonction surchargée (voir 2.9)
function convertir(valeur: string): number;
function convertir(valeur: number): string;
function convertir(valeur: string | number): number | string {
    if (typeof valeur === "string") return Number(valeur);
    return String(valeur);
}

console.log(convertir("42")); // 42
console.log(convertir(42));   // "42"

// Si on veut une seule signature commune, on préfère un type union :
type ConvertirUnion = (valeur: string | number) => number | string;
const convertirUnion: ConvertirUnion = (valeur) =>
    typeof valeur === "string" ? Number(valeur) : String(valeur);
console.log(convertirUnion("7"), convertirUnion(7));
