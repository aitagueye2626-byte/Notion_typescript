// Index properties (index signature) : autoriser des clés dynamiques sur un objet

// 1. Sans index signature, on ne peut pas accéder à une clé inconnue
let scoresParMatiere: { maths: number; francais: number } = { maths: 18, francais: 15 };
console.log("Maths :", scoresParMatiere.maths);
// scoresParMatiere.anglais  -> ❌ Erreur : la propriété 'anglais' n'existe pas

// 2. Avec une index signature [cle: string]: number
// On déclare : "toutes les clés sont des string et toutes les valeurs sont des number"
type Notes = {
    [matiere: string]: number;
};

let notesAita: Notes = {
    maths: 18,
    francais: 15
};

// On peut maintenant ajouter / lire des clés librement
notesAita.anglais = 17;
console.log("Anglais :", notesAita["anglais"]); // accès par crochets
console.log("Toutes les notes :", notesAita);

// 3. Parcourir les clés dynamiques
for (const matiere in notesAita) {
    console.log(`${matiere} -> ${notesAita[matiere]}`);
}

// 4. Index signature avec des clés de type number (type dictionnaire)
type EffectifParClasse = {
    [numeroClasse: number]: string;
};

let delegues: EffectifParClasse = {
    1: "Aita",
    2: "Moussa"
};
delegues[3] = "Fatou";
console.log("Délégué de la classe 3 :", delegues[3]);

// 5. Index signature + propriétés fixes (les deux peuvent cohabiter)
// La valeur des propriétés fixes doit être compatible avec le type de l'index
type Configuration = {
    nom: string;
    [option: string]: string;
};

let config: Configuration = {
    nom: "Application Cours",
    langue: "fr",
    theme: "sombre"
};
console.log("Configuration :", config);

// 6. Une clé inexistante renvoie undefined : le type renvoyé est donc "number | undefined"
// (avec "strict", TypeScript le sait et vous force à vérifier)
let noteRare: number | undefined = notesAita["philosophie"];
console.log("Philosophie :", noteRare ?? "Non notée");
