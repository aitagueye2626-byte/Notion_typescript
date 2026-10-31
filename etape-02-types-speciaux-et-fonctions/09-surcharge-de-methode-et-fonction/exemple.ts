// 1. Les signatures de surcharge (les cas autorisés)
function combiner(a: number, b: number): number; // Cas 1 : deux nombres -> retourne un nombre
function combiner(a: string, b: string): string; // Cas 2 : deux textes  -> retourne un texte

// 2. Le corps réel de la fonction
function combiner(a: any, b: any): any {
    return a + b;
}

// Utilisation du Cas 1 (nombres)
console.log("Somme des nombres :", combiner(10, 20));

// Utilisation du Cas 2 (textes)
console.log("Textes collés :", combiner("Bonjour ", "Aita"));
