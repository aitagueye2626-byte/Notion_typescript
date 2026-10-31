// Test de type union avec typeof : réduire une union de PRIMITIFS

// 1. typeof renvoie une chaîne : "string", "number", "boolean", "object",
//    "undefined", "function", "symbol", "bigint"

function decrire(valeur: string | number | boolean): string {
    if (typeof valeur === "string") {
        // Ici TypeScript sait que valeur est un string
        return `Texte de ${valeur.length} caractères`;
    }

    if (typeof valeur === "number") {
        // Ici valeur est un number
        return `Nombre : ${valeur.toFixed(2)}`;
    }

    // Ici TypeScript a déduit qu'il ne reste que le boolean
    return valeur ? "Vrai" : "Faux";
}

console.log(decrire("Aita"));   // "Texte de 4 caractères"
console.log(decrire(3.14159));  // "Nombre : 3.14"
console.log(decrire(true));     // "Vrai"

// 2. typeof ne distingue PAS les objets entre eux (toujours "object")
function analyser(valeur: string | number[] | null): string {
    if (valeur === null) {
        return "Rien";
    }
    if (typeof valeur === "string") {
        return "Texte";
    }
    // Ici TypeScript a réduit à number[] (null déjà exclu)
    return `Tableau de ${valeur.length} éléments`;
}

console.log(analyser(null));
console.log(analyser("Aita"));
console.log(analyser([1, 2, 3]));

// 3. ⚠️ typeof null === "object" : toujours tester null AVANT
function verifierNull(valeur: object | null): string {
    // if (typeof valeur === "object") -> true aussi pour null !
    if (valeur === null) return "null";
    return "objet";
}
console.log(verifierNull(null));

// 4. typeof sur une fonction
function estFonction(valeur: unknown): boolean {
    return typeof valeur === "function";
}
console.log(estFonction(() => 42)); // true
console.log(estFonction(42));       // false

// 5. typeof dans une fonction qui accepte une union complexe
type Reponse = string | number | boolean | null | undefined | object;

function afficherReponse(reponse: Reponse): void {
    switch (typeof reponse) {
        case "string":
            console.log("Texte :", reponse.toUpperCase());
            break;
        case "number":
            console.log("Nombre :", reponse + 1);
            break;
        case "boolean":
            console.log("Booléen :", reponse ? "oui" : "non");
            break;
        case "undefined":
            console.log("Aucune réponse");
            break;
        case "object":
            // typeof null === "object" -> il faut encore distinguer
            if (reponse === null) {
                console.log("Réponse nulle");
            } else {
                console.log("Objet :", Object.keys(reponse));
            }
            break;
    }
}

afficherReponse("Aita");
afficherReponse(42);
afficherReponse(false);
afficherReponse(undefined);
afficherReponse(null);
afficherReponse({ nom: "Aita" });

// 6. typeof pour valider une entrée inconnue (unknown)
function convertirEnNombre(valeur: unknown): number | null {
    if (typeof valeur === "number") return valeur;
    if (typeof valeur === "string") {
        const nombre = Number(valeur);
        return Number.isNaN(nombre) ? null : nombre;
    }
    return null;
}

console.log(convertirEnNombre("42"));   // 42
console.log(convertirEnNombre(true));   // null
