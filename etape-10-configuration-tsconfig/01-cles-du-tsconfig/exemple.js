// 10.1 - Démonstration des concepts liés aux options du tsconfig
// Ce commentaire sert à tester "removeComments" :
// Si removeComments = true, cette ligne n'apparaîtra pas dans le fichier exemple.js généré !
/**
 * Calculatrice simple illustrant un code sans erreur TypeScript
 */
class CalculatriceProjet {
    /**
     * Additionne deux nombres
     * @param a Premier opérande
     * @param b Second opérande
     */
    additionner(a, b) {
        return a + b;
    }
    multiplier(a, b) {
        return a * b;
    }
}
const calc = new CalculatriceProjet();
const resultatAddition = calc.additionner(15, 27);
const resultatMultiplication = calc.multiplier(6, 7);
console.log("Résultat addition :", resultatAddition);
console.log("Résultat multiplication :", resultatMultiplication);
// Illustration de "noEmitOnError" :
// Si vous décommentez la ligne suivante :
// const testErreur: number = "chaine invalide";
// Avec "noEmitOnError": true, tsc refusera catégoriquement de générer ou mettre à jour les fichiers .js !
console.log("Compilation réussie sous contrôle strict de TypeScript.");
export {};
