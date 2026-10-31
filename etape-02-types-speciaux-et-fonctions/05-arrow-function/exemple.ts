// 1. Arrow function avec accolades { } et "return"
const calculerCarre = (nombre: number): number => {
    return nombre * nombre;
};

// 2. Arrow function courte sur 1 seule ligne (le "return" est automatique !)
const additionnerFleche = (a: number, b: number): number => a + b;

// 3. Arrow function sans paramètre ()
const afficherBienvenue = (): void => {
    console.log("Bienvenue dans le cours TypeScript !");
};

afficherBienvenue();
console.log("Carré de 6 :", calculerCarre(6));
console.log("Addition (8 + 7) :", additionnerFleche(8, 7));
