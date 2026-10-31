function saluerPersonne(nom: string): void {
    console.log("Salut", nom);
}

function soustraire(x: number, y: number): number {
    return x - y;
}

// 1. Le type générique "Function" : accepte n'importe quelle fonction
let action: Function;
action = saluerPersonne;
action("Aita");

// 2. Le type de fonction précis : (paramètres) => typeDeRetour
let operation: (a: number, b: number) => number;
operation = soustraire; // ✅ Autorisé car soustraire prend 2 numbers et renvoie un number
// operation = saluerPersonne; // ❌ Erreur TS : ne correspond pas aux types attendus !

console.log("Résultat opération (10 - 3) :", operation(10, 3));
