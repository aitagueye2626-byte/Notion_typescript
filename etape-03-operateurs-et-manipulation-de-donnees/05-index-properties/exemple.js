// Index properties (index signature) : autoriser des clés dynamiques sur un objet
// 1. Sans index signature, on ne peut pas accéder à une clé inconnue
let scoresParMatiere = { maths: 18, francais: 15 };
console.log("Maths :", scoresParMatiere.maths);
let notesAita = {
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
let delegues = {
    1: "Aita",
    2: "Moussa"
};
delegues[3] = "Fatou";
console.log("Délégué de la classe 3 :", delegues[3]);
let config = {
    nom: "Application Cours",
    langue: "fr",
    theme: "sombre"
};
console.log("Configuration :", config);
// 6. Une clé inexistante renvoie undefined : le type renvoyé est donc "number | undefined"
// (avec "strict", TypeScript le sait et vous force à vérifier)
let noteRare = notesAita["philosophie"];
console.log("Philosophie :", noteRare ?? "Non notée");
export {};
